#------------------------------------------
#--- Author: Marvin (LEE GYU)
#--- Date: 11th September 2020
#--- Version: 1.0
#--- Python Ver: 2.7
#--- Details At: https://iotbytes.wordpress.com/store-mqtt-data-from-sensors-into-sql-database/
#--- Reference: This document is based on 'Pradeep Singh's work from
#--- => https://iotbytes.wordpress.com/store-mqtt-data-from-sensors-into-sql-database/
#------------------------------------------

import sqlite3

# SQLite DB Name
DB_Name =  "Monitor.db"

# SQLite DB Table Schema
TableSchema="""
drop table if exists CPU_Data;
create table CPU_Data (
  id integer primary key autoincrement,
  IP text,
  timestamp integer,
  cpu_usage real
);


drop table if exists MEM_Data ;
create table MEM_Data (
  id integer primary key autoincrement,
  IP text,
  timestamp integer,
  nom_mem real,
  act_mem real
);

drop table if exists SWAP_Data ;
create table SWAP_Data (
  id integer primary key autoincrement,
  IP text,
  timestamp integer,
  swap_usage real
);

drop table if exists IO_Data ;
create table IO_Data (
 id integer primary key autoincrement,
 IP text,
 timestamp integer, 
 io_read real,
 io_write real
);

drop table if exists LIST_Data ;
create table LIST_Data (
  id integer primary key autoincrement,
  IP text,
  timestamp integer,
  pid integer,
  path text,
  maj_flt integer,
  cpu_usage real,
  rss integer
);
"""

#Connect or Create DB File
conn = sqlite3.connect(DB_Name)
curs = conn.cursor()

#Create Tables
sqlite3.complete_statement(TableSchema)
curs.executescript(TableSchema)

#Close DB
curs.close()
conn.close()

