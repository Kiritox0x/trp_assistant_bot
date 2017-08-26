from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from template_editor.models import MailTemplate
from template_editor.serializers import MailTemplateSerializer

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
		return Response(serializer.erros, status = status.HTTP_400_BAD_REQUEST)

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


