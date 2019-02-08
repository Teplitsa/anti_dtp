# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-10-07 15:00
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='dtp_area',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.TextField()),
                ('Description', models.TextField(null=True)),
                ('Solutions', models.TextField(null=True)),
                ('Main_types', models.TextField(null=True)),
                ('Factors', models.TextField(null=True)),
                ('Nar', models.TextField(null=True)),
                ('Queries', models.TextField(null=True)),
                ('geom', django.contrib.gis.db.models.fields.PolygonField(srid=4326)),
            ],
        ),
        migrations.CreateModel(
            name='dtp_card',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Kart_ID', models.BigIntegerField()),
                ('Dtp_V', models.TextField()),
                ('K_Uch', models.IntegerField()),
                ('K_Ts', models.IntegerField()),
                ('Date', models.DateTimeField()),
                ('Ran', models.IntegerField()),
                ('Pog', models.IntegerField()),
                ('Osv', models.TextField()),
                ('S_pch', models.TextField()),
                ('Change_org_motion', models.TextField()),
                ('Ndu', models.TextField()),
                ('S_pog', models.TextField()),
                ('Sdor', models.TextField()),
                ('Factor', models.TextField()),
                ('geom', django.contrib.gis.db.models.fields.PointField(null=True, srid=4326)),
            ],
        ),
        migrations.CreateModel(
            name='dtp_comments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Area_name', models.TextField()),
                ('user_name', models.TextField()),
                ('date', models.DateTimeField(blank=True, null=True)),
                ('comment', models.TextField()),
            ],
        ),
    ]