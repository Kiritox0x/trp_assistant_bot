from django.shortcuts import render

# Create your views here.
#from django.http import HttpResponse, JsonResponse
#from django.views.decorators.csrf import csrf_exempt
#from rest_framework.renderers import JSONRenderer
#from rest_framework.parsers import JSONParser
#from mail_sender.models import * 
#from mail_sender.serializers import *
#
#def Bcm_room_list(request):
#    if request.method == 'GET':
#        bcm_rooms = Bcm_room.objects.all()
#        serializer = Bcm_roomSerializer(bcm_rooms, many=True)
#    	return JsonResponse(serializer.data, safe = False)
#
#    elif request.method == 'POST':
#        data = JSONParser().parse(request)
#        serializer = Bcm_roomSerializer(data = data)
#        if serializers.is_valid():
#            serializer.save()
#            return JsonResponse(serializer.data, status =201)
#        return JsonResponse(serializer.errors, status=400)
#
#def Bcm_room_detail(request,pk):
#    try :
#        bcm_room = Bcm_room.objects.get(pk=pk)
#    except Bcm_room.DoesNotExist:
#        return HttpResponse(status=404)
#
#    if request.method == 'GET':
#        serializer = Bcm_roomSerializer(bcm_room)
#        return JsonResponse(serializer.data)
#
#    elif request.method == 'PUT':
#		data = JSONParser().parse(request)
#		serializer = Bcm_roomSerializer(bcm_room, data=data)
#		if serializer.is_valid():
#			serializer.save()
#			return JsonResponse(serializers.data)
#		return JsonResponse(serializer.errors, status=400)
#
##	elif request.method == 'DELETE':
##		bcm_room.delete()
##		return HttpResponse(status=204)
#
#from rest_framework import status
#from rest_framework.decorators import api_view
#from rest_framework.response import Response
#from mail_sender.models import model import *
#from mail_sender.serializers import *
#
#@api_view(['GET', 'POST'])
#def Bcm_room_list(request):
#class
#
#
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import status, generics, permissions
from mail_sender.permissions import IsOwnerOrReadOnly
from mail_sender.models import Bcm_room, Weekreport_Teacher, Weekreport_Assistant
from mail_sender.serializers import Bcm_roomSerializer, Weekreport_TeacherSerializer, Weekreport_AssistantSerializer
from django.contrib.auth.models import User


class Bcm_roomList(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, format = None):
		bcm_rooms = Bcm_room.objects.all()
		serializer = Bcm_roomSerializer(bcm_rooms, many = True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = Bcm_roomSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Bcm_roomDetail(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get_object(self, pk):
		try:
			return Bcm_room.objects.get(pk=pk)
		except Bcm_room.DoesNotExist:
			raise Http404
	
	def get(self, request, pk, format=None):
		bcm_room = self.get_object(pk)
		serializer = Bcm_roomSerializer(bcm_room)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		bcm_room = self.get_object(pk)
		serializer = Bcm_roomSerializer(bcm_room, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		bcm_room = self.get_object(pk)
		bcm_room.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class Weekreport_TeacherList(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, format = None):
          classrooms = Weekreport_Teacher.objects.all()
          serializer = Weekreport_TeacherSerializer(classrooms, many = True)
          return Response(serializer.data)
  
	def post(self, request, format=None):
	    serializer = Weekreport_TeacherSerializer(data = request.data)
	    if serializer.is_valid():
	        serializer.save()
	        return Response(serializer.data, status=status.HTTP_201_CREATED)
	    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Weekreport_TeacherDetail(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get_object(self, pk):
		try:
		    return Weekreport_Teacher.objects.get(pk=pk)
		except Weekreport_Teacher.DoesNotExist:
		    raise Http404
	
	def get(self, request, pk, format=None):
		classroom = self.get_object(pk)
		serializer = Weekreport_TeacherSerializer(classroom)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		classroom = self.get_object(pk)
		serializer = Weekreport_TeacherSerializer(bcm_room, data=request.data)
		if serializer.is_valid():
		    serializer.save()
		    return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
		classroom = self.get_object(pk)
		classroom.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	
class Weekreport_AssistantList(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	
	def get(self, request, format = None):
	      classrooms = Weekreport_Assistant.objects.all()
	      serializer = Weekreport_AssistantSerializer(classrooms, many = True)
	      return Response(serializer.data)
	
	def post(self, request, format=None):
	    serializer = Weekreport_AssistantSerializer(data = request.data)
	    if serializer.is_valid():
	        serializer.save()
	        return Response(serializer.data, status=status.HTTP_201_CREATED)
	    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Weekreport_AssistantDetail(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	
	def get_object(self, pk):
	    try:
	        return Weekreport_Assistant.objects.get(pk=pk)
	    except Weekreport_Assistant.DoesNotExist:
	        raise Http404
	
	def get(self, request, pk, format=None):
	    classroom = self.get_object(pk)
	    serializer = Weekreport_AssistantSerializer(classroom)
	    return Response(serializer.data)
	
	def put(self, request, pk, format=None):
	    classroom = self.get_object(pk)
	    serializer = Weekreport_AssistantSerializer(bcm_room, data=request.data)
	    if serializer.is_valid():
	        serializer.save()
	        return Response(serializer.data)
	    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None):
	    classroom = self.get_object(pk)
	    classroom.delete()
	    return Response(status=status.HTTP_204_NO_CONTENT)


#class UserList(generics.ListAPIView):
#    permission_classes = (permissions.IsAuthenticated,permissions.IsAdminUser,)
#
#    queryset = User.objects.all()
#    serializer_class = UserSerializer
#
#
#class UserDetail(generics.RetrieveAPIView):
#    permission_classes = (permissions.IsAuthenticated,permissions.IsAdminUser,)
#
#    queryset = User.objects.all()
#    serializer_class = UserSerializer

