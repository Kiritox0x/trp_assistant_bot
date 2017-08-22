from __future__ import unicode_literals

from django.db import models

# Create your models here.
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from django.core.validators import RegexValidator


# for storing code later use
LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

PHONE_REGEX = RegexValidator(regex=r'^(\+[1-9])|(0){1}[0-9]{5,11}$', message="Phone number must be entered in the format: '+84988888888'. Up to 15 digits allowed.")
EMAIL_TOPICA_REGEX = RegexValidator(regex=r'(^[a-zA-Z0-9_.+-]+@topica.edu.vn$)|(^[a-zA-Z0-9_.+-]+@neu-edutop.edu.vn$)', message="Email must be entered in the format: 'linhlnm@topica.edu.vn' or 'linhlnm@neu-edutop.edu.vn")

class Teacher(models.Model):
	code = models.CharField(max_length = 8)
	name = models.CharField(max_length = 40)	
	topica_email = models.CharField(validators=[EMAIL_TOPICA_REGEX], max_length=50, unique=True, default="sample@topica.edu.vn")
	personal_email = models.EmailField()
	phone_number = models.CharField(validators=[PHONE_REGEX], max_length=15)
	status = models.CharField(max_length = 40, blank=True)
	location = models.CharField(max_length = 20, blank=True)
	account = models.CharField(max_length = 40)
	date_of_birth = models.DateField(default="1990-01-01")
	note = models.TextField(blank = True)
	supporter = models.TextField(max_length = 20, blank=True)

	def __unicode__(self):
		return self.name

class Assistant(models.Model):
	code = models.CharField(max_length = 8)
	name = models.CharField(max_length = 40)
	topica_email = models.CharField(validators=[EMAIL_TOPICA_REGEX], max_length=50, unique=True, default="sample@topica.edu.vn")
	personal_email = models.EmailField()
	phone_number = models.CharField(validators=[PHONE_REGEX], max_length=15)
	status = models.CharField(max_length = 40, blank=True)
	location = models.CharField(max_length = 20, blank=True)
	account = models.CharField(max_length = 40)
	date_of_birth = models.DateField(default="1990-01-01")
	note = models.TextField(blank = True)
	supporter = models.TextField(max_length = 20, blank=True)

	def __unicode__(self):
		return self.name

class Supporter(models.Model):
	name = models.TextField(max_length=40)
	email = models.EmailField()

	def __unicode__(self):
		return self.name

class Classroom(models.Model):
	# owner = models.ForeignKey('auth.User', related_name='classrooms', on_delete=models.CASCADE)

	created = models.DateTimeField(auto_now_add=True)
	school = models.CharField(max_length=10)
	subject = models.CharField(max_length= 20)
	subject_code = models.CharField(max_length = 20)
	class_name = models.TextField(blank = False)
	class_subject = models.TextField(blank = False)
	estimated_students = models.PositiveIntegerField()
	start_date = models.DateTimeField()
	finish_date = models.DateTimeField()
	examination_date = models.DateTimeField()
	teacher = models.ForeignKey(Teacher, on_delete = models.CASCADE, to_field='topica_email')
	assistant = models.ForeignKey(Assistant, on_delete = models.CASCADE, to_field='topica_email')
	change_note = models.TextField(blank = True)
	supporter = models.ForeignKey(Supporter, on_delete = models.CASCADE)

	class Meta:
		ordering = ('created',)

	def __unicode__(self):
		return self.subject_code

