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

cursor_new = conn_new.cursor()
cursor_old = conn_old.cursor()

oldMakeUp = cursor_old.execute('SELECT M.Makeup_ID, M.Makeup_Category_ID, M.Makeup_Brand_ID, M.Makeup_Attribute_ID, M.Makeup_Name, M.Makeup_Volume, M.ASIN, MA.Makeup_Attribute_Name, MB.Makeup_Brand_Name, MC.Makeup_Category_Name FROM Makeup AS M JOIN Makeup_Attributes AS MA on M.Makeup_Attribute_ID = MA.Makeup_Attribute_ID JOIN Makeup_Brands AS MB on M.Makeup_Brand_ID = MB.Makeup_Brand_ID JOIN Makeup_Categories AS MC on M.Makeup_Category_ID = MC.Makeup_Category_ID')