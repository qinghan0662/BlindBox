import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '3em' }}>
      <img
        src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f381.png"
        alt="cute box"
        className="cute-icon"
        style={{ width: 80, height: 80, marginBottom: 16 }}
      />
      <h1>盲盒抽盒机</h1>
      <nav>
        <Link to="/register">注册</Link>
        <Link to="/login">登录</Link>
        <Link to="/blindboxes">盲盒列表</Link>
        <Link to="/orders">我的订单</Link>
        <Link to="/shows">玩家秀</Link>
        <Link to="/show-publish">发布玩家秀</Link>
        <Link to="/blindbox-manage">盲盒管理</Link>
      </nav>
    </div>
  );
}
