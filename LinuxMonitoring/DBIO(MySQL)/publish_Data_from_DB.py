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
def CPU_Data_Query_Handler(IP):

        cur_IP = IP

        #FIND LASTEST DATA
        dbObj = DatabaseManager()
        sql_query = "select * from CPU_Data where IP=? and timestamp=(select max(timestamp) from CPU_Data where IP=?)"
        args=(cur_IP, cur_IP)
        dbObj.cur.execute(sql_query, args)
        row = dbObj.cur.fetchone()
        del dbObj

        #return cpu_usage
        return row[3]

# Function to save MEM to DB Table
def MEM_Data_Query_Handler(IP):

        cur_IP = IP

        #FIND LASTEST DATA
        dbObj = DatabaseManager()
        sql_query = "select * from MEM_Data where IP=? and timestamp=(select max(timestamp) from MEM_Data where IP=?)"
        args=(cur_IP, cur_IP)
        dbObj.cur.execute(sql_query, args)
        row = dbObj.cur.fetchone()
        result = (row[3], row[4])
        del dbObj

        #return tuple [nom_mem, act_mem]
        return result

# Function to save SWAP to DB Table
def SWAP_Data_Query_Handler(IP):

        cur_IP = IP

        #FIND LASTEST DATA
        dbObj = DatabaseManager()
        sql_query = "select * from SWAP_Data where IP=? and timestamp=(select max(timestamp) from SWAP_Data where IP=?)"
        args=(cur_IP, cur_IP)
        dbObj.cur.execute(sql_query, args)
        row = dbObj.cur.fetchone()
        del dbObj

        #return swap_usage
        return row[3]

# Function to save IO to DB Table
def IO_Data_Query_Handler(IP):

        cur_IP = IP

        #FIND LASTEST DATA
        dbObj = DatabaseManager()
        sql_query = "select * from IO_Data where IP=? and timestamp=(select max(timestamp) from IO_Data where IP=?)"
        args=(cur_IP, cur_IP)
        dbObj.cur.execute(sql_query, args)
        row = dbObj.cur.fetchone()
        result = (row[3], row[4])
        del dbObj

        #return tuple [io_read, io_write]
        return result

# Function to save LIST to DB Table
def LIST_Data_Query_Handler(IP):

	cur_IP = IP

	#FIND LASTEST DATA
	dbObj = DatabaseManager()
	sql_query = "select * from LIST_Data where IP=? and timestamp=(select max(timestamp) from LIST_Data where IP=?)"
	args=(cur_IP, cur_IP)
	dbObj.cur.execute(sql_query, args)
	rows = dbObj.cur.fetchall()
	payload = []
	content = {}
	for result in rows :
		content = {'PID' : result[4], 'Page Fault' : str(result[5]), 'Cpu Usage' : str(result[6]), 'Rss' : str(result[7])}
		payload.append(content)
		content = {}
	c = ','.join(map(str, payload))

	print(c)

	del dbObj

	#return c
	return c


#===============================================================
# Master Function to Select DB Funtion based on MQTT Topic

def publish_Data_Handler(Topic, IP):
        if Topic == "mon/storeDB/CPU":
                return CPU_Data_Query_Handler(IP)
        elif Topic == "mon/storeDB/MEM":
                return MEM_Data_Query_Handler(IP)
        elif Topic == "mon/storeDB/SWAP":
                return SWAP_Data_Query_Handler(IP)
        elif Topic == "mon/storeDB/IO":
                return IO_Data_Query_Handler(IP)
        elif Topic == "mon/storeDB/LIST":
                return LIST_Data_Query_Handler(IP)

#===============================================================

