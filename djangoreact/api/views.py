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
