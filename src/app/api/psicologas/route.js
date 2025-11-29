import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [rows] = await Connection.query(
      "SELECT * FROM psicologos"
    );

    return NextResponse.json(rows);

  } catch (err) {
    console.log("Erro ao consultar psicólogas", err);
    return NextResponse.json(
      { error: "Erro ao consultar psicólogas" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      nome,
      email,
      telefone,
      senha,
      crp,
      avatar_url,
      especializacao,
      dark_mode,
      notificacoes_email
    } = body;

    if (
      !nome ||
      !telefone ||
      !email ||
      !senha ||
      !crp ||
      especializacao === undefined ||
      dark_mode === undefined ||
      notificacoes_email === undefined
    ) {
      return NextResponse.json(
        { error: "Dados incompletos!" },
        { status: 400 }
      );
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");
    const hash = await bcrypt.hashSync(
      process.env.DEFAULT_PASSWORD,
      bcrypt.genSaltSync(10)
    );

    const [result] = await Connection.query(
      `INSERT INTO psicologos (nome, email, senha, telefone, crp, avatar_url, especializacao, dark_mode, notificacoes_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, hash, telefoneLimpo, crp, avatar_url, especializacao, dark_mode, notificacoes_email]
    );

    const psicologoId = result.insertId;

    return NextResponse.json(
      { success: true, psicologoId },
      { status: 201 }

    );

  } catch (err) {
    console.error("Erro ao criar psicólogo:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor!" },
      { status: 500 }
    );
  }
}