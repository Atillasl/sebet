import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import { supabase } from '../supabaseClient';
import { translations, productCategoryLabels } from '../i18n';

const EquipmentPage = ({ onAdd, setPage, language, onSelectProduct, cartItems = [] }) => {
  const t = translations[language];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      const ownerId = (process.env.REACT_APP_OWNER_USER_ID || '').trim();
      let finalData = [];
      let lastError = null;

      // 1) Preferred path: RPC for public catalog
      const rpcResult = await supabase.rpc('get_public_catalog');
      if (!rpcResult.error && Array.isArray(rpcResult.data) && rpcResult.data.length > 0) {
        finalData = rpcResult.data;
      } else {
        lastError = rpcResult.error;

        // 2) Fallback: products.user_id + Available
        const directResult = await supabase
          .from('products')
          .select('id, user_id, warehouse_id, name, category, price, status, image, warehouses(name)')
          .eq('user_id', ownerId)
          .eq('status', 'Available');

        if (!directResult.error && Array.isArray(directResult.data) && directResult.data.length > 0) {
          finalData = directResult.data;
        } else {
          lastError = directResult.error || lastError;

          // 3) Fallback: warehouse owner relation + Available
          const joinResult = await supabase
            .from('products')
            .select('id, user_id, warehouse_id, name, category, price, status, image, warehouses!inner(id, name, user_id)')
            .eq('status', 'Available')
            .eq('warehouses.user_id', ownerId);

          if (!joinResult.error && Array.isArray(joinResult.data)) {
            finalData = joinResult.data;
          } else {
            lastError = joinResult.error || lastError;
          }
        }
      }

      if (finalData.length > 0) {
        setProducts(finalData);
      } else {
        setProducts([]);
        if (lastError) {
          setError(lastError.message || 'Məhsullar yüklənmədi.');
        }
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const allCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((item) => item.category).filter(Boolean)));
    return ['All', ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        normalizedSearch === '' ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        (product.description || '').toLowerCase().includes(normalizedSearch) ||
        (productCategoryLabels[language][product.category] || product.category).toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm, language]);

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] overflow-hidden bg-slate-950 text-white shadow-2xl">
        <div className="relative h-96">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-12">
            <span className="text-sm uppercase tracking-[0.35em] text-amber-400">{t.nav.equipment}</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black leading-tight">{t.nav.equipment}</h1>
            <p className="mt-4 max-w-3xl text-base text-slate-200">{t.equipmentDescription}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{t.filters.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{t.filters.subtitle}</p>
              </div>
              <button
                onClick={() => setPage('home')}
                className="inline-flex items-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition"
              >
                {t.buttons.backHome}
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-[1fr]">
                <label className="relative block">
                  <span className="sr-only">{t.filters.searchLabel}</span>
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={t.filters.searchPlaceholder}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </label>
              </div>

              <CategoryBar
                categories={allCategories.map((category) =>
                  category === 'All'
                    ? t.filters.allCategories
                    : productCategoryLabels[language][category] || category
                )}
                selectedCategory={
                  selectedCategory === 'All'
                    ? t.filters.allCategories
                    : productCategoryLabels[language][selectedCategory] || selectedCategory
                }
                setSelectedCategory={(label) => {
                  if (label === t.filters.allCategories) {
                    setSelectedCategory('All');
                  } else {
                    const matchingKey = allCategories.find(
                      (category) => (productCategoryLabels[language][category] || category) === label
                    );
                    if (matchingKey) setSelectedCategory(matchingKey);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              {loading ? t.filters.loading : t.categoryCount.replace('{count}', filteredProducts.length)}
            </p>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
              {error}
            </div>
          ) : loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              {t.filters.loading}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    image: product.image || 'https://via.placeholder.com/720x480?text=No+Image',
                    description: product.description || '-'
                  }}
                  onAdd={onAdd}
                  language={language}
                  onSelect={(selected) => onSelectProduct?.(selected, 'equipment')}
                  cartItems={cartItems}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-gray-500">
              {t.noProducts}
            </div>
          )}
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.filters.categoryTitle}</h3>
            <p className="mt-2 text-sm text-slate-500">{t.filters.categoryDescription}</p>
          </div>
          <div className="grid gap-3">
            {allCategories.map((category) => {
              const label = category === 'All' ? t.filters.allCategories : productCategoryLabels[language][category] || category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${selectedCategory === category ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EquipmentPage;
