import pyodbc
import connections as conn

cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()

Color = cursor_old.execute('SELECT CL.Makeup_ID, C.Makeup_Color_Name, CL.Price FROM Makeup_Colors_Lookup AS CL JOIN Makeup_Colors AS C on CL.Makeup_Color_ID = C.Makeup_Color_ID')
ColorCount = 0

for row in Color:
    Color_ID = 0

    col = cursor_new.execute('SELECT Color_ID FROM Color Where Color_Name = ?', row[1])

    for Colrow in col:
        Color_ID = Colrow[0]

    if(Color_ID == 0):
        cursor_new.execute('Insert Into Color Values(?)', row[1])
        col = cursor_new.execute('SELECT Color_ID FROM Color Where Color_Name = ?', row[1])
        
        for Colrow in col:
            Color_ID = Colrow[0]

    ID = str(row[0])
    
    if len(ID) == 1:
        ID = "300000" + ID
    elif len(ID) == 2:
        ID = "30000" + ID
    elif len(ID) == 3:
        ID = "3000" + ID

    ID = int(ID)

    cursor_new.execute('Insert Into Feature_Lookup (Prod_SKU, Color_ID, Feature_Price) Values(?,?,?)', ID, Color_ID, row[2])
    ColorCount = ColorCount + 1

print(str(ColorCount) + ' colors interted successfully!')
conn.conn_new.commit()