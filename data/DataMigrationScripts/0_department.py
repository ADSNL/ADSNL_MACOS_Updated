import pyodbc
conn_new = pyodbc.connect('Driver={SQL Server};'
                          'Server=.\SQLEXPRESS;'
                          'Database=ADSNL;'
                          'Trusted_Connection=yes;')

cursor_new = conn_new.cursor()
cursor_new.execute("Insert Into Department Values('Books')")
cursor_new.execute("Insert Into Department Values('Clothing')")
cursor_new.execute("Insert Into Department Values('Makeup')")
cursor_new.execute("Insert Into Department Values('Kitchen')")
cursor_new.execute("Insert Into Department Values('Movies')")
cursor_new.execute("Insert Into Department Values('Pets')")

conn_new.commit()