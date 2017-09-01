from rest_framework import serializers
from mail_sender.models import * 


class Bcm_roomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bcm_room 
        fields = ('id', 'subject_code', 'subject_name', 'start_date', 'finish_date',
            'date_post_BCM', 'examination_date', 'teacher', 'assistant', 'supporter', 'class_link', 'document_link')

class Weekreport_TeacherSerializer(serializers.ModelSerializer):
	class Meta:
		model = Weekreport_Teacher
		fields = ('id', 'class_code', 'start_date', 'finish_date', 'week_post', 'total_post', 'teacher')

class Weekreport_AssistantSerializer(serializers.ModelSerializer):
	class Meta:
		model = Weekreport_Assistant 
		fields = ('id', 'class_code', 'start_date', 'finish_date', 'week_post', 'total_post', 'assistant')


#class UserSerializer(serializers.ModelSerializer):
#    # classrooms = serializers.PrimaryKeyRelatedField(many=True, queryset=Classroom.objects.all())
#    class Meta:
#        model = User
#        fields = ('id', 'username', 'classrooms')

