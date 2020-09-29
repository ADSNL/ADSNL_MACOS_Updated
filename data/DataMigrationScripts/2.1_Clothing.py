import pyodbc
import connections as conn

cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()

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

    cursor_new.execute('Insert Into Type_Lookup (Prod_SKU, Type_ID) Values(?,?)', row[0], Type_ID)
    TypeCount = TypeCount + 1

print(str(TypeCount) + ' types interted successfully!')

SizeColorCount = 0
SizeColor = cursor_old.execute('SELECT CC.Clothing_ID, CC.Clothing_Color_ID, Col.Clothing_Color_Name, CS.Clothing_Size_ID, Siz.Clothing_Size_Name FROM Clothing_Colors_Lookup as CC JOIN Clothing_Sizes_Lookup as CS on CC.Clothing_ID = CS.Clothing_ID JOIN Clothing_Colors as Col on CC.Clothing_Color_ID = Col.Clothing_Color_ID JOIN Clothing_Sizes as Siz on CS.Clothing_Size_ID = Siz.Clothing_Size_ID')

for row in SizeColor:
    Col_ID = 0
    Color = cursor_new.execute('SELECT Color_ID FROM Color Where Color_Name = ?', row[2])
    
    for Colrow in Color:
        Col_ID = Colrow[0]

    if(Col_ID == 0):
        cursor_new.execute('Insert Into Color Values(?)', row[2])
        Color = cursor_new.execute(
            'SELECT Color_ID FROM Color Where Color_Name = ?', row[2])
        for Colrow in Color:
            Col_ID = Colrow[0]

    Siz_ID = 0
    Size = cursor_new.execute('SELECT Size_ID FROM Size Where Size_Name = ?', row[4])
    
    for Sizerow in Size:
        Siz_ID = Sizerow[0]

    if(Siz_ID == 0):
        cursor_new.execute('Insert Into Size Values(?)', row[4])
        Size = cursor_new.execute(
            'SELECT Size_ID FROM Size Where Size_Name = ?', row[4])
        for Sizerow in Size:
            Siz_ID = Sizerow[0]

    cursor_new.execute('Insert Into Feature_Lookup (Prod_SKU, Size_ID, Color_ID) Values(?,?,?)', row[0], Siz_ID, Col_ID)
    SizeColorCount = SizeColorCount + 1

print(str(SizeColorCount) + ' Size and Color records interted successfully!')

conn.conn_new.commit()