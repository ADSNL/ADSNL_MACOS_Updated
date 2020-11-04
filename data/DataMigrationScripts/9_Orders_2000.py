import pyodbc
import connections as conn
cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old_local.cursor()
oldOrderMasterData = cursor_old.execute('SELECT order_id, customer_id, CAST(order_date AS DATETIME) + CAST(order_time AS DATETIME) as O_DateTime FROM Order_Master_2000v2')

count = 0
detailscount = 0
rows = oldOrderMasterData.fetchall()

for row in rows:
    cursor_new.execute('Insert Into Order_Master (Customer_ID, Order_DateTime) Values (?,?)',
                       row[1], row[2])

    oldOrderDetailsData = cursor_old.execute('SELECT order_detail_id, product_id, product_media_id, price FROM Order_Detail_2000v2 WHERE order_id = ?', row[0])
   
    last = cursor_new.execute("SELECT IDENT_CURRENT('Order_Master')")
    lastval = 0

    for lastrow in last:
        lastval = lastrow[0] 

    for val in oldOrderDetailsData:
        cursor_new.execute('Insert Into Order_Details (Order_ID, Prod_SKU, Product_Media_ID, Price) Values (?,?,?,?)',
                       lastval , val[1], val[2], val[3])
        detailscount = detailscount + 1                       

    count = count + 1
    print("Executing", count)

cursor_new.commit()
print(count,"Master Orders added successfully!")
print(count,"detailscount Details added successfully!") 