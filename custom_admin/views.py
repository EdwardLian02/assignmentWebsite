# custom_admin/views.py (update the imports)
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import User  # Add this import
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
from django.db.models import Count, Q, Case, When, Value, IntegerField
from django.db.models.functions import TruncDay
from django.utils import timezone
from datetime import datetime, timedelta
import json
from main.models import ContactInquiry
from .models import InquiryNote, FollowUpTask


from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
from django.db.models import Count, Q, Case, When, Value, IntegerField
from django.db.models.functions import TruncDay
from datetime import datetime, timedelta
from .models import InquiryNote, FollowUpTask


# custom_admin/views.py (add these helper functions)
def get_pending_tasks():
    """Get all pending follow-up tasks (not completed, future dates)"""
    now = timezone.now()
    return FollowUpTask.objects.filter(
        completed=False,
        due_date__gte=now
    ).select_related('inquiry', 'assigned_to').order_by('due_date')[:10]

def get_overdue_tasks():
    """Get all overdue follow-up tasks (not completed, past dates)"""
    now = timezone.now()
    return FollowUpTask.objects.filter(
        completed=False,
        due_date__lt=now
    ).select_related('inquiry', 'assigned_to').order_by('due_date')[:10]


# Custom permission check
def is_admin_user(user):
    return user.is_staff or user.is_superuser

# custom_admin/views.py (update admin_dashboard function)
@login_required
@user_passes_test(is_admin_user)
def admin_dashboard(request):
    # Get all inquiries for counting
    all_inquiries = ContactInquiry.objects.all()
    
    # Get filter parameter
    status_filter = request.GET.get('status', 'all')
    
    # Get recent inquiries with filtering
    recent_inquiries = ContactInquiry.objects.all()
    
    # Apply status filter if not 'all'
    if status_filter != 'all':
        recent_inquiries = recent_inquiries.filter(status=status_filter)
    
    recent_inquiries = recent_inquiries.order_by('-created_at')[:10]
    
    # Get statistics
    now = timezone.now()
    today = now.date()
    week_ago = today - timedelta(days=7)
    
    # Total counts
    total_inquiries = all_inquiries.count()
    today_inquiries = ContactInquiry.objects.filter(created_at__date=today).count()
    week_inquiries = ContactInquiry.objects.filter(created_at__date__gte=week_ago).count()
    
    # Status counts (pre-calculate in view)
    new_inquiries = all_inquiries.filter(status='new').count()
    contacted_inquiries = all_inquiries.filter(status='contacted').count()
    converted_inquiries = all_inquiries.filter(status='converted').count()
    
    # Country distribution
    country_stats = ContactInquiry.objects.values('country').annotate(
        count=Count('country')
    ).order_by('-count')
    
    # Service distribution
    service_stats = ContactInquiry.objects.values('service').annotate(
        count=Count('service')
    ).order_by('-count')
    
    # Status statistics
    status_stats = ContactInquiry.objects.values('status').annotate(
        count=Count('status')
    ).order_by('status')
    
    # Priority statistics
    priority_stats = ContactInquiry.objects.values('priority').annotate(
        count=Count('priority')
    ).order_by('priority')
    
    # FIXED: Pending follow-ups - UNCOMPLETED tasks with future due dates
    pending_tasks = FollowUpTask.objects.filter(
        completed=False,
        due_date__gte=now
    ).select_related('inquiry', 'assigned_to').order_by('due_date')[:5]
    
    # FIXED: Overdue follow-ups - UNCOMPLETED tasks with past due dates
    overdue_tasks = FollowUpTask.objects.filter(
        completed=False,
        due_date__lt=now
    ).select_related('inquiry', 'assigned_to').order_by('due_date')[:5]
    
    # Monthly data for chart
    monthly_data = []
    for i in range(6):
        month_date = today - timedelta(days=30*i)
        month_start = month_date.replace(day=1)
        if i > 0:
            prev_month = (month_date - timedelta(days=30)).replace(day=1)
            month_count = ContactInquiry.objects.filter(
                created_at__date__gte=month_start,
                created_at__date__lt=prev_month
            ).count()
        else:
            month_count = ContactInquiry.objects.filter(
                created_at__date__gte=month_start
            ).count()
        
        monthly_data.append({
            'month': month_start.strftime('%b %Y'),
            'count': month_count
        })
    
    monthly_data.reverse()
    
    # If it's an AJAX request, return only the table
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # Return just the table HTML
        return render(request, 'custom_admin/partials/recent_inquiries.html', {
            'recent_inquiries': recent_inquiries,
            'status_filter': status_filter,
        })
    
    context = {
        'page_title': 'Admin Dashboard',
        'recent_inquiries': recent_inquiries,
        'status_filter': status_filter,  # Add this!
        'total_inquiries': total_inquiries,
        'today_inquiries': today_inquiries,
        'week_inquiries': week_inquiries,
        'new_inquiries': new_inquiries,
        'contacted_inquiries': contacted_inquiries,
        'converted_inquiries': converted_inquiries,
        'country_stats': country_stats[:10],
        'service_stats': service_stats,
        'status_stats': status_stats,
        'priority_stats': priority_stats,
        'pending_tasks': pending_tasks,
        'overdue_tasks': overdue_tasks,
        'monthly_data': json.dumps(monthly_data),
        'user': request.user,
        'now': now,
    }
    
    return render(request, 'custom_admin/dashboard.html', context)

