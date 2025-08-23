CREATE TABLE book(
	id SERIAL PRIMARY KEY,
	title VARCHAR(45),
	olid VARCHAR(20),
	note TEXT,
	rating INT
);