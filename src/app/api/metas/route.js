import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [rows] = await Connection.query(
      "SELECT * FROM metas"
    );

    return NextResponse.json(rows);

  } catch (err) {
    console.log("Erro ao consultar metas", err);
    return NextResponse.json(
      { error: "Erro ao consultar metas" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      tipo_meta,
      valor_alvo,
      sessoes_alvo,
      data_inicio,
      data_fim
    } = body;

    if (
      !tipo_meta ||
      !valor_alvo ||
      !sessoes_alvo ||
      !data_inicio ||
      !data_fim ||
    ) {
      return NextResponse.json(
        { error: "Dados incompletos!" },
        { status: 400 }
      );
    }


    const [result] = await Connection.query(
      `INSERT INTO metas (tipo_meta, valor_alvo, sessoes_alvo, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)`,
      [tipo_meta, valor_alvo, sessoes_alvo, data_inicio, data_fim]
    );

    const meta_id = result.insertId;

    return NextResponse.json(
      { success: true, meta_id },
      { status: 201 }

    );

  } catch (err) {
    console.error("Erro ao criar meta:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor!" },
      { status: 500 }
    );
  }
}