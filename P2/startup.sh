#!/bin/bash

python3 -m pip install --upgrade pip
pip3 install virtualenv
virtualenv venv
source venv/bin/activate
pip3 install Django
pip3 install djangorestframework
pip3 install djangorestframework-simplejwt
python3 -m pip install --upgrade Pillow
pip3 install django-multiselectfield