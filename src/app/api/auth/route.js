import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/auth";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email e senha são obrigatórios!" },
                { status: 400 }
            );
        }

        const [rows] = await Connection.query(
            "SELECT * FROM psicologos WHERE email = ?",
            [email]
        );

        const psicologo = rows?.[0];
        if (!psicologo) {
            return NextResponse.json(
                { error: "Credenciais inválidas!" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, psicologo.senha || "");
        if (!isMatch) {
            return NextResponse.json(
                { error: "Credenciais inválidas!" },
                { status: 401 }
            );
        }

        const token = generateToken({
            id: psicologo.psicologo_id,
            email: psicologo.email,
            name: psicologo.nome,
        });

        const response = NextResponse.json({
            message: "Login realizado com sucesso!",
            name: psicologo.nome,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;

    } catch (err) {
        console.error("Erro ao fazer login!", err);
        return NextResponse.json(
            { error: "Erro interno no servidor!" },
            { status: 500 }
        );
    }

}