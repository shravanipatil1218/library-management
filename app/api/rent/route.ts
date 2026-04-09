import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;
  try {
    const { isbn, bookTitle, customerId } = await request.json();
    connection = await mysql.createConnection({ 
      uri: process.env.DATABASE_URL, 
      ssl: { rejectUnauthorized: true } 
    });

    // 1. Check if the book is actually available first
    const [book]: any = await connection.execute(
      'SELECT Status FROM Books WHERE ISBN = ?', [isbn]
    );

    if (book[0].Status === 'No') {
      return NextResponse.json({ error: "Book is already rented!" }, { status: 400 });
    }

    // 2. Create a random Issue ID (e.g., IS5521)
    const issueId = 'IS' + Math.floor(1000 + Math.random() * 9000);

    // 3. Add to IssueStatus table
    await connection.execute(
      'INSERT INTO IssueStatus (Issue_Id, Issued_cust, Issued_book_name, Issue_date, Isbn_book) VALUES (?, ?, ?, CURDATE(), ?)',
      [issueId, customerId, bookTitle, isbn]
    );

    // 4. Update the Book table so others see it as "Rented"
    await connection.execute(
      'UPDATE Books SET Status = "No" WHERE ISBN = ?', [isbn]
    );

    return NextResponse.json({ message: "Success! Book rented." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}