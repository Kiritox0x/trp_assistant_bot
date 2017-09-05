from django.conf.urls import url, include
from template_editor import views
from rest_framework.urlpatterns import format_suffix_patterns
from trp_assistant_bot.settings import URL_API_PREFIX 

urlpatterns = [
	url(r'^mailtemplates/$', views.MailTemplateList.as_view()),
	url(r'^mailtemplates/(?P<pk>[0-9]+)/$', views.MailTemplateDetail.as_view()),
	url(r'^mailsender/$', views.MailSender.as_view()),
	url(r'^mailcustom/$', views.MailSenderCustom.as_view()),
	url(r'^previewmailcustom/$', views.CustomMailPreview.as_view()),
	url(r'^previewmail/$', views.MailPreview.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)