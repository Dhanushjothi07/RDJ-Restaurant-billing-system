import React, { useState, useEffect } from 'react';
import MenuGrid from './components/MenuGrid';
import BillingSidebar from './components/BillingSidebar';
import AdminPanel from './components/AdminPanel';
import MenuItemModal from './components/MenuItemModal';
import AdminLoginModal from './components/AdminLoginModal';
import { INITIAL_MENU, saveToStorage, getFromStorage, MENU_VERSION } from './data/store';

function App() {
  const [items, setItems] = useState(() => getFromStorage('menuItems', INITIAL_MENU));
  const [cart, setCart] = useState(() => getFromStorage('cart', []));
  const [bills, setBills] = useState(() => getFromStorage('bills', []));
  const [nextBillNum, setNextBillNum] = useState(() => getFromStorage('nextBillNum', 1));
  const [view, setView] = useState('pos'); // 'pos' or 'admin'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const savedVersion = getFromStorage('menuVersion', '1.0');
    if (String(savedVersion) !== String(MENU_VERSION)) {
      localStorage.removeItem('menuItems');
      saveToStorage('menuVersion', MENU_VERSION);
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    saveToStorage('menuItems', items);
  }, [items]);

  useEffect(() => {
    saveToStorage('cart', cart);
  }, [cart]);

  useEffect(() => {
    saveToStorage('bills', bills);
  }, [bills]);

  useEffect(() => {
    saveToStorage('nextBillNum', nextBillNum);
  }, [nextBillNum]);

  // Cart Operations
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const onSaveBill = (billData) => {
    setBills(prev => [billData, ...prev]);
    setNextBillNum(prev => prev + 1);
    clearCart();
  };

  // Menu Operations
  const onSaveItem = (itemData) => {
    if (editingItem) {
      setItems(prev => prev.map(item => item.id === itemData.id ? itemData : item));
      setCart(prev => prev.map(item => item.id === itemData.id ? { ...itemData, quantity: item.quantity } : item));
    } else {
      setItems(prev => [...prev, itemData]);
    }
  };

  const onEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const onDeleteItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    // Also remove from cart if present
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const onResetMenu = () => {
    localStorage.clear(); // Clear all to be safe
    window.location.reload();
  };

  // Filter Items
  const filteredItems = items.filter(item => {
    const itemName = String(item.name || '').toLowerCase();
    const itemCategory = String(item.category || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch = itemName.includes(search) || itemCategory.includes(search);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Main course', 'Breakfast', 'Beverages', 'Starters', 'Dessert'];

  return (
    <div className="app-container">
      {/* Main Content Area */}
      <div className="main-content">
        <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: 'var(--primary-color)' }}>ANTIGRAVITY Foodie</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Fast & Premium Billing System</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {view === 'pos' && (
              <button
                className="btn btn-primary"
                style={{ background: 'var(--success-color)' }}
                onClick={() => {
                  setEditingItem(null);
                  setIsModalOpen(true);
                }}
              >
                + Add Menu
              </button>
            )}
            <button
              className={`btn ${view === 'pos' ? 'btn-primary' : ''}`}
              style={{ background: view === 'pos' ? 'var(--primary-color)' : 'var(--bg-accent)' }}
              onClick={() => setView('pos')}
            >
              POS Menu
            </button>
            <button
              className={`btn ${view === 'admin' ? 'btn-primary' : ''}`}
              style={{ background: view === 'admin' ? 'var(--primary-color)' : 'var(--bg-accent)' }}
              onClick={() => {
                if (view === 'pos') {
                  setIsAdminLoginOpen(true);
                } else {
                  setView('admin');
                }
              }}
            >
              Admin Panel
            </button>
          </div>
        </header>

        {view === 'pos' ? (
          <>
            <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: '400px', padding: '12px', fontSize: '1rem', marginBottom: '0' }}
              />
              <div className="category-nav" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`btn ${selectedCategory === cat ? 'btn-primary' : ''}`}
                    style={{
                      background: selectedCategory === cat ? 'var(--primary-color)' : 'var(--bg-accent)',
                      fontSize: '0.9rem',
                      padding: '8px 16px'
                    }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <MenuGrid
              items={filteredItems}
              addToCart={addToCart}
              onDeleteItem={onDeleteItem}
              onEditItem={onEditItem}
            />
          </>
        ) : (
          <AdminPanel
            bills={bills}
            onResetMenu={onResetMenu}
          />
        )}
      </div>

      {/* Sidebar - Only show in POS mode */}
      {view === 'pos' && (
        <BillingSidebar
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          onSaveBill={onSaveBill}
          clearCart={clearCart}
          nextBillNum={nextBillNum}
        />
      )}

      {/* Modal for Adding/Editing Items */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={onSaveItem}
        item={editingItem}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => setView('admin')}
      />
    </div>
  );
}

export default App;
