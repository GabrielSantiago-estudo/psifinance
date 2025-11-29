import { NextResponse } from 'next/server';
import Connection from '@/lib/database/connection';

// GET: Obter cliente por ID
export async function GET({ params }) {
  try {
    const psychologist_id = 1;
    const clientId = params.id;

    const [rows] = await Connection.execute(
      'SELECT * FROM clients WHERE id = ? AND psychologist_id = ?',
      [clientId, psychologist_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Atualizar cliente
export async function PUT(request, { params }) {
  try {
    const psychologist_id = 1;
    const clientId = params.id;
    const data = await request.json();

    const { full_name, email, phone, session_type, session_value, payment_status, notes, active_status } = data;

    // Corrigido: trocado pool por Connection
    const [result] = await Connection.execute(
      `UPDATE clients 
       SET full_name = ?, email = ?, phone = ?, session_type = ?, session_value = ?, payment_status = ?, notes = ?, active_status = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND psychologist_id = ?`,
      [full_name, email, phone, session_type, session_value, payment_status, notes, active_status, clientId, psychologist_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Deletar cliente
export async function DELETE(request, { params }) {
  try {
    const psychologist_id = 1;
    const clientId = params.id;

    // Corrigido: trocado pool por Connection
    const [result] = await Connection.execute(
      'DELETE FROM clients WHERE id = ? AND psychologist_id = ?',
      [clientId, psychologist_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}