CREATE DATABASE IF NOT EXISTS notesdb;
USE notesdb;

-- Create the 'notes' table
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    category VARCHAR(255),
    archived BOOLEAN
);


-- Insert dummy data into the 'notes' table
INSERT INTO notes (title, content, category, archived) VALUES
    ('Note 1', 'Content of Note 1', 'Category A', false),
    ('Note 2', 'Content of Note 2', 'Category B', true),
    ('Note 3', 'Content of Note 3', 'Category A', false),
    ('Note 4', 'Content of Note 4', 'Category C', true),
    ('Note 5', 'Content of Note 5', 'Category B', false);