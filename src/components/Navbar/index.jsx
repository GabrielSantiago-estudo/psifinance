"use client";

import { Moon, Sun, Bell, User } from "lucide-react";
import { Button } from "../ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { useTheme } from "next-themes";
import Badge from "../ui/Badge";

export default function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <header
            className="
                sticky top-0 transition-all duration-300 flex flex-col
                bg-white border-r border-neutral-200
                dark:bg-neutral-900 dark:border-neutral-800
            "
        >
            <div className="flex h-20 items-center justify-between px-6">

                {/* Title */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                        Dashboard
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">
                        Bem-vinda! Aqui está um resumo das suas atividades.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="
                        relative rounded-full p-2
                        bg-indigo-600 text-white dark:bg-indigo-500
                        shadow-md 
                        hover:bg-indigo-700 dark:hover:bg-indigo-400
                        transition
                        overflow-hidden  /* impede vazamento */
                    "
                    >
                        <div className="relative h-5 w-5">
                            {/* Sol */}
                            <Sun
                                className="
                                h-5 w-5 absolute inset-0
                                transition-all duration-300 ease-in-out
                                text-white
                                opacity-100 rotate-0
                                dark:opacity-0 dark:-rotate-90
                            "
                            />

                            {/* Lua */}
                            <Moon
                                className="
                                h-5 w-5 absolute inset-0
                                transition-all duration-300 ease-in-out
                                text-white
                                opacity-0 rotate-90
                                dark:opacity-100 dark:rotate-0
                            "
                            />
                        </div>
                    </Button>



                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="
                                relative flex items-center gap-3 rounded-full px-3 
                                bg-indigo-600 text-white dark:bg-indigo-500 
                                shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-400 
                                transition
                            "
                            >
                                <Bell className="h-5 w-5 text-white" />

                                <Badge
                                    variant="destructive"
                                    className="
                                    absolute -top-1 -right-1 h-5 w-5 rounded-full 
                                    p-0 flex items-center justify-center text-xs 
                                    bg-red-500 text-white shadow 
                                    dark:bg-red-600
                                    "
                                >
                                    3
                                </Badge>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="
                            w-80 rounded-xl border border-neutral-300 dark:border-neutral-700
                            bg-neutral-50 dark:bg-neutral-900/95 
                            shadow-xl backdrop-blur-sm
                            "
                        >
                            <DropdownMenuLabel className="text-neutral-800 dark:text-neutral-100">
                                Notificações
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <div className="space-y-3 p-2">

                                {/* Notificação forte (principal) */}
                                <div className="rounded-lg p-3 bg-indigo-600 text-white shadow-md">
                                    <p className="font-medium">Pagamento recebido</p>
                                    <p className="text-xs opacity-90">Maria Silva — R$ 200,00</p>
                                </div>

                                {/* Notificação neutra */}
                                <div
                                    className="
                                    rounded-lg p-3 
                                    bg-neutral-200 text-neutral-900 
                                    dark:bg-neutral-800 dark:text-neutral-200 
                                    border border-neutral-300/50 dark:border-neutral-700
                                    shadow-sm
                                    "
                                >
                                    <p className="font-medium">Nova sessão agendada</p>
                                    <p className="text-xs opacity-80">João Santos — Amanhã às 14h</p>
                                </div>

                                {/* Notificação de alerta */}
                                <div
                                    className="
                                    rounded-lg p-3 
                                    bg-yellow-300 text-neutral-900
                                    dark:bg-yellow-800/40 dark:text-yellow-200
                                    border border-yellow-400/40 dark:border-yellow-700
                                    shadow-sm
                                    "
                                >
                                    <p className="font-medium">Sessão cancelada</p>
                                    <p className="text-xs opacity-80">Ana Costa — Hoje às 16h</p>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* USER MENU */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="
                                flex items-center gap-3 rounded-full px-3 
                                bg-indigo-600 text-white dark:bg-indigo-500 
                                shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-400 
                                transition
                            "
                            >
                                <Avatar className="h-9 w-9 border border-white/30 dark:border-neutral-700 shadow-sm">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=psychologist" />
                                    <AvatarFallback>DR</AvatarFallback>
                                </Avatar>

                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-white leading-none">
                                        Dra. Rosa Santos
                                    </p>
                                    <p className="text-xs text-white/80 leading-none">Psicóloga</p>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="
                            w-56 rounded-xl border border-neutral-300 dark:border-neutral-700
                            bg-neutral-50 dark:bg-neutral-900/90 
                            shadow-xl backdrop-blur-sm
                            "
                        >
                            <DropdownMenuLabel className="text-neutral-800 dark:text-neutral-100">
                                Minha Conta
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Perfil
                            </DropdownMenuItem>

                            <DropdownMenuItem className="text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer">
                                Configurações
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer">
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>
        </header>
    );
}
