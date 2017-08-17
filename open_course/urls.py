from django.conf.urls import url, include
from open_course import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(r'^api/v1/classrooms/$', views.ClassroomList.as_view()),
	url(r'^api/v1/classrooms/(?P<pk>[0-9]+)/$', views.ClassroomDetail.as_view()),
	url(r'^api/v1/users/$', views.UserList.as_view()),
	url(r'^api/v1/users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
	url(r'^api/v1/teachers/$', views.TeacherList.as_view()),
	url(r'^api/v1/teachers/(?P<pk>[0-9]+)/$', views.TeacherDetail.as_view()),
	url(r'^api/v1/assistants/$', views.AssistantList.as_view()),
	url(r'^api/v1/assistants/(?P<pk>[0-9]+)/$', views.AssistantDetail.as_view()),
	url(r'^api-auth/', include('rest_framework.urls',namespace='rest_framework')),
]


urlpatterns = format_suffix_patterns(urlpatterns)