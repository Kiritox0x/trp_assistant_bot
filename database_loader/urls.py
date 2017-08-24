from django.conf.urls import url, include
from database_loader import views
from trp_assistant_bot.settings import URL_API_PREFIX 
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(URL_API_PREFIX+r'dataset_classroom/$', views.FileUploadView.as_view()),
]