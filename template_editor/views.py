from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from template_editor.models import MailTemplate
from template_editor.serializers import MailTemplateSerializer
from template_editor.mails import EmailSender
from open_course.models import Classroom

class MailTemplateList(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request, format=None):
		mails = MailTemplate.objects.all()
		serializers = MailTemplateSerializer(mails, many=True)
		return Response(serializers.data)

	def post(self, request, format=None):
		serializer = MailTemplateSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data,
				status = status.HTTP_201_CREATED)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class MailTemplateDetail(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get_instance(self, pk):
		try:
			return MailTemplate.objects.get(pk = pk)
		except MailTemplate.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		mail = self.get_instance(pk)
		serializer = MailTemplateSerializer(mail)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		mail = self.get_instance(pk)
		serializer = MailTemplateSerializer(mail, data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		mail = self.get_instance(pk)
		mail.delete()
		return Response(status = status.HTTP_204_NO_CONTENT)

class MailSender(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get_classroom(self, pk):
		try:
			return Classroom.objects.get(pk = pk)
		except Classroom.DoesNotExist:
			raise Http404

	def get_template(self, pk):
		try:
			return MailTemplate.objects.get(pk = pk)
		except MailTemplate.DoesNotExist:
			raise Http404

	def post(self, request, format = None):
		if ( 'class_id' not in request.data ) or ( 'template_id' not in request.data ):
			return Response("Params class_id and template_id are required", status = status.HTTP_400_BAD_REQUEST)
		class_id = request.data['class_id']
		template_id = request.data['template_id']
		if EmailSender.invitation_letter(class_id, template_id):
			return JsonResponse({'status' : 'Mail was sended successfull'}, status=200)
		else:
			return JsonResponse({'status' : 'Unknown errors happened'}, status=status.HTTP_400_BAD_REQUEST)

class MailSenderCustom(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get_classroom(self, pk):
		try:
			return Classroom.objects.get(pk = pk)
		except Classroom.DoesNotExist:
			raise Http404

	def post(self, request, format = None):
		if ( 'class_id' not in request.data ) or ( 'template' not in request.data ):
			return Response("Params class_id and template are required", status = status.HTTP_400_BAD_REQUEST)
		class_id = request.data['class_id']
		template = request.data['template']
		if EmailSender.invitation_letter(class_id, template, Customize=True):
			return JsonResponse({'status' : 'Mail was sended successfull'}, status=200)
		else:
			return JsonResponse({'status' : 'Unknown errors happened'}, status=status.HTTP_400_BAD_REQUEST)
