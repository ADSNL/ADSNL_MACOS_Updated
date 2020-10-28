import pyodbc
import connections as conn

cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()

oldClothings = cursor_old.execute('Select C.Clothing_ID, C.Clothing_Name, C.Clothing_Brand_ID, C.ASIN, C.Item_Model_Number, C.Price, CB.Clothing_Brand_Name From Clothing as C join Clothing_Brands as CB on C.Clothing_Brand_ID = CB.Clothing_Brand_ID Order by C.Clothing_ID')
count = 0

for row in oldClothings:
    Clothing_Brand_ID = 0
    Brand = cursor_new.execute('SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[6])
    
    for Brandrow in Brand:
        Clothing_Brand_ID = Brandrow[0]

    if(Clothing_Brand_ID == 0):
        cursor_new.execute('Insert Into Brand Values(?)', row[6])
        Brand = cursor_new.execute(
            'SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[6])
        for Brandrow in Brand:
            Clothing_Brand_ID = Brandrow[0]

    cursor_new.execute('Insert Into Product_Info (Prod_SKU, Dept_ID, Brand_ID, Prod_Name, Prod_ASIN, Prod_Model_Number) Values (?,2,?,?,?,?)',
                       row[0], Clothing_Brand_ID, row[1], row[3], row[4])
    count = count + 1

conn.conn_new.commit()
print(str(count) + ' rows interted successfully!')