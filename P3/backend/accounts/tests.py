from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
User = get_user_model()


class AuthenticationTests(APITestCase):
    def setUp(self):
        self.user_data = {
            "username": "testuser",
            "password": "testpassword",
            "first_name": "Test",
            "last_name": "User",
            "email": "testuser@example.com",
            "isHost": False
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_register(self):
        url = reverse("accounts:register")
        data = {
            "username": "newuser",
            "password": "newpassword",
            "confirm_password": "newpassword",
            "first_name": "New",
            "last_name": "User",
            "email": "newuser@example.com",
            "isHost": False
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(User.objects.latest('id').username, data['username'])

    def test_login(self):
        url = reverse("accounts:login")
        data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_profile(self):
        # Login to get the access token
        login_url = reverse("accounts:login")
        login_data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        }
        login_response = self.client.post(login_url, login_data, format='json')
        access_token = login_response.data["access"]

        # Test the profile view
        url = reverse("accounts:profile")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], self.user_data["username"])

    def test_update_profile(self):
        # Login to get the access token
        login_url = reverse("accounts:login")
        login_data = {
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        }
        login_response = self.client.post(login_url, login_data, format='json')
        access_token = login_response.data["access"]

        # Test updating the profile
        url = reverse("accounts:profile")
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        update_data = {
            "first_name": "Updated",
            "last_name": "User",
            "email": "updateduser@example.com",
            "isHost": True
        }
        response = self.client.patch(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], update_data["first_name"])
        self.assertEqual(response.data["last_name"], update_data["last_name"])
        self.assertEqual(response.data["email"], update_data["email"])
        self.assertEqual(response.data["isHost"], update_data["isHost"])

    def test_register_invalid_email(self):
        url = reverse("accounts:register")
        data = {
            "username": "invalidemailuser",
            "password": "testpassword",
            "first_name": "Invalid",
            "last_name": "Email",
            "email": "invalidemail",
            "isHost": False
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_missing_field(self):
        url = reverse("accounts:register")
        data = {
            "username": "missingfielduser",
            "password": "testpassword",
            "first_name": "Missing",
            "last_name": "Field",
            # Email field is missing
            "isHost": False
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_login_wrong_password(self):
        url = reverse("accounts:login")
        data = {
            "username": self.user_data["username"],
            "password": "wrongpassword"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_missing_field(self):
        url = reverse("accounts:login")
        data = {
            "username": self.user_data["username"]
            # Password field is missing
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