@login_required
@user_passes_test(is_admin_user)
def inquiry_list(request):
    inquiries = ContactInquiry.objects.all().order_by('-created_at')
    
    # Get all distinct values for filter dropdowns
    countries = ContactInquiry.objects.values_list('country', flat=True).distinct()
    services = ContactInquiry.objects.values_list('service', flat=True).distinct()
    status_choices = dict(ContactInquiry.STATUS_CHOICES)
    priority_choices = dict(ContactInquiry.PRIORITY_CHOICES)
    
    # Filtering
    country_filter = request.GET.get('country', '')
    service_filter = request.GET.get('service', '')
    status_filter = request.GET.get('status', '')
    priority_filter = request.GET.get('priority', '')
    date_from = request.GET.get('date_from', '')
    date_to = request.GET.get('date_to', '')
    
    # Apply filters
    if country_filter:
        inquiries = inquiries.filter(country__icontains=country_filter)
    if service_filter:
        inquiries = inquiries.filter(service__icontains=service_filter)
    if status_filter:
        inquiries = inquiries.filter(status=status_filter)
    if priority_filter:
        inquiries = inquiries.filter(priority=priority_filter)
    if date_from:
        inquiries = inquiries.filter(created_at__date__gte=date_from)
    if date_to:
        inquiries = inquiries.filter(created_at__date__lte=date_to)
    
    context = {
        'page_title': 'Customer Inquiries',
        'inquiries': inquiries,
        'countries': countries,
        'services': services,
        'status_choices': status_choices,
        'priority_choices': priority_choices,
        'filters': {
            'country': country_filter,
            'service': service_filter,
            'status': status_filter,
            'priority': priority_filter,
            'date_from': date_from,
            'date_to': date_to,
        }
    }
    
    return render(request, 'custom_admin/inquiry_list.html', context)
@login_required
@user_passes_test(is_admin_user)
def inquiry_detail(request, inquiry_id):
    try:
        inquiry = ContactInquiry.objects.get(id=inquiry_id)
        notes = InquiryNote.objects.filter(inquiry=inquiry).order_by('-created_at')
        followup_tasks = FollowUpTask.objects.filter(inquiry=inquiry).order_by('due_date')
        all_users = User.objects.filter(is_staff=True).order_by('username')
    except ContactInquiry.DoesNotExist:
        return redirect('custom_admin:dashboard')
    
    context = {
        'page_title': f'Inquiry from {inquiry.first_name} {inquiry.last_name}',
        'inquiry': inquiry,
        'notes': notes,
        'followup_tasks': followup_tasks,
        'all_users': all_users,
        'status_choices': ContactInquiry.STATUS_CHOICES,
        'priority_choices': ContactInquiry.PRIORITY_CHOICES,
    }
    
    return render(request, 'custom_admin/inquiry_detail.html', context)

