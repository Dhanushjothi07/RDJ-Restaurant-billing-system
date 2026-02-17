import React, { useMemo } from 'react';

const BillingSidebar = ({ cart, updateQuantity, removeFromCart, onSaveBill, clearCart, nextBillNum }) => {
    const total = useMemo(() => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cart]);

    const handlePrint = () => {
        const dateStr = new Date().toLocaleString();
        const billId = `AGF-${String(nextBillNum).padStart(4, '0')}`;
        const shopName = "ANTIGRAVITY DELIGHTS";
        const gstNumber = "27AAACR1234A1Z1";

        const billData = {
            id: billId,
            date: dateStr,
            items: cart.map(item => ({ ...item })),
            total: total
        };

        const printWindow = window.open('', '_blank');

        const billContent = `
            <html>
                <head>
                    <title>Print Bill</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 20px; color: #333; }
                        .bill-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
                        .shop-name { font-size: 24px; font-weight: 800; margin: 0; color: #000; text-transform: uppercase; }
                        .gst-row { font-size: 14px; color: #666; margin-top: 5px; }
                        .bill-info { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 14px; color: #444; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                        th { text-align: left; padding: 12px 8px; border-bottom: 2px solid #333; font-weight: 700; text-transform: uppercase; font-size: 12px; }
                        td { padding: 12px 8px; border-bottom: 1px solid #eee; font-size: 14px; }
                        .total-section { border-top: 2px solid #333; padding-top: 15px; text-align: right; }
                        .total-row { font-size: 20px; font-weight: 800; }
                        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px; }
                    </style>
                </head>
                <body>
                    <div class="bill-header">
                        <h1 class="shop-name">${shopName}</h1>
                        <div class="gst-row">GSTIN: ${gstNumber}</div>
                    </div>
                    <div class="bill-info">
                        <span>Date: ${dateStr}</span>
                        <span>Bill No: #${billId}</span>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th style="text-align: center;">Qty</th>
                                <th style="text-align: right;">Price</th>
                                <th style="text-align: right;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cart.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td style="text-align: center;">${item.quantity}</td>
                                    <td style="text-align: right;">₹${item.price.toFixed(2)}</td>
                                    <td style="text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="total-section">
                        <div class="total-row">Total Amount: ₹${total.toFixed(2)}</div>
                    </div>
                    <div class="footer">
                        <p>Thank you for your visit!</p>
                        <p>Please visit again.</p>
                    </div>
                </body>
            </html>
        `;

        printWindow.document.write(billContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
            // Save bill and clear cart after printing
            onSaveBill(billData);
        }, 250);
    };

    return (
        <div className="bill-sidebar">
            <h2>Current Bill</h2>

            <div className="cart-list">
                {cart.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '20px' }}>
                        Cart is empty
                    </p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-info">
                                <div style={{ fontWeight: '600' }}>{item.name}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    ₹{item.price} x {item.quantity}
                                </div>
                            </div>
                            <div className="cart-controls">
                                <button
                                    className="btn-icon"
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                                >
                                    -
                                </button>
                                <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                <button
                                    className="btn-icon"
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="bill-total">
                <div className="total-row">
                    <span>Total:</span>
                    <span style={{ color: 'var(--primary-color)' }}>₹{total}</span>
                </div>
                <div style={{ display: 'grid', gap: '10px' }}>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={handlePrint}
                        disabled={cart.length === 0}
                    >
                        Print Bill / Checkout
                    </button>
                    <button
                        className="btn"
                        style={{ width: '100%', background: 'var(--bg-accent)', color: 'var(--text-secondary)' }}
                        onClick={clearCart}
                        disabled={cart.length === 0}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillingSidebar;
