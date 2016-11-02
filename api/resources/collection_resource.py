import json

from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.models import Collection


@csrf_exempt
def create_collection(request):
    if request.method == 'POST':
        json_collection = json.loads(request.body)
        pname = json_collection['body']['name']
        new_collection = Collection(name=pname)
        new_collection.save()
        return JsonResponse({"mensaje": "ok", "data": serializers.serialize("json",[new_collection])})

@csrf_exempt
def collections_list(request):
    collection_list = Collection.objects.all()
    return HttpResponse(serializers.serialize("json", collection_list))

@csrf_exempt
def collections_delete(request):
    if request.method == 'DELETE':
        Collection.objects.all().delete()
        return JsonResponse({"mensaje": "All collections deleted"})
