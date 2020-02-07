from flask import Flask
import pyrebase 

config={
  "apiKey": "AIzaSyCKY7quMaY6AR76MwersdPvUqTLDEu3AKM",
  "authDomain": "cool-d58c6.firebaseapp.com",
  "databaseURL": "https://cool-d58c6.firebaseio.com",
  "projectId": "cool-d58c6",
  "storageBucket": "cool-d58c6.appspot.com",
  "messagingSenderId": "333224819338",
  "appId": "1:333224819338:web:6bd1ea7ed4729f05"
}

firebase = pyrebase.initialize_app(config)

db= firebase.database()

db.child("names").push({"name":"tsk"})



@app.route("/")
def home_page():
    online_users = mongo.db.users.find({"online": True})
    return online_users




if __name__ == "__main__":
    app.run(debug=True, port=7000)

