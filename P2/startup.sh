#!/bin/bash

sudo python3 -m pip install --upgrade pip
sudo pip3 install virtualenv
virtualenv venv
source venv/bin/activate
sudo pip3 install Django
sudo pip3 install djangorestframework
sudo pip3 install djangorestframework-simplejwt
sudo python3 -m pip install --upgrade Pillow
sudo pip3 install django-multiselectfield