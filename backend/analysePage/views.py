from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from .models import AuthUser
import bcrypt
import json
import jwt

from django.core.files.storage import FileSystemStorage


#model imports
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import accuracy_score, precision_score,confusion_matrix,f1_score,recall_score

gnb = GaussianNB()
svm = SVC()
dt = tree.DecisionTreeClassifier()
rf = RandomForestClassifier(n_estimators = 25)
ada = AdaBoostClassifier()
lr=LogisticRegression(random_state=0)



# Create your views here.

def analysefun(datasetSelected,datasetFile,datasetOuputCol,classifier,kval):
    res=[]
    global df,x,y,X_train, X_test,y_train,y_test
    
    dataset=datasetSelected

    datasets = {
        "diabetes"     : {
            "path"  : "diabetes.csv",
            "target": "Outcome",
        },
        "heartStroke"  : {
            "path"  : "strokes.csv",
            "target": "stroke",
        },
    }

    if dataset in datasets:
        current_dataset = datasets[dataset]
        df = pd.read_csv(f"csvfiles/{current_dataset['path']}")
        y = df[current_dataset['target']]
        x = df.drop(
            current_dataset['target'],
            axis = 1
        )
        X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = 0.25)
    elif dataset=="customDataset":
        fs = FileSystemStorage()
        filePathName = fs.save(datasetFile.name,datasetFile)
        filePathName = fs.url(filePathName)
        filePath = '.'+filePathName
        df = pd.read_csv(filePath)

        y = df[datasetOuputCol]
        x = df.drop(datasetOuputCol,axis = 1)
        X_train, X_test,y_train,y_test = train_test_split(x,y,test_size = 0.25)


    models = {
        "svm"               : SVC(),
        "decisionTree"      : tree.DecisionTreeClassifier(),
        "randomForest"      : RandomForestClassifier(n_estimators = 25),
        "naiveBayes"        : GaussianNB(),
        "knn"               : KNeighborsClassifier(n_neighbors=int(kval)),
        "logisticRegression":LogisticRegression(random_state=0),
    }
    
    model = models[classifier]
    model.fit(X_train,y_train)
    y_pred      = model.predict(X_test)
    accuracy    = accuracy_score(y_test, y_pred)
    precisons   = precision_score(y_test, y_pred, average='weighted')
    cm          = confusion_matrix(y_test, y_pred)
    f1score     = f1_score(y_test, y_pred, average='weighted')
    recall      = recall_score(y_test,y_pred,average='weighted')

    res.append({
        'classifier'    : classifier,
        'accuracy'      : accuracy * 100,
        'precisons'     : precisons,
        'f1score'       : f1score,
        'recall'        : recall,
        'cm'            : cm.tolist()
    })

    return res


def analysePage(request):
    if not auth(request):
        return JsonResponse({'error':'not authenticated'},status=401)
        
    result =[]
    dataset_data=[]
    global datasetSelected,datasetFile,datasetOuputCol,classifierList
    datasetFile=""
    datasetOuputCol=""
    #taking data from frontend
    datasetSelected = request.POST['datasetSel'] 
    if datasetSelected=='customDataset':
        datasetFile=request.FILES['datasetFile']
        #print(datasetFile)
        datasetOuputCol=request.POST['datasetOuputCol']
    classifierList=json.loads(request.POST['classifierList'])

    
    dataset_data.append({'datasetSelected':datasetSelected})
    result.append(dataset_data)
   
    #print((classifierList))
    for i in classifierList:
        classifier=i['select']
        kval=i['number']
        temp=analysefun(datasetSelected,datasetFile,datasetOuputCol,classifier,kval)
        result.append(temp)
    return JsonResponse(result,safe=False)

    #calling the function to analyse the dataset
    
    #print(datasetFile)
    #print(datasetSelected)
    #print(datasetOuputCol)
    #print(classifierList)
    return JsonResponse(result, safe=False)

def test(get,post):
    return JsonResponse({'test':'test'}, safe=False)


def register(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        email = body['email']
        password = body['password']

        if not (email and password):
            return JsonResponse({'success': False, 'error': 'Email and password are required'}, safe=False, status=404)
        if email == '' or password == '':
            return JsonResponse({'success': False, 'error': 'Email and password are required'}, safe=False, status=404)
        
        if AuthUser.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email already exists'}, safe=False, status=401)

        rawPassword = password.encode('utf-8')
        hashedPassword = bcrypt.hashpw(rawPassword, bcrypt.gensalt(12))

        
        user = AuthUser(email=email, password=hashedPassword.decode('utf-8'))
        user.save()
        return JsonResponse({'success': True}, safe=False, status=201)

def login(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        email = body['email']
        password = body['password']

        if not (email and password):
            return JsonResponse({'success': False, 'error': 'Email and password are required'}, safe=False, status=401)
        if email == '' or password == '':
            return JsonResponse({'success': False, 'error': 'Email and password are required'}, safe=False, status=404)
        
        if not AuthUser.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email does not exists'}, safe=False, status=401)

        user = AuthUser.objects.get(email=email)
        rawPassword = password.encode('utf-8')
        hashedPassword = user.password.encode('utf-8')

        print('password data', rawPassword, hashedPassword)

        if bcrypt.checkpw(rawPassword, hashedPassword):
            # generate jwt token
            header = {  
                "alg": "HS256",  
                "typ": "JWT"  
            }  
  
            payload = {
                'email': email,
            }  
  
            secret = "jwtsecret"  
            
            encoded_jwt = jwt.encode(payload, secret, algorithm='HS256', headers=header)
            return JsonResponse({'success': True, 'token': encoded_jwt}, safe=False, status=200)
        else:
            return JsonResponse({'success': False, 'error': 'Password is incorrect'}, safe=False, status=401)

def auth(request):
    token = request.headers.get('Authorization')

    if not token:
        return False
    
    try:
        decoded_token = jwt.decode(token, 'jwtsecret', algorithms=['HS256'])
    except:
        return False

    email = decoded_token['email']
    user = AuthUser.objects.get(email=email)

    if not user:
        return False
    
    return True