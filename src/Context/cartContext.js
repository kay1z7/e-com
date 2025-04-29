/* eslint-disable no-param-reassign */
// cartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Создаем контекст для хранения состояния корзины
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buyNow, setBuyNow] = useState({});
  const [toggleBuyNow, setToggleBuyNow] = useState(false);
  const [deepLink, setDeepLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [token, setToken] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [comment, setComment] = useState("");
  const [sendItems, setSendItems] = useState(false);
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [isCredit, setIsCredit] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 550);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Функция для добавления товара в корзину
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].amount += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, amount: 1 }]);
    }
  };

  // Функция для удаления товара из корзины
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };
  const clearCart = () => {
    // eslint-disable-next-line no-return-assign
    setCartItems((prev) => (prev.length = 0));
  };

  // Обновляем состояние корзины в локальном хранилище при каждом изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogout = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <CartContext.Provider
      value={{
        setFullAddress,
        setComment,
        orderId,
        setOrderId,
        paymentSuccess,
        setPaymentSuccess,
        setSendItems,
        sendItems,
        fullAddress,
        comment,
        token,
        setToken,
        deepLink,
        setDeepLink,
        cartItems,
        addToCart,
        clearCart,
        removeFromCart,
        buyNow,
        setBuyNow,
        setToggleBuyNow,
        toggleBuyNow,
        isLoggedIn,
        setIsLoggedIn,
        isMobile,
        setIsMobile,
        handleLogout,
        isCredit,
        setIsCredit
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для доступа к состоянию корзины из других компонентов
export const useCart = () => {
  return useContext(CartContext);
};
