import { NextResponse } from 'next/server';
import Connection from '@/lib/database/connection';

// GET: Listar transações do psicólogo
export async function GET() {
  try {
    const [rows] = await Connection.execute(
      'SELECT * FROM transactions WHERE psychologist_id = ?',
      [psychologist_id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Criar nova transação
export async function POST(request) {
  try {
    const psychologist_id = 1;
    const data = await request.json();

    const { session_id, trans_type, trans_category, amount, trans_date, trans_status } = data;

    // Corrigido: trocado pool por Connection
    const [result] = await Connection.execute(
      `INSERT INTO transactions (psychologist_id, session_id, trans_type, trans_category, amount, trans_date, trans_status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [psychologist_id, session_id, trans_type, trans_category, amount, trans_date, trans_status]
    );

    return NextResponse.json({ id: result.insertId, ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}