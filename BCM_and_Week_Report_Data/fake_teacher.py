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
	    'postman-token': "8d987e65-dff6-17d9-522c-3923d184f790"
	    }
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"][0]


# Get list of activatingi classes
now = datetime.now(pytz.utc)
now = now.strftime('%m/%d/%Y')
def get_activating_class():
	url = "http://elearning.hou2.topica.vn/api/apittm/api_gvcm_post_nxdh.php"
	
	querystring = {"start_date": now,"end_date": now}
	headers = {
	    'cache-control': "no-cache",
	    }
	
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"]

def get_account(string):
	for i in range (len(string)):
	    if string[i] == "@":
	        return string[0:i]

def create_week_teacher(teacher_report):
	if len(Weekreport_Teacher.objects.filter(class_code = teacher_report["class_code"])) == 0:
		classroom = Weekreport_Teacher.objects.create()
		parse_email = user_info(teacher_report["id_gvcm"])["email"]
		parse_account = get_account(parse_email)
		if len(Teacher.objects.filter(account = parse_account)) != 0:
			classroom.teacher = Teacher.objects.filter(account = parse_account)[0]
		classroom.class_code = teacher_report["class_code"] 
		classroom.start_date = datetime.strptime(teacher_report["start_course"], '%m-%d-%Y')
		classroom.start_date = classroom.start_date.replace(tzinfo=pytz.utc)
		classroom.finish_date = datetime.strptime(teacher_report["end_course"], '%m-%d-%Y')
		classroom.finish_date = classroom.finish_date.replace(tzinfo=pytz.UTC)
		classroom.week_post = teacher_report["week_post"]
		classroom.total_post = teacher_report["total_post"]
		classroom.save()
	else:
		classroom = Weekreport_Teacher.objects.filter(class_code = teacher_report["class_code"])
		classroom = classroom.get()
		classroom.class_code = teacher_report["class_code"]
		parse_email = user_info(teacher_report["id_gvcm"])["email"]
		parse_account = get_account(parse_email)
		if len(Teacher.objects.filter(account = parse_account)) != 0:
			classroom.teacher = Teacher.objects.filter(account = parse_account)[0]
		classroom.start_date = datetime.strptime(teacher_report["start_course"], '%m-%d-%Y')
		classroom.start_date = classroom.start_date.replace(tzinfo=pytz.utc)
		classroom.finish_date = datetime.strptime(teacher_report["end_course"], '%m-%d-%Y')
		classroom.finish_date = classroom.finish_date.replace(tzinfo=pytz.UTC)
		classroom.week_post = teacher_report["week_post"]
		classroom.total_post = teacher_report["total_post"]
		classroom.save()

database = get_activating_class()

for obj in database:
	create_week_teacher(obj)

print "Get Teacher Report Successfully"
