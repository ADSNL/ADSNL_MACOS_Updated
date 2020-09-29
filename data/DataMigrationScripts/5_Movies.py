import pyodbc
import connections as conn
cursor_new = conn.conn_new.cursor()
cursor_old =  conn.conn_old.cursor()
oldMovies = cursor_old.execute('Select M.Movie_ID, M.Movie_Title,M.Movie_Genre_ID, MG.Movie_Genre_Name, M.Movie_Studio_ID,MS.Movie_Studio_Name From Movies as M join Movie_Genres as MG on M.Movie_Genre_ID = MG.Movie_Genre_ID join Movie_Studios as MS on M.Movie_Studio_ID = MS.Movie_Studio_ID')

count = 0

for row in oldMovies:
    K_Cat_ID = 0
    Category = cursor_new.execute('SELECT Cat_ID FROM Category Where Cat_Name = ?', row[3])
    
    for Categoryrow in Category:
        K_Cat_ID = Categoryrow[0]

    if(K_Cat_ID == 0):
        cursor_new.execute('Insert Into Category Values(5,?)', row[3])
        Category = cursor_new.execute(
            'SELECT Cat_ID FROM Category Where Cat_Name = ?', row[3])
        for Categoryrow in Category:
            K_Cat_ID = Categoryrow[0]

    k_Brand_ID = 0
    Brand = cursor_new.execute('SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[5])
    
    for Brandrow in Brand:
        k_Brand_ID = Brandrow[0]

    if(k_Brand_ID == 0):
        cursor_new.execute('Insert Into Brand Values(?)', row[5])
        Brand = cursor_new.execute(
            'SELECT Brand_ID FROM Brand Where Brand_Name = ?', row[5])
        for Brandrow in Brand:
            k_Brand_ID = Brandrow[0]

    Name = row[1].strip()

    cursor_new.execute('Insert Into Product_Info (Prod_SKU, Dept_ID, Cat_ID, Brand_ID, Prod_Name) Values (?,5,?,?,?)',
                       row[0], K_Cat_ID, k_Brand_ID, Name)
    count = count + 1

conn.conn_new.commit()
print(str(count) + ' rows interted successfully!')


