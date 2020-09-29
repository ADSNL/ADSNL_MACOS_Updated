import pyodbc
import connections as conn

cursor_new = conn.conn_new.cursor()

cursor_new.execute("Insert Into Department Values('Books')")
cursor_new.execute("Insert Into Department Values('Clothing')")
cursor_new.execute("Insert Into Department Values('Makeup')")
cursor_new.execute("Insert Into Department Values('Kitchen')")
cursor_new.execute("Insert Into Department Values('Movies')")
cursor_new.execute("Insert Into Department Values('Pets')")

conn.conn_new.commit()