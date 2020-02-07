import pyrebase 

config={
  "apiKey": "AIzaSyAcCrQDXL4NfjwRbldL7id0TtgvYgkb8gc",
  "authDomain": "aztech-e3e7f.firebaseapp.com",
  "databaseURL": "https://aztech-e3e7f.firebaseio.com",
  "projectId": "aztech-e3e7f",
  "storageBucket": "aztech-e3e7f.appspot.com",
  "messagingSenderId": "1056871715099",
  "appId": "1:1056871715099:web:ac57e407031b02728143be"
}

firebase = pyrebase.initialize_app(config)

db= firebase.database()

db.child("names").set({"name":"tsk"})

