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

oldMakeUp = cursor_old.execute('SELECT M.Makeup_ID, M.Makeup_Category_ID, M.Makeup_Brand_ID, M.Makeup_Attribute_ID, M.Makeup_Name, M.Makeup_Volume,
'M.ASIN, MA.Makeup_Attribute_Name, MB.Makeup_Brand_Name, MC.Makeup_Category_Name
'FROM Makeup AS M JOIN Makeup_Attributes AS MA
'on M.Makeup_Attribute_ID = MA.Makeup_Attribute_ID
'JOIN Makeup_Brands AS MB
'on M.Makeup_Brand_ID = MB.Makeup_Brand_ID
'JOIN Makeup_Categories AS MC
'on M.Makeup_Category_ID = MC.Makeup_Category_ID')

count = 0

for row in oldMakeUp:
    MK_Attribute_ID = 0
    Attribute = cursor_new.execute('SELECT Makeup_Attribute_ID FROM Makeup_Attributes Where Makeup_Attribute_Name = ?', row[7])
    
    for Attributerow in Attribute:
        MK_Attribute_ID = Attributerow[0]

    if(MK_Attribute_ID == 0):
        cursor_new.execute('Insert Into Makeup_Attributes Values(?)', row[7])
        Attribute = cursor_new.execute(
            'SELECT Makeup_Attribute_ID FROM Makeup_Attributes Where Makeup_Attribute_Name = ?', row[7])
        for Attributerow in Attribute:
            MK_Attribute_ID = Attributerow[0]

    MK_Cat_ID = 0
    Category = cursor_new.execute('SELECT Makeup_Category_ID FROM Makeup_Categories Where Makeup_Category_Name = ?', row[7])
    
    for Categoryrow in Category:
        MK_Cat_ID = Categoryrow[0]

    if(MK_Cat_ID == 0):
        cursor_new.execute('Insert Into Makeup_Categories Values(3,?)', row[9])
        Category = cursor_new.execute(
            'SELECT Makeup_Category_ID FROM Makeup_Categories Where Makeup_Category_Name = ?', row[9])
        for Categoryrow in Category:
            MK_Cat_ID = Categoryrow[0]

    cursor_new.execute('Insert Into Product_Info (Prod_SKU, Dept_ID, Brand_ID, Prod_Name, Prod_ASIN, Prod_Model_Number) Values (?,2,?,?,?,?)',
                       row[0], Clothing_Brand_ID, row[1], row[3], row[4])
    count = count + 1

conn_new.commit()
print(str(count) + ' rows interted successfully!')