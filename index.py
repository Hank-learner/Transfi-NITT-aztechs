import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://Aztech:Aztech@aztech-hpotq.mongodb.net/test?retryWrites=true&w=majority")
db =cluster["Aztechs"]
collection= db["Students"]

post= {"_id":0, "name":"tsk", "score":0}

collection.insert_one(post)
print("yop")