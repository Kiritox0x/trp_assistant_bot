from rest_framework import serializers
from open_course.models import Classroom
from django.contrib.auth.models import User


class ClassroomSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Classroom
		fields = ('id', 'owner', 'school','subject','subject_code','class_name','class_subject',
			'estimated_students','start_date','finish_date','test_date','teacher_name',
			'teacher_account','assistant_name','assistant_account','teacher_note','assistant_note','change_note','supporter')


class UserSerializer(serializers.ModelSerializer):
	classrooms = serializers.PrimaryKeyRelatedField(many=True, queryset=Classroom.objects.all())


	class Meta:
		model = User
		fields = ('id', 'username', 'classrooms')