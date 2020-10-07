import pyodbc
import connections as conn
cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()
oldChartData = cursor_old.execute('SELECT year, order_count FROM Chart_Data')

count = 0

for row in oldChartData:
    cursor_new.execute('Insert Into ChartData (Year, Order_Count) values(?,?)', row[0], row[1])
    count += 1

print(str(count) + ' Chart Data rows interted successfully!')    
oldDegree_Lookup = cursor_old.execute('SELECT Degree_Name FROM Degree_Lookup')
count = 0

for row in oldDegree_Lookup:
    cursor_new.execute('Insert Into Degree_Lookup (Degree_Name) values(?)', row[0])
    count += 1

print(str(count) + ' Degree Lookup rows interted successfully!')    

oldIncome_Lookup = cursor_old.execute('SELECT Income_LowerLimit, Income_UpperLimit FROM Income_Lookup')
count = 0

for row in oldIncome_Lookup:
    cursor_new.execute('Insert Into Income_Lookup (Income_LowerLimit,Income_UpperLimit) values(?,?)', row[0], row[1])
    count += 1

print(str(count) + ' Income Lookup rows interted successfully!')    

oldCreditCard_Lookup = cursor_old.execute('SELECT Credit_Card_Provider FROM Credit_Card_Lookup')
count = 0

for row in oldCreditCard_Lookup:
    cursor_new.execute('Insert Into CreditCard_Lookup (CreditCard_Provider) values(?)', row[0])
    count += 1

print(str(count) + ' CreditCard Lookup rows interted successfully!')

oldStreetType_Lookup = cursor_old.execute('SELECT Street_Type FROM Street_Type_Lookup')
count = 0

for row in oldStreetType_Lookup:
    cursor_new.execute('Insert Into StreetType_Lookup (Street_Type) values(?)', row[0])
    count += 1

print(str(count) + ' Street Type Lookup Lookup rows interted successfully!')

conn.conn_new.commit()
