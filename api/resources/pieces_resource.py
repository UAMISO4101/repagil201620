import json

from django.core import serializers
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from api.models import Collection, PieceLike, Rank
from api.models import Piece, Category, Artist,Comments


###########################################
# Resource for operations with Piece class
###########################################

@csrf_exempt
def pieces_list(request):
    pieces_list = Piece.objects.all()
    pieces_result = []
    for piece in pieces_list:
        piece.artist_name = piece.artist.name
        pieces_result.append(piece)
    return HttpResponse(serializers.serialize("json", pieces_result))


@csrf_exempt
def collection_by_artist(request, artist_name):
    collection = get_list_or_404(Collection.objects.filter(name=artist_name))
    return HttpResponse(serializers.serialize("json", collection))

@csrf_exempt
def piece_by_id(request, piece_id):
    piece_result = Piece.objects.get(pk=piece_id)
    artist = Artist.objects.get(pk=piece_result.artist.id)
    piece_result.artist_name = artist.name
    piece = []
    piece.append(piece_result)
    return HttpResponse(serializers.serialize("json", piece))

@csrf_exempt
def piece_by_category(request, category_id):
    category = Category.objects.get(pk = category_id)
    piece = get_list_or_404(Piece.objects.filter(category = category))
    return HttpResponse(serializers.serialize("json", piece))

@csrf_exempt
def update_piece(request):
    if request.method == "POST":
        jsonPiece = json.loads(request.body)
        piece_id = jsonPiece['body']['pk']
        pieces = get_list_or_404(Piece.objects.filter(pk=piece_id))
        if len(pieces) == 0:
            return JsonResponse({"mensaje": "There are no pieces with id" + piece_id})
        else:
            name = jsonPiece['body']['fields']['name']
            url = jsonPiece['body']['fields']['url']
            image_cover = jsonPiece['body']['fields']['image_cover']
            duration = jsonPiece['body']['fields']['duration']
            category = jsonPiece['body']['fields']['category']
            lyrics = jsonPiece['body']['fields']['lyrics']

            selected_piece = pieces[0]

            if name is not None:
                selected_piece.name = name
            if url is not None:
                selected_piece.url = url
            if image_cover is not None:
                selected_piece.image_cover = image_cover
            if duration is not None:
                selected_piece.duration = duration
            if category is not None:
                cat = get_object_or_404(Category, pk=category)
                selected_piece.category = cat
            if lyrics is not None:
                selected_piece.lyrics = lyrics

            selected_piece.save()

            return JsonResponse({"mensaje": "successfully updated"})


@csrf_exempt
def add_piece(request):
    if request.method == 'POST':
        jsonPiece = json.loads(request.body)
        new_piece = Piece(
            name=jsonPiece['body']['name'],
            url=jsonPiece['body']['sound'],
            image_cover=jsonPiece['body']['cover'],
            duration=jsonPiece['body']['duration'],
            category=get_object_or_404(Category.objects.filter(id=jsonPiece['body']['category'])),
            artist=Artist.objects.get(userId__username=jsonPiece['body']['artist']),
        );
        new_piece.save();
        return HttpResponse(serializers.serialize("json", [new_piece]))




@csrf_exempt
def like_piece(request, piece_id):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        username = json_body['username']
        piece = get_object_or_404(Piece, pk=piece_id)
        new_like = PieceLike(piece=piece, username=username)
        new_like.save()
        return JsonResponse({"mensaje": "successfully liked"})


@csrf_exempt
def unlike_piece(request, piece_id):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        username = json_body['username']
        piece = get_object_or_404(Piece, pk=piece_id)
        like = PieceLike.objects.filter(piece=piece, username=username)
        like.delete()
        return JsonResponse({"mensaje": "successfully unliked"})


@csrf_exempt
def is_liked_piece_by_username(request, piece_id):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        username = json_body['username']
        piece = get_object_or_404(Piece, pk=piece_id)
        like = PieceLike.objects.filter(piece=piece, username=username)
        if len(like) > 0:
            return JsonResponse({"liked": True})
        else:
            return JsonResponse({"liked": False})


@csrf_exempt
def likes_by_piece(request, piece_id):
    if request.method == 'GET':
        piece = get_object_or_404(Piece, pk=piece_id)
        likes = PieceLike.objects.filter(piece=piece)
        if likes is not None:
            return JsonResponse({"likes": len(likes)})
        else:
            return JsonResponse({"likes": 0})


@csrf_exempt
def get_most_voted(request):
    if request.method == 'GET':
        pieceLikes = PieceLike.objects.all();
        if pieceLikes is not None:
            validated_pieces = []
            answer = []
            for pl in pieceLikes:
                piece = pl.piece
                if piece.name not in validated_pieces:
                    validated_pieces.append(piece.name)
                    rank = Rank(piece_name=piece.name, likes_number=len(PieceLike.objects.filter(piece=piece)))
                    answer.append(rank)
            return HttpResponse(serializers.serialize("json", answer))

@csrf_exempt
def add_comment(request,piece_id):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        email = json_body['body']['email']
        text = json_body['body']['text']
        piece = get_object_or_404(Piece, pk=piece_id)
        new_comment = Comments(piece=piece, email=email, text=text)
        new_comment.save()
        return JsonResponse({"mensaje": "ok"})

@csrf_exempt
def comments_piece(request,piece_id):
    if request.method == 'GET':
        piece_obj = Piece.objects.filter(pk=piece_id)
        comments = Comments.objects.filter(piece=piece_obj)
        if comments is not None:
            return HttpResponse(serializers.serialize("json", comments))
        else:
            return JsonResponse({"comments": 'No comments'})
