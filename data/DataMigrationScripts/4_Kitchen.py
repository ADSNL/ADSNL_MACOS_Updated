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

oldKitchen = cursor_old.execute('SELECT K.Kitchen_Product_ID, K.Kitchen_Category_ID, K.Kitchen_Manufacturer_ID, K.Kitchen_Product_Name, K.ASIN, KC.Kitchen_Category_Name, KM.Kitchen_Manufacturer_Name FROM Kitchen AS K JOIN Kitchen_Categories AS KC on K.Kitchen_Category_ID = KC.Kitchen_Category_ID JOIN Kitchen_Manufacturers AS KM ON K.Kitchen_Manufacturer_ID = KM.Kitchen_Manufacturer_ID')

count = 0

for row in oldKitchen:
    K_Cat_ID = 0
    Category = cursor_new.execute('SELECT Cat_ID FROM Category Where Cat_Name = ?', row[5])
    
    for Categoryrow in Category:
        K_Cat_ID = Categoryrow[0]

    if(K_Cat_ID == 0):
        cursor_new.execute('Insert Into Category Values(4,?)', row[5])
        Category = cursor_new.execute(
            'SELECT Cat_ID FROM Category Where Cat_Name = ?', row[5])
        for Categoryrow in Category:
            K_Cat_ID = Categoryrow[0]

    k_Brand_ID = 0
    Brand = cursor_new.execute('SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[6])
    
    for Brandrow in Brand:
        k_Brand_ID = Brandrow[0]

    if(k_Brand_ID == 0):
        cursor_new.execute('Insert Into Brand Values(?)', row[6])
        Brand = cursor_new.execute(
            'SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[6])
        for Brandrow in Brand:
            k_Brand_ID = Brandrow[0]

    ASIN = row[4].strip()
    Name = row[3].strip()

    cursor_new.execute('Insert Into Product_Info (Prod_SKU, Dept_ID, Cat_ID, Brand_ID, Prod_Name, Prod_ASIN) Values (?,4,?,?,?,?)',
                       row[0], K_Cat_ID, k_Brand_ID, Name, ASIN)
    count = count + 1

conn_new.commit()
print(str(count) + ' rows interted successfully!')