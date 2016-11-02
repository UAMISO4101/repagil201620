from django.conf.urls import url


from api.resources.pieces_resource import pieces_list
from api.resources.collection_resource import create_collection


from api.resources.pieces_resource import pieces_list, piece_by_id, update_piece,add_piece
from api.resources.category_resource import category_list
from api.resources.awsS3_resource import getCredentials
from api.resources.artist_resource import create_artist
from api.resources.user_resource import login_view, logout_view, is_logged
from . import views
from api.resources.user_resource import login_view, logout_view, is_logged
from api.resources.profile_resource import view_profile, update_profile


urlpatterns=[
    url(r'^pieces/$', pieces_list, name='pieces_list'),
    url(r'^pieces/(?P<piece_id>\d+)/$', piece_by_id, name='piece_by_id'),
    url(r'^pieces/update$', update_piece, name='update_piece'),
    url(r'^category/$', category_list, name='category_list'),
    url(r'^credentials/$', getCredentials, name='getCredentials'),
    url(r'^pieces/add_piece/$', add_piece, name='add_piece'),
    url(r'^createArtist/$', create_artist, name='create_artist'),
    url(r'^createCollections/$', create_collection, name='create_collection'),
    url(r'^logout$', logout_view, name="logout"),
    url(r'^login/$', login_view, name="login"),
    url(r'^islogged$', is_logged, name="is_logged"),
    url(r'^profile/(?P<user_id>\d+)$', view_profile, name='view_profile'),
    url(r'^profile/update$', update_profile, name='update_profile'),
    url(r'^logout$', logout_view, name="logout"),
    url(r'^login/$', login_view, name="login"),
    url(r'^islogged$', is_logged, name="is_logged"),

]