from django.contrib import admin
from open_course.models import Classroom, Teacher, Assistant, Supporter
# Register your models here.


admin.site.register(Classroom)
admin.site.register(Teacher)
admin.site.register(Assistant)
admin.site.register(Supporter)