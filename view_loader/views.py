import logging
import os
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from open_course.models import Classroom, Teacher, Assistant, Supporter


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except Exception:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yar nrun build` to test the production version.
                """,
                status=501,
            )


class StatisticRecord(APIView):
    permissions_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        num_classes = Classroom.objects.count()
        num_teachers = Teacher.objects.count()
        num_assistants = Assistant.objects.count()
        num_supporters = Supporter.objects.count()
        response = {'classrooms' : num_classes, 'teachers' : num_teachers, 'assistants' : num_assistants, 'supporters' : num_supporters}
        return Response(response, status=200)