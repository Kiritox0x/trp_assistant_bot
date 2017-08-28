#!/usr/bin/python


import requests
import json 
import os

from datetime import *
import pytz

import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trp_assistant_bot.settings")
django.setup()
from mail_sender.models import *


def user_info(userId):
	url = "http://elearning.hou2.topica.vn/api/apittm/api_user_info.php"
	querystring = {"userId":userId}
	headers = {
	    'cache-control': "no-cache",
	    'postman-token': "8d987e65-dff6-17d9-522c-3923d184f790"
	    }
	print querystring
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"][0]

# Get list of activatingi classes
now = datetime.now(pytz.utc)
now = now.strftime('%m/%d/%Y')
def get_activating_class():
	url = "http://elearning.hou2.topica.vn/api/apittm/api_post_bcm.php"
	
	querystring = {"start_date": now,"end_date": now}
	headers = {
	    'cache-control': "no-cache",
	    'postman-token': "3ff51978-7d9a-71c1-3c66-7821420b4c1d"
	    }
	
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"]


def create_BCM(newclass_report):
	teacher_email = user_info(newclass_report["id_gvcm"])["email"]
	if len(Bcm_room.objects.filter(subject_code = newclass_report["subject_code"])) == 0:
		classroom = Bcm_room.objects.create()

		# check if teacher and assistant exist in open_course database
		if len(Teacher.objects.filter(topica_email = teacher_email)) != 0:
			classroom.teacher = Teacher.objects.filter(topica_email = teacher_email)[0]
		else: 
			classroom.delete()
			return
		classroom.subject_name = newclass_report["subject_name"]
		classroom.subject_code = newclass_report["subject_code"] 
		classroom.class_link = newclass_report["class_link"]
		classroom.document_link = newclass_report["document_link"]

		# set_time
		classroom.start_date = datetime.strptime(newclass_report["start_course"], '%m-%d-%Y')
		classroom.start_date = classroom.start_date.replace(tzinfo=pytz.utc)
		classroom.finish_date = datetime.strptime(newclass_report["end_course"], '%m-%d-%Y')
		classroom.finish_date = classroom.finish_date.replace(tzinfo=pytz.UTC)
		classroom.examination_date = datetime.strptime(newclass_report["date_exam"] , '%m-%d-%Y')
		classroom.examination_date = classroom.examination_date.replace(tzinfo = pytz.UTC)
		if newclass_report["date_post_bcm"] != "NF":
			classroom.date_post_BCM = datetime.strptime(newclass_report["date_post_bcm"], '%d-%m-%Y')
			classroom.date_post_BCM = classroom.date_post_BCM.replace(tzinfo = pytz.UTC)
		# check if class have assistant
		if newclass_report["id_gvhd"] != None:
			assistant_email = user_info(newclass_report["id_gvhd"])["email"]
			if len(Assistant.objects.filter(topica_email = assistant_email)) !=0:
				classroom.assistant  = Assistant.objects.filter(topica_email = assistant_email)[0]
		classroom.save()
	
	else:
		classroom = Bcm_room.objects.filter(subject_code = newclass_report["subject_code"])
		classroom = classroom.get()
		classroom.subject_name = newclass_report["subject_name"]
		classroom.subject_code = newclass_report["subject_code"] 
		classroom.class_link = newclass_report["class_link"]
		classroom.document = newclass_report["document_link"]
		# set_time
		classroom.start_date = datetime.strptime(newclass_report["start_course"], '%m-%d-%Y')
		classroom.start_date = classroom.start_date.replace(tzinfo=pytz.utc)
		classroom.finish_date = datetime.strptime(newclass_report["end_course"], '%m-%d-%Y')
		classroom.finish_date = classroom.finish_date.replace(tzinfo=pytz.UTC)
		classroom.examination_date = datetime.strptime(newclass_report["date_exam"] , '%m-%d-%Y')
		classroom.examination_date = classroom.examination_date.replace(tzinfo = pytz.UTC)
		if newclass_report["date_post_bcm"] != "NF":
			classroom.date_post_BCM = datetime.strptime(newclass_report["date_post_bcm"], '%d-%m-%Y')
			classroom.date_post_BCM = classroom.date_post_BCM.replace(tzinfo = pytz.UTC)
		classroom.save()

database = get_activating_class()

for obj in database:
	create_BCM(obj)
print "Get New Class Successfully"

	
