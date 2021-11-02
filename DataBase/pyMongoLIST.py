
#How to operate : python mongoMongoList.py

#import paho-mqtt , pymongo ,dnspython <--srv use
import paho.mqtt.client as mqtt
import pymongo
from pymongo import MongoClient
import json
import socket
#MongoDB MongoClient connect
#EXAMPLE ID : geumbi PASSWORD: rodutls179 , INPUT YOUR ID,PS

client = pymongo.MongoClient('mongodb+srv://geumbi:rodutls179@cluster0.wveeu.mongodb.net/monitor?retryWrites=true&w=majority')
db = client['monitor']
collection = db['LIST']
#timestamp=0
#A=dict()
#mylist=[]

#CALL BACK -> Broker Connect
def on_connect(client, userdata, flags, rc):
        if rc == 0:
                print("connected OK")
        else:
                print("Bad connection Returned code=", rc)

#CALL BACK -> Broker Disconnect
def on_disconnect(client, userdata, flags, rc=0):
        print(str(rc))

# Topic Subscribe
def on_subscribe(client, userdata, mid, granted_qos):
        print("subscribed: " + str(mid) + " " + str(granted_qos))

#ArrivedMessege insert to MongoDB
def on_message(client, userdata, msg):
        #print messege
        #print(str(msg.payload.decode("utf-8")))
        post = json.loads('{\"list\" : [' + str(msg.payload.decode("utf-8", "ignore")) + ']}')
	#INSERT IN DB
        inserted = collection.insert_many(post['list'])
	#FIND LASTEST DATA
        for doc1 in collection.find().sort([('_id', -1)]).limit(1):
            timestamp=str(doc1.get("timestamp"))
            print(timestamp)
            IP=doc1.get("IP")


        mylist=[]
        for A in collection.find({"IP":"192.168.0.29","timestamp":timestamp},{'_id':0}):
           # print(A)
            mylist.append(A)


        c=",".join(map(str, mylist))
        print(c)
        print("=========================================================================")
        #print(type(pubb))
        #print(pubb)
        client.publish("mon/list/1",socket.inet_aton(IP).hex()+c)
# Create New Client
client = mqtt.Client()

# CALL BACK FUC SETTING
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_subscribe = on_subscribe
client.on_message = on_message

# address : localhost, port: 1883  connect
#INPUT YOUR BROKER IP AD PROT NUM
client.connect('54.180.90.198', 1883)
#client.connect('192.168.0.29', 1883)

# INPUT Subscribe Topic
client.subscribe('mon/list', 1)
client.loop_forever()
