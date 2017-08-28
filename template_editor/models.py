from __future__ import unicode_literals

from django.db import models

# Create your models here.
class MailTemplate(models.Model):
	name = models.CharField(max_length = 40, unique=True)
	title = models.CharField(max_length = 80)
	context = models.TextField()

	def __unicode__(self):
		return self.name