from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

#URL pattern
urlpatterns = [
    path('', views.index, name='index'), 
    path('gallery/', views.gallery, name='gallery'), 
    path('solution/', views.solution, name='solution'), 
    path('event/', views.event, name='event'), 
    path('about/', views.about, name='about'), 
    path('case-studies/', views.case_studies, name='case-studies'), 
    path('articles/', views.articles, name='articles'), 

    path('contact/', views.contact, name='contact'), 
    
]
