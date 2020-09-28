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
    Category = cursor_new.execute('SELECT Cat_ID FROM Category Where Cat_Name = ?', row[7])
    
    for Categoryrow in Category:
        MK_Cat_ID = Categoryrow[0]

    if(MK_Cat_ID == 0):
        cursor_new.execute('Insert Into Category Values(3,?)', row[9])
        Category = cursor_new.execute(
            'SELECT Cat_ID FROM Category Where Cat_Name = ?', row[9])
        for Categoryrow in Category:
            MK_Cat_ID = Categoryrow[0]

    Mk_Brand_ID = 0
    Brand = cursor_new.execute('SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[8])
    
    for Brandrow in Brand:
        Mk_Brand_ID = Brandrow[0]

    if(Mk_Brand_ID == 0):
        cursor_new.execute('Insert Into Brand Values(?)', row[8])
        Brand = cursor_new.execute(
            'SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[8])
        for Brandrow in Brand:
            Mk_Brand_ID = Brandrow[0]

    cursor_new.execute('Insert Into Product_Info (Prod_SKU, Dept_ID, Cat_ID, Brand_ID, Makeup_Attribute_ID, Prod_Name, Prod_ASIN, Prod_Volume) Values (?,3,?,?,?,?,?,?)',
                       row[0], MK_Cat_ID, Mk_Brand_ID, MK_Attribute_ID, row[4], row[6], row[5])
    count = count + 1

conn_new.commit()
print(str(count) + ' rows interted successfully!')