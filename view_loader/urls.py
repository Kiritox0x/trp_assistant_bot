from django.conf.urls import url, include
from view_loader import views
from trp_assistant_bot.settings import URL_API_PREFIX 
from view_loader.views import StatisticRecord
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
	url(r'^$', views.FrontendAppView.as_view()),	
	url(URL_API_PREFIX + r'view_loader/statistics/$', StatisticRecord.as_view())
]


urlpatterns = format_suffix_patterns(urlpatterns)