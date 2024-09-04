from django.contrib import admin
from .models import Cliente, GuiaTransportista

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'es_privilegiado')
    search_fields = ('nombre',)

@admin.register(GuiaTransportista)
class GuiaTransportistaAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'cliente', 'numero_guia', 'precio_total', 'estado', 'peso', 'volumen')
    list_filter = ('estado', 'fecha')
    search_fields = ('numero_guia', 'cliente__nombre')
