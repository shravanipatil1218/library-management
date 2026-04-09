import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { isbn, issueId, customerId, bookName } = await request.json();
    const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, ssl: { rejectUnauthorized: true } });

    // 1. Move to ReturnStatus
    const returnId = 'RS' + Math.floor(1000 + Math.random() * 9000);
    await connection.execute(
      'INSERT INTO ReturnStatus (Return_Id, Return_cust, Return_book_name, Return_date, Isbn_book2) VALUES (?, ?, ?, CURDATE(), ?)',
      [returnId, customerId, bookName, isbn]
    );

    // 2. Remove from IssueStatus and Update Books availability
    await connection.execute('DELETE FROM IssueStatus WHERE Issue_Id = ?', [issueId]);
    await connection.execute('UPDATE Books SET Status = "Yes" WHERE ISBN = ?', [isbn]);

    await connection.end();
    return NextResponse.json({ message: "Returned successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}