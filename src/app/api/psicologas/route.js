import { NextResponse } from 'next/server';
import { Connection } from '@/lib/connection';

// GET: Obter perfil do psicólogo
export async function GET() {
  try {
    const psychologist_id = 1; // temporário / alterar futuramente

    const [rows] = await Connection.execute(
      'SELECT * FROM psychologist_profile WHERE id = ?',
      [psychologist_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      full_name, email, phone, avatar_url, specialization, crp_number, dark_mode_enabled, email_notifications
    } = body;
    if (!full_name || !email || !phone || !specialization || !crp_number) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }
    const [result] = await Connection.query(
      " INSERT INTO psychologist_profile (full_name, email, phone, avatar_url, specialization, crp_number, dark_mode_enabled, email_notifications, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [full_name, email, phone, avatar_url, specialization, crp_number, dark_mode_enabled, email_notifications]
    )
    return NextResponse.json({ id: result.insertId }, { status: 201 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar perfil do psicólogo' }, { status: 500 });
  }
}

// PUT: Atualizar perfil do psicólogo
export async function PUT(request) {
  try {
    const psychologist_id = 1;
    const data = await request.json();

    const { full_name, email, phone, avatar_url, specialization, crp_number, dark_mode_enabled, email_notifications } = data;

    // Corrigido: trocado pool por Connection
    const [result] = await Connection.execute(
      `UPDATE psychologist_profile 
       SET full_name = ?, email = ?, phone = ?, avatar_url = ?, specialization = ?, crp_number = ?, dark_mode_enabled = ?, email_notifications = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [full_name, email, phone, avatar_url, specialization, crp_number, dark_mode_enabled, email_notifications, psychologist_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}