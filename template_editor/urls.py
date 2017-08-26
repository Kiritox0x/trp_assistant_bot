from django.conf.urls import url, include
from template_editor import views
from rest_framework.urlpatterns import format_suffix_patterns
from trp_assistant_bot.settings import URL_API_PREFIX 

urlpatterns = [
	url(URL_API_PREFIX+r'mailtemplates/$', views.MailTemplateList.as_view()),
	url(URL_API_PREFIX+r'mailtemplates/(?P<pk>[0-9]+)/$', views.MailTemplateDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)