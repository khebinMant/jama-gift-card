import React, { act, useState } from "react";
import DummyPage from "@/components/DummyPage";
import Layout from "@/components/Layout";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import logo from "@/img/jama.png";
import giftImg from "@/img/gift_card.webp";
import { useRouter } from "next/router";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";

export default function GifCardPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGift, setSelectedGift] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { register, handleSubmit, trigger } = useForm(); // Usar React Hook Form
  const [gifts, setGifts] = useState([]);

  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
];

const getSeverity = (gift) => {
  switch (gift.inventoryStatus) {
      case 'INSTOCK':
          return 'success';

      case 'LOWSTOCK':
          return 'warning';

      case 'OUTOFSTOCK':
          return 'danger';

      default:
          return null;
  }
};

  const items = [{ label: "JAMA Gift" }, { label: "Datos" }, { label: "Pago" }];
  const router = useRouter();

  const giftOptions = [
    {
      id: 1,
      imgSrc:
        giftImg,
    },
    {
      id: 2,
      imgSrc:
      logo,
    },
    {
      id: 3,
      imgSrc:
        giftImg,
    },
    {
      id: 4,
      imgSrc:
        giftImg,
    },
    {
      id: 5,
      imgSrc:
        giftImg,
    },
    {
      id: 6,
      imgSrc:
        giftImg,
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

  const giftTemplate = (gift) => {
    return (
        <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <div className="mb-3">
                <img src={gift.imgSrc.src} alt={gift.name} className="shadow-2 w-48 h-auto lg:w-64" />
                <Button
                      disabled={!selectedGift}
                      onClick={() => setActiveIndex(activeIndex + 1)}
                      label="Continuar"
                      className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950 mt-5"
                   />
            </div>
            
        </div>
    );
};

  const onHandleSelectGift = (e) =>{
    
    console.log("hello")
    console.log(e.target)
    setSelectedGift(e.target)
  }

  return (
    <Layout pageTitle={"Comprar"} className="bg-white">
      <Steps
        className="mt-20"
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
        style={{ minWidth: "200px" }}
      />
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="flex flex-col">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8">
            {activeIndex === 0 && (
              // <>
              //   <div className="relative">
              //     <button
              //       onClick={handlePrevSlide}
              //       className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 ${
              //         currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
              //       }`}
              //       disabled={currentSlide === 0} // Deshabilita el botón si es el primer slide
              //     >
              //       {"<"}
              //     </button>
              //     <div className="flex overflow-hidden">
              //       <div
              //         className="flex transition-transform duration-500"
              //         style={{
              //           transform: `translateX(-${currentSlide * 100}%)`,
              //         }}
              //       >
              //         {giftOptions.map((gift) => (
              //           <div
              //             key={gift.id}
              //             onClick={() => setSelectedGift(gift.id)}
              //             className={`flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 
              //               ${
              //                 selectedGift === gift.id
              //                   ? "ring-4 ring-teal-400"
              //                   : "ring-1 ring-gray-300"
              //               } 
              //               rounded-lg ml-7`}
              //           >
              //             <img
              //               src={gift.imgSrc.src}
              //               alt={`Gift ${gift.id}`}
              //               className="w-48 h-auto lg:w-64"
              //             />
              //           </div>
              //         ))}
              //       </div>
              //     </div>
              //     {/* Botón de Siguiente */}
              //     <button
              //       onClick={handleNextSlide}
              //       className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 ${
              //         currentSlide === giftOptions.length - 1
              //           ? "opacity-50 cursor-not-allowed"
              //           : ""
              //       }`}
              //       disabled={currentSlide === giftOptions.length - 1} // Deshabilita el botón si es el último slide
              //     >
              //       {">"}
              //     </button>
              //   </div>
              //   <Button
              //     disabled={!selectedGift}
              //     onClick={() => setActiveIndex(activeIndex + 1)}
              //     label="Continuar"
              //     className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950 mt-5"
              //     />
              // </>
              <>
                <div className="card">
                    <Carousel 
                      value={giftOptions} 
                      numVisible={3} 
                      numScroll={3} 
                      responsiveOptions={responsiveOptions} 
                      className="custom-carousel" 
                      circular
                      autoplayInterval={5000} 
                      itemTemplate={giftTemplate}
                      onClickCapture={onHandleSelectGift}
                    />

                </div>
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
                  style={{ width: "350px" }}
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
