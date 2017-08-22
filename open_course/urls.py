from django.conf.urls import url, include
from open_course import views
from rest_framework.authtoken import views as tkviews
from trp_assistant_bot.settings import URL_API_PREFIX 
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(URL_API_PREFIX+r'classrooms/$', views.ClassroomList.as_view()),
	url(URL_API_PREFIX+r'classrooms/(?P<pk>[0-9]+)/$', views.ClassroomDetail.as_view()),
	url(URL_API_PREFIX+r'users/$', views.UserList.as_view()),
	url(URL_API_PREFIX+r'users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
	url(URL_API_PREFIX+r'teachers/$', views.TeacherList.as_view()),
	url(URL_API_PREFIX+r'teachers/(?P<pk>[0-9]+)/$', views.TeacherDetail.as_view()),
	url(URL_API_PREFIX+r'assistants/$', views.AssistantList.as_view()),
	url(URL_API_PREFIX+r'assistants/(?P<pk>[0-9]+)/$', views.AssistantDetail.as_view()),
	url(URL_API_PREFIX+r'api-auth/', include('rest_framework.urls',namespace='rest_framework')),
	url(URL_API_PREFIX+r'auth-token/', tkviews.obtain_auth_token),
]


urlpatterns = format_suffix_patterns(urlpatterns)