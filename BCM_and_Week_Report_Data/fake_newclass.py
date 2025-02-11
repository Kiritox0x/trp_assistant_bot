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
	    }
	
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = json.loads(response.text)
	return response["data"]

def get_account(string):
	for i in range (len(string)):
	    if string[i] == "@":
	        return string[0:i]


def create_BCM(newclass_report):
	if len(Bcm_room.objects.filter(subject_code = newclass_report["subject_code"])) == 0:
		classroom = Bcm_room.objects.create()
		
		# check if subject name exist
		if newclass_report["subject_name"] != None:
			classroom.subject_name = newclass_report["subject_name"]
		else:
			classroom.subject_name = "No subject name"

		# check if teacher exist in open_course database, if not exist return null
		if newclass_report["id_gvcm"] != None:
			teacher = user_info(newclass_report["id_gvcm"])
			teacher_email = teacher["email"]
			teacher_account = get_account(teacher_email)
			if len(Teacher.objects.filter(account = teacher_account)) != 0:
			    classroom.teacher = Teacher.objects.filter(account = teacher_account)[0]


		# check if assistant exist in open_course database, if not exist return null
		if newclass_report["id_gvhd"] != None:
			assistant = user_info(newclass_report["id_gvhd"]) 
			assistant_email = assistant["email"]
			assistant_account = get_account(assistant_email)
			if len(Assistant.objects.filter(account = assistant_account)) !=0:
				classroom.assistant  = Assistant.objects.filter(account = assistant_account)[0]

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
		classroom.save()
	
	else:
		classroom = Bcm_room.objects.filter(subject_code = newclass_report["subject_code"])
		classroom = classroom.get()
		if newclass_report["subject_name"] != None:
			classroom.subject_name = newclass_report["subject_name"]
		else:
			classroom.subject_name = "No subject name"
		
		# check if teacher exist in open_course database, if not exist return null
		if newclass_report["id_gvcm"] != None:
			teacher = user_info(newclass_report["id_gvcm"])
			teacher_email = teacher["email"]
			teacher_account = get_account(teacher_email)
			if len(Teacher.objects.filter(account = teacher_account)) != 0:
			    classroom.teacher = Teacher.objects.filter(account = teacher_account)[0]

		# check if assistant exist in open_course database, if not exist return null 
		if newclass_report["id_gvhd"] != None:
			assistant = user_info(newclass_report["id_gvhd"]) 
			assistant_email = assistant["email"]
			assistant_account = get_account(assistant_email)
			if len(Assistant.objects.filter(account = assistant_account)) !=0:
				classroom.assistant  = Assistant.objects.filter(account = assistant_account)[0]
		
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

	
