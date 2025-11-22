import { useState, useCallback, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Footer from './Footer';
import ProductListPage from './ProductListPage';
import ProductPage from './ProductPage';
import NotFoundPage from './NotFoundPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import CartPage from './CartPage';
import Loading from './Loading';
import UserRoute from './UserRoute';
import AuthRoute from './AuthRoute';
import Alert from './Alert';
import { AlertContext, UserContext } from './Context';

export const CartContext = createContext();

function App() {
  const savedDataString = localStorage.getItem('cart');
  const savedData = savedDataString ? JSON.parse(savedDataString) : {};
  const token = localStorage.getItem('token');

  const [cart, setCart] = useState(savedData);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState();

  useEffect(() => {
    if (token) {
      axios
        .get('https://myeasykart.codeyogi.io/me', {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleAddToCart = useCallback(
    function (productId, count) {
      const newCart = { ...cart, [productId]: cart[productId] ? cart[productId] + count : count };
      updateCart(newCart);
    },
    [cart]
  );

  function updateCart(newCart) {
    const a = { ...newCart };
    setCart({ ...a });
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);
  }

  function removeAlert() {
    setAlert(undefined);
  }

  const cartData = { cart, setCart, updateCart };
  const userData = { user, setUser };
  const alertData = { alert, setAlert, removeAlert };

  const totalCount = Object.keys(cart).reduce((total, current) => total + cart[current], 0);

  if (loading) {
    return <Loading />;
  }

  return (
    <AlertContext.Provider value={alertData}>
      <UserContext.Provider value={userData}>
        <CartContext.Provider value={cartData}>
          <div className="bg-gray-100 h-screen overflow-scroll flex flex-col">
            <Navbar totalCount={totalCount} />
            <div className="grow mx-4 my-8 bg-white px-8 py-2 max-w-6xl lg:w-full lg:px-12 lg:py-16 xl:mx-auto">
              <Alert />
              <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
                <Route path="/forgotpassword" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
                <Route path="/signup" element={<AuthRoute><SignUpPage /></AuthRoute>} />
                <Route path="/ProductPage/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer className="bottom-0" />
          </div>
        </CartContext.Provider>
      </UserContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;
