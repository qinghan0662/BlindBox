import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import BlindBoxDetail from './pages/BlindBoxDetail.jsx';
import BlindBoxManage from './pages/BlindBoxManage.jsx'; // 新增管理页
import axios from 'axios';

function MainApp({ token, user, showLogin, setShowLogin, handleLogin, handleLogout, tab, setTab, hotBoxes, hotLoading, orders, orderSummary }) {
  // 商城和我的页面
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // 清空搜索
  const clearSearch = () => {
    setSearch('');
    setSearchResult([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearchLoading(true);
    try {
      const res = await axios.get('/api/blindbox/search', { params: { q: search } });
      setSearchResult(res.data);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2em auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 16px rgba(162,89,255,0.08)', padding: 32, minHeight: '80vh', position: 'relative' }}>
      {/* 顶部用户栏 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f47c.png" alt="user" style={{ width: 40, height: 40 }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.1em', color: '#a259ff' }}>
            {user ? user.username : '玩家'}
          </span>
        </div>
        <button onClick={handleLogout}>退出登录</button>
      </div>
      {/* 路由出口 */}
      <Routes>
        <Route path="/" element={
          tab === 'shop' ? (
            <div>
              {/* 搜索框 */}
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="搜索盲盒名称"
                  style={{ width: 240, padding: 8, borderRadius: 8, border: '1px solid #ccc', marginRight: 12 }}
                />
                <button type="submit" style={{ background: '#a259ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 'bold', cursor: 'pointer' }}>
                  搜索
                </button>
              </form>
              {/* 搜索结果提示 */}
              {searchLoading && <div>正在搜索...</div>}
              {searchResult.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#a259ff', fontWeight: 'bold', marginBottom: 8 }}>搜索结果：</div>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {searchResult.map(box => (
                      <div key={box.id} style={{
                        background: '#fff',
                        borderRadius: 16,
                        boxShadow: '0 2px 8px rgba(162,89,255,0.08)',
                        padding: 16,
                        width: 200,
                        textAlign: 'center'
                      }}>
                        <Link to={`/blindbox/${box.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                          <img src={box.coverImage} alt={box.name} style={{ width: 140, height: 140, borderRadius: 12 }} />
                          <div style={{ fontWeight: 'bold', margin: '8px 0', fontSize: '1.1em', color: '#a259ff' }}>{box.name}</div>
                          <div style={{ color: '#a259ff', fontWeight: 'bold', fontSize: '1.1em' }}>¥{box.price}</div>
                          <div style={{ color: '#666', fontSize: '0.95em', marginTop: 4 }}>{box.description}</div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* ...商城推荐盲盒区块... */}
              <h2 style={{ color: '#a259ff', marginBottom: 16 }}>商城推荐盲盒</h2>
              {hotLoading ? (
                <div>正在加载推荐...</div>
              ) : (
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {hotBoxes.map(box => (
                    <div key={box.id} style={{
                      background: '#fff',
                      borderRadius: 16,
                      boxShadow: '0 2px 8px rgba(162,89,255,0.08)',
                      padding: 16,
                      width: 200,
                      textAlign: 'center'
                    }}>
                      <Link to={`/blindbox/${box.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        <img src={box.coverImage} alt={box.name} style={{ width: 140, height: 140, borderRadius: 12 }} />
                        <div style={{ fontWeight: 'bold', margin: '8px 0', fontSize: '1.1em', color: '#a259ff' }}>{box.name}</div>
                        <div style={{ color: '#a259ff', fontWeight: 'bold', fontSize: '1.1em' }}>¥{box.price}</div>
                        <div style={{ color: '#666', fontSize: '0.95em', marginTop: 4 }}>{box.description}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {tab === 'mine' && (
                <div>
                  <h2 style={{ color: '#a259ff', marginBottom: 16 }}>我的</h2>
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1em', color: '#a259ff' }}>用户名：{user.username}</div>
                    <div style={{ color: '#666', marginTop: 4 }}>手机号：{user.phone}</div>
                  </div>
                  <h3 style={{ color: '#a259ff', marginBottom: 8 }}>我的订单</h3>
                  {orderSummary && orderSummary.length > 0 ? (
                    <ul>
                      {orderSummary.map(item => (
                        <li key={item.blindBoxId} style={{ marginBottom: 12 }}>
                          <div>盲盒名称: {item.blindBoxName}</div>
                          <div>抽取次数: {item.count}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>暂无订单</div>
                  )}
                  <h3 style={{ color: '#a259ff', margin: '24px 0 8px 0' }}>盲盒管理</h3>
                  <button
                    style={{ color: '#fff', background: '#a259ff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => navigate('/blindbox-manage')}
                  >
                    进入盲盒管理
                  </button>
                </div>
              )}
            </div>
          )
        } />
        <Route path="/blindbox/:id" element={<BlindBoxDetail />} />
        <Route path="/blindbox-manage" element={<BlindBoxManage />} />
        {/* 可继续添加其它页面路由 */}
      </Routes>
      {/* 底部导航栏 */}
      <div style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        background: '#fff',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100,
        height: 56
      }}>
        <button
          style={{
            flex: 1,
            border: 'none',
            background: tab === 'shop' ? '#a259ff' : '#fff',
            color: tab === 'shop' ? '#fff' : '#a259ff',
            fontWeight: 'bold',
            fontSize: '1.1em',
            cursor: 'pointer'
          }}
          onClick={() => {
            setTab('shop');
            clearSearch(); // 返回商城时清空搜索
            navigate('/');
          }}
        >
          商城
        </button>
        <button
          style={{
            flex: 1,
            border: 'none',
            background: tab === 'mine' ? '#a259ff' : '#fff',
            color: tab === 'mine' ? '#fff' : '#a259ff',
            fontWeight: 'bold',
            fontSize: '1.1em',
            cursor: 'pointer'
          }}
          onClick={() => {
            setTab('mine');
            clearSearch(); // 返回“我的”时也清空搜索
            navigate('/');
          }}
        >
          我的
        </button>
      </div>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('shop'); // 'shop' or 'mine'
  const [hotBoxes, setHotBoxes] = useState([]);
  const [hotLoading, setHotLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderSummary, setOrderSummary] = useState([]);

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          setLoading(false);
        });

      // 获取商城推荐盲盒
      setHotLoading(true);
      axios.get('/api/blindbox', { params: { sort: 'hot', limit: 8 } })
        .then(res => {
          setHotBoxes(res.data);
          setHotLoading(false);
        })
        .catch(() => setHotLoading(false));
    } else {
      setUser(null);
      setHotBoxes([]);
    }
  }, [token]);

  useEffect(() => {
    if (token && tab === 'mine') {
      axios.get('/api/order', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setOrders(res.data.orders || []);
        setOrderSummary(res.data.summary || []);
      }).catch(() => {
        setOrders([]);
        setOrderSummary([]);
      });
    }
  }, [token, tab]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setShowLogin(true);
    setTab('shop');
  };

  // 取消订单
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('确定要取消该订单吗？')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`/api/order/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(orders.filter(order => order.id !== orderId));
  };

  // 未登录时只显示注册和登录
  if (!token || !user) {
    return (
      <div style={{ maxWidth: 400, margin: '3em auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 16px rgba(162,89,255,0.08)', padding: 32 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f381.png" alt="logo" style={{ width: 64, height: 64 }} />
          <h1>盲盒抽盒机</h1>
        </div>
        <div>
          <button
            style={{ marginRight: 16, background: showLogin ? '#a259ff' : '#e7d6ff', color: showLogin ? '#fff' : '#a259ff' }}
            onClick={() => setShowLogin(true)}
          >登录</button>
          <button
            style={{ background: !showLogin ? '#a259ff' : '#e7d6ff', color: !showLogin ? '#fff' : '#a259ff' }}
            onClick={() => setShowLogin(false)}
          >注册</button>
        </div>
        <div style={{ marginTop: 24 }}>
          {showLogin
            ? <Login onLogin={token => handleLogin(token)} />
            : <Register />}
        </div>
      </div>
    );
  }

  // 登录后主界面
  return (
    <MainApp
      token={token}
      user={user}
      showLogin={showLogin}
      setShowLogin={setShowLogin}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      tab={tab}
      setTab={setTab}
      hotBoxes={hotBoxes}
      hotLoading={hotLoading}
      orders={orders}
      orderSummary={orderSummary}
    />
  );
}

export default App;
