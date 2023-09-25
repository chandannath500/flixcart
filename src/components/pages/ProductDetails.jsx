import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {
 
  const { productId } = useParams();

 
  const product = useSelector(state =>
    state.products.products.find(product => product.id === parseInt(productId))
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <nav className="bg-gray-200 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              FlixCart
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-4"             
            >
             <Link to="/">Back to Home</Link>
            </button>          
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky"></div>
        </div>
      </nav>
<div className='flex flex-row'>
      <div className="mt-20 mx-4">       
       
        <img src={product.image} alt={product.title} className="max-w-md mt-4" />
        </div>
        <div className='flex flex-col mt-44'>
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="mt-4 font-semibold">{product.description}</p>
        <p className="mt-2 font-extrabold">Price: ${product.price}</p>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
