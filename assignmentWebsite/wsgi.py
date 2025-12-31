import os
import sys

path = "/home/janZ1234123/assignmentWebsite"
if path not in sys.path:
    sys.path.append(path)

os.environ["DJANGO_SETTINGS_MODULE"] = "assignmentWebsite.settings"

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
