import json

from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import get_list_or_404

from api.models import Artist,Piece

#Resource del artista que posee las funciones relacionadas a este

#Funcion que recibe la info de un artista y lo crea en BD
@csrf_exempt
def create_artist(request):
    if request.method == 'POST':
        jsonUser = json.loads(request.body)
        nombre = jsonUser['body']['nombre']
        apellido = jsonUser['body']['apellido']
        email = jsonUser['body']['email']
        username = jsonUser['body']['username']
        password = jsonUser['body']['password']

        if User.objects.filter(username=username).exists():
           return JsonResponse({"mensaje": "el usuario ya existe"})

        try:
            usuario = User.objects.create(first_name=nombre, last_name=apellido, email=email, username=username)
            usuario.set_password(password)
            usuario.save()

            artist = Artist.objects.create(userId=usuario)
            if usuario is not None:
                mensaje = "ok"
            else:
                mensaje = "El usuario no fue creado"
            return JsonResponse({"mensaje": mensaje})
        except ValueError, error:
            return JsonResponse({"mensaje": "fallo la creacion"})


@csrf_exempt
def view_artists(request):
    artists_list = Artist.objects.all()
    return HttpResponse(serializers.serialize("json", artists_list))

@csrf_exempt
def pieces_by_artist(request, user_id):
    artista = Artist.objects.get(userId=user_id)
    pieces = get_list_or_404(Piece.objects.filter(artist=artista))
    return HttpResponse(serializers.serialize("json", pieces))

