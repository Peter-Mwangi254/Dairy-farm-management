from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Deworming, Vaccination, Cow, Steaming
from .serializers import (
    CowSerializer,
    DewormingSerializer,
    VaccinationSerializer,
    SteamingSerializer,
)


class CowListCreateView(ListCreateAPIView):
    """List all cows or create a new cow"""
    queryset = Cow.objects.all()
    serializer_class = CowSerializer

class CowDetailView(RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a specific cow"""
    queryset = Cow.objects.all()
    serializer_class = CowSerializer

class DewormingViewSet(viewsets.ModelViewSet):
    """CRUD operations for deworming records"""
    queryset = Deworming.objects.all()
    serializer_class = DewormingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class VaccinationViewSet(viewsets.ModelViewSet):
    """CRUD operations for vaccination records"""
    queryset = Vaccination.objects.all()
    serializer_class = VaccinationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SteamingViewSet(viewsets.ModelViewSet):
    """CRUD operations for steaming records"""
    queryset = Steaming.objects.all()
    serializer_class = SteamingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DewormingListCreateView(ListCreateAPIView):
    """List and create deworming records via generic views"""
    queryset = Deworming.objects.all()
    serializer_class = DewormingSerializer


class VaccinationListCreateView(ListCreateAPIView):
    """List and create vaccination records via generic views"""
    queryset = Vaccination.objects.all()
    serializer_class = VaccinationSerializer


class SteamingListCreateView(ListCreateAPIView):
    """List and create steaming records via generic views"""
    queryset = Steaming.objects.all()
    serializer_class = SteamingSerializer