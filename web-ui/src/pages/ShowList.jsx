import React, { useEffect, useState } from 'react';
import { getShows } from '../api';

export default function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    getShows().then(res => setShows(res.data));
  }, []);

  return (
    <div>
      <h2>玩家秀</h2>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <div>{show.content}</div>
            {show.image && <img src={show.image} alt="玩家秀" width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
