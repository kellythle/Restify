#!/bin/bash

sudo python3 ./restify/manage.py makemigrations
sudo python3 ./restify/manage.py migrate
sudo python3 ./restify/manage.py runserver