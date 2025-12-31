# custom_admin/urls.py
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'custom_admin'

urlpatterns = [
    # Authentication
    path('login/', auth_views.LoginView.as_view(
        template_name='custom_admin/login.html',
        redirect_authenticated_user=True
    ), name='login'),
    
    path('logout/', auth_views.LogoutView.as_view(
        next_page='/custom-admin/login/'
    ), name='logout'),
    
    # Dashboard
    path('dashboard/', views.admin_dashboard, name='dashboard'),
    
    # Inquiries
    path('inquiries/', views.inquiry_list, name='inquiry_list'),
    path('inquiries/<int:inquiry_id>/', views.inquiry_detail, name='inquiry_detail'),
    
    # Inquiry Management
    path('inquiries/<int:inquiry_id>/update-status/', 
         views.update_inquiry_status, name='update_inquiry_status'),
    path('inquiries/<int:inquiry_id>/add-note/', 
         views.add_inquiry_note, name='add_inquiry_note'),
    path('inquiries/<int:inquiry_id>/follow-up/', 
         views.create_follow_up, name='create_follow_up'),
    
    # Follow-up Tasks
    path('follow-up/<int:task_id>/complete/', 
         views.mark_follow_up_completed, name='mark_follow_up_completed'),
    
    # Export
    path('export/', views.export_inquiries, name='export_inquiries'),
    
    # API
    path('api/stats/', views.get_stats_data, name='get_stats_data'),
]