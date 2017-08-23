import os
import pandas as pd
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trp_assistant_bot.settings')
import django
django.setup()
from open_course.models import Teacher, Assistant

class ExcelParser:
	@classmethod
	def create_teacher(self, person):
		if len(Teacher.objects.filter(topica_email=person[3]))==0:
			teacher = Teacher.objects.create()
			teacher.code = person[0]
			teacher.name = person[1]
			teacher.account = person[2]
			teacher.topica_email = person[3]
			teacher.personal_email = person[4]
			teacher.phone_number = person[5]
			teacher.status = person[6]
			teacher.location = person[8]
			teacher.note = person[10]
			teacher.save()
		else:
			teachers = Teacher.objects.filter(topica_email=person[3])
			teacher = teachers[:1].get()
			teacher.code = person[0]
			teacher.name = person[1]
			teacher.account = person[2]
			teacher.topica_email = person[3]
			teacher.personal_email = person[4]
			teacher.phone_number = person[5]
			teacher.status = person[6]
			teacher.location = person[8]
			teacher.note = person[10]
			teacher.save()

	@classmethod
	def create_assistant(self, person):
		if len(Assistant.objects.filter(topica_email=person[3]))==0:
			assistant = Assistant.objects.create()
			assistant.code = person[0]
			assistant.name = person[1]
			assistant.account = person[2]
			assistant.topica_email = person[3]
			assistant.personal_email = person[4]
			assistant.phone_number = person[5]
			assistant.status = person[6]
			assistant.location = person[8]
			assistant.note = person[10]
			assistant.save()
		else:
			assistants = Assistant.objects.filter(topica_email=person[3])
			assistant = assistants[:1].get()
			assistant.code = person[0]
			assistant.name = person[1]
			assistant.account = person[2]
			assistant.topica_email = person[3]
			assistant.personal_email = person[4]
			assistant.phone_number = person[5]
			assistant.status = person[6]
			assistant.location = person[8]
			assistant.note = person[10]
			assistant.save()

	@classmethod
	def load_data(self,filename):
		data = pd.read_excel(filename)
		num_instance = len(data)-1
		for i in range(1, num_instance):
			person = data.iloc[i]
			if not (person[3].endswith('@topica.edu.vn') or person[3].endswith('@neu-edutop.edu.vn')):
				continue
			if person[7] == 'GVCM':
				self.create_teacher(person)
			elif person[7] == 'GVHD':
				self.create_assistant(person)

if __name__ == '__main__':
	# print 'Start generating data from scrath'
	ExcelParser.load_data('data.xlsx')