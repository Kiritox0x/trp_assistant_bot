from django.core.mail import EmailMessage
from django.forms import model_to_dict
from template_editor.services import ContextRender
from open_course.models import Classroom, Teacher, Assistant
from template_editor.models import MailTemplate
import datetime
import logging

class EmailSender:
	@classmethod
	def send_message(self, title, content, targets, **context_dict):
		if ('title_dict' in context_dict):
			title = ContextRender.context_render(title, context_dict['title_dict'])
		if ('content_dict' in context_dict):
			content = ContextRender.context_render(content, context_dict['content_dict'])
		receivers = []
		if not isinstance(targets, list):
			receivers.append(targets)
		else:
			receivers = targets 
		email = EmailMessage(title, content, to=receivers)
		return email.send()

	@classmethod
	def invitation_letter(self, class_id, template_id_or_content, Customize=False):
		try:
			classroom = Classroom.objects.get(pk = class_id)
		except Classroom.DoesNotExist:
			logging.exception("Classroom not exist")

		if not Customize:
			try:
				template = MailTemplate.objects.get(pk = template_id_or_content)
				template_title = template.title
				template_context = template.context
			except MailTemplate.DoesNotExist:
				logging.exception("Mail Template does not exist")
		else:
			template_title = template_id_or_content['template_title']
			template_context = template_id_or_content['template_content']

		content = model_to_dict(classroom)
		targets = []

		if isinstance(classroom.start_date, datetime.date):
			content['start_date'] = classroom.start_date.isoformat()
		if isinstance(classroom.finish_date, datetime.date):
			content['finish_date'] = classroom.finish_date.isoformat()
		if isinstance(classroom.teacher, Teacher):
			content['teacher'] = classroom.teacher.name
			targets.append(classroom.teacher.topica_email)
		else:
			logging.exception("Teacher not exist")
		if isinstance(classroom.assistant, Assistant):
			content['assistant'] = classroom.assistant.name

		for key in content.keys():
			if content[key] == None:
				content.pop(key)
		print('Sent email to ' + str(targets))
		return self.send_message(template_title, template_context, targets, title_dict=content, content_dict=content)

	@classmethod
	def preview(self, class_id, template_id_or_content, Customize=False):
		try:
			classroom = Classroom.objects.get(pk = class_id)
		except Classroom.DoesNotExist:
			logging.exception("Classroom not exist")

		if not Customize:
			try:
				template = MailTemplate.objects.get(pk = template_id_or_content)
				template_title = template.title
				template_context = template.context
			except MailTemplate.DoesNotExist:
				logging.exception("Mail Template does not exist")
		else:
			template_title = template_id_or_content['template_title']
			template_context = template_id_or_content['template_content']

		content = model_to_dict(classroom)
		targets = []

		if isinstance(classroom.start_date, datetime.date):
			content['start_date'] = classroom.start_date.isoformat()
		if isinstance(classroom.finish_date, datetime.date):
			content['finish_date'] = classroom.finish_date.isoformat()
		if isinstance(classroom.teacher, Teacher):
			content['teacher'] = classroom.teacher.name
			targets.append(classroom.teacher.topica_email)
		else:
			logging.exception("Teacher not exist")
		if isinstance(classroom.assistant, Assistant):
			content['assistant'] = classroom.assistant.name

		for key in content.keys():
			if content[key] == None:
				content.pop(key)

		message_title = ContextRender.context_render(template_title, content)
		message_content = ContextRender.context_render(template_context, content)

		message = {}
		message['title'] = message_title
		message['content'] = message_content
		return message
		
