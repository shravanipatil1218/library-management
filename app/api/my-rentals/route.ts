import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customerId');

  let connection;
  try {
    connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, ssl: { rejectUnauthorized: true } });
    
    const [rows]: any = await connection.execute(
      `SELECT i.Issue_Id, i.Issue_date, b.Book_title, b.ISBN, b.Image_URL, b.Author 
       FROM IssueStatus i 
       JOIN Books b ON i.Isbn_book = b.ISBN 
       WHERE i.Issued_cust = ?`, 
      [customerId]
    );

    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}