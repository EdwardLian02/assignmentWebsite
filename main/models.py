# from django.db import models

# class ContactInquiry(models.Model):
#     first_name = models.CharField(max_length=80)
#     last_name = models.CharField(max_length=80)
#     email = models.EmailField()
#     phone = models.CharField(max_length=40, blank=True)
#     company = models.CharField(max_length=120)
#     country = models.CharField(max_length=60)  
#     job_title = models.CharField(max_length=120, blank=True)
#     industry = models.CharField(max_length=50)
#     service = models.CharField(max_length=50)
#     details = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.first_name} {self.last_name} - {self.company}"


# main/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class ContactInquiry(models.Model):
    # Existing fields
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length=80)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    company = models.CharField(max_length=120)
    job_title = models.CharField(max_length=120, blank=True)
    country = models.CharField(max_length=60)
    industry = models.CharField(max_length=50)
    service = models.CharField(max_length=50)
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    # New status tracking fields
    STATUS_CHOICES = [
        ('new', 'New Inquiry'),
        ('contacted', 'Contacted'),
        ('in_progress', 'In Progress'),
        ('qualified', 'Qualified Lead'),
        ('converted', 'Converted to Customer'),
        ('not_interested', 'Not Interested'),
        ('spam', 'Spam'),
    ]
    
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='new'
    )
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    priority = models.CharField(
        max_length=10, 
        choices=PRIORITY_CHOICES, 
        default='medium'
    )
    
    # Follow-up tracking
    assigned_to = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='assigned_inquiries'
    )
    
    last_contacted = models.DateTimeField(null=True, blank=True)
    next_follow_up = models.DateTimeField(null=True, blank=True)
    converted_at = models.DateTimeField(null=True, blank=True)
    
    # Internal notes
    internal_notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.company}"
    
    def mark_as_contacted(self):
        self.status = 'contacted'
        self.last_contacted = timezone.now()
        self.save()
    
    def set_follow_up(self, date_time):
        self.next_follow_up = date_time
        self.save()
    
    def convert_to_customer(self):
        self.status = 'converted'
        self.converted_at = timezone.now()
        self.save()
    
    class Meta:
        verbose_name_plural = "Contact Inquiries"
        ordering = ['-created_at']