import { Provider } from 'react-redux';
import store from './components/redux/store';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/pages/ProductDetails';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
