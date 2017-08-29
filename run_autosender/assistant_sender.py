#!/usr/bin/python
import os
import pytz
import smtplib
import django
import sys
sys.path.append("/home/khoaitaymocmam/Work/WebAPI/Topica/trm_assistant_bot/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trp_assistant_bot.settings")
django.setup()
from django.core.mail import send_mail

from mail_sender.models import *
from open_course.models import *
from template_editor.models import *
from datetime import datetime, timedelta 
# tao mail Nhiem vu tuan
today = datetime.now(pytz.utc)
def create_content(classroom, content_mail):
	content_mail = content_mail.replace("%class_code%", classroom.class_code)
	content_mail = content_mail.replace("%start_date%", classroom.start_date.strftime('%d/%m/%Y'))
	content_mail = content_mail.replace("%finish_date%", classroom.finish_date.strftime('%d/%m/%Y'))
	content_mail = content_mail.replace("%assistant_name%", classroom.assistant.name)
	content_mail = content_mail.replace("%week_post%", classroom.week_post)
	content_mail = content_mail.replace("%total_post%", classroom.total_post)
	start_week = today- timedelta(days=today.weekday())
	end_week = today + timedelta(days=6-today.weekday())
	content_mail = content_mail.replace("%start_week%", start_week.strftime("%d/%m/%Y"))
	content_mail = content_mail.replace("%end_week%", end_week.strftime("%d/%m/%Y"))
	content_mail = content_mail.replace("%left_days%", str(6-today.weekday()))
	content_mail = content_mail.encode("utf-8")
	return content_mail

def create_title(classroom, title_mail):
	start_week = today- timedelta(days=today.weekday())
	end_week = today + timedelta(days=6-today.weekday())
	title_mail = title_mail.replace("%start_week%", start_week.strftime("%d/%m/%Y"))
	title_mail = title_mail.replace("%end_week%", end_week.strftime("%d/%m/%Y"))
	title_mail = title_mail.encode("utf-8")
	return title_mail


def SendMail(classroom, mail):	
	content_mail = create_content(classroom, mail.context)
	title_mail = create_title(classroom, mail.title)
	send_mail(title_mail, content_mail, "topicatrm@gmail.com", [classroom.assistant.topica_email], fail_silently=False)

# check if today is friday, saturday, sunday
if 0 <= today.weekday() and today.weekday() <= 6:
	for mail in MailTemplate.objects.all():
		if "GVHD" in mail.title:
#			for classroom in Weekreport_Assistant.objects.all():
				#if (classroom.week_post < 3):
#				SendMail(classroom, mail)
			classroom = Weekreport_Assistant.objects.filter(class_code = "D123")[0]
			print type(classroom.week_post)
			if int(classroom.week_post) < 3:
				SendMail(classroom, mail)
