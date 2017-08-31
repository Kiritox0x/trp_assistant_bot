from rest_framework import serializers
from open_course.models import Classroom, Teacher, Assistant, Supporter
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class TeacherSerializer(serializers.ModelSerializer):
	class Meta:
		model = Teacher
		fields = ('id', 'name', 'code', 'topica_email', 'personal_email', 'phone_number',
			'status', 'location', 'account', 'date_of_birth', 'note', 'supporter')

class AssistantSerializer(serializers.ModelSerializer):
	class Meta:
		model = Assistant
		fields = ('id', 'name', 'code', 'topica_email', 'personal_email', 'phone_number',
			'status', 'location', 'account', 'date_of_birth', 'note', 'supporter')

class ClassroomSerializer(serializers.ModelSerializer):
	# owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Classroom
		fields = ('id', 'school','subject','subject_code','class_name','class_subject',
			'estimated_students','start_date','finish_date','examination_date','teacher','assistant','change_note','supporter')


class UserSerializer(serializers.ModelSerializer):
	# classrooms = serializers.PrimaryKeyRelatedField(many=True, queryset=Classroom.objects.all())
	class Meta:
		model = User
		fields = ('id', 'username', 'classrooms')


class SupporterSerializer(serializers.ModelSerializer):
	class Meta:
		model = Supporter
		fields = ('id', 'name', 'account', 'email')


class TokenSerializer(serializers.ModelSerializer):
	class Meta:
		model = Token
		fields = ('key', 'user')
