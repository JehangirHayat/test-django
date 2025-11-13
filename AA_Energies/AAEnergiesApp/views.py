from django.http import JsonResponse
from django.shortcuts import render
import json
import csv
from django.contrib.auth.hashers import check_password
from .models import UserProfile
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.shortcuts import redirect
from .modelsResource import DataResources
import unicodedata
from tablib import Dataset
from django.http import HttpResponse

# Create your views here.
def login_view(request):
    return render(request, 'login.html')

def dashboard_view(request):
    return render(request, 'layouts/dashboard.html')

def logout_view(request):
    logout(request)
    return redirect('/login/')

def enegia_grafikoa_view(request):
    return render(request, 'EnegiaGrafikoa.html')

def potentzia_grafikoa_view(request):
    return render(request, 'PotentziaGrafikoa.html')

def tabla_dinamikoa_view(request):
    return render(request, 'TablaDinamikoa.html')

def tabla_estatikoa_view(request):
    return render(request, 'TablaEstatikoa.html')

@csrf_exempt
def login_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get("username")
            password = data.get("password")
            print(f"Login attempt for username: {username}")

            user = UserProfile.objects.filter(username=username).first()
            print(f"User found: {user is not None}")

            if user:
                password_match = user.check_password(password)
                print(f"Password match: {password_match}")
            else:
                password_match = False

            if user and password_match:
                print(f"Rol del usuario encontrado: {user.rol}")  # 👈 aquí mostramos el rol
                return JsonResponse({
                    "success": True,
                    "message": "Login correcto",
                    "username": user.username,
                    "rol": user.rol,
                })
            else:
                return JsonResponse({
                    "success": False,
                    "message": "Usuario o contraseña incorrectos"
                })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": f"Error del servidor: {e}"
            })
    return JsonResponse({
        "success": False,
        "message": "Método no permitido"
    }, status=405)



def import_data(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        file_extension = file.name.split('.')[-1].lower()
        resource = DataResources()
        dataset = Dataset()
        
        try:
            if file_extension == 'csv':
                file_content = file.read()
                encodings = ['utf-8-sig', 'utf-8', 'ISO-8859-1', 'latin-1', 'cp1252', 'windows-1252']
                content = None
            
                for encoding in encodings:
                    try:
                        content = file_content.decode(encoding)
                        print(f"✓ Archivo decodificado con: {encoding}")
                        break  
                    except (UnicodeDecodeError, AttributeError):
                        continue
                
                if content is None:
                    return JsonResponse({
                        "success": False,
                        "message": "No se pudo decodificar el archivo con ningún encoding"
                    }, status=400)
                
                # Normalizar el contenido para manejar tildes consistentemente
                import unicodedata
                content = unicodedata.normalize('NFC', content)
                
                try:
                    sniffer = csv.Sniffer()
                    sample = content[:2048]  
                    delimiter = sniffer.sniff(sample).delimiter
                    print(f"Delimitador detectado: '{delimiter}'")
                except:
                    delimiter = ';' if ';' in content[:1000] else ','
                    print(f"Delimitador por defecto: '{delimiter}'")
                
                # Debug: mostrar los headers
                first_line = content.split('\n')[0]
                print(f"Headers del CSV: {first_line}")
                
                dataset.load(content, format='csv', delimiter=delimiter)
                
        except Exception as e:
            print(f"Error al cargar archivo: {e}")
            return JsonResponse({
                "success": False,
                "message": f"Error al procesar el archivo: {str(e)}"
            }, status=400)
        
        result = resource.import_data(dataset, dry_run=True)
        
        if result.has_errors():
            errors = []
            for i, row_result in enumerate(result.rows, start=1):
                if row_result.errors:
                    for error in row_result.errors:
                        errors.append(f"Fila {i}: {error.error}")
                        print(f"Fila {i}: {error.error}")
            
            return JsonResponse({
                "success": False,
                "message": "El archivo contiene errores",
                "errors": errors
            }, status=400)
        
        final_result = resource.import_data(dataset, dry_run=False)
        print(f"Total filas: {len(final_result.rows)}")
        print(f"Nuevos: {final_result.totals.get('new', 0)}")
        print(f"Actualizados: {final_result.totals.get('update', 0)}")
        print(f"Omitidos: {final_result.totals.get('skip', 0)}")
        
        return JsonResponse({
            "success": True,
            "message": f"Datos importados: {final_result.totals.get('new', 0)} nuevos, {final_result.totals.get('update', 0)} actualizados."
        })
def export_data(request):
    export_format = request.GET.get('format', 'csv').lower()
    resource = DataResources()
    dataset = resource.export()
    
    if export_format == 'csv':
        response = HttpResponse(dataset.csv, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="datos.csv"'
    elif export_format == 'json':
        response = HttpResponse(dataset.json, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="datos.json"'
    elif export_format == 'xlsx':
        response = HttpResponse(dataset.xlsx, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="datos.xlsx"'
    else:
        return HttpResponse("Formato no válido", status=400)
    
    return response