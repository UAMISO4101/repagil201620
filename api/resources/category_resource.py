import json
from django.http.response import JsonResponse
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from api.models import Category

###########################################
# Resource for operations with Category class
###########################################

@csrf_exempt
def category_list(request):
    category_list = Category.objects.all()
    return HttpResponse(serializers.serialize("json", category_list))

@csrf_exempt
def add_category(request):
    if request.method == 'POST':
        jsonCategory = json.loads(request.body)
        name_category = jsonCategory['body']['name']

        if Category.objects.filter(name=name_category).exists():
           return JsonResponse({"mensaje": "The category already exists"})

        try:
            category = Category.objects.create(name=name_category)
            if category is not None:
                mensaje = "ok"
            else:
                mensaje = "The category wasn't created"
            return JsonResponse({"mensaje": mensaje})
        except ValueError, error:
            return JsonResponse({"mensaje": "creation failed"})

