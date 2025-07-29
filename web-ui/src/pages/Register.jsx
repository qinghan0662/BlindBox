import React, { useState } from 'react';
import { register } from '../api';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', phone: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form);
      setMsg('注册成功');
    } catch (err) {
      setMsg(err.response?.data?.message || '注册失败');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="用户名" value={form.username} onChange={handleChange} required />
      <input name="phone" placeholder="手机号" value={form.phone} onChange={handleChange} required />
      <input name="password" type="password" placeholder="密码" value={form.password} onChange={handleChange} required />
      <button type="submit">注册</button>
      <div>{msg}</div>
    </form>
  );
}
