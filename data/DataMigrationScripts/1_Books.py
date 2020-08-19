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

oldBooks = cursor_old.execute('Select Book_ID, Books.Book_Genre_ID, Books.Book_Publisher_ID, Book_Title, ISBN_10, ISBN_13, Book_Genre_Name, Book_Publisher_Name from Books join Book_Genres on Books.Book_Genre_ID = Book_Genres.Book_Genre_ID join Book_Publishers on Books.Book_Publisher_ID = Book_Publishers.Book_Publisher_ID')
count = 0

for row in oldBooks:
    Genre_ID = 0
    Genre = cursor_new.execute(
        'SELECT Cat_ID FROM Category Where Cat_Name = ?', row[6])
    
    for Genrow in Genre:
        Genre_ID = Genrow[0]

    if(Genre_ID == 0):
        cursor_new.execute('Insert Into Category Values(1,?)', row[6])
        Genre = cursor_new.execute(
            'SELECT Cat_ID FROM Category Where Cat_Name = ?', row[6])
        for Gen_row in Genre:
            Genre_ID = Gen_row[0]

    Pub_ID = 0

    Pub = cursor_new.execute(
        'SELECT Brand_ID FROM Brand Where Brand_Name  = ?', row[7])

    for Pubrow in Pub:
        Pub_ID = Pubrow[0]

    if(Pub_ID == 0):
        cursor_new.execute('Insert Into Brand Values(?)', row[7])
        Pub = cursor_new.execute(
            'SELECT Brand_ID FROM Brand Where Brand_Name  = ?', row[7])
        for Pub_row in Pub:
            Pub_ID = Pub_row[0]

    cursor_new.execute('Insert Into Product_Info (Prod_SKU, Dept_ID, Brand_ID, Cat_ID, Prod_Name, Prod_ISBN_10, Prod_ISBN_13) Values (?,1,?,?,?,?,?)',
                       row[0], Pub_ID, Genre_ID, row[3], row[4], row[5])
    count = count + 1

conn_new.commit()
print(str(count) + ' rows interted successfully!')
