from open_course.models import Classroom, Teacher, Assistant, Supporter
from template_editor.mails import EmailSender
import logging

class MonitorBot:
	def __init__(self):
		classrooms = self.get_classrooms()

	def get_classrooms(self):
		try:
			classrooms = Classroom.objects.all()
			return classrooms
		except Classroom.DoesNotExist:
			logging.exception("Classroom not exist")
	
	def start_monitor(self):
		for classroom in self.classrooms:
			if classroom
			