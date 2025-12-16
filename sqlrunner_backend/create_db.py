import sqlite3
import os

DB_PATH = "sql_runner.db"

def initialize_database():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Customers (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        age INTEGER,
        country VARCHAR(100)
    );
    """)


    cursor.execute("SELECT COUNT(*) FROM Customers;")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
        INSERT INTO Customers (first_name, last_name, age, country)
        VALUES (?, ?, ?, ?);
        """, [
            ("John", "Doe", 30, "USA"),
            ("Robert", "Luna", 22, "USA"),
            ("David", "Robinson", 25, "UK"),
            ("John", "Reinhardt", 22, "UK"),
            ("Betty", "Doe", 28, "UAE")
        ])


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        item VARCHAR(100),
        amount INTEGER,
        customer_id INTEGER,
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
    );
    """)


    cursor.execute("SELECT COUNT(*) FROM Orders;")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
        INSERT INTO Orders (item, amount, customer_id)
        VALUES (?, ?, ?);
        """, [
            ("Keyboard", 400, 4),
            ("Mouse", 300, 4),
            ("Monitor", 12000, 3),
            ("Keyboard", 400, 1),
            ("Mousepad", 250, 2)
        ])


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Shippings (
        shipping_id INTEGER PRIMARY KEY AUTOINCREMENT,
        status VARCHAR(100),
        customer INTEGER
    );
    """)


    cursor.execute("SELECT COUNT(*) FROM Shippings;")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
        INSERT INTO Shippings (status, customer)
        VALUES (?, ?);
        """, [
            ("Pending", 2),
            ("Pending", 4),
            ("Delivered", 3),
            ("Pending", 5),
            ("Delivered", 1)
        ])

    conn.commit()
    conn.close()


if __name__ == "__main__":
    initialize_database()
