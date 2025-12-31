# urls.py (main project)
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),  # Default Django admin
    path('custom-admin/', include('custom_admin.urls')),  # Custom admin
    path('', include('main.urls')),  # Your existing main app
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)