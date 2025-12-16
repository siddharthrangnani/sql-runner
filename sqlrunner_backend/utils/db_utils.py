import sqlite3
from database import get_connection, close_connection
def execute_query(query):

    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        results = cursor.fetchall()
        conn.commit() 
        return {"results": [dict(row) for row in results]}
    except sqlite3.Error as e:
        return {"error": str(e)}
    finally:
        close_connection(conn)

def get_table_names():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    close_connection(conn)
    return {"tables": tables}

def get_table_info(table_name):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = [{"name": row[1], "type": row[2]} for row in cursor.fetchall()]
        cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
        sample_data = [dict(row) for row in cursor.fetchall()]
        return {"columns": columns, "sample_data": sample_data}
    except sqlite3.Error as e:
        return {"error": str(e)}