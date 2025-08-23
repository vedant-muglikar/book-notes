# book-notes

A web app to keep track of notes and ratings for books you have read.

## Getting Started

1. **Install dependencies:**

   ```
   npm i
   ```

2. **Set up the database:**

   - Open `queries.sql` and copy-paste the commands into your PostgreSQL client to create the required tables.

3. **Configure database connection:**

   - Edit `index.js` if needed to match your PostgreSQL username, password, and database name.

4. **Run the app:**
   ```
   nodemon index.js
   ```
   - The server will start on [http://localhost:3000](http://localhost:3000).

## Features

- Add new books with notes and ratings.
- View all books in a grid.
- Edit notes for any book.
- Ratings are shown as stars.

## Usage

- Click **Add Book** to add a new book.
- Click **View Notes** on any book card to see or edit your notes.

---

**Note:**  
Make sure PostgreSQL is running and accessible before
