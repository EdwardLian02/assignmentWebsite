from django import forms
from django.core.validators import RegexValidator
from .models import ContactInquiry

# Phone number regex validator
phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
)

class ContactInquiryForm(forms.ModelForm):
    privacy_policy = forms.BooleanField(required=True)
    
    # Add custom validation for phone number
    phone = forms.CharField(
        validators=[phone_regex],
        max_length=17,
        widget=forms.TextInput(attrs={
            'pattern': r'\+?[\d\s\-\(\)]+',
            'title': 'Phone number (e.g., +1 (123) 456-7890 or 1234567890)'
        })
    )
    
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'pattern': r'[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$',
            'title': 'Please enter a valid email address (e.g., name@example.com)'
        })
    )

    class Meta:
        model = ContactInquiry
        fields = [
            "first_name", "last_name", "email", "phone",
            "company", "job_title", "industry", "country", "service", "details", 'privacy_policy'
        ]
    
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        # Clean the phone number (remove spaces, dashes, parentheses)
        if phone:
            phone = ''.join(filter(str.isdigit, phone))
            # Add country code if not present (assuming US/Canada)
            if len(phone) == 10 and not phone.startswith('1'):
                phone = '1' + phone
            elif len(phone) == 11 and phone.startswith('1'):
                phone = '+' + phone
            elif len(phone) == 10:
                phone = '+1' + phone
        return phone
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Additional email validation
            if not '@' in email:
                raise forms.ValidationError("Please enter a valid email address.")
            if email.count('@') > 1:
                raise forms.ValidationError("Email address can only contain one '@' symbol.")
            # Check for common invalid patterns
            if '..' in email.split('@')[1]:
                raise forms.ValidationError("Email domain cannot contain consecutive dots.")
        return email.lower()  # Normalize email to lowercase
    
    def clean_first_name(self):
        first_name = self.cleaned_data.get('first_name')
        if first_name:
            # Remove extra spaces
            first_name = ' '.join(first_name.split())
            # Check if name contains numbers
            if any(char.isdigit() for char in first_name):
                raise forms.ValidationError("First name cannot contain numbers.")
        return first_name
    
    def clean_last_name(self):
        last_name = self.cleaned_data.get('last_name')
        if last_name:
            # Remove extra spaces
            last_name = ' '.join(last_name.split())
            # Check if name contains numbers
            if any(char.isdigit() for char in last_name):
                raise forms.ValidationError("Last name cannot contain numbers.")
        return last_name
    
    def clean_company(self):
        company = self.cleaned_data.get('company')
        if company:
            # Remove extra spaces
            company = ' '.join(company.split())
            if len(company) < 2:
                raise forms.ValidationError("Company name is too short.")
        return company