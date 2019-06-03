NB! Installation process requires advanced technical knowledge in Linux and Python/Django!

GIT clone or download and unpack the project repository.

Edit anti_dtp/settings.py setup file
- change domain name
- secret key
- database password
- mail settings

Installation prereguisits:

pip install ./requirements/python2.txt 

Install missing libraries if needed:

sudo apt-get install gdal-bin django-leaflet django gunicorn psycopg2

Then follow this tutorial to setup the environment:

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04

To test installation run:

#Allow port 8000 in FireWall:

sudo ufw allow 8000 

./anti_dtp-master/manage.py runserver 0.0.0.0:8000 --insecure
