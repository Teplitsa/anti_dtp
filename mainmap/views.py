# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db.models import Sum
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import dtp_card,dtp_area,dtp_comments
from .filters import filter_cards
from django.core.serializers import serialize
import json
from django.contrib.auth import logout,authenticate, login
import datetime
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def sendmail(mail,subject,text):
    gmail_user = 'antidtp.info@gmail.com'
    gmail_password = 'bezavariy'
    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = gmail_user
    msg['To'] = mail

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.starttls()
    server.ehlo()
    server.login(gmail_user, gmail_password)
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    server.quit()

def aply_filter(request,filter_func):
	dtp_cards = dtp_card.objects.all()
	params = request.GET
	return filter_func(dtp_cards, params),params

def index(request):
	dtp_cards, params = aply_filter(request,filter_cards)
	types = [i[0] for i in dtp_cards.order_by('Dtp_V').values_list('Dtp_V').distinct()]
	json_v = serialize('geojson',dtp_cards[:500])
	ll = params.get('ll') or '59.9, 30.25'
	zoom = params.get('zoom') or 10
	share_date_1 = params.get('Date1') or '01.01.2018'
        share_date_2 = params.get('Date2') or '31.12.2018'
        dtp_v = params.getlist('Dtp_v') or None
        pog = params.get('Pog') or 0
        ran = params.get('Ran') or 0
        desc = params.get('Desc') or 0
        kuch = params.get('K_Uch') or 0
#        if dtp_v:
#            dtp_v = map(lambda x :x.encode('utf-8'),dtp_v)
        dtp_areas = dtp_area.objects.all()
        poly_json = serialize('geojson',dtp_areas)

        dtps = dtp_card.objects.filter(Date__range=["2018-01-01", "2018-12-31"])
        dtp_q = len(dtps)
        dtp_q_i = dtps.aggregate(Sum('Ran'))['Ran__sum']
        dtp_q_d = dtps.aggregate(Sum('Pog'))['Pog__sum']
	return render(request,'mainmap/index.html',{"dtp_q": dtp_q, "dtp_q_i": dtp_q_i,"dtp_q_d": dtp_q_d,"types": types,"dtp_areas": poly_json,"dtp_cards": json_v,"ll":ll,"zoom":zoom, "share_date_1": share_date_1,"share_date_2": share_date_2, "dtp_v": dtp_v, "pog": pog, "ran": ran, "desc": desc, "kuch": kuch})

def search(request):
	dtp_cards, params = aply_filter(request,filter_cards)
	json_v = serialize('geojson',dtp_cards)
	return JsonResponse({"photos":json_v})

def user_logout(request):
     logout(request)
     return JsonResponse({})

def foget(request):
    params = request.GET
    user = User.objects.get(email=params.get('email'))
    if user:
        new_password = User.objects.make_random_password()
        user.set_password(new_password)
        user.save()
        sendmail(params.get('email'), 'Новый пароль', 'Ваш новый пароль {}'.format(new_password))
        return JsonResponse({})

def user_login(request):
     params = request.GET
     try:
         user = User.objects.get(username=params.get('username'))
     except:
         response = JsonResponse({'error':'Пользователь не зарегестрирован'})
         response.status_code = 403
         return response
     try:
         user = authenticate(username=params.get('username'), password=params.get('password'))
         if user:
             login(request,user)
             return JsonResponse({})
         else:
             response = JsonResponse({'error':'Неверно указан пароль'})
             response.status_code = 403
             return response
     except:
         response = JsonResponse({'error':'Неверно указан пароль'})
         response.status_code = 403
         return response

def user_registr(request):
     params = request.GET
     if params.get('username') and params.get('password'):
        try:
             user = User.objects.create_user(username=params.get('username'),
                                 email=params.get('username'),
                                 password=params.get('password'))
             user.last_name = params.get('last_name')
             user.first_name = params.get('first_name')
             user.save()

             mail = params.get('username')
             text = u'{}, '.format(params.get('first_name',u'Уважаемый активист'))
             with open('mainmap/static/letter.txt','r') as letter:
                 text+=letter.read().decode('utf-8')
             subject = u'Успешная регистрация на портале antidtp.org'
             sendmail(mail,subject,text)
             login(request,user)
             return JsonResponse({})
        except:
             return JsonResponse({})

def add_comment(request):
     params = request.GET
     dtp_comments.objects.create(Area_name = params.get("Area_name"), 
                                 user_name = params.get("User_name"),
                                 comment = params.get("Comment")
                                 )
     return JsonResponse({})

def get_comments(request):
     params = request.GET
     comments = dtp_comments.objects.filter(Area_name=params.get("Area_name"))
     return JsonResponse({'comments':serialize('json',comments)})
