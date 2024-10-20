import React from 'react';
import DummyPage from '@/components/DummyPage';
import Layout from '@/components/Layout';
import logo from "@/img/jama.png";

export default function Finish() {
    return (
        <Layout pageTitle={""} className="bg-white">
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-cyan-100 border-l-4 border-cyan-500 text-cyan-700 p-6 rounded-lg shadow-lg max-w-md mx-auto flex flex-col items-center">
                    <img src={logo.src} alt="Logo" className="h-12 mb-4" />
                    <p className="font-bold text-xl">¡Regalo Enviado!</p>
                    <p className="mt-2">Tu regalo ha sido enviado exitosamente.</p>
                    <p className="mt-1">¡Gracias por usar nuestro servicio!</p>
                </div>
            </div>
        </Layout>
    );
}
