from django.http import JsonResponse
from .models import Location


def get_locations(request):
    locations = Location.objects.all()
    data = [
        {
            "name": loc.name,
            "address": loc.address,
            "latitude": loc.latitude,
            "longitude": loc.longitude,
        }
        for loc in locations
    ]
    return JsonResponse(data)


