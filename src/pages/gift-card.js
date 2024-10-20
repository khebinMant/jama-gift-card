import React, { act, useState } from "react";
import DummyPage from "@/components/DummyPage";
import Layout from "@/components/Layout";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import logo from "@/img/jama.png";
import { useRouter } from "next/router";

export default function GifCardPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGift, setSelectedGift] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { register, handleSubmit, trigger } = useForm(); // Usar React Hook Form

  const items = [{ label: "JAMA Gift" }, { label: "Datos" }, { label: "Pago" }];
  const router = useRouter();

  const giftOptions = [
    {
      id: 1,
      imgSrc:
        "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_384,w_576/v1605917926/assets/37/a15200-815f-416b-b2cc-b5ab193c707b/original/Uber-Gift-Card.svg",
    },
    {
      id: 2,
      imgSrc:
        "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_384,w_576/v1605917926/assets/37/a15200-815f-416b-b2cc-b5ab193c707b/original/Uber-Gift-Card.svg",
    },
    {
      id: 3,
      imgSrc:
        "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_384,w_576/v1605917926/assets/37/a15200-815f-416b-b2cc-b5ab193c707b/original/Uber-Gift-Card.svg",
    },
    {
      id: 4,
      imgSrc:
        "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_384,w_576/v1605917926/assets/37/a15200-815f-416b-b2cc-b5ab193c707b/original/Uber-Gift-Card.svg",
    },
    {
      id: 5,
      imgSrc:
        "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_384,w_576/v1605917926/assets/37/a15200-815f-416b-b2cc-b5ab193c707b/original/Uber-Gift-Card.svg",
    },
    {
      id: 6,
      imgSrc:
        "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_384,w_576/v1605917926/assets/37/a15200-815f-416b-b2cc-b5ab193c707b/original/Uber-Gift-Card.svg",
    },
  ];

  const handleNextSlide = () => {
    if (currentSlide < giftOptions.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const onSubmit = (data) => {
    setActiveIndex(activeIndex + 1);
  };

  const handlePayment = () => {
    router.push("/finish");
  };

  return (
    <Layout pageTitle={""} className="bg-white">
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="flex flex-col">
          <Steps
            className="mb-10"
            model={items}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            readOnly={false}
            style={{ minWidth: "200px" }}
          />
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8">
            {activeIndex === 0 && (
              <>
                <div className="relative">
                  <button
                    onClick={handlePrevSlide}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 ${
                      currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentSlide === 0} // Deshabilita el botón si es el primer slide
                  >
                    {"<"}
                  </button>
                  <div className="flex overflow-hidden">
                    <div
                      className="flex transition-transform duration-500"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {giftOptions.map((gift) => (
                        <div
                          key={gift.id}
                          onClick={() => setSelectedGift(gift.id)}
                          className={`flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 
                            ${
                              selectedGift === gift.id
                                ? "ring-4 ring-teal-400"
                                : "ring-1 ring-gray-300"
                            } 
                            rounded-lg ml-7`}
                        >
                          <img
                            src={gift.imgSrc}
                            alt={`Gift ${gift.id}`}
                            className="w-48 h-auto lg:w-64"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Botón de Siguiente */}
                  <button
                    onClick={handleNextSlide}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 ${
                      currentSlide === giftOptions.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={currentSlide === giftOptions.length - 1} // Deshabilita el botón si es el último slide
                  >
                    {">"}
                  </button>
                </div>
                <Button
                  disabled={!selectedGift}
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  label="Continuar"
                  className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950 mt-5"
                  />
              </>
            )}
            {activeIndex === 1 && (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-4"
                >
                  <input
                    {...register("recipientName", { required: true })}
                    placeholder="Nombres del destinatario"
                    className="border p-2 rounded"
                  />
                  <input
                    {...register("recipienLastName", { required: true })}
                    placeholder="Apellidos del destinatario"
                    className="border p-2 rounded"
                  />
                  <input
                    {...register("recipientPhone", { required: true })}
                    placeholder="Teléfono del destinatario"
                    className="border p-2 rounded"
                    type="number"
                  />
                  <input
                    {...register("recipientEmail", { required: true })}
                    placeholder="Email del destinatario"
                    className="border p-2 rounded"
                    type="email"
                  />
                  <textarea
                    {...register("message", { required: true })}
                    placeholder="Mensaje"
                    className="border p-2 rounded h-24"
                  />
                  <Button
                    label="Continuar"
                    type="submit"
                    className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950"
                    />
                </form>
              </>
            )}
            {activeIndex === 2 && (
              <div className="flex flex-col lg:flex-row items-center justify-between space-x-4 gap-10">
                {/* Tarjeta de crédito */}
                <div
                  className="bg-gray-800 text-white p-6 rounded-lg shadow-md"
                  style={{ width: "400px" }}
                >
                  <div className="flex justify-between mb-4">
                    <img src={logo.src} alt="Logo" className="h-8" />
                    <div className="text-sm">
                      <p>VALID THRU</p>
                      <p className="font-bold">12/25</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold mb-2">
                    1234 5678 9012 3456
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">JOHN DOE</p>
                    <p className="text-sm">123</p>
                  </div>
                  <div className="mt-4 text-sm text-center">
                    <p>Authorized Signature</p>
                  </div>
                </div>

                {/* Formulario de datos */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-4 w-72 lg:w-1/2"
                >
                  <input
                    {...register("cardNumber", { required: true })}
                    placeholder="Número de tarjeta"
                    className="border p-2 rounded"
                    type="text"
                  />
                  <input
                    {...register("cardholderName", { required: true })}
                    placeholder="Nombre del titular"
                    className="border p-2 rounded"
                  />
                  <div className="flex space-x-4">
                    <input
                      {...register("expiryDate", { required: true })}
                      placeholder="MM/YY"
                      className="border p-2 rounded w-1/2"
                    />
                    <input
                      {...register("cvv", { required: true })}
                      placeholder="CVV"
                      className="border p-2 rounded w-1/2"
                      type="text"
                    />
                  </div>
                  <Button
                    label="Pagar"
                    type="button" // Cambiar a 'button' para evitar el comportamiento por defecto de envío
                    onClick={handlePayment}
                    className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950"
                  />{" "}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
