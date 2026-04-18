import React from 'react';

export default function LoyaltyManager({ customers, loading, onRefresh }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2>🎯 Customer Loyalty Points</h2>
          <p className="muted">Admin visibility for customer points and activity count</p>
        </div>
        <button type="button" className="secondary" onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Points</th>
              <th>Transactions</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 && (
              <tr>
                <td colSpan={6} className="empty">
                  No customers found.
                </td>
              </tr>
            )}

            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <strong>{customer.name}</strong>
                </td>
                <td>{customer.phone || '—'}</td>
                <td className="muted small">{customer.email || '—'}</td>
                <td>
                  <strong className="stat-value" style={{ fontSize: '1.2rem' }}>
                    {customer.loyaltyPoints || 0}
                  </strong>
                </td>
                <td>{customer.transactionCount || 0}</td>
                <td className="muted small">
                  {customer.lastTransactionAt
                    ? new Date(customer.lastTransactionAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
