import os
import pandas as pd
import numpy as np
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trp_assistant_bot.settings')
import django
from django.core import exceptions
django.setup()
from open_course.models import Teacher, Assistant, Classroom

class TAParser:
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
			return True
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
			return False

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
			return True
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
			return False

	@classmethod
	def load_data(self,filename):
		try:
			data = pd.read_excel(filename)
		except Exception:
			raise Exception("File " + filename + " does not exist or damaged")
		else:
			num_instance = len(data)-1
			num_error = 0
			num_teacher_created = 0
			num_teacher_updated = 0
			num_assistant_created = 0
			num_assistant_updated = 0
			for i in range(1, num_instance):
				if(i%(num_instance/10)==0):
					print('Loading ' + str(i/(num_instance/10)*10) + '%')
				person = data.iloc[i]
				if not (person[3].endswith('@topica.edu.vn') or person[3].endswith('@neu-edutop.edu.vn')):
					num_error+=1
					continue
				if person[7] == 'GVCM':
					if(self.create_teacher(person)):
						num_teacher_created+=1
					else:
						num_teacher_updated+=1
				elif person[7] == 'GVHD':
					if(self.create_assistant(person)):
						num_assistant_created+=1
					else:
						num_assistant_updated+=1
			print("Data generation completed")
			return (num_teacher_created, num_teacher_updated, num_assistant_created, num_assistant_updated, num_error)

class ClassroomParser:
	@classmethod
	def create_classroom(self, data):
		is_new = True
		try:
			classroom = Classroom.objects.get(class_subject = data[5])
		except exceptions.ObjectDoesNotExist:
			classroom = Classroom.objects.create()
		else:
			is_new = False

		classroom.school = data[0]
		classroom.subject = data[1]
		classroom.subject_code = data[2]
		classroom.class_name = data[4]
		classroom.class_subject = data[5]
		if not isinstance(data[6], basestring):
			if not np.isnan(data[6]):
				classroom.estimated_students = int(data[6])
		classroom.start_date = data[7]
		classroom.finish_date = data[8]
		classroom.examination_date = data[9]

		if isinstance(data[11], basestring):
			if data[11].endswith('gv'):
				teacher_email = data[11] + "@topica.edu.vn"
				teachers = Teacher.objects.filter(topica_email=teacher_email)
				if len(teachers)>0:
					classroom.teacher = teachers[0]

		if isinstance(data[13], basestring):
			if data[13].endswith('gv'):
				assistant_email = data[13] + "@topica.edu.vn"
				assistants = Assistant.objects.filter(topica_email=assistant_email)
				if len(assistants)>0:
					classroom.assistant = assistants[0]

		classroom.change_note = data[14]
		classroom.supporter = data[15].decode('utf-8').lower()
		classroom.save()
		if is_new:
			return True
		return False

	@classmethod
	def load_data(self, filename):
		try:
			data = pd.read_excel(filename)
		except Exception:
			raise Exception("File " + filename + " does not exist or damaged")
		else:
			num_instance = len(data) - 1
			num_error = 0
			num_classroom_created = 0
			num_classroom_updated = 0
			for i in range(1, num_instance):
				if(i%(num_instance/10)==0):
					print('Loading ' + str(i/(num_instance/10)*10) + '%')
				classroom = data.iloc[i]
				if not classroom[5]:
					num_error+=1
					continue
				else:
					if(self.create_classroom(classroom)):
						num_classroom_created+=1
					else:
						num_classroom_updated+=1
			print("Data generation completed")
			return (num_classroom_created, num_classroom_updated, num_error)


if __name__ == '__main__':
	CURR_DIR = os.path.dirname(os.path.abspath(__file__))
	DATA_DIR = os.path.join(CURR_DIR,'base_data')

	print('Start generating teachers/assistants data')
	num_teacher_created, num_teacher_updated, num_assistant_created, num_assistant_updated, num_error = TAParser.load_data(os.path.join(DATA_DIR,'ta.xlsx'))
	print('Operation completed with')
	print(str(num_teacher_created) + ' new teacher(s) created')
	print(str(num_teacher_updated) + ' old teacher(s) updated info or unchanged')
	print(str(num_assistant_created) + ' new assistant(s) created')
	print(str(num_assistant_updated) + ' old assistant(s) updated info or unchanged')
	print(str(num_error) + ' errors case')

	print('')

	print('Start generating classrooms data')
	num_classroom_created, num_classroom_updated, num_error = ClassroomParser.load_data(os.path.join(DATA_DIR,'classroom.xlsx'))
	print(str(num_classroom_created) + ' new classroom(s) created')
	print(str(num_classroom_updated) + ' old classroom(s) updated info or unchanged')
	print(str(num_error) + ' errors case')