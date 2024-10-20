// @/components/DummyPage.js
import React from 'react'
import Layout from './Layout'
import { FaBuilding, FaGift, FaRegCalendarAlt, FaUserFriends } from 'react-icons/fa'
import { useRouter } from 'next/router';

export default function DummyPage({ title }) {
    const router = useRouter();

    return (
        <Layout pageTitle={title} className="bg-white">
            <div className="min-h-screen flex items-center justify-center  px-4">
                <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg p-8 lg:space-x-8 space-y-8 lg:space-y-0">
                    {/* Sección de texto */}
                    <div className="flex flex-col text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                            Regala felicidad regala&nbsp;
                            <span className="text-teal-300">
                                JAMA&nbsp;
                            </span>
                            Gifts
                        </h1>
                        <p className="text-gray-500 mb-6">
                            Compra una tarjeta de regalo&nbsp;                   
                            <span className="text-teal-300">
                                JAMA&nbsp;
                            </span>
                            Gift en menos de un minuto con nuestro servicio.
                        </p>
                        <a
                            onClick={()=>{router.push("/gift-card")}}
                            href="#"
                            className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950"
                        >
                            Comprar
                        </a>
                    </div>
                    
                    {/* Sección de imagen */}
                    <div className="flex-shrink-0">
                        <img
                            src="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_384,w_576/v1605917926/assets/37/a15200-815f-416b-b2cc-b5ab193c707b/original/Uber-Gift-Card.svg" 
                            alt="Gift with balloons"
                            className="w-48 h-auto lg:w-64"
                        />
                    </div>
                </div>
            </div>

            <p className='text-black text-center font-bold text-2xl'>
                Razones para regalar&nbsp;
                <span className="text-teal-300">
                    JAMA&nbsp;
                </span> Gifts
            </p>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-lg shadow-lg p-8">
                    {/* Opción 1: Compra para tu negocio */}
                    <div className="flex flex-col items-center lg:items-start">
                        <span className='text-center text-4xl mb-6'>
                            <FaBuilding />
                        </span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">
                            Compra para tu negocio
                        </h1>
                        <p className="text-center lg:text-left text-gray-500 mb-6">
                            Las tarjetas de regalo son una excelente manera de agradecer a sus clientes y recompensar a su equipo. Utilice nuestro portal corporativo para comprar más de 10 tarjetas de regalo a la vez.
                        </p>
                    </div>

                    {/* Opción 2: Compra para tus seres queridos */}
                    <div className="flex flex-col items-center lg:items-start">
                        <span className='text-center text-4xl mb-6'>
                            <FaUserFriends />
                        </span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">
                            Compra para tus seres queridos
                        </h1>
                        <p className="text-center lg:text-left text-gray-500 mb-6">
                            Sorprende a tus amigos, familiares o pareja con una tarjeta de regalo. Es una forma rápida y sencilla de compartir momentos especiales o hacerles la vida más fácil con un regalo que realmente disfrutarán.
                        </p>
                    </div>

                    {/* Opción 3: Fechas especiales */}
                    <div className="flex flex-col items-center lg:items-start">
                        <span className='text-center text-4xl mb-6'>
                            <FaRegCalendarAlt />
                        </span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">
                            Fechas especiales
                        </h1>
                        <p className="text-center lg:text-left text-gray-500 mb-6">
                            Ya sea para un cumpleaños, una boda, o un aniversario, nuestras tarjetas de regalo son el detalle perfecto. Celebra los momentos más importantes de la vida con un regalo que se adapta a cualquier ocasión.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
