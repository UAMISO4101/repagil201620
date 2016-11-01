from django.test import TestCase
from django.test import Client
import json
urlpatterns = __import__('api.urls').urls.urlpatterns
# Create your tests here.

#Test para la creacion de artista

class TestCreate_artist(TestCase):
    def test_create_artist(self):
        c = Client()

        artist = {'body': {'nombre': 'john', 'apellido' : 'test', 'email' : 'johntest@gmail.com','username' : 'johntest', 'password': 'test1234'}}
        response = c.post('/api/createArtist/', json.dumps(artist), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEquals(data['mensaje'], "ok", "No coinciden")

