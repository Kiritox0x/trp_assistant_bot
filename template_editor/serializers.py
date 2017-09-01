from rest_framework import serializers
from template_editor.models import MailTemplate

class MailTemplateSerializer(serializers.ModelSerializer):
	class Meta:
		model = MailTemplate
		fields = ('id', 'name', 'title', 'context')