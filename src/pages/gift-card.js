import React, { act, useState } from "react";
import Layout from "@/components/Layout";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import logo from "@/img/jama.png";
import { useRouter } from "next/router";
import { Carousel } from "primereact/carousel";
import { useEffect } from "react";

export default function GifCardPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGift, setSelectedGift] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { register, handleSubmit, trigger } = useForm(); // Usar React Hook Form
  const [products, setProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleProductSelect = (index) => {
    setSelectedIndex(index);
};

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

  useEffect(() => {
    setProducts([
      {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Tigribollado',
          description: 'Product Description',
          image: '1.png',
          price: 7.99,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
      },
      {
          id: '1001',
          code: 'nvklal433',
          name: 'Bielando',
          description: 'Product Description',
          image: '2.png',
          price: 9.99,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'INSTOCK',
          rating: 4
      },
      {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Bielando',
          description: 'Product Description',
          image: '3.png',
          price: 9.99,
          category: 'Fitness',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 3
      },
      {
          id: '1003',
          code: '244wgerg2',
          image: '1.png',
          description: 'Product Description',
          image: '4.png',
          price: 7.99,
          category: 'Clothing',
          quantity: 25,
          inventoryStatus: 'INSTOCK',
          rating: 5
      },
      {
          id: '1004',
          code: 'h456wer53',
          name: 'Bracelet',
          description: 'Product Description',
          image: '3.png',
          price: 15,
          category: 'Accessories',
          quantity: 73,
          inventoryStatus: 'INSTOCK',
          rating: 4
      }
  ])
  }, [])
  


  const onSubmit = (data) => {
    setActiveIndex(activeIndex + 1);
  };

  const handlePayment = () => {
    router.push("/finish");
  };


  const productTemplate = (product, index) => {
    const isSelected = index === selectedIndex;

    return (
        <div 
            className={`border-1 surface-border border-round m-2 text-center py-5 px-3 flex flex-col items-center ${isSelected ? 'border-blue-500' : 'border-gray-300'}`}
        >
            <div className="mb-3 flex justify-center">
                <img 
                    src={`/img/${product.image}`} 
                    alt={product.name} 
                    className="w-auto shadow-2" 
                />
            </div>
            <div>
                <h4 className="mb-1">{product.name}</h4>
                <h6 className="mt-0 mb-3">${product.price}</h6>
                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)} /> */}
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                    <Button label="Regalar" className=" text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-95" onClick={()=>{setActiveIndex(activeIndex+1)}}/>
                </div>
            </div>
        </div>
    );
};

const onHandleSelectGift = (gift) => {
  setSelectedGift(gift);
};
  return (
    <Layout pageTitle={"Comprar"} className="bg-white">
      <div className="w-11/12">
      <Steps
        className="mt-20"
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
        // style={{ minWidth: "200px" }}
      />
            {activeIndex === 0 && (
              <div class="bg-surface-card p-8 rounded-lg">
              <Carousel 
                value={products} 
                numVisible={3} 
                numScroll={1} 
                responsiveOptions={responsiveOptions} 
                className="custom-carousel" 
                circular
                autoplayInterval={3000} 
                itemTemplate={productTemplate} 
                style={{ maxWidth: "100%" }} // Ajusta el ancho del carrusel

            />
              </div>
            )}
            {activeIndex === 1 && (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-4 mt-10"
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
              <div className="flex flex-col lg:flex-row items-center justify-between space-x-4 gap-10 mt-10">
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
    </Layout>
  );
}
