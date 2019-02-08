from django.conf.urls import url
from . import views


urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^ajax/search/$',views.search ,name='search'),
        url(r'^ajax/logout/$',views.user_logout, name='user_logout'),
        url(r'^ajax/login/$',views.user_login, name='user_login'),
        url(r'^ajax/registr/$',views.user_registr, name='user_registr'),
        url(r'^ajax/addcomment/$',views.add_comment,name='add_comment'),
        url(r'^ajax/getcomment/$',views.get_comments,name='get_comment'),
        url(r'^ajax/foget/$',views.foget,name='foget'),
]
