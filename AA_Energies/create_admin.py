import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "AAEnergiessite.settings")
django.setup()

from AAEnergiesApp.models import UserProfile

if not UserProfile.objects.filter(username="admin").exists():
    user = UserProfile(username="admin", email="admin@uni.eus", rol="admin")
    user.set_password("123456")
    user.save()
    print("Usuario admin creado")
else:
    print("El usuario admin ya existe")
