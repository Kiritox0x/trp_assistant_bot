from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from open_course.models import Classroom, Teacher, Assistant
from open_course.serializers import ClassroomSerializer, UserSerializer, TeacherSerializer, AssistantSerializer
from open_course.permissions import IsOwnerOrReadOnly
# Create your views here.

class TeacherList(APIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get(self, request, format=None):
		teachers = Teacher.objects.all()
		serializer = TeacherSerializer(teachers, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = TeacherSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data,
				status = status.HTTP_201_CREATED)
		return Response(serializer.erros, status = status.HTTP_400_BAD_REQUEST)

class TeacherDetail(APIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_instance(self, pk):
		try:
			return Teacher.objects.get(pk = pk)
		except Teacher.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		teacher = self.get_instance(pk)
		serializer = TeacherSerializer(teacher)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		teacher = self.get_instance(pk)
		serializer = TeacherSerializer(teacher, data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		teacher = self.get_instance(pk)
		teacher.delete()
		return Response(status = status.HTTP_204_NO_CONTENT)

class AssistantList(APIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get(self, request, format=None):
		assistants = Assistant.objects.all()
		serializer = AssistantSerializer(assistants, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = AssistantSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data,
				status = status.HTTP_201_CREATED)
		return Response(serializer.erros, status = status.HTTP_400_BAD_REQUEST)

class AssistantDetail(APIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_instance(self, pk):
		try:
			return Assistant.objects.get(pk = pk)
		except Assistant.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		assistant = self.get_instance(pk)
		serializer = AssistantSerializer(assistant)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		assistant = self.get_instance(pk)
		serializer = AssistantSerializer(assistant, data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		assistant = self.get_instance(pk)
		assistant.delete()
		return Response(status = status.HTTP_204_NO_CONTENT)

class ClassroomList(APIView):

	# permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get(self, request, format=None):
		classrooms = Classroom.objects.all()
		serializer = ClassroomSerializer(classrooms, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = ClassroomSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, 
				status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
	
	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)


class ClassroomDetail(APIView):

	# permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_instance(self, pk):
		try:
			return Classroom.objects.get(pk=pk)
		except Classroom.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		classroom = self.get_instance(pk)
		serializer = ClassroomSerializer(classroom)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		classroom = self.get_instance(pk)
		serializer = ClassroomSerializer(classroom, data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		classroom = self.get_instance(pk)
		classroom.delete()
		return Response(status = status.HTTP_204_NO_CONTENT)



class UserList(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

