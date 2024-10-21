import React from "react";
import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import Heading from "../../components/Heading";
import Card from "../../components/card";
import OurServices from "../../components/our services";
import Footer from "../../components/footer.js";
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "../../imgvid/logo.png";










const PortFolio = () => {
  const [products, setProducts] = useState([]);
  const [base, setBase] = useState('Product Portfolio');
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
    const filtered = products.filter(item =>
      base === "Product Portfolio" ? item.projectType === "product" : item.projectType === "service"
    );
    setFilteredProducts(filtered);
  }, [base, products]);
  return (
    <div>
    
      <Hero />
      <Heading
        title="Expect Nothing Less Than Perfect"
        subtitle="Apprize infotech Deliver Client’s Idea Into Excellent Result!"
      />
      <div className="flex justify-center w-full gap-20 mb-10">
        <div className=" flex justify-center items-center gap-2 border-2 border-gray-100 shadow-md rounded-3xl">
          <div className={`${base === 'Product Portfolio' ? 'bg-blue-500 text-white rounded-l-3xl border-white' : 'text-gray-500'} p-2 px-4 uppercase rounded-md cursor-pointer`} onClick={() => setBase('Product Portfolio')}>Product Portfolio</div>
          <div className={`${base === 'Service Portfolio' ? 'bg-blue-500 text-white rounded-r-3xl border-white' : 'text-gray-500'} p-2 px-4 uppercase rounded-md cursor-pointer`} onClick={() => setBase('Service Portfolio')}>Service Portfolio</div>

        </div>
      </div>
      {filteredProducts.length > 0 ? <div className="flex flex-col gap-20">
        {filteredProducts?.map((item, index) => {
          return <Card index={index} key={index} item={item} />;
        })}
      
      </div> : <div className="flex justify-center mb-20 items-center">
        <h1 className="text-2xl font-bold">No products found</h1>
      </div>}
      <OurServices/>

      
    </div>
  );
};

export default PortFolio;
