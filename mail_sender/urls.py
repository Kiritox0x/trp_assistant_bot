#from django.conf.urls import url
#from  mail_sender import views
#
#urlpatterns = [
#    url(r'^mail_sender/$', views.Bcm_room_list),
#    url(r'^mail_sender/(?P<pk>[0-9]+)/$', views.Bcm_room_detail),
#]

from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from trp_assistant_bot.settings import URL_API_PREFIX
from mail_sender import views

urlpatterns = [
    url(URL_API_PREFIX + r'Bcm_room/$', views.Bcm_roomList.as_view()),
    url(URL_API_PREFIX + r'Bcm_room/(?P<pk>[0-9]+)/$', views.Bcm_roomDetail.as_view()),
	url(URL_API_PREFIX + r'Weekreport_Teacher/$', views.Weekreport_TeacherList.as_view()),
	url(URL_API_PREFIX + r'Weekreport_Teacher/(?P<pk>[0-9]+)/$', views.Weekreport_TeacherDetail.as_view()),
	url(URL_API_PREFIX + r'Weekreport_Assistant/$', views.Weekreport_AssistantList.as_view()),
	url(URL_API_PREFIX + r'Weekreport_Assistant/(?P<pk>[0-9]+)/$', views.Weekreport_AssistantDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
