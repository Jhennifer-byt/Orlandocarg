from django.db import models
from django.core.validators import RegexValidator

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    es_privilegiado = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class GuiaTransportista(models.Model):
    fecha = models.DateField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    numero_guia = models.CharField(
        max_length=5, 
        unique=True,
        validators=[RegexValidator(regex='^[0-9]{5}$', message='El número de guía debe contener exactamente 5 dígitos numéricos')]
    )
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=[('pendiente', 'Pendiente'), ('enviado', 'Enviado')])
    cantidad = models.IntegerField(default=0)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    volumen = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.numero_guia


class GuiaEnviada(models.Model):
    guia = models.OneToOneField(GuiaTransportista, on_delete=models.CASCADE)
    fecha_envio = models.DateTimeField(auto_now_add=True)
    # Agrega otros campos si es necesario

    def __str__(self):
        return f"Guía Enviada: {self.guia.numero_guia}"