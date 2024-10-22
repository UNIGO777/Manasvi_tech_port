import React, { useRef } from "react";
import Hero from "../../components/hero";
import Heading from "../../components/Heading";
import Card from "../../components/card";
import OurServices from "../../components/our services";
import Footer from "../../components/footer.js";
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "../../imgvid/logo.png";
import Contact from "../../components/contact/index.js";
import ClientCarousel from "../../components/clientsbar/index.js";

const PortFolio = ({homeRef,productsRef,servicesRef,contactRef,clientRef,serviceRefClick,productRefClick}) => {
  console.log(serviceRefClick, "serviceRefClick");
  const [products, setProducts] = useState([]);
  const [base, setBase] = useState('Product Portfolio');
  useEffect(() => {
    if(serviceRefClick){
      setBase('Service Portfolio');
    } else if(productRefClick) {
      setBase('Product Portfolio');
    }
  }, [serviceRefClick]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  

 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(' /api/projects');
        setProducts(response.data);
      } catch(error) {
        alert("Error fetching products:", error);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  

  useEffect(() => {
    const filtered = Array.isArray(products) ? products.filter(item =>
      base === "Product Portfolio" ? item?.projectType === "product" : item?.projectType === "service"
    ) : [];
    setFilteredProducts(filtered);
  }, [base, products]);

  return (
    <section ref={homeRef}>
      <Hero  />
      <Heading
        title="Expect Nothing Less Than Perfect"
        subtitle="Manasvi Technologies Deliver Client’s Idea Into Excellent Result!"
      />
     
      <div className="flex justify-center w-full gap-20 px-5 mb-10">
        <div className="flex items-center justify-center gap-2 border-2 border-gray-100 shadow-md rounded-3xl">
          <div className={`${base === 'Product Portfolio' ? 'bg-blue-500 text-white rounded-l-3xl border-white' : 'text-gray-500'} p-2 px-4 uppercase rounded-md cursor-pointer`} onClick={() => setBase('Product Portfolio')}>Product Portfolio</div>
          <div className={`${base === 'Service Portfolio' ? 'bg-blue-500 text-white rounded-r-3xl border-white' : 'text-gray-500'} p-2 px-4 uppercase rounded-md cursor-pointer`} onClick={() => setBase('Service Portfolio')}>Service Portfolio</div>
        </div>
      </div>
      {filteredProducts.length > 0 ? <div className="flex flex-col gap-20" ref={el => { productsRef.current = el; servicesRef.current = el; }}>
        {filteredProducts?.map((item, index) => {
          return <Card index={index} key={index} item={item} />;
        })} 
      </div> : <div className="flex items-center justify-center mb-20">
        <h1 className="text-2xl font-bold">No products found</h1>
      </div>}
      <div className="client-section" ref={clientRef}>
        {/* Client section content */}
      </div>
      <section ref={clientRef}>
        <ClientCarousel></ClientCarousel>
      </section>
      <OurServices ref={servicesRef} />
      <section ref={contactRef}>
        <Contact></Contact>
      </section>
    </section>
  );
};

export default PortFolio;
