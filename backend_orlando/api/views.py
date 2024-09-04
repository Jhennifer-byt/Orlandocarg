from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import GuiaTransportista, Cliente, GuiaEnviada
from .serializers import GuiaTransportistaSerializer, GuiaEnviadaSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated, BasePermission
from .serializers import ClienteSerializer
from .permissions import IsStaffOrReadOnly  # Asegúrate de que la ruta sea correcta

class IsNormalUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and not request.user.is_staff
    
class GuiaTransportistaViewSet(viewsets.ModelViewSet):
    queryset = GuiaTransportista.objects.all()
    serializer_class = GuiaTransportistaSerializer
    permission_classes = [IsAuthenticated, IsStaffOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()  # Usar el queryset de la clase base
        status = self.request.query_params.get('status', None)
        date = self.request.query_params.get('date', None)

        if status:
            queryset = queryset.filter(estado=status)
        if date:
            queryset = queryset.filter(fecha=date)

        return queryset

@api_view(['POST'])
def marcar_como_enviado(request):
    guia_id = request.data.get('id')  # Cambia 'numero_guia' por 'id'
    try:
        guia = GuiaTransportista.objects.get(id=guia_id)
        guia.estado = 'enviado'
        guia.save()
        return Response({'success': True})
    except GuiaTransportista.DoesNotExist:
        return Response({'success': False, 'error': 'Guía no encontrada'}, status=404)


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        # Devolver el token y el rol en la respuesta
        return Response({
            'token': token.key,
            'is_admin': user.is_staff,
        })


class CustomLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Eliminar el token del usuario
            token = Token.objects.get(user=request.user)
            token.delete()

            # Realizar logout
            logout(request)

            response = Response({'status': 'logged out'})
            
            # Eliminar la cookie del token
            response.delete_cookie('authToken')
            
            return response
        except Token.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=400)


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff
        })
    
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]  


class TaskListViewSet(viewsets.ModelViewSet):
    queryset = GuiaTransportista.objects.all()
    serializer_class = GuiaTransportistaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        status = self.request.query_params.get('status', None)
        if status:
            return self.queryset.filter(estado=status)
        return self.queryset
    

class GuiaEnviadaViewSet(viewsets.ModelViewSet):
    queryset = GuiaEnviada.objects.all().order_by('-fecha_envio')
    serializer_class = GuiaEnviadaSerializer