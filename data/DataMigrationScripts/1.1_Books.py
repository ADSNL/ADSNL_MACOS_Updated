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

AuthCount = 0
Author = cursor_old.execute('SELECT Book_ID, Book_Author_First_Name, Book_Author_Middle_Name, Book_Author_Last_Name from Book_Authors_Lookup join Book_Authors on Book_Authors_Lookup.Book_Author_ID = Book_Authors.Book_Author_ID')

for row in Author:
    Auth_ID = 0
    if(row[2] == None and row[3] == None):
        Auth = cursor_new.execute(
            'SELECT AutDir_ID FROM Author_Director Where FirstName = ?', row[1])
    elif (row[2] == None):        
        Auth = cursor_new.execute(
            'SELECT AutDir_ID FROM Author_Director Where FirstName = ? AND LastName = ?', row[1], row[3])
    else:        
        Auth = cursor_new.execute(
            'SELECT AutDir_ID FROM Author_Director Where FirstName = ? AND MiddleName = ? AND LastName = ?', row[1], row[2], row[3])
    
    for Autrow in Auth:
        Auth_ID = Autrow[0]
    
    if(Auth_ID == 0):
        cursor_new.execute('Insert Into Author_Director Values(?,?,?)', row[1], row[2] if row[2] != None else '', row[3] if row[3] != None else '')
        if(row[2] == None and row[3] == None):
            Auth = cursor_new.execute(
                'SELECT AutDir_ID FROM Author_Director Where FirstName = ?', row[1])
        elif (row[2] == None):        
            Auth = cursor_new.execute(
                'SELECT AutDir_ID FROM Author_Director Where FirstName = ? AND LastName = ?', row[1], row[3])
        else:        
            Auth = cursor_new.execute(
                'SELECT AutDir_ID FROM Author_Director Where FirstName = ? AND MiddleName = ? AND LastName = ?', row[1], row[2], row[3])
        for Auth_row in Auth:
            Auth_ID = Auth_row[0]

    cursor_new.execute('Insert Into AD_Lookup (Prod_SKU, AutDir_ID) Values(?,?)', row[0], Auth_ID)
    AuthCount = AuthCount + 1

print(str(AuthCount) + ' authors interted successfully!')

MediaCount = 0
Media = cursor_old.execute('Select Book_ID, Book_Media_Name, Unit_Price from Book_Media_Lookup join Book_Media on Book_Media_Lookup.Book_Media_ID = Book_Media.Book_Media_ID')

for row in Media:
    Med_ID = 0
    Med = cursor_new.execute(
        'SELECT Media_ID FROM Media Where Media_Name = ?', row[1])
    
    for Medrow in Med:
        Med_ID = Medrow[0]

    if(Med_ID == 0):
        cursor_new.execute('Insert Into Media Values(?)', row[1])
        Med = cursor_new.execute(
            'SELECT Media_ID FROM Media Where Media_Name = ?', row[1])
        for Med_row in Med:
            Med_ID = Med_row[0]

    cursor_new.execute('Insert Into Media_Lookup (Prod_SKU, Media_ID, Media_Price) Values(?,?,?)', row[0], Med_ID, row[2])
    MediaCount = MediaCount + 1

print(str(MediaCount) + ' media records interted successfully!')

conn_new.commit()    