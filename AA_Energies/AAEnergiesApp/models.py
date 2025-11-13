from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
        ('viewer', 'Viewer'),
    ]

    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.username} ({self.rol})"

class AAEnergiesDatuak(models.Model):
    fecha_hora = models.DateTimeField()
    corriente_l1 = models.FloatField()
    corriente_l2 = models.FloatField()
    corriente_l3 = models.FloatField()
    corriente_neutro = models.FloatField()
    p_activa_L1 = models.FloatField()
    p_activa_L2 = models.FloatField()
    p_activa_L3 = models.FloatField()
    cos_Phi_L1 = models.FloatField()
    cos_Phi_L2 = models.FloatField()
    cos_Phi_L3 = models.FloatField()
    frecuencia = models.FloatField()
    p_capacitivia_L1 = models.FloatField()
    p_capacitivia_L2 = models.FloatField()
    p_capacitivia_L3 = models.FloatField()
    p_inductiva_L1 = models.FloatField()
    p_inductiva_L2 = models.FloatField()
    p_inductiva_L3 = models.FloatField()
    tension_l1 = models.FloatField()
    tension_l12 = models.FloatField()
    tension_l2 = models.FloatField()
    tension_l23 = models.FloatField()
    tension_l3 = models.FloatField()
    tension_l31 = models.FloatField()