# # custom_admin/models.py
# from django.db import models
# from django.contrib.auth.models import User

from django.db import models
from django.contrib.auth.models import User
from main.models import ContactInquiry
from django.utils import timezone

# custom_admin/models.py


class InquiryNote(models.Model):
    inquiry = models.ForeignKey(
        ContactInquiry, 
        on_delete=models.CASCADE, 
        related_name='notes'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Note by {self.user.username} on {self.created_at}"

class FollowUpTask(models.Model):
    inquiry = models.ForeignKey(
        ContactInquiry, 
        on_delete=models.CASCADE, 
        related_name='followup_tasks'
    )
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    due_date = models.DateTimeField()
    task = models.TextField()
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['due_date']
    
    def __str__(self):
        return f"Follow-up for {self.inquiry}"
    
    def mark_completed(self):
        self.completed = True
        self.completed_at = timezone.now()
        self.save()

    def is_first_completed_followup(self):
        """Check if this is the first completed follow-up for this inquiry"""
        # Count completed follow-ups before this one
        previous_completed = FollowUpTask.objects.filter(
            inquiry=self.inquiry,
            completed=True,
            completed_at__lt=self.completed_at if self.completed_at else timezone.now()
        ).count()
        
        return previous_completed == 0