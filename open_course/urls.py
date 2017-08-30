from django.conf.urls import url, include
from open_course import views as oc_views
from database_loader import views as dl_views
from rest_framework.authtoken import views as tkviews
from trp_assistant_bot.settings import URL_API_PREFIX 
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(URL_API_PREFIX+r'classrooms/$', oc_views.ClassroomList.as_view()),
	url(URL_API_PREFIX+r'classrooms/(?P<pk>[0-9]+)/$', oc_views.ClassroomDetail.as_view()),
	url(URL_API_PREFIX+r'users/$', oc_views.UserList.as_view()),
	url(URL_API_PREFIX+r'users/(?P<pk>[0-9]+)/$', oc_views.UserDetail.as_view()),
	url(URL_API_PREFIX+r'teachers/$', oc_views.TeacherList.as_view()),
	url(URL_API_PREFIX+r'teachers/(?P<pk>[0-9]+)/$', oc_views.TeacherDetail.as_view()),
	url(URL_API_PREFIX+r'assistants/$', oc_views.AssistantList.as_view()),
	url(URL_API_PREFIX+r'assistants/(?P<pk>[0-9]+)/$', oc_views.AssistantDetail.as_view()),
	url(URL_API_PREFIX+r'supporters/$', oc_views.SupporterList.as_view()),
	url(URL_API_PREFIX+r'supporters/(?P<pk>[0-9]+)/$', oc_views.SupporterDetail.as_view()),
	url(URL_API_PREFIX+r'auth-token/', tkviews.obtain_auth_token),
	url(URL_API_PREFIX+r'token/$', oc_views.TokenValidate.as_view())
]


urlpatterns = format_suffix_patterns(urlpatterns)