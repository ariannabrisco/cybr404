import django

import os


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cybr404.settings')

django.setup()


from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django import forms

class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Non-Valid e-mail address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(blank=True, default='', unique=True)
    name = models.CharField(max_length=255, blank=True, default='')

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name or self.email.split('@')[0]


class PreferenceCategory(models.TextChoices):
    FOOD = 'food', _('Food')
    EVENT = 'event', _('Event')
    PLACE = 'place', _('Place')
class Preference(models.Model):
    RATING_CHOICES = [
        (1, 'Low Preference'),
        (2, 'Medium Preference'),
        (3, 'High Preference')
    ]
class AccessibilityPreference(models.Model):
    THEME_CHOICES = [
        (1, 'Default'),
        (2, 'Dark'),
        (3, 'High Contrast'),
        (4, 'Sepia')

    ]
    FONT_CHOICES = [
        (1, 'Default'),
        (2, 'Large Font'),


    ]
class PreferenceForm(forms.ModelForm):
    class Meta:
        model = Preference
        fields = ['category', 'name', 'rating']

    def clean_rating(self):
        rating = self.cleaned_data.get('rating')
        if rating not in [1, 2, 3]:
            raise forms.ValidationError("Rating must be between 1 and 3.")
        return rating