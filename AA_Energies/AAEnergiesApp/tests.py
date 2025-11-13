from django.test import TestCase
from django.urls import reverse

class LoginPageTests(TestCase):
    def test_login_page_loads(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '<form')

    def test_login_template_used(self):
        response = self.client.get(reverse('login'))
        self.assertTemplateUsed(response, 'login.html')
