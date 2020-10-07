import pyodbc
import connections as conn
cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()

TypeCount = 0
Type = cursor_old.execute('SELECT KTL.Kitchen_Product_ID, KTL.Kitchen_Type_ID, KTL.Price, KT.Kitchen_Type_Name FROM Kitchen_Types_Lookup AS KTL JOIN Kitchen_Types AS KT on KTL.Kitchen_Type_ID = KT.Kitchen_Type_ID')

for row in Type:
    Type_ID = 0

    Typ = cursor_new.execute('SELECT Type_ID FROM Type Where Type_Name = ?', row[3])

    for Typrow in Typ:
        Type_ID = Typrow[0]

    if(Type_ID == 0):
        cursor_new.execute('Insert Into Type Values(?)', row[3])
        Typ = cursor_new.execute('SELECT Type_ID FROM Type Where Type_Name = ?', row[3])
        
        for Typrow in Typ:
            Type_ID = Typrow[0]

    cursor_new.execute('Insert Into Type_Lookup (Prod_SKU, Type_ID, Type_Price) Values(?,?,?)', row[0], Type_ID, row[2])
    TypeCount = TypeCount + 1

print(str(TypeCount) + ' types interted successfully!')

conn.conn_new.commit()