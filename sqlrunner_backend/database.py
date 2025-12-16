import sqlite3

def get_connection():
    conn = sqlite3.connect("sql_runner.db")
    conn.row_factory = sqlite3.Row  
    return conn
def close_connection(conn):
    if conn:
        conn.close()



