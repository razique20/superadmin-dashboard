from rest_framework import permissions

class HasPageAccess(permissions.BasePermission):
    """
    Checks if user has permission to access a page.
    Implement your permission logic here.
    """

    def has_permission(self, request, view):
        page = view.kwargs.get('page_name')
        if not page:
            return False
        
        # Example: Check if user belongs to a group named after the page
        return request.user.groups.filter(name=page).exists()
