import pyodbc
import connections as conn
cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old_local.cursor()
oldCustomerMasterData = cursor_old.execute('SELECT Customer_ID, Customer_FName, Customer_LName, Sex, Birth_Date, Zip_Code, City, State, Street_Number, Street_Name, Street_Type, Degree_Type, Income_Type, Credit_Card_Type, Marital_Status_Type, Income FROM Customer_Master')

count = 0

for row in oldCustomerMasterData:

    income = row[15]
    incometype = 0
    if(income >= 25000.00 and income <= 50000.00):
        incometype = 1
    elif(income >= 50001.00 and income <= 100000.00):    
        incometype = 2
    elif(income >= 100001.00 and income <= 150000.00):    
        incometype = 3
    elif(income >= 150001.00 and income <= 200000.00):    
        incometype = 4
    elif(income >= 200001.00 and income <= 250000.00):    
        incometype = 5
    elif(income >= 250001.00 and income <= 300000.00):    
        incometype = 6
    elif(income >= 300001.00 and income <= 350000.00):    
        incometype = 7
    elif(income >= 350001.00 and income <= 400000.00):    
        incometype = 8
    elif(income >= 400001.00 and income <= 450000.00):    
        incometype = 9
    elif(income >= 450001.00 and income <= 500000.00):    
        incometype = 10
    elif(income >= 500001.00 and income <= 550000.00):    
        incometype = 11
    elif(income >= 550001.00 and income <= 600000.00):    
        incometype = 12
    elif(income >= 600001.00 and income <= 650000.00):    
        incometype = 13
    elif(income >= 650001.00 and income <= 700000.00):    
        incometype = 14
    elif(income >= 700001.00 and income <= 750000.00):    
        incometype = 15
    elif(income >= 750001.00 and income <= 800000.00):    
        incometype = 16
    elif(income >= 800001.00 and income <= 850000.00):    
        incometype = 17
    elif(income >= 850001.00 and income <= 900000.00):    
        incometype = 18
    elif(income >= 900001.00 and income <= 950000.00):    
        incometype = 19
    elif(income >= 950001.00 and income <= 1000000.00):    
        incometype = 20
            
    cursor_new.execute('Insert Into Customer_Master (Customer_FName, Customer_LName, Sex, Birth_Date, Zip_Code, City, State, Street_Number, Street_Name, StreetType_ID, Degree_ID, Income_ID, CreditCard_ID, Marital_Status_Type, Income) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], incometype, row[13], row[14], row[15])
    count += 1
    print("Executing", count)

cursor_new.commit()
print(count,"customers inserted successfully.")