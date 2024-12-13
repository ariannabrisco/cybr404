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

    username = models.CharField(max_length=255, blank=False, default='', unique=True)
    password = models.CharField(max_length=255, blank=False, default='', unique=False)
    email = models.EmailField(blank=True, default='', unique=False)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    groups = models.ManyToManyField('auth.Group', related_name="api_user_set", blank=True)

    user_permissions = models.ManyToManyField('auth.Permission', related_name="api_user_permissions_set", blank=True)



    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name or self.email.split('@')[0]

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'



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
    category = models.CharField(max_length=100, choices=PreferenceCategory.choices)
    name = models.CharField(max_length=100)
    rating = models.FloatField(choices=RATING_CHOICES)
    def __str__(self):
        return self.name


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
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='accessibility_preference')
    theme = models.IntegerField(choices=THEME_CHOICES, default=1)
    font_size = models.IntegerField(choices=FONT_CHOICES, default=1)

    def __str__(self):
        return f"Accessibility preference for {self.user.email}"


class PreferenceForm(forms.ModelForm):
    class Meta:
        model = Preference
        fields = ['category', 'name', 'rating']

    def clean_rating(self):
        rating = self.cleaned_data.get('rating')
        if rating not in [1, 2, 3]:
            raise forms.ValidationError("Rating must be between 1 and 3.")
        return rating


class Location(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name

