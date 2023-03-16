from django import forms
from django.core.exceptions import ValidationError
from properties.models import Property, PropertyImages


class AddPropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        # exclude = ['owner', 'amenities']
        exclude = ['owner']

    def clean():
        data = super().clean()
        return data


class PropertyImageForm(forms.ModelForm):
    class Meta:
        model = PropertyImages
        fields = ['image']
        widgets = {
            'image': forms.ClearableFileInput(attrs={'multiple': True}),
        }
