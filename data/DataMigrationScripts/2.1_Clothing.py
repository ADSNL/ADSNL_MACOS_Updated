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

TypeCount = 0
Type = cursor_old.execute(
    'SELECT Clothing_ID, Clothing_Types.Clothing_Type_ID, Clothing_Types.Clothing_Type_Name from Clothing join Clothing_Types on Clothing.Clothing_Type_ID = Clothing_Types.Clothing_Type_ID')

for row in Type:
    Type_ID = 0

    Typ = cursor_new.execute('SELECT Type_ID FROM Type Where Type_Name = ?', row[2])

    for Typrow in Typ:
        Type_ID = Typrow[0]

    if(Type_ID == 0):
        cursor_new.execute('Insert Into Type Values(?)', row[2])
        Typ = cursor_new.execute('SELECT Type_ID FROM Type Where Type_Name = ?', row[2])
        
        for Typrow in Typ:
            Type_ID = Typrow[0]

    cursor_new.execute('Insert Into Type_Lookup (Prod_SKU, AutDir_ID) Values(?,?)', row[0], Type_ID)
    TypeCount = TypeCount + 1

print(str(TypeCount) + ' types interted successfully!')

conn_new.commit()
