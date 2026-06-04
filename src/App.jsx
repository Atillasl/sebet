import React, { useState, useEffect } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import EquipmentPage from './pages/EquipmentPage';
import AboutPage from './pages/AboutPage';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';

function App() {
  // 1. Initial State: Brauzer yaddaşından datanı oxuyuruq
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('local_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previousPage, setPreviousPage] = useState('home');
  const [initialCategory, setInitialCategory] = useState('All');

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('falkon_language');
    return ['az', 'en', 'ru'].includes(saved) ? saved : 'az';
  });

  // 2. Side Effect: Səbətdə hər hansı dəyişiklik olanda LocalStorage-a yazırıq
  useEffect(() => {
    localStorage.setItem('local_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('falkon_language', language);
  }, [language]);

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

  const openProductPage = (product, fromPage) => {
    setSelectedProduct(product);
    setPreviousPage(fromPage || 'home');
    setPage('product');
  };

  // Kateqoriya üzrə EquipmentPage-ə yönləndirmə
  const navigateToCategory = (categoryKey) => {
    setInitialCategory(categoryKey);
    setPage('equipment');
    window.scrollTo(0, 0);
  };

  return (
    // Flex-col və min-h-screen Footer-in aşağıda qalmasını təmin edir
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col" style={{fontFamily: "'DM Sans', sans-serif"}}>
      
      {/* HEADER: Səbət sayını və səhifə keçidini idarə edir */}
      <Header 
        countCartItems={cartItems.reduce((a, c) => a + c.qty, 0)} 
        setPage={setPage} 
        language={language}
        setLanguage={setLanguage}
      />

      {/* MAIN: Dinamik olaraq Home və ya Cart səhifəsini göstərir */}
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {page === 'home' ? (
          <Home onAdd={addToCart} setPage={setPage} language={language} onCategoryClick={navigateToCategory} />
        ) : page === 'cart' ? (
          <Cart 
            cartItems={cartItems} 
            onAdd={addToCart} 
            onRemove={removeFromCart} 
            setPage={setPage}
            clearCart={clearCart}
            language={language}
          />
        ) : page === 'product' ? (
          <ProductPage
            product={selectedProduct}
            onAdd={addToCart}
            setPage={setPage}
            language={language}
            previousPage={previousPage}
          />
        ) : page === 'equipment' ? (
          <EquipmentPage
            onAdd={addToCart}
            setPage={setPage}
            language={language}
            onSelectProduct={openProductPage}
            cartItems={cartItems}
            initialCategory={initialCategory}
          />
        ) : page === 'about' ? (
          <AboutPage setPage={setPage} language={language} />
        ) : (
          setPage('home')
        )}
      </main>

      {/* FOOTER: Saytın alt hissəsi */}
      <Footer setPage={setPage} language={language} setLanguage={setLanguage} />
      
    </div>
  );
}

export default App;
