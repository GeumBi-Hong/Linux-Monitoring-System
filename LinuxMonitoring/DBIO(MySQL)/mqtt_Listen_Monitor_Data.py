#------------------------------------------
#--- Author: Marvin (LEE GYU)
#--- Date: 11th September 2020
#--- Version: 1.0
#--- Python Ver: 2.7
#--- Details At: https://iotbytes.wordpress.com/store-mqtt-data-from-sensors-into-sql-database/
#--- Reference: This document is based on 'Pradeep Singh's work from
#--- => https://iotbytes.wordpress.com/store-mqtt-data-from-sensors-into-sql-database/
#------------------------------------------

import paho.mqtt.client as mqtt
import json
import socket
from store_Data_to_DB import store_Data_Handler
from publish_Data_from_DB import publish_Data_Handler

# MQTT Settings
MQTT_Broker = "192.168.25.2"
#MQTT_Broker = "54.180.90.198"
MQTT_Port = 1883
MQTT_Topic_storeDB = "mon/storeDB/#"

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

#Save Data into DB Table
def on_message(mosq, obj, msg):
        # This is the Master Call for saving MQTT Data into DB
        # For details of "monitor_Data_Handler" function please refer "store_data_to_db.py"

        data = str(msg.payload.decode("utf-8", "ignore"))
        json_data = (json.loads(data))

        if msg.topic == "mon/storeDB/LIST" :
                IP = json_data['list'][0]['IP']
        else :
                IP = json_data['IP']

        hexIP = socket.inet_aton(IP).hex()
        print(IP)

        print("MQTT Data Received...")
        print("MQTT Topic: " + msg.topic)
#       print("Data: " + data)
        store_Data_Handler(msg.topic, data)

        result = publish_Data_Handler(msg.topic, IP)

        # Publish recent Datas from DB
        if msg.topic == "mon/storeDB/CPU" :
                pub_data = str(hexIP) + repr(result)
                print ("Got recent CPU Data from Database.")
                print ("CPU_Data(Hex): " + pub_data)
                client.publish("mon/getDB/CPU", pub_data)
        elif msg.topic == "mon/storeDB/MEM" :
                pub_data = str(hexIP) + repr(result[0])
                pub_data2 = str(hexIP) + repr(result[1])
                print ("Got recent MEM Data from Database.")
                print ("MEM_Data1(Hex): " + pub_data)
                print ("MEM_Data2(Hex): " + pub_data2)
                client.publish("mon/getDB/MEM/nom", pub_data)
                client.publish("mon/getDB/MEM/act", pub_data2)
        elif msg.topic == "mon/storeDB/SWAP" :
                pub_data = str(hexIP) + repr(result)
                print ("Got recent SWAP Data from Database.")
                print ("SWAP_Data(Hex): " + pub_data)
                client.publish("mon/getDB/SWAP", pub_data)
        elif msg.topic == "mon/storeDB/IO" :
                pub_data = str(hexIP) + repr(result[0])
                pub_data2 = str(hexIP) + repr(result[1])
                print ("Got recent IO Data from Database.")
                print ("IO_Data1(Hex): " + pub_data)
                print ("IO_Data2(Hex): " + pub_data2)
                client.publish("mon/getDB/IO/read", pub_data)
                client.publish("mon/getDB/IO/write", pub_data2)
        elif msg.topic == "mon/storeDB/LIST" :
                print ("Got recent LIST Data from Database.")
                pub_data = str(hexIP) + result
                client.publish("mon/getDB/LIST", pub_data)


# Create New Client
client = mqtt.Client()

# CALL BACK FUC SETTING
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_subscribe = on_subscribe
client.on_message = on_message

# address : localhost, port: 1883  connect
#INPUT YOUR BROKER IP AD PROT NUM
#client.connect('54.180.90.198', 1883)
client.connect(MQTT_Broker, int(MQTT_Port))

# INPUT Subscribe Topic
client.subscribe(MQTT_Topic_storeDB, 1)
client.loop_forever()


