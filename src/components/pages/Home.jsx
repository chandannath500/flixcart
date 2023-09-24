import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, sortByPrice } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    price: '',
  });

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form fields
    setFormData({
      image: '',
      title: '',
      description: '',
      price: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    // Dispatch action to add the product with formData
    dispatch(addProduct(formData));
    // Close the modal and reset form fields
    handleCloseModal();
  };

  const handleSortByPrice = () => {
    dispatch(sortByPrice());
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <nav className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href='/' className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              FlixCart
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-4"
              onClick={handleSortByPrice}
            >
              Sort Product
            </button>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky"></div>
        </div>
      </nav>

      <div className="product-list mt-28 ml-2 mr-2 md:mt-16 md:flex md:flex-wrap md:justify-evenly">
  {products.map(product => (
    <Link to={`/product/${product.id}`} key={product.id}>
      <ProductCard product={product} />
    </Link>
  ))}
</div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleFormChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleFormChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleFormChange}
              className="w-full mb-2 p-2 border border-gray-300 rounded-md resize-none"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleFormChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleFormSubmit}
              className={`${
                formData.image && formData.title && formData.description && formData.price
                  ? 'bg-blue-700 text-white hover:bg-blue-800'
                  : 'bg-gray-300 cursor-not-allowed text-gray-600'
              } py-2 px-4 rounded-lg`}
              disabled={
                !(formData.image && formData.title && formData.description && formData.price)
              }
            >
              Submit
            </button>
            <button onClick={handleCloseModal} className="text-blue-700 hover:underline ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
