# -*- coding: utf-8 -*-

import django_filters
from functools import reduce
from operator import or_
from django.db.models import Q
from django.db.models import Value
from django.db.models.functions import Concat
from datetime import datetime
import urllib

def filter_cards(cards,params):
    f = open("queries.txt", "a")

    if any(x for x in params.values()):
        cards = cards.filter(Correct__gt=0)
        if params.get('Date1'):
            start_time = datetime.strptime(params.get('Date1'), '%d.%m.%Y')
            end_time = datetime.strptime(params.get('Date2'), '%d.%m.%Y')
            cards = cards.filter(Date__gte=start_time)
            cards = cards.filter(Date__lte=end_time)
        if params.get('Dtp_V[]'):
            cards = cards.filter(Dtp_V__in=params.getlist('Dtp_V[]'))
        if params.get('K_Uch'):
            cards = cards.filter(K_Uch__gte=params.get('K_Uch'))
        if params.get('Ran'):
            cards = cards.filter(Ran__gte=params.get('Ran'))
        if params.get('Pog'):
            cards = cards.filter(Pog__gte=int(params.get('Pog')))
        if params.get('Desc',0) != 0 and params.get('Desc',0) != '' and params.get('Desc',0)!='0':
            # queryset = cards.annotate(description=Concat('Factor',Value(' '),'Osv',Value(' '),'Sdor'))
            cards = cards.filter(Ndu__isnull=False).exclude(Ndu='').exclude(Ndu=u'Не установлены')
            # cards = queryset.filter(reduce(or_, [Q(description__icontains=keyword) for keyword in keywords]))
        if params.get('Osv'):
            keywords = params.get('Osv').split(', ')
            cards = cards.filter(reduce(or_, [Q(Osv__icontains=keyword) for keyword in keywords]))
        if params.get('Sdor'):
            keywords = params.get('Sdor').split(', ')
            cards = cards.filter(reduce(or_, [Q(Sdor__icontains=keyword) for keyword in keywords]))
    return cards
