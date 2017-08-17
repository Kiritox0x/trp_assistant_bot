from rest_framework import serializers
from open_course.models import Classroom, Teacher, Assistant, Supporter
from django.contrib.auth.models import User

class TeacherSerializer(serializers.ModelSerializer):
	class Meta:
		model = Teacher
		fields = ('id', 'name', 'email', 'account', 'note')

class AssistantSerializer(serializers.ModelSerializer):
	class Meta:
		model = Assistant
		fields = ('id', 'name', 'email', 'account', 'note')

class ClassroomSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Classroom
		fields = ('id', 'owner', 'school','subject','subject_code','class_name','class_subject',
			'estimated_students','start_date','finish_date','examination_date','teacher','assistant','change_note','supporter')


class UserSerializer(serializers.ModelSerializer):
	classrooms = serializers.PrimaryKeyRelatedField(many=True, queryset=Classroom.objects.all())


	class Meta:
		model = User
		fields = ('id', 'username', 'classrooms')