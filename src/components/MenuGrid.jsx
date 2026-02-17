import React from 'react';

const MenuGrid = ({ items, addToCart, onDeleteItem, onEditItem }) => {
    return (
        <div className="menu-grid">
            {items.map((item) => (
                <div key={item.id} className="menu-card" onClick={() => addToCart(item)}>
                    <div className="card-actions">
                        <button
                            className="btn-card-action btn-edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditItem(item);
                            }}
                            title="Edit Item"
                        >
                            ✎
                        </button>
                        <button
                            className="btn-card-action btn-remove"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Remove ${item.name} from menu?`)) {
                                    onDeleteItem(item.id);
                                }
                            }}
                            title="Remove from Menu"
                        >
                            &times;
                        </button>
                    </div>
                    <img src={item.image} alt={item.name} className="menu-image" />
                    <div className="menu-info">
                        <h3 className="menu-title">{item.name}</h3>
                        <div className="menu-price">₹{item.price}</div>
                        <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%' }}>
                            Add to Bill
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuGrid;
