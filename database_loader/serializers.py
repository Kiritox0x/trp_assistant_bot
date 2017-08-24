from rest_framework import serializers
from database_loader.models import FileUpload

class FileUploadSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = FileUpload
		read_only_fields = ('note','created', 'datafile')