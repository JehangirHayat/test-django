from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns

# Rutas que se traducen según el idioma activo (enlazan a las vistas del app)
urlpatterns = i18n_patterns(
    path('admin/', admin.site.urls),
    path('', include('AAEnergiesApp.urls')),
)

# Ruta especial de Django para cambiar el idioma (NO traducida)
urlpatterns += [
    path('i18n/', include('django.conf.urls.i18n')),
]
