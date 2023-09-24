import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteProduct(product.id));
  };

  return (
    <div className="w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2 md:ml-6 md:mt-2">
      <img
        className="w-full md:h-60 max-w-xs pl-7 pt-2 md:pl-10 md:pt-4 rounded-t-lg"
        src={product.image}
        alt={product.title}
      />
      <div className="p-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Price: ${product.price}
          </span>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
