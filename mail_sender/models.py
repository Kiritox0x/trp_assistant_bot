from __future__ import unicode_literals

from django.db import models
from open_course.models import * 
# Create your models here.

class Bcm_room(models.Model):
	subject_code = models.CharField(max_length = 30)
	subject_name = models.CharField(max_length = 30)
	start_date = models.DateTimeField(null = True, blank = True)
	finish_date = models.DateTimeField(null = True, blank = True)
	date_post_BCM = models.DateTimeField(null = True, blank = True)
	examination_date = models.DateTimeField(null = True, blank = True)
	teacher = models.ForeignKey(Teacher, on_delete = models.CASCADE, null = True, blank = True)
	assistant = models.ForeignKey(Assistant, on_delete = models.CASCADE, null = True, blank = True)
	supporter = models.ForeignKey(Supporter, on_delete = models.CASCADE, null = True, blank = True)
	class_link = models.TextField(blank = False)
	document_link = models.TextField()
	
	class Meta:
		ordering = ("subject_name",)

	def __unicode__(self):
		return self.subject_name 

class Weekreport_Teacher(models.Model):
	class_code = models.CharField(max_length = 30)
	start_date = models.DateTimeField(null=True, blank=True)
	finish_date = models.DateTimeField(null=True, blank=True)
	week_post = models.CharField(max_length = 5)
	total_post = models.CharField(max_length = 5)
	teacher = models.ForeignKey(Teacher, on_delete = models.CASCADE, null=True, blank=True)
	
	class Meta:
		ordering = ('class_code',)
	
	def __unicode__(self):
		return self.class_code
	
class Weekreport_Assistant(models.Model):
	class_code = models.CharField(max_length = 30)
	start_date = models.DateTimeField(null=True, blank = True)
	finish_date = models.DateTimeField(null=True, blank = True)
	week_post = models.CharField(max_length = 5)
	total_post = models.CharField(max_length = 5)
	assistant = models.ForeignKey(Assistant, on_delete = models.CASCADE, null=True, blank=True)
	
	class Meta:
		ordering = ('class_code',)
	
	def __unicode__(self):
		return self.class_code
