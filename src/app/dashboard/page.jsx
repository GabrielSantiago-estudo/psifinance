"use client";

import StatCard from "@/components/StatCard";
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const revenueData = [
    { month: "Jan", receita: 4200, despesas: 2400 },
    { month: "Fev", receita: 5100, despesas: 2800 },
    { month: "Mar", receita: 4800, despesas: 2600 },
    { month: "Abr", receita: 6200, despesas: 3100 },
    { month: "Mai", receita: 5800, despesas: 2900 },
    { month: "Jun", receita: 7400, despesas: 3400 },
];

const sessionsData = [
    { dia: "Seg", sessoes: 4 },
    { dia: "Ter", sessoes: 6 },
    { dia: "Qua", sessoes: 5 },
    { dia: "Qui", sessoes: 7 },
    { dia: "Sex", sessoes: 5 },
];

const recentClients = [
    { name: "Maria Silva", type: "Individual", status: "paid", date: "Hoje, 14:00" },
    { name: "João Santos", type: "Individual", status: "pending", date: "Amanhã, 10:00" },
    { name: "Ana Costa", type: "Casal", status: "paid", date: "15/10, 16:00" },
    { name: "Carlos Mendes", type: "Individual", status: "cancelled", date: "16/10, 11:00" },
];

const statusConfig = {
    paid: {
        label: "Pago",
        class: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-600",
    },
    pending: {
        label: "Pendente",
        class: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-600",
    },
    cancelled: {
        label: "Cancelado",
        class: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-600",
    },
};

export default function Dashboard() {
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Navbar />

                <main className="flex-1 space-y-10 p-6 md:p-10 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                    <div className="space-y-10 p-6 md:p-10 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                        {/* Stats Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                title="Receita do Mês"
                                value="R$ 7.400"
                                change="+12% em relação ao mês anterior"
                                changeType="positive"
                                icon={DollarSign}
                                variant="primary"
                            />
                            <StatCard
                                title="Saldo Atual"
                                value="R$ 4.000"
                                change="+8% em relação ao mês anterior"
                                changeType="positive"
                                icon={TrendingUp}
                                variant="success"
                            />
                            <StatCard
                                title="Sessões no Mês"
                                value="27"
                                change="Meta: 30 sessões"
                                changeType="neutral"
                                icon={Calendar}
                                variant="secondary"
                            />
                            <StatCard
                                title="Clientes Ativos"
                                value="18"
                                change="+3 novos este mês"
                                changeType="positive"
                                icon={Users}
                                variant="default"
                            />
                        </div>

                        {/* Motivational Card */}
                        <Card className="rounded-2xl bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-2xl dark:bg-neutral-800 dark:shadow-xl border-0">
                            <CardContent className="pt-7 pb-8 px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold opacity-90">💡 Parabéns!</p>
                                    <p className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">Você atingiu 90% da sua meta mensal</p>
                                    <p className="text-sm opacity-90">Faltam apenas 3 sessões para completar a meta. Continue assim!</p>
                                </div>
                                <div className="text-7xl font-extrabold opacity-20 lg:block hidden">90%</div>
                            </CardContent>
                        </Card>

                        {/* Charts */}
                        <div className="grid gap-6 lg:grid-cols-2">

                            {/* Revenue Chart */}
                            <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Receitas vs Despesas</CardTitle>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Evolução mensal em 2024</p>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                                            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "var(--popover)",
                                                    border: "1px solid var(--border)",
                                                    borderRadius: "var(--radius)",
                                                    fontSize: 14
                                                }}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="receita" stroke="#6366F1" strokeWidth={3} name="Receita" dot={{ fill: "#6366F1", r: 5 }} />
                                            <Line type="monotone" dataKey="despesas" stroke="#EF4444" strokeWidth={3} name="Despesas" dot={{ fill: "#EF4444", r: 5 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Sessions Chart */}
                            <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Sessões da Semana</CardTitle>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Distribuição semanal</p>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={sessionsData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                            <XAxis dataKey="dia" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                                            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "var(--popover)",
                                                    border: "1px solid var(--border)",
                                                    borderRadius: "var(--radius)",
                                                    fontSize: 14
                                                }}
                                            />
                                            <Bar dataKey="sessoes" fill="#6366F1" radius={[8, 8, 0, 0]} name="Sessões" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Próximas Sessões</CardTitle>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">Agendamentos recentes e próximos</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentClients.map((client, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-indigo-50 dark:hover:bg-neutral-700 transition-colors shadow-sm"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">
                                                    {client.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{client.name}</p>
                                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{client.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{client.date}</p>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[client.status].class}`}>
                                                    {statusConfig[client.status].label}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>

    );
}
