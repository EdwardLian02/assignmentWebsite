from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import ContactInquiryForm
from django.http import JsonResponse


def index(request): 
    return render(request, 'main/index.html')

def gallery(request):
    return render(request, 'main/gallery.html')

def solution(request):
    return render(request, 'main/solution.html')


def event(request):
    return render(request, 'main/event.html')

def about(request):
    return render(request, 'main/about.html')

def case_studies(request):
  return render(request, 'main/case-studies.html')
def articles(request):
  return render(request, 'main/insights-articles.html')

def contact(request):
    form = ContactInquiryForm()  # Create empty form for GET requests
    
    if request.method == "POST":
        form = ContactInquiryForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({
                "success": True,
                "message": "Thank you! Your inquiry has been submitted."
            })
        else:
            # Return errors in a format the JavaScript can handle
            errors = {field: form.errors[field] for field in form.errors}
            return JsonResponse({
                "success": False,
                "errors": errors
            }, status=400)
    
    # Pass the form to the template for GET requests
    return render(request, 'main/contact.html', {'form': form})