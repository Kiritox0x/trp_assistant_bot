#!/usr/bin/python
import pytz
import smtplib
import django

import sys
import os
sys.path.append("/home/khoaitaymocmam/Work/WebAPI/Topica/trm_assistant_bot/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trp_assistant_bot.settings")
django.setup()
from django.core.mail import send_mail

from mail_sender.models import *
from open_course.models import *
from template_editor.models import *
from datetime import datetime, timedelta 

today = datetime.now(pytz.utc)

def create_content(classroom, content_mail):
	content_mail = content_mail.replace("%subject_name%", classroom.subject_name)
	content_mail = content_mail.replace("%subject_code%", classroom.subject_code)
	content_mail = content_mail.replace("%start_date%", classroom.start_date.strftime('%d/%m/%Y'))
	content_mail = content_mail.replace("%finish_date%", classroom.finish_date.strftime('%d/%m/%Y'))
	content_mail = content_mail.replace("%examination_date%", classroom.examination_date.strftime('%d/%m/%Y'))
	if (classroom.teacher != None):
		content_mail = content_mail.replace("%teacher_name%", classroom.teacher.name)
	if (classroom.assistant != None):
		content_mail = content_mail.replace("%assistant_name%", classroom.assistant.name)
	#content_mail = content_mail.replace("%supporter_name%", classroom.supporter.name)
	#content_mail = content_mail.replace("%supporter_email%", classroom.supporter.email)
	content_mail = content_mail.replace("%class_link%", classroom.class_link)
	content_mail = content_mail.replace("%document_link%", classroom.document_link)
	content_mail = content_mail.replace("%deadline_BCM%", (classroom.start_date - timedelta(days=4)).strftime('%d/%m/%Y'))
	content_mail = content_mail.encode("utf-8")
	return content_mail

def create_title(classroom, title_mail):
	title_mail = title_mail.replace("%start_date%", classroom.start_date.strftime('%d/%m/%Y'))
	title_mail = title_mail.encode("utf-8")
	return title_mail


def SendMail(classroom, mail):	
	content_mail = create_content(classroom, mail.context)
	title_mail = create_title(classroom, mail.title)
	send_mail(title_mail, content_mail, "topicatrm@gmail.com", [classroom.teacher.topica_email,classroom.assistant.topica_email], fail_silently=False)


for mail in MailTemplate.objects.all():
	if "BCM" in mail.title:
		for classroom in Bcm_room.objects.all():
			dif_days = (today.date() - classroom.start_date.date()).days
			if dif_days == -6 or dif_days == -4 or dif_days == -2: 	 
				BCM_flag = classroom.date_post_BCM.strftime('%d-%m-%Y')
				if "1970" not in BCM_flag and BCM_flag != "":
					SendMail(classroom,mail)
