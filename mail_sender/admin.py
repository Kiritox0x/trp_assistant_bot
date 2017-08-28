from django.contrib import admin

# Register your models here.
from mail_sender.models import *

admin.site.register(Bcm_room)
admin.site.register(Weekreport_Teacher)
admin.site.register(Weekreport_Assistant)
