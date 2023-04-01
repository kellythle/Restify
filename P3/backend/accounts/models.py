from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    isHost = models.BooleanField(default=True)

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="%(app_label)s_%(class)s_related",
        related_query_name="%(app_label)s_%(class)ss",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="%(app_label)s_%(class)s_related",
        related_query_name="%(app_label)s_%(class)ss",
    )

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class avatarImage(models.Model):
    image = models.ImageField(null=True)
    image_url = models.CharField(max_length=2000)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='avatar')


