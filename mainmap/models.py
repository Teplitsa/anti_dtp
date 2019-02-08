# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.gis.db import models
from django.conf import settings

class dtp_card(models.Model):
    Kart_ID = models.BigIntegerField()
    Dtp_V = models.TextField()
    K_Uch = models.IntegerField()
    K_Ts = models.IntegerField()
    Date = models.DateTimeField()
    Ran = models.IntegerField()
    Pog = models.IntegerField()
    Osv = models.TextField()
    S_pch = models.TextField()
    Change_org_motion = models.TextField()
    Ndu = models.TextField()
    S_pog = models.TextField()
    Sdor = models.TextField()
    Factor = models.TextField()
    Correct = models.IntegerField(null=True)
    geom = models.PointField(srid=4326,null=True)

class dtp_area(models.Model):
    Name = models.CharField(max_length=100,verbose_name=u'Название участка')
    Description = models.TextField(null=True, verbose_name=u'Описание')
    Solutions = models.TextField(null=True,verbose_name=u'Предполагаемые решения')
    Main_types = models.TextField(null=True,verbose_name=u'Основные виды ДТП на участке')
    Factors = models.TextField(null=True,verbose_name=u'Основные сопутствующие факторы')
    Nar = models.TextField(null=True,verbose_name=u'Нарушения схемы дорожного движения')
    Queries = models.TextField(null=True,verbose_name=u'История общения с властями')
    geom = models.PolygonField(srid=4326,verbose_name=u'Расположение',help_text=u'Нажмите на иконку с квадратом или пятиугольником, чтобы начать отрисовку участка')

    def __unicode__(self):
        return self.Name

    class Meta:
        verbose_name_plural = u"Очаги ДТП"
        verbose_name = u"Очаг ДТП"


class dtp_comments(models.Model):
    Area_name = models.TextField()
    user_name = models.TextField()
    date = models.DateTimeField(blank=True,null=True)
    comment = models.TextField()
