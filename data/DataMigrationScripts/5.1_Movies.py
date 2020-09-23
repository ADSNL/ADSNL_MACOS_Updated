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

FormatCount = 0
Format = cursor_old.execute('Select MFL.Movie_ID, MFL.Movie_Format_ID, MFL.Price, MF.Movie_Formats_Name From Movie_Formats_Lookup as MFL join Movie_Formats as MF on MFL.Movie_Format_ID = MF.Movie_Format_ID')

for row in Format:
    For_ID = 0
    Format = cursor_new.execute('SELECT Format_ID FROM Format Where FormatName = ?', row[3])
    
    for Forrow in Format:
        For_ID = Forrow[0]

    if(For_ID == 0):
        cursor_new.execute('Insert Into Format Values(?)', row[3])
        Format = cursor_new.execute(
            'SELECT Format_ID FROM Format Where FormatName = ?', row[3])
        for Forrow in Format:
            For_ID = Forrow[0]

    ID = str(row[0])
    
    if len(ID) == 1:
        ID = "600000" + ID
    elif len(ID) == 2:
        ID = "60000" + ID
    elif len(ID) == 3:
        ID = "6000" + ID

    ID = int(ID)

    cursor_new.execute('Insert Into Feature_Lookup (Prod_SKU, Format_ID, Feature_Price) Values(?,?,?)', ID, For_ID, row[2])
    FormatCount = FormatCount + 1

print(str(FormatCount) + ' format records interted successfully!')

DirectorCount = 0
Director = cursor_old.execute('Select MDL.Movie_ID, MDL.Movie_Director_ID, MD.Movie_Director_Name From Movie_Directors_Lookup as MDL join Movie_Directors as MD on MDL.Movie_Director_ID = MD.Movie_Director_ID')

for row in Director:
    Dir_ID = 0
    Dir = cursor_new.execute(
            'SELECT AutDir_ID FROM Author_Director Where FirstName = ?', row[2])
    
    for Dirrow in Dir:
        Dir_ID = Dirrow[0]
    
    if(Dir_ID == 0):
        cursor_new.execute('Insert Into Author_Director Values(?,?,?)', row[2],'','')
        Dir = cursor_new.execute('SELECT AutDir_ID FROM Author_Director Where FirstName = ?', row[2])
        
        for Dirrow in Dir:
            Dir_ID = Dirrow[0]

    ID = str(row[0])
    
    if len(ID) == 1:
        ID = "600000" + ID
    elif len(ID) == 2:
        ID = "60000" + ID
    elif len(ID) == 3:
        ID = "6000" + ID

    ID = int(ID)

    cursor_new.execute('Insert Into AD_Lookup (Prod_SKU, AutDir_ID) Values(?,?)', ID, Dir_ID)
    DirectorCount = DirectorCount + 1

print(str(DirectorCount) + ' directors interted successfully!')

conn_new.commit()