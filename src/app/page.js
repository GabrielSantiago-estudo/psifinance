"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { sanitizeEmail, sanitizePassword, validateForm } from "@/utils/auth";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();

  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const auth = params.get("auth");
    if (auth === "required") {
      toast.error("É necessário fazer login para acessar essa página!");
    } else if (auth === "invalid") {
      toast.error("Sessão expirada. Faça seu login novamente!");
    }
  }, [params]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitized = {
      email: sanitizeEmail(formData.email),
      password: sanitizePassword(formData.password),
    };

    const validationErrors = validateForm(sanitized);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // --- SIMULAÇÃO DE LOGIN (sem requisição) ---
      await new Promise((resolve) => setTimeout(resolve, 800)); // delay fake

      // Erros simulados (você pode personalizar)
      if (sanitized.email !== "teste@email.com") {
        toast.error("Email não encontrado!");
        setLoading(false);
        return;
      }

      if (sanitized.password !== "123456") {
        toast.error("Senha incorreta!");
        setLoading(false);
        return;
      }

      // Se passou pela simulação:
      toast.success("Login realizado com sucesso!");
      setSuccess(true);
      router.push("/home");

    } catch (err) {
      console.error("Erro no login simulado:", err);
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }

  };

  const inputClass = (field) => {
    const base = "text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400";
    if (errors[field])
      return `${base} bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:border-red-500`;
    if (success)
      return `${base} bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:text-green-400 dark:border-green-500`;
    return `${base} bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-white`;
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#eef2ff] via-white to-[#e0e7ff]
      dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950
      text-neutral-900 dark:text-neutral-100
      transition-colors p-4
    ">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div
            className="
          inline-flex items-center justify-center w-16 h-16 rounded-2xl
          bg-linear-to-br from-indigo-600 to-indigo-500 
          dark:from-indigo-500 dark:to-indigo-400
          shadow-xl shadow-indigo-600/30 dark:shadow-indigo-500/30
          backdrop-blur-md mb-4
        "
          >
            <span className="text-white font-extrabold text-3xl drop-shadow-md">Ψ</span>
          </div>

          <h1
            className="text-4xl font-extrabold tracking-tight
        bg-clip-text text-transparent 
        bg-linear-to-br from-indigo-700 to-indigo-500
        dark:from-indigo-400 dark:to-indigo-300
      "
          >
            PsiFinance
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
            Gerencie seus atendimentos e finanças com tranquilidade
          </p>
        </div>

        {/* Card */}
        <Card
          className="
        border border-neutral-200 dark:border-neutral-800
        bg-neutral-50/70 dark:bg-neutral-900/60
        backdrop-blur-xl
        shadow-xl shadow-black/5 dark:shadow-black/20
        rounded-2xl
      "
        >
          <Tabs defaultValue="login" className="w-full">

            {/* Tabs */}
            <CardHeader className="pb-0">
              <TabsList
                className="
              grid grid-cols-2 w-full p-1 
              bg-neutral-200/60 dark:bg-neutral-800/40
              rounded-xl shadow-inner backdrop-blur-sm
            "
              >
                <TabsTrigger
                  value="login"
                  className="
                rounded-lg text-sm font-medium
                data-[state=active]:bg-white data-[state=active]:text-indigo-600
                dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-indigo-400
                data-[state=active]:shadow-md
                text-neutral-600 dark:text-neutral-400
                transition-all
              "
                >
                  Entrar
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="
                rounded-lg text-sm font-medium
                data-[state=active]:bg-white data-[state=active]:text-indigo-600
                dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-indigo-400
                data-[state=active]:shadow-md
                text-neutral-600 dark:text-neutral-400
                transition-all
              "
                >
                  Cadastrar
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* LOGIN */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Bem-vinda de volta</CardTitle>
                <CardDescription>Entre com suas credenciais</CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="relative">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="
                      pl-10
                      bg-neutral-100/80 dark:bg-neutral-800/80
                      border border-neutral-300 dark:border-neutral-700
                      focus-visible:ring-2 focus-visible:ring-indigo-500/60
                      rounded-lg transition-all
                    "
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${errors.email || success ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
                            }`}
                        >
                          {errors.email ? (
                            <p className="text-sm text-red-600 dark:text-red-500">
                              <span className="font-medium">Oops!</span> {errors.email}
                            </p>
                          ) : success ? (
                            <p className="text-sm text-green-600 dark:text-green-500">
                              <span className="font-medium">Perfeito!</span> Email válido!
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Senha */}
                  <div className="relative">
                    <div className="space-y-2">
                      <Label>Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="
                      pl-10
                      bg-neutral-100/80 dark:bg-neutral-800/80
                      border border-neutral-300 dark:border-neutral-700
                      focus-visible:ring-2 focus-visible:ring-indigo-500/60
                      rounded-lg transition-all
                    "
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${errors.password || success ? "max-h-10 opacity-100 mt-2" : "max-h-0 opacity-0"
                            }`}
                        >
                          {errors.password ? (
                            <p className="text-sm text-red-600 dark:text-red-500">
                              <span className="font-medium">Oops!</span> {errors.password}
                            </p>
                          ) : success ? (
                            <p className="text-sm text-green-600 dark:text-green-500">
                              <span className="font-medium">Tudo certo!</span> Senha válida!
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                  </div>

                  <Button
                    type="submit"
                    className="
                      w-full
                      bg-linear-to-br from-indigo-600 to-indigo-500
                      hover:shadow-xl hover:shadow-indigo-600/30
                      dark:hover:shadow-indigo-500/20
                      text-white font-medium
                      transition-all
                      rounded-lg
                    "
                  >
                    Entrar
                  </Button>

                </form>



              </CardContent>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Crie sua conta</CardTitle>
                <CardDescription>Comece a organizar suas finanças hoje</CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-5">

                  {/* Nome */}
                  <div className="space-y-2">
                    <Label>Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                      <Input
                        type="text"
                        placeholder="Dra. Maria Silva"
                        className="
                      pl-10
                      bg-neutral-100/80 dark:bg-neutral-800/80
                      border border-neutral-300 dark:border-neutral-700
                      focus-visible:ring-2 focus-visible:ring-indigo-500/60
                      rounded-lg transition-all
                    "
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        className="
                      pl-10
                      bg-neutral-100/80 dark:bg-neutral-800/80
                      border border-neutral-300 dark:border-neutral-700
                      focus-visible:ring-2 focus-visible:ring-indigo-500/60
                      rounded-lg transition-all
                    "
                        required
                      />
                    </div>
                  </div>

                  {/* Senha */}
                  <div className="space-y-2">
                    <Label>Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="
                      pl-10
                      bg-neutral-100/80 dark:bg-neutral-800/80
                      border border-neutral-300 dark:border-neutral-700
                      focus-visible:ring-2 focus-visible:ring-indigo-500/60
                      rounded-lg transition-all
                    "
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="
                  w-full
                  bg-linear-to-br from-indigo-600 to-indigo-400
                  hover:shadow-xl hover:shadow-indigo-600/30
                  dark:hover:shadow-indigo-500/20
                  text-white font-medium
                  transition-all
                  rounded-lg
                "
                  >
                    Criar conta
                  </Button>

                  <p className="text-xs text-center text-neutral-600 dark:text-neutral-400 mt-2">
                    Ao criar uma conta, você concorda com nossos{" "}
                    <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      Termos de Uso
                    </a>
                  </p>
                </form>
              </CardContent>
            </TabsContent>

          </Tabs>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-500 mt-6">
          © {new Date().getFullYear()} PsiFinance. Feito com 💙 para psicólogas.
        </p>
      </div>
    </div>



  );
}
