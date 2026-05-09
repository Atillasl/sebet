import { useMemo, useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import EquipmentPage from './pages/EquipmentPage';
import AboutPage from './pages/AboutPage';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import { useLocalStorageState } from './hooks/useLocalStorageState';

function App() {
  const [cartItems, setCartItems] = useLocalStorageState('local_cart', []);
  const [language, setLanguage] = useLocalStorageState('falkon_language', 'az');
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previousPage, setPreviousPage] = useState('home');

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.qty, 0),
    [cartItems]
  );

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
      return;
    }

    setCartItems([...cartItems, { ...product, qty: 1 }]);
  };

  const removeFromCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (!existingProduct) {
      return;
    }

    if (existingProduct.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const openProductPage = (product, fromPage = 'home') => {
    setSelectedProduct(product);
    setPreviousPage(fromPage);
    setPage('product');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onAdd={addToCart} setPage={setPage} language={language} />;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onAdd={addToCart}
            onRemove={removeFromCart}
            setPage={setPage}
            language={language}
          />
        );
      case 'product':
        return (
          <ProductPage
            product={selectedProduct}
            onAdd={addToCart}
            setPage={setPage}
            language={language}
            previousPage={previousPage}
          />
        );
      case 'equipment':
        return (
          <EquipmentPage
            onAdd={addToCart}
            setPage={setPage}
            language={language}
            onSelectProduct={openProductPage}
          />
        );
      case 'about':
        return <AboutPage setPage={setPage} language={language} />;
      default:
        return (
          <CategoryPage
            page={page}
            onAdd={addToCart}
            setPage={setPage}
            language={language}
            onSelectProduct={openProductPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header
        countCartItems={cartCount}
        setPage={setPage}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="container mx-auto p-4 md:p-8 flex-grow">{renderPage()}</main>

      <Footer setPage={setPage} language={language} setLanguage={setLanguage} />
    </div>
  );
}

export default App;
