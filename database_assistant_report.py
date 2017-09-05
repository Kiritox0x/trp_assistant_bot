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


# Get list of activating classes
now = datetime.now(pytz.utc)
now = now.strftime('%m/%d/%Y')
def get_activating_class():
	url = "http://elearning.hou2.topica.vn/api/apittm/api_gvhd_post_case_study.php"	
	querystring = {"start_date": now,"end_date": now}
	headers = {
	    'cache-control': "no-cache",
	    'postman-token': "5d00b514-9344-1c8d-275e-ebdb3ceb1b6a" 
	    }
	
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"]


def create_week_assistant(assistant_report):
	if len(Weekreport_Assistant.objects.filter(class_code = assistant_report["class_code"])) == 0:
		classroom = Weekreport_Assistant.objects.create()
		parse_email = user_info(assistant_report["id_gvhd"])["email"]
		if len(Assistant.objects.filter(topica_email = parse_email)) != 0:
			classroom.assistant = Assistant.objects.filter(topica_email = parse_email)[0]
		else: 
			classroom.delete()
		classroom.class_code = assistant_report["class_code"] 
		classroom.start_date = datetime.strptime(assistant_report["start_course"], '%m-%d-%Y')
		classroom.start_date = classroom.start_date.replace(tzinfo=pytz.utc)
		classroom.finish_date = datetime.strptime(assistant_report["end_course"], '%m-%d-%Y')
		classroom.finish_date = classroom.finish_date.replace(tzinfo=pytz.UTC)
		classroom.week_post = assistant_report["week_post"]
		classroom.total_post = assistant_report["total_post"]
		classroom.save()
	else:
		classroom = Weekreport_Assistant.objects.filter(class_code = assistant_report["class_code"])
		classroom = classroom.get()
		classroom.class_code = assistant_report["class_code"]
		classroom.start_date = datetime.strptime(assistant_report["start_course"], '%m-%d-%Y')
		classroom.start_date = classroom.start_date.replace(tzinfo=pytz.utc)
		classroom.finish_date = datetime.strptime(assistant_report["end_course"], '%m-%d-%Y')
		classroom.finish_date = classroom.finish_date.replace(tzinfo=pytz.UTC)
		classroom.week_post = assistant_report["week_post"]
		classroom.total_post = assistant_report["total_post"]
		classroom.save()
		print "thang"

database = get_activating_class()

for obj in database:
	create_week_assistant(obj)
print "Get Assistant Report Successfully"

	
