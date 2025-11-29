import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";

export async function GET(req, context) {
    try {
        const { params } = context;
        const resolved = await params;

        const psicologo_id = Number(resolved.psicologo_id);

        if (!psicologo_id) {
            return NextResponse.json(
                { error: "ID inválido ou não informado" },
                { status: 400 }
            );
        }

        const [rows] = await Connection.query(
            "SELECT * FROM psicologos WHERE psicologo_id = ?",
            [psicologo_id]
        );

        return NextResponse.json(rows[0] || {});

    } catch (err) {
        console.error("Erro ao consultar psicólogo", err);
        return NextResponse.json(
            { error: "Erro ao consultar psicólogo" },
            { status: 500 }
        );
    }
}
