from django.conf.urls import url, include
from view_loader import views

urlpatterns = [
	url(r'^$', views.FrontendAppView.as_view())
]