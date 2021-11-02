#------------------------------------------
#--- Author: Marvin (LEE GYU)
#--- Date: 11th September 2020
#--- Version: 1.0
#--- Python Ver: 2.7
#--- Details At: https://iotbytes.wordpress.com/store-mqtt-data-from-sensors-into-sql-database/
#--- Reference: This document is based on 'Pradeep Singh's work from
#--- => https://iotbytes.wordpress.com/store-mqtt-data-from-sensors-into-sql-database/
#------------------------------------------


import json
import sqlite3

# SQLite DB Name
DB_Name =  "Monitor.db"

#===============================================================
# Database Manager Class

class DatabaseManager():
        def __init__(self):
                self.conn = sqlite3.connect(DB_Name)
                self.conn.execute('pragma foreign_keys = on')
                self.conn.commit()
                self.cur = self.conn.cursor()

        def add_del_update_db_record(self, sql_query, args=()):
                self.cur.execute(sql_query, args)
                self.conn.commit()
                return

        def __del__(self):
                self.cur.close()
                self.conn.close()

#===============================================================
# Functions to push Monitor Data into Database

# Function to save CPU to DB Table
def CPU_Data_Handler(jsonData):
        #Parse Data
        json_Dict = json.loads(jsonData)
        IP = json_Dict['IP']
        timestamp = json_Dict['timestamp']
        cpu_usage = json_Dict['cpu_usage']

        #Push into DB Table
        dbObj = DatabaseManager()
        dbObj.add_del_update_db_record("insert into CPU_Data (IP, timestamp, cpu_usage) values (?,?,?)",[IP, timestamp, cpu_usage])
        del dbObj
        print ("Inserted CPU Data into Database.")
        print ("")

# Function to save MEM to DB Table
def MEM_Data_Handler(jsonData):
        #Parse Data
        json_Dict = json.loads(jsonData)
        IP = json_Dict['IP']
        timestamp = json_Dict['timestamp']
        nom_mem = json_Dict['nom_mem']
        act_mem = json_Dict['act_mem']

        #Push into DB Table
        dbObj = DatabaseManager()
        dbObj.add_del_update_db_record("insert into MEM_Data (IP, timestamp, nom_mem, act_mem) values (?,?,?,?)",[IP, timestamp, nom_mem, act_mem])
        del dbObj
        print ("Inserted MEM Data into Database.")
        print ("")

# Function to save SWAP to DB Table
def SWAP_Data_Handler(jsonData):
	#Parse Data
	json_Dict = json.loads(jsonData)
	IP = json_Dict['IP']
	timestamp = json_Dict['timestamp']
	swap_usage = json_Dict['swap_usage']

	#Push into DB Table
	dbObj = DatabaseManager()
	dbObj.add_del_update_db_record("insert into SWAP_Data (IP, timestamp, swap_usage) values (?,?,?)",[IP, timestamp, swap_usage])
	del dbObj
	print ("Inserted SWAP Data into Database.")
	print ("")

# Function to save IO to DB Table
def IO_Data_Handler(jsonData):
        #Parse Data
        json_Dict = json.loads(jsonData)
        IP = json_Dict['IP']
        timestamp = json_Dict['timestamp']
        io_read = json_Dict['io_read']
        io_write = json_Dict['io_write']

        #Push into DB Table
        dbObj = DatabaseManager()
        dbObj.add_del_update_db_record("insert into IO_Data (IP, timestamp, io_read, io_write) values (?,?,?,?)",[IP, timestamp, io_read, io_write])
        del dbObj
        print ("Inserted IO Data into Database.")
        print ("")

# Function to save LIST to DB Table
def LIST_Data_Handler(jsonData):
        jsonArray = json.loads(jsonData)
        jsonList=[]
        for json_Dict in jsonArray['list']:
                #Parse Data
                jsonTuple = (json_Dict['IP'], json_Dict['timestamp'], json_Dict['pid'], json_Dict['path'], json_Dict['maj_flt'], json_Dict['cpu_usage'], json_Dict['rss'])
                jsonList.append(jsonTuple)

        #Push into DB Table
        dbObj = DatabaseManager()
        dbObj.cur.executemany("insert into LIST_Data (IP, timestamp, pid, path, maj_flt, cpu_usage, rss) values (?,?,?,?,?,?,?)", jsonList)
        dbObj.conn.commit()
        del dbObj
        print ("Inserted LIST Data into Database.")
        print ("")


#===============================================================
# Master Function to Select DB Funtion based on MQTT Topic

def store_Data_Handler(Topic, jsonData):
        if Topic == "mon/storeDB/CPU":
                CPU_Data_Handler(jsonData)
        elif Topic == "mon/storeDB/MEM":
                MEM_Data_Handler(jsonData)
        elif Topic == "mon/storeDB/SWAP":
                SWAP_Data_Handler(jsonData)
        elif Topic == "mon/storeDB/IO":
                IO_Data_Handler(jsonData)
        elif Topic == "mon/storeDB/LIST":
                LIST_Data_Handler(jsonData)

#===============================================================

