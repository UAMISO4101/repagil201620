
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_list_or_404, get_object_or_404

from api.models import Category

###########################################
# Resource for operations with Category class
###########################################

@csrf_exempt
def category_list(request):
    category_list = Category.objects.all()
    return HttpResponse(serializers.serialize("json", category_list))

@csrf_exempt
def category_by_name_list(request,category_name):
    category_list = get_list_or_404(Category.objects.filter(name=category_name))
    return HttpResponse(serializers.serialize("json", category_list))