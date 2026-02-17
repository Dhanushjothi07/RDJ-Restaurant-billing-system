import React from 'react';

const AdminPanel = ({ bills, onResetMenu }) => {
    const handlePrint = (bill) => {
        const printWindow = window.open('', '_blank');
        const shopName = "ANTIGRAVITY DELIGHTS";
        const gstNumber = "27AAACR1234A1Z1";

        const billContent = `
            <html>
                <head>
                    <title>Print Bill - #${bill.id}</title>
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
                        <span>Date: ${bill.date}</span>
                        <span>Bill No: #${bill.id}</span>
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
                            ${bill.items.map(item => `
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
                        <div class="total-row">Total Amount: ₹${bill.total.toFixed(2)}</div>
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
        }, 250);
    };

    return (
        <div className="admin-panel" style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Billing History</h2>
                <button
                    className="btn btn-danger"
                    style={{ background: 'transparent', border: '1px solid var(--danger-color)', color: 'var(--danger-color)' }}
                    onClick={() => {
                        if (window.confirm('Reset all billing history? This cannot be undone.')) {
                            onResetMenu();
                        }
                    }}
                >
                    Clear All History
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Date & Time</th>
                            <th>Items Sold</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                                    No billing history available yet.
                                </td>
                            </tr>
                        ) : (
                            bills.map((bill) => (
                                <tr key={bill.id}>
                                    <td style={{ fontWeight: '600', color: 'var(--primary-color)' }}>#{bill.id}</td>
                                    <td style={{ fontSize: '0.9rem' }}>{bill.date}</td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem' }}>
                                            {bill.items.map((item, idx) => (
                                                <div key={idx}>
                                                    • {item.name} (x{item.quantity})
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                                            <span style={{ fontWeight: '700' }}>₹{bill.total.toFixed(2)}</span>
                                            <button
                                                className="btn-icon"
                                                title="Re-print Bill"
                                                onClick={() => handlePrint(bill)}
                                                style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}
                                            >
                                                🖨️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
