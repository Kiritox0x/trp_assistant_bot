from django.conf.urls import url, include
from open_course import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(r'^classrooms/$', views.ClassroomList.as_view()),
	url(r'^classrooms/(?P<pk>[0-9]+)/$', views.ClassroomDetail.as_view()),
	url(r'^users/$', views.UserList.as_view()),
	url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
	url(r'^api-auth/', include('rest_framework.urls',namespace='rest_framework')),
]


urlpatterns = format_suffix_patterns(urlpatterns)