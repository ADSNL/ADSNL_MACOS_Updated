import pyodbc


conn_new = pyodbc.connect('Driver={SQL Server};'
                          'Server=.\SQLEXPRESS;'
                          'Database=ADSNL;'
                          'Trusted_Connection=yes;')

conn_old = pyodbc.connect('Driver={SQL Server};'
                          'Server=adsndb.c0yzxuhp43yb.us-east-2.rds.amazonaws.com;'
                          'Database=MACOS;'
                          'UID=ADSNL;'
                          'PWD=ADSNL_2020;'
                          'Trusted_Connection=no;')


