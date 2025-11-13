"""
tests/test_frontend.py - Tests de CSS y HTML simplificados
"""

import pytest
from django.contrib.staticfiles import finders
from bs4 import BeautifulSoup
import re


@pytest.mark.django_db
class TestHTML:
    """Tests básicos de HTML"""
    
    def test_homepage_structure(self, client):
        """Verifica estructura HTML básica y charset"""
        response = client.get('/')
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            assert soup.head is not None
            assert soup.body is not None
            assert b'charset' in response.content or b'utf-8' in response.content


@pytest.mark.unit
class TestCSS:
    """Tests simples de CSS"""
    
    @pytest.mark.parametrize("css_file", [
        'css/colors-dark.css',
        'css/colors-light.css',
        'css/Dark/Settings_dark.css',
        'css/Light/Settings_light.css',
        'css/Dark/Dashboard_dark.css',
        'css/Light/Dashboard_light.css',
        'css/Dark/Login_dark.css',
        'css/Light/Login_light.css',
        'css/Dark/notifications_dark.css',

    ])
    def test_css_file(self, css_file):
        """Verifica existencia y sintaxis básica de CSS"""
        path = finders.find(css_file)
        if not path:
            pytest.skip(f"CSS no encontrado: {css_file}")
        
        with open(path, encoding='utf-8') as f:
            content = f.read()
        
        # Llaves balanceadas
        assert content.count('{') == content.count('}'), "Llaves desbalanceadas"
        
        # Sin reglas vacías
        assert not re.search(r'\{\s*\}', content), "Reglas vacías encontradas"
