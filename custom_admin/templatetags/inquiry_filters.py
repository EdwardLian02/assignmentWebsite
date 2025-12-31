# custom_admin/templatetags/inquiry_filters.py
from django import template
from main.models import ContactInquiry

register = template.Library()

@register.filter
def filter_by_status(queryset, status):
    """Filter a queryset by status"""
    if hasattr(queryset, 'filter'):
        return queryset.filter(status=status)
    return queryset

@register.filter
def filter_by_priority(queryset, priority):
    """Filter a queryset by priority"""
    if hasattr(queryset, 'filter'):
        return queryset.filter(priority=priority)
    return queryset

@register.filter
def get_status_display(status_code):
    """Get display name for status code"""
    status_dict = dict(ContactInquiry.STATUS_CHOICES)
    return status_dict.get(status_code, status_code)

@register.filter
def get_priority_display(priority_code):
    """Get display name for priority code"""
    priority_dict = dict(ContactInquiry.PRIORITY_CHOICES)
    return priority_dict.get(priority_code, priority_code)

@register.filter
def status_color(status):
    """Return CSS class for status badge"""
    color_map = {
        'new': 'bg-primary',
        'contacted': 'bg-info',
        'in_progress': 'bg-warning',
        'qualified': 'bg-success',
        'converted': 'bg-success',
        'not_interested': 'bg-secondary',
        'spam': 'bg-danger'
    }
    return color_map.get(status, 'bg-secondary')

@register.filter
def priority_color(priority):
    """Return CSS class for priority badge"""
    color_map = {
        'urgent': 'bg-danger',
        'high': 'bg-warning',
        'medium': 'bg-info',
        'low': 'bg-secondary'
    }
    return color_map.get(priority, 'bg-secondary')

@register.simple_tag
def query_transform(request, **kwargs):
    """
    Returns the URL-encoded querystring for the current page,
    updating the params with the key/value pairs passed to the tag.
    
    Example usage: {% query_transform request page=page_obj.next_page_number %}
    """
    updated = request.GET.copy()
    for k, v in kwargs.items():
        if v is not None:
            updated[k] = v
        else:
            updated.pop(k, None)
    
    return updated.urlencode()

