from django.urls import path, include
from rest_framework import routers 
from .views import (
    TaskListViewSet,
    GuiaTransportistaViewSet, 
    CustomAuthToken, 
    CustomLogoutView,
    UserDetailView, 
    ClienteViewSet, 
 
    marcar_como_enviado
)

router = routers.DefaultRouter()
router.register(r'guias', GuiaTransportistaViewSet, basename='guias')
router.register(r'tasklist', TaskListViewSet, basename='tasklist')
router.register(r'clientes', ClienteViewSet, basename='clientes')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/login/', CustomAuthToken.as_view()),  # Ruta para login
    path('api/v1/auth/logout/', CustomLogoutView.as_view()),  # Ruta para logout
    path('api/v1/auth/user/', UserDetailView.as_view(), name='user-detail'),  # Ruta para detalles de usuario
    path('api/v1/marcar_como_enviado/', marcar_como_enviado, name='marcar_como_enviado'),  # Ruta para marcar guía como enviada
]
