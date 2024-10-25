import React from 'react';
import DummyPage from '@/components/DummyPage';
import Layout from '@/components/Layout';
import logo from "@/img/jama.png";
import { useRouter } from 'next/router';

export default function Finish() {
    const router = useRouter();

    return (
        <Layout pageTitle={""} className="bg-white">
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-cyan-100 border-l-4 border-cyan-500 text-cyan-700 p-6 rounded-lg shadow-lg max-w-md mx-auto flex flex-col items-center">
                    <img src={logo.src} alt="Logo" className="h-12 mb-4" />
                    <p className="font-bold text-xl">¡Regalo Enviado!</p>
                    <p className="mt-2">Tu regalo ha sido enviado exitosamente.</p>
                    <p className="mt-1">¡Gracias por usar nuestro servicio!</p>
                    <a
                        onClick={()=>{router.push("/gift-card")}}
                        href="#"
                        className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950 mt-10"
                    >
                        Regala Nuevamente
                    </a>
                </div>
            </div>
        </Layout>
    );
}
