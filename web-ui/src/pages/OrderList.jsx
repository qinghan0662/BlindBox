import React, { useEffect, useState } from 'react';
import { getOrders, cancelOrder } from '../api';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(res => setOrders(res.data));
  }, []);

  const handleCancel = async id => {
    await cancelOrder(id);
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'cancelled' } : o));
  };

  return (
    <div>
      <h2>盲盒订单管理</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            订单ID: {order.id} 状态: {order.status}
            {order.status === 'pending' && (
              <button onClick={() => handleCancel(order.id)}>取消订单</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
