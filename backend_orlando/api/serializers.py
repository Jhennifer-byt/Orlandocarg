from rest_framework import serializers, viewsets
from .models import GuiaTransportista, Cliente, GuiaEnviada

class GuiaTransportistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuiaTransportista
        fields = '__all__'


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'es_privilegiado']


class GuiaEnviadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuiaEnviada
        fields = '__all__'