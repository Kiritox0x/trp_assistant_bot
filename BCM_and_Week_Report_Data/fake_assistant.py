#!/usr/bin/python


import requests
import json 
import os
import sys
from datetime import *
import pytz

import django
sys.path.append("/home/khoaitaymocmam/Work/WebAPI/Topica/trm_assistant_bot/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trp_assistant_bot.settings")
django.setup()
from mail_sender.models import *


def user_info(userId):
	url = "http://elearning.hou2.topica.vn/api/apittm/api_user_info.php"
	querystring = {"userId":userId}
	headers = {
	    'cache-control': "no-cache",
	    }
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"][0]


# Get list of activating classes
def get_activating_class(start_date, end_date):
	url = "http://elearning.hou2.topica.vn/api/apittm/api_gvhd_post_case_study.php"	
	querystring = {"start_date": start_date, "end_date": end_date}
	headers = {
	    'cache-control': "no-cache",
	    'postman-token': "5d00b514-9344-1c8d-275e-ebdb3ceb1b6a" 
	    }
	
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"]

def get_account(string):
	for i in range (len(string)):
	    if string[i] == "@":
	        return string[0:i]


def create_week_assistant(assistant_report):
	if len(Weekreport_Assistant.objects.filter(class_code = assistant_report["class_code"])) == 0:
		classroom = Weekreport_Assistant.objects.create()
		parse_email = user_info(assistant_report["id_gvhd"])["email"]
		parse_account = get_account(parse_email)
		#check if assistant exist in database
		if len(Assistant.objects.filter(account = parse_account)) != 0:
			classroom.assistant = Assistant.objects.filter(account = parse_account)[0]
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
		#check if assistant exist in database
		parse_email = user_info(teacher_report["id_gvhd"])["email"]
		parse_account = get_account(parse_email)

		if len(Assistant.objects.filter(account = parse_account)) != 0:
			classroom.assistant = Assistant.objects.filter(account = parse_account)[0]
		classroom.class_code = assistant_report["class_code"]
		classroom.start_date = datetime.strptime(assistant_report["start_course"], '%m-%d-%Y')
		classroom.start_date = classroom.start_date.replace(tzinfo=pytz.utc)
		classroom.finish_date = datetime.strptime(assistant_report["end_course"], '%m-%d-%Y')
		classroom.finish_date = classroom.finish_date.replace(tzinfo=pytz.UTC)
		classroom.week_post = assistant_report["week_post"]
		classroom.total_post = assistant_report["total_post"]
		classroom.save()

now = datetime.now(pytz.utc)
now = now.strftime('%m/%d/%Y')
database = get_activating_class(now,now)

for obj in database:
	create_week_assistant(obj)
print "Get Assistant Report Successfully"

	
