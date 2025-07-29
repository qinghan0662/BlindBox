import React, { useEffect, useState } from 'react';
import { getBlindBoxes, searchBlindBoxes } from '../api';
import { Link } from 'react-router-dom';

export default function BlindBoxList() {
  const [boxes, setBoxes] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    getBlindBoxes().then(res => setBoxes(res.data));
  }, []);

  const handleSearch = async () => {
    const res = await searchBlindBoxes(q);
    setBoxes(res.data);
  };

  return (
    <div style={{ marginTop: '2em', textAlign: 'center' }}>
      <h2>盲盒列表</h2>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1em',
          marginBottom: '1em',
        }}
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="搜索盲盒"
          style={{ width: 200 }}
        />
        <button type="submit">搜索</button>
      </form>
      <ul>
        {boxes.map(box => (
          <li key={box.id}>
            <img
              className="cute-icon"
              src={box.coverImage || "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f381.png"}
              alt="盲盒"
            />
            <Link to={`/blindbox/${box.id}`}>{box.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
