from .models import AuthUser

def login(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'failed'}, safe=False)
    username = request.POST['username']
    password = request.POST['password']
    user = AuthUser.objects.filter(username=username, password=password)
    if user:
        return JsonResponse({'status': 'success', 'user': user[0].username}, safe=False)
    else:
        return JsonResponse({'status': 'failed'}, safe=False)