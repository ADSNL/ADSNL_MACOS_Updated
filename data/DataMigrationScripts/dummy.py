import pyodbc
import connections as conn
cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()

oldClothings = cursor_old.execute('Select C.Clothing_ID, C.Price From Clothing As C')
count = 0

for row in oldClothings:
    cursor_new.execute('UPDATE Product_Info SET Prod_Price = ? WHERE Prod_SKU = ?',
                       row[1], row[0])
    count += 1

cursor_new.commit()
print(count)                           