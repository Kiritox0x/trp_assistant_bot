from django.shortcuts import render
# Create your views here.

from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework import status
from database_loader.models import FileUpload
from database_loader.serializers import FileUploadSerializer

class FileUploadView(APIView):
    def post(self, request, format=None):
    	serializer = FileUploadSerializer(data = request.data)
    	if serializer.is_valid():
    		serializer.save()
    		return Response("Upload successful", status = status.HTTP_201_CREATED)
    	return Response(serializer.erros, status = status.HTTP_400_BAD_REQUEST)