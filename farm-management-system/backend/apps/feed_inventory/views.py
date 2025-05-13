from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Expense
from .serializers import ExpenseSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    """CRUD operations for Expense via a ViewSet"""
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ExpenseListCreateView(ListCreateAPIView):
    """List all expenses or create a new expense"""
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class ExpenseDetailView(RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a specific expense record"""
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer