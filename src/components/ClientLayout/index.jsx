"use client";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function ClientLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}