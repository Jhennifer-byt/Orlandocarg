from rest_framework.permissions import BasePermission

class IsStaffOrReadOnly(BasePermission):
    """
    Permite a los usuarios normales ver y actualizar guías,
    pero solo permite a los usuarios staff crear o eliminar registros.
    """
    def has_permission(self, request, view):
        # Permitir a los usuarios autenticados ver y actualizar registros
        if request.method in ['GET', 'PUT', 'PATCH']:
            return request.user.is_authenticated

        # Permitir a los usuarios staff crear o eliminar registros
        if request.method in ['POST', 'DELETE']:
            return request.user.is_staff

        return False
