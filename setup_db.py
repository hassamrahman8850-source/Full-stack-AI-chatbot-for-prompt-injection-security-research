import os
import psycopg2
from dotenv import load_dotenv

# Load the database password from .env
load_dotenv()

# Connect to your PostgreSQL database
connection = psycopg2.connect(
    host="localhost",
    database="hr_knowledge",
    user="postgres",
    password=os.getenv("DB_PASSWORD"),
    port="5432",
)
cursor = connection.cursor()

# Create a table to hold documents
cursor.execute("""
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
)
""")

# Clear any old data so re-running gives a clean slate
cursor.execute("DELETE FROM documents")

# Sample HR documents (the bot's knowledge base)
documents = [
    (
        "Health Benefits",
        "The company offers medical, dental, and vision insurance to all full-time employees. "
        "Medical coverage begins on the first day of the month after your start date. "
        "The company pays 80% of the premium for employees and 60% for dependents. "
        "Open enrollment happens every November."
    ),
    (
        "Vacation and PTO Policy",
        "Full-time employees receive 15 days of paid time off (PTO) per year. "
        "PTO accrues monthly and unused days can roll over, up to a maximum of 5 days into the next year. "
        "Requests should be submitted at least two weeks in advance through the HR portal."
    ),
    (
        "Remote Work Policy",
        "Employees may work remotely up to 3 days per week with manager approval. "
        "Fully remote arrangements are considered case by case. "
        "All remote employees must be available during core hours of 10am to 3pm Central Time."
    ),
    (
        "401k Retirement Plan",
        "The company offers a 401k retirement plan with a 4% employer match. "
        "Employees are eligible to enroll after 90 days of employment. "
        "Contributions are fully vested after two years of service."
    ),
    (
        "Parental Leave",
        "The company provides 12 weeks of paid parental leave for the primary caregiver "
        "and 6 weeks for the secondary caregiver. "
        "Leave must be taken within the first year following the birth or adoption of a child."
    ),
]

# Insert the documents
cursor.executemany(
    "INSERT INTO documents (title, content) VALUES (%s, %s)",
    documents
)

# Save and close
connection.commit()
cursor.close()
connection.close()

print(f"Database loaded with {len(documents)} documents.")