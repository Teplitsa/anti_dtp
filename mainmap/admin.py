# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

from .models import dtp_card,dtp_area,dtp_comments

admin.site.site_header=u'Панель администрирования'
admin.site.index_title=u'Список таблиц'

class dtp_area_admin(LeafletGeoAdmin):
    list_display = ['Name']
    ordering = ['Name']
    moderators_fields = ('Name','Description','Solutions','geom')
    fields = ('Name','Description','geom','Solutions','Nar','Queries')

    def get_form(self, request, obj=None, **kwargs):
        if request.user.groups.filter(name='moderators').exists():
            self.fields = self.moderators_fields
        else:
            self.fields = self.fields
        return super(dtp_area_admin, self).get_form(request, obj, **kwargs)

admin.site.register(dtp_card)
admin.site.register(dtp_area, dtp_area_admin)
admin.site.register(dtp_comments)

