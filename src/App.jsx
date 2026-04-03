import React, { useState, useEffect } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  // 1. Initial State: Brauzer yaddaşından datanı oxuyuruq
  // Bu funksiya yalnız proqram ilk dəfə açılanda işləyir (Performance optimization)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('local_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Səhifə naviqasiyası (home və ya cart)
  const [page, setPage] = useState('home');

  // 2. Side Effect: Səbətdə hər hansı dəyişiklik olanda LocalStorage-a yazırıq
  useEffect(() => {
    localStorage.setItem('local_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Səbətə məhsul əlavə etmək funksiyası
  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      // Əgər məhsul artıq varsa, sayını (qty) artırırıq
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      // Məhsul yoxdursa, yeni obyekt kimi əlavə edirik
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // Səbətdən məhsul çıxarmaq funksiyası
  const removeFromCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      // Say 1-dirsə, məhsulu array-dən tamamilə silirik
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      // Say 1-dən çoxdursa, sayını azaldırıq
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  // Səbəti tam təmizləmək (Ödənişdən sonra və ya "Clear All" üçün)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    // Flex-col və min-h-screen Footer-in aşağıda qalmasını təmin edir
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* HEADER: Səbət sayını və səhifə keçidini idarə edir */}
      <Header 
        countCartItems={cartItems.reduce((a, c) => a + c.qty, 0)} 
        setPage={setPage} 
      />

      {/* MAIN: Dinamik olaraq Home və ya Cart səhifəsini göstərir */}
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {page === 'home' ? (
          <Home onAdd={addToCart} />
        ) : (
          <Cart 
            cartItems={cartItems} 
            onAdd={addToCart} 
            onRemove={removeFromCart} 
            setPage={setPage}
            clearCart={clearCart}
          />
        )}
      </main>

      {/* FOOTER: Saytın alt hissəsi */}
      <Footer setPage={setPage} />
      
    </div>
  );
}

export default App;