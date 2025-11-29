import { NextResponse } from 'next/server';
import Connection from '@/lib/database/connection';

// GET: Listar metas do psicólogo
export async function GET(request) {
  try {
    const psychologist_id = 1;

    const [rows] = await Connection.execute(
      'SELECT * FROM goals WHERE psychologist_id = ?',
      [psychologist_id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Criar nova meta
export async function POST(request) {
  try {
    const psychologist_id = 1;
    const data = await request.json();

    const { goal_type, target_amount, target_sessions, target_active, start_date, end_date } = data;

    // Corrigido: trocado pool por Connection
    const [result] = await Connection.execute(
      `INSERT INTO goals (psychologist_id, goal_type, target_amount, target_sessions, target_active, start_date, end_date, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [psychologist_id, goal_type, target_amount, target_sessions, target_active, start_date, end_date]
    );

    return NextResponse.json({ id: result.insertId, ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}