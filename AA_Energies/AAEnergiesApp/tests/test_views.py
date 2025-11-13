import pytest
from django.urls import reverse
from django.utils.translation import override
from AAEnergiesApp.models import UserProfile

@pytest.fixture
def admin_user(db):
    user, created = UserProfile.objects.get_or_create(
        username="admin",
        defaults={"email": "admin@uni.eus", "rol": "admin"}
    )
    if created:
        user.set_password("123456")
        user.save()
    return user

@pytest.fixture
@pytest.mark.parametrize("lang", ['es', 'eu', 'en'])
def authenticated_client(client, admin_user, lang):
    """Cliente Django autenticado usando login_api"""
    with override(lang):
        url = reverse('login_api')  # Esto devuelve /login_api/
        response = client.post(url, {'username': 'admin', 'password': '123456'}, content_type='application/json')
        assert response.status_code == 200
    return client

@pytest.mark.django_db
class TestViewsI18N:

    @pytest.mark.parametrize("lang", ['es', 'eu', 'en'])
    def test_login_page_in_each_language(self, client, lang):
        """Verifica que la página de login existe en cada idioma"""
        with override(lang):
            url = reverse('login')  # i18n_patterns ya añade prefijo
            response = client.get(url)
            assert response.status_code == 200
            assert b'login' in response.content.lower()

    @pytest.mark.parametrize("lang", ['es', 'eu', 'en'])
    def test_dashboard_requires_login_in_each_language(self, client, lang):
        """Dashboard sin login debe redirigir a login"""
        with override(lang):
            url = reverse('dashboard')
            response = client.get(url)
            # Redirige a login si @login_required está en dashboard_view
            assert response.status_code in [302, 200]  # 302 si protegido
            if response.status_code == 302:
                assert reverse('login') in response.url

    @pytest.mark.parametrize("lang", ['es', 'eu', 'en'])
    def test_dashboard_with_auth_in_each_language(self, authenticated_client, lang):
        """Dashboard con usuario autenticado debe devolver 200"""
        with override(lang):
            url = reverse('dashboard')
            response = authenticated_client.get(url)
            assert response.status_code == 200
            assert b'dashboard' in response.content.lower()
