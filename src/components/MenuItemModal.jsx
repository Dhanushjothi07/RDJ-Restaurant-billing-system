import React, { useState, useEffect, useRef } from 'react';

const MenuItemModal = ({ isOpen, onClose, onSave, item = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Breakfast',
        image: ''
    });

    const fileInputRef = useRef(null);

    // Update form when item changes (for editing)
    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                price: item.price,
                category: item.category,
                image: item.image || ''
            });
        } else {
            setFormData({
                name: '',
                price: '',
                category: 'Breakfast',
                image: ''
            });
        }
    }, [item, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || formData.price === '') return;

        onSave({
            ...formData,
            id: item ? item.id : Date.now(),
            price: Number(formData.price),
            image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300'
        });

        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <div className="form-group">
                                <label>Item Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Masala Dosa"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="image-preview-container">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="image-preview" />
                            ) : (
                                <div className="image-placeholder">No Image</div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Main course">Main course</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Starters">Starters</option>
                            <option value="Dessert">Dessert</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Image Source</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                placeholder="URL or /images/..."
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                style={{ marginBottom: 0 }}
                            />
                            <button
                                type="button"
                                className="btn btn-file-select"
                                style={{ whiteSpace: 'nowrap', color: 'white' }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                Choose File
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            Tip: Pick a file from your computer or enter a URL
                        </p>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {item ? 'Update Item' : 'Add Menu Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuItemModal;
