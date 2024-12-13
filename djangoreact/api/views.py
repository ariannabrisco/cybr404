from django.http import JsonResponse
from rest_framework import viewsets
from .models import Location
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"

def get_locations(request):
    locations = Location.objects.all()
    data = {
        loc.name:{
            "name": loc.name,
            "address": loc.address,
            "latitude": loc.latitude,
            "longitude": loc.longitude,
        }
        for loc in locations
    }
    return JsonResponse(data)

def get_users(request):
    users = User.objects.all()
    data = {
        user.username:{
            "username": user.username,
            "password": user.password,
            "email": user.email,
        }
        for user in users
    }
    return JsonResponse(data)
