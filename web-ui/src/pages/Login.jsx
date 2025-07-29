import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('blindBoxes', JSON.stringify(res.data.blindBoxes));
      setMsg('登录成功');
      if (onLogin) onLogin(res.data.token);
      // 可在此跳转到用户主页
    } catch (err) {
      setMsg(err.response?.data?.message || '登录失败');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="用户名或手机号" value={form.username} onChange={handleChange} required />
      <input name="password" type="password" placeholder="密码" value={form.password} onChange={handleChange} required />
      <button type="submit">登录</button>
      <div>{msg}</div>
    </form>
  );
}
