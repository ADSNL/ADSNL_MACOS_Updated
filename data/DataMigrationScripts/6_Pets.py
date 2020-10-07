import pyodbc
import connections as conn
cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()
oldPets = cursor_old.execute('Select P.Pets_ID, P.ASIN, P.Item_Model_Number, P.Pets_Dimensions, p.Pets_Category_ID, PC.Pets_Category_Name, P.Pets_Supplier_ID, PS.Pets_Supplier_Name From Pets as P join Pets_Categories as PC on P.Pets_Category_ID = PC.Pets_Category_ID join Pets_Suppliers as PS on P.Pets_Supplier_ID = PS.Pets_Supplier_ID')

count = 0

for row in oldPets:
    K_Cat_ID = 0
    Category = cursor_new.execute('SELECT Cat_ID FROM Category Where Cat_Name = ?', row[5])
    
    for Categoryrow in Category:
        K_Cat_ID = Categoryrow[0]

    if(K_Cat_ID == 0):
        cursor_new.execute('Insert Into Category Values(6,?)', row[5])
        Category = cursor_new.execute(
            'SELECT Cat_ID FROM Category Where Cat_Name = ?', row[5])
        for Categoryrow in Category:
            K_Cat_ID = Categoryrow[0]

    k_Suplier_ID = 0
    Supplier = cursor_new.execute('SELECT Supplier_ID FROM Supplier Where Supplier_Name = ?', row[7])
    
    for Supplierrow in Supplier:
        k_Suplier_ID = Supplierrow[0]

    if(k_Suplier_ID == 0):
        cursor_new.execute('Insert Into Supplier Values(?)', row[7])
        Brand = cursor_new.execute(
            'SELECT Supplier_ID FROM Supplier Where Supplier_Name = ?', row[7])
        for Supplierrow in Supplier:
            k_Suplier_ID = Supplierrow[0]
    
    ASIN = row[1].strip()
    ModelNum = row[2].strip()
    Dimension = row[2].strip()

    cursor_new.execute('Insert Into Product_Info (Prod_SKU, Dept_ID, Cat_ID, Supplier_ID, Prod_ASIN, Prod_Model_Number, Prod_Dimension) Values (?,6,?,?,?,?,?)',
                       row[0], K_Cat_ID, k_Suplier_ID, ASIN, ModelNum, Dimension)
    count = count + 1

conn.conn_new.commit()
print(str(count) + ' rows interted successfully!')