@login_required
@user_passes_test(is_admin_user)
def export_inquiries(request):
    # Simple export functionality
    inquiries = ContactInquiry.objects.all().order_by('-created_at')
    
    # In a real app, you'd generate CSV/Excel here
    # For now, we'll just show a count
    return JsonResponse({
        'message': f'Ready to export {inquiries.count()} inquiries',
        'count': inquiries.count()
    })

@login_required
@user_passes_test(is_admin_user)
def get_stats_data(request):
    # API endpoint for AJAX calls
    period = request.GET.get('period', 'week')
    
    data = {}
    today = timezone.now().date()
    
    if period == 'week':
        # Last 7 days
        for i in range(7):
            date = today - timedelta(days=i)
            count = ContactInquiry.objects.filter(created_at__date=date).count()
            data[date.strftime('%Y-%m-%d')] = count
    elif period == 'month':
        # Last 30 days
        for i in range(30):
            date = today - timedelta(days=i)
            count = ContactInquiry.objects.filter(created_at__date=date).count()
            data[date.strftime('%Y-%m-%d')] = count
    
    return JsonResponse(data)




@login_required
@user_passes_test(is_admin_user)
def update_inquiry_status(request, inquiry_id):
    inquiry = get_object_or_404(ContactInquiry, id=inquiry_id)
    
    if request.method == 'POST':
        status = request.POST.get('status')
        priority = request.POST.get('priority')
        assigned_to_id = request.POST.get('assigned_to')
        next_follow_up = request.POST.get('next_follow_up')
        notes = request.POST.get('notes', '').strip()
        
        if status in dict(ContactInquiry.STATUS_CHOICES).keys():
            inquiry.status = status
            
            if status == 'contacted':
                inquiry.last_contacted = timezone.now()
            elif status == 'converted':
                inquiry.converted_at = timezone.now()
        
        if priority in dict(ContactInquiry.PRIORITY_CHOICES).keys():
            inquiry.priority = priority
        
        if assigned_to_id:
            try:
                from django.contrib.auth.models import User
                user = User.objects.get(id=assigned_to_id)
                inquiry.assigned_to = user
            except User.DoesNotExist:
                pass
        
        if next_follow_up:
            try:
                inquiry.next_follow_up = datetime.fromisoformat(next_follow_up)
            except ValueError:
                pass
        
        inquiry.save()
        
        # Add note if provided
        if notes:
            InquiryNote.objects.create(
                inquiry=inquiry,
                user=request.user,
                note=notes
            )
        
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({
                'success': True,
                'message': 'Status updated successfully',
                'status': inquiry.get_status_display(),
                'priority': inquiry.get_priority_display()
            })
        
        messages.success(request, 'Inquiry status updated successfully.')
        return redirect('custom_admin:inquiry_detail', inquiry_id=inquiry.id)
    
    return JsonResponse({'success': False, 'error': 'Invalid request'}, status=400)

@login_required
@user_passes_test(is_admin_user)
def add_inquiry_note(request, inquiry_id):
    inquiry = get_object_or_404(ContactInquiry, id=inquiry_id)
    
    if request.method == 'POST':
        note_text = request.POST.get('note', '').strip()
        
        if note_text:
            InquiryNote.objects.create(
                inquiry=inquiry,
                user=request.user,
                note=note_text
            )
            
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': True,
                    'message': 'Note added successfully'
                })
            
            messages.success(request, 'Note added successfully.')
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': False,
                    'error': 'Note cannot be empty'
                }, status=400)
            
            messages.error(request, 'Note cannot be empty.')
    
    return redirect('custom_admin:inquiry_detail', inquiry_id=inquiry.id)

