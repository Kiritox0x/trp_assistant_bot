from __future__ import unicode_literals

from django.db import models

# Create your models here.
class FileUpload(models.Model):
	note = models.CharField(max_length=80)
	created = models.DateTimeField(auto_now_add=True)
	datafile = models.FileField()