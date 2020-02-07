import app

from flask import Flask, request

from flask import jsonify


app= Flask(__name__)

@app.route("/prof/subjects/",methods=['GET','POST'])
def subjects(request):
   if request.method =='POST':
       data=[]
      
       prof_name= request.form['name']
       ref= db.reference('prof/{0}/subjects', format(prof_name))
       snapshot= ref.get()
       for key in snapshot.items():
           data.append(key)
       return jsonify(data)

@app.route("/prof/subjects/<data>", methods=['GET','POST'])
def subject_students(request, data):
   


if __name__ == "__main__":
    app.run(debug=True, port=7000)