@login_required
@user_passes_test(is_admin_user)
def create_follow_up(request, inquiry_id):
    inquiry = get_object_or_404(ContactInquiry, id=inquiry_id)
    
    if request.method == 'POST':
        task = request.POST.get('task', '').strip()
        due_date_str = request.POST.get('due_date')
        assigned_to_id = request.POST.get('assigned_to', request.user.id)
        
        if task and due_date_str:
            try:
                # CRITICAL FIX: Handle timezone properly for Myanmar
                import pytz
                from django.utils.timezone import make_aware
                
                # The browser sends local datetime (Myanmar time)
                # Parse it as naive datetime
                naive_due_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00'))
                
                # Make it aware using Myanmar timezone
                myanmar_tz = pytz.timezone('Asia/Yangon')
                aware_due_date = myanmar_tz.localize(naive_due_date)
                
                FollowUpTask.objects.create(
                    inquiry=inquiry,
                    assigned_to=User.objects.get(id=assigned_to_id),
                    due_date=aware_due_date,
                    task=task
                )
                
                # Update inquiry's next follow-up date
                inquiry.next_follow_up = aware_due_date
                inquiry.save()
                
                messages.success(request, 'Follow-up task created successfully.')
            except (ValueError, User.DoesNotExist) as e:
                messages.error(request, f'Error creating follow-up: {str(e)}')
        else:
            messages.error(request, 'Task and due date are required.')
    
    return redirect('custom_admin:inquiry_detail', inquiry_id=inquiry.id)


@login_required
@user_passes_test(is_admin_user)
def mark_follow_up_completed(request, task_id):
    task = get_object_or_404(FollowUpTask, id=task_id)
    
    # Prevent auto-completion - only POST requests
    if request.method != 'POST':
        messages.error(request, 'Invalid request method.')
        return redirect('custom_admin:dashboard')
    
    # Double-check task is not already completed
    if task.completed:
        messages.info(request, 'Task was already completed.')
    else:
        # Get current status before changes
        previous_status = task.inquiry.status
        
        # Mark task as completed
        task.mark_completed()
        
        # NEW FEATURE: Auto-update inquiry status based on conditions
        inquiry = task.inquiry
        
        # Condition 1: If inquiry is "new" and this is a completed follow-up
        if previous_status == 'new':
            # Check if this is the first completed follow-up
            is_first_completed = FollowUpTask.objects.filter(
                inquiry=inquiry,
                completed=True
            ).count() == 1
            
            if is_first_completed:
                inquiry.status = 'contacted'
                inquiry.last_contacted = timezone.now()
                inquiry.save()
                
                # Log this status change as a note
                InquiryNote.objects.create(
                    inquiry=inquiry,
                    user=request.user,
                    note=f"Status automatically changed to 'Contacted' after completing first follow-up task: '{task.task}'"
                )
                
                status_message = 'Task completed and inquiry status updated to Contacted.'
            else:
                status_message = 'Task marked as completed.'
        else:
            status_message = 'Task marked as completed.'
        
        messages.success(request, status_message)
    
    # If this was the last pending task, clear the inquiry's next_follow_up
    inquiry = task.inquiry
    has_pending_tasks = FollowUpTask.objects.filter(
        inquiry=inquiry, 
        completed=False
    ).exists()
    
    if not has_pending_tasks:
        inquiry.next_follow_up = None
        inquiry.save()
    
    # Return to dashboard if coming from dashboard
    if request.GET.get('from_dashboard') or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({
                'success': True,
                'message': 'Task completed successfully',
                'task_id': task.id,
                'status_changed': inquiry.status == 'contacted' and previous_status == 'new',
                'new_status': inquiry.get_status_display(),
                'previous_status': previous_status
            })
        return redirect('custom_admin:dashboard')
    
    return redirect('custom_admin:inquiry_detail', inquiry_id=task.inquiry.id)