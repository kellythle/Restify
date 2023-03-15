from django import forms
from django.core.exceptions import ValidationError
from properties.models import Property


class EditPropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        exclude = ['owner', 'amenities']

    def clean():
        data = super().clean()
        return data
