import React, { useState } from 'react';
import axios from 'axios';

export default function ShowPublish() {
  const [form, setForm] = useState({ blindBoxId: '', content: '', image: '' });
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/show', form, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('发布成功');
    } catch (err) {
      setMsg(err.response?.data?.message || '发布失败');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="blindBoxId" placeholder="盲盒ID" value={form.blindBoxId} onChange={handleChange} required />
      <textarea name="content" placeholder="秀内容" value={form.content} onChange={handleChange} required />
      <input name="image" placeholder="图片URL" value={form.image} onChange={handleChange} />
      <button type="submit">发布玩家秀</button>
      <div>{msg}</div>
    </form>
  );
}
