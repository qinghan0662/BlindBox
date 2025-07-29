import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlindBoxManage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/order', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // 按时间倒序
      const orderList = (res.data.orders || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(orderList);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('确定要删除该订单吗？')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`/api/order/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // 删除后刷新列表
    setOrders(orders.filter(order => order.id !== orderId));
  };

  if (loading) return <div>正在加载...</div>;

  return (
    <div>
      <h2 style={{ color: '#a259ff', marginBottom: 16 }}>我的盲盒清单</h2>
      {orders.length === 0 ? (
        <div>暂无盲盒订单</div>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div>抽取时间: {new Date(order.createdAt).toLocaleString()}</div>
                <div>盲盒名称: {order.BlindBox?.name || order.blindBoxName || order.blindBoxId}</div>
                <div>订单ID: {order.id}</div>
              </div>
              <button
                style={{ marginLeft: 16, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', cursor: 'pointer' }}
                onClick={() => handleDelete(order.id)}
              >
                删除订单
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
