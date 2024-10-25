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
  const { register, handleSubmit, trigger, getValues } = useForm(); 
  const [products, setProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0.00);

const handleQuantityChange = (product, currentQuantity, change) => {
  let newQuantity = currentQuantity;

  if (change < 0) {
    if (currentQuantity >= 1) {
      newQuantity = currentQuantity - 1;
      setTotal(total - product.price); 
    } else {
      newQuantity = 0;

    }
  } 
  else if (change > 0) {
    newQuantity = currentQuantity + 1; 
    setTotal(total + product.price); 
  }

  setQuantities({
    ...quantities,
    [product.id]: newQuantity,
  });
};

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
          price: 9.00,
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
          price: 12.00,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'INSTOCK',
          rating: 4
      },
      {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Ceviche',
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
          name: 'Combo Chuchaqui',
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
          name: 'Patacones',
          description: 'Product Description',
          image: '5.png',
          price: 4.00,
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
    const to = getValues("recipientEmail"); 
    const message = getValues("message"); 
    const gifter = getValues("gifterName"); 

    console.log(to)
    fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to:to,
        message:message,
        gifter:gifter,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Correo enviado:', data);
        router.push("/finish");
      })
      .catch((error) => {
        console.error('Error:', error);
        router.push("/finish");
      });
  };


  const productTemplate = (product, index) => {
    const isSelected = index === selectedIndex;
    const quantity = quantities[product.id] || 0;

    return (
      <div
        className={`border-1 surface-border border-round m-2 text-center py-5 px-3 flex flex-col items-center ${
          isSelected ? "border-blue-500" : "border-gray-300"
        }`}
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
          <div className="flex flex-col items-center">
            {/* Contador de cantidad */}
            <div className="flex items-center space-x-2">
              <Button
                icon="pi pi-minus"
                className="p-button-text"
                onClick={() =>
                  handleQuantityChange(product, quantities[product.id] || 0, -1) // Pasamos el valor actual de la cantidad
                }
              />
              <span>{quantity}</span>
              <Button
                icon="pi pi-plus"
                className="p-button-text"
                onClick={() =>
                  handleQuantityChange(product, quantities[product.id] || 0, 1) // Pasamos el valor actual de la cantidad
                }
              />
            </div>

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
        onSelect={(e) => {
          if(e.index < activeIndex){
            setActiveIndex(e.index)}}
          }
        readOnly={false}
        style={{ minWidth: "200px" }}
      />
            {activeIndex === 0 && (
              <div className="bg-surface-card p-8 rounded-lg">
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
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
            <div className="flex flex-col text-center">
              <h1 className="mb-5">
              {
                total < 0 ? 
                <b>Total: 0</b>
                  :
                <b>Total: {total.toFixed(2)}</b>
              }
              </h1>
                <Button
                  disabled={total<=0}
                  label="Regalar"
                  className="text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-95"
                  onClick={() => {
                    setActiveIndex(activeIndex + 1);
                  }}
                />
            </div>
            </div>
              </div>
            )}
            {activeIndex === 1 && (
              <div className="flex flex-col lg:flex-row w-full mt-5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-4 mt-10 w-full lg:w-1/2"
                  >
                  <input
                    {...register("gifterName", { required: true })}
                    placeholder="Tu nombre: "
                    className="border p-2 rounded"
                  />
                  <input
                    {...register("recipientName", { required: true })}
                    placeholder="¿A quien se lo dedicas?: "
                    className="border p-2 rounded"
                  />
                  <input
                    {...register("recipientPhone", { required: true })}
                    placeholder={`Teléfono del destinatario: `}
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
                    placeholder="Mensaje de tu regalo"
                    className="border p-2 rounded h-24"
                  />
                  <Button
                    label="Continuar"
                    type="submit"
                    className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950"
                    />
                </form>
                <div className="bg-surface-card p-4 mb-6 rounded-lg w-full lg:w-1/2 mt-5">
                  <h2 className="text-lg font-bold mb-2">Resumen de Compras</h2>
                  <ul className="space-y-2 mt-5">
                    {products.map((product) => {
                      const quantity = quantities[product.id] || 0;
                      return (
                        quantity > 0 && (
                          <li key={product.id} className="flex justify-between">
                            <span>{product.name} (x{quantity})</span>
                            <span>${(product.price * quantity).toFixed(2)}</span>
                          </li>
                        )
                      );
                    })}
                  </ul>
                  <div className="flex justify-between mt-4 font-bold absolute right-36 mt-12">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

              </div>
            )}
            {activeIndex === 2 && (
              <div className="flex flex-col lg:flex-row w-full mt-5 justify-center items-center">
              <div className="bg-surface-card p-4 mb-6 rounded-lg w-full lg:w-1/2 mt-5 flex flex-col justify-center items-center">
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
                  <form
                  onSubmit={handleSubmit(handlePayment)}
                  className="flex flex-col space-y-4 mt-10 w-full lg:w-1/2"
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
                    type="submit"
                    className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-900 transition border-slate-950"
                  />{" "}
                </form>
                </div>
                <div className="bg-surface-card p-4 mb-6 rounded-lg w-full lg:w-1/2 mt-5">
                  <h2 className="text-lg font-bold mb-2">Resumen de Compras</h2>
                  <ul className="space-y-2 mt-5">
                    {products.map((product) => {
                      const quantity = quantities[product.id] || 0;
                      return (
                        quantity > 0 && (
                          <li key={product.id} className="flex justify-between">
                            <span>{product.name} (x{quantity})</span>
                            <span>${(product.price * quantity).toFixed(2)}</span>
                          </li>
                        )
                      );
                    })}
                  </ul>
                  <div className="flex justify-between mt-4 font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
    </Layout>
  );
}
