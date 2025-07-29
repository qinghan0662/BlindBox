import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlindBoxDetail, drawBlindBox } from '../api';
import axios from 'axios';

export default function BlindBoxDetail() {
  const { id } = useParams();
  const [box, setBox] = useState(null);
  const [msg, setMsg] = useState('');
  const [drawResult, setDrawResult] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [commentRate, setCommentRate] = useState(5);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    getBlindBoxDetail(id)
      .then(res => setBox(res.data))
      .catch(() => setBox(null));
  }, [id]);

  const handleDraw = async () => {
    try {
      const res = await drawBlindBox(id);
      setMsg(res.data.message || '抽取成功');
      // 抽取成功后显示抽中的款式详情
      if (res.data.result) {
        setDrawResult(res.data.result);
      }
      // 抽取成功后刷新盲盒详情
      const detail = await getBlindBoxDetail(id);
      setBox(detail.data);
    } catch (err) {
      setMsg(err.response?.data?.message || '抽取失败');
      setDrawResult(null);
    }
  };

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;
    setCommentLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post(`/api/comment/${id}`, {
        content: commentContent,
        rate: commentRate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCommentContent('');
      setCommentRate(5);
      // 评论后刷新详情
      const detail = await getBlindBoxDetail(id);
      setBox(detail.data);
    } catch (err) {
      setMsg('评论提交失败');
    }
    setCommentLoading(false);
  };

  if (box === null) return <div style={{ color: 'red', textAlign: 'center', marginTop: '2em' }}>盲盒信息加载失败，请检查后端接口！</div>;
  if (!box) return <div>加载中...</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2em auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 16px rgba(162,89,255,0.08)', padding: 32 }}>
      <img src={box.coverImage || "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f381.png"} alt={box.name} style={{ width: 160, height: 160, borderRadius: 16 }} />
      <h2>{box.name}</h2>
      <p>{box.description}</p>
      <p style={{ fontWeight: 'bold', color: '#a259ff' }}>价格: ¥{box.price}</p>
      <div style={{ margin: '12px 0', color: '#6c2eb7', fontWeight: 'bold' }}>
        被下单次数：{box.sales ?? 0}
      </div>
      {box.goodRate !== undefined && (
        <div style={{ color: '#6c2eb7', fontWeight: 'bold', marginBottom: 8 }}>好评率：{box.goodRate}%</div>
      )}
      <button onClick={handleDraw} style={{ margin: '16px 0', background: '#a259ff', color: '#fff', borderRadius: 12, padding: '10px 32px', fontWeight: 'bold', fontSize: '1.1em' }}>
        抽取盲盒
      </button>
      <div style={{ marginTop: 12, color: '#c471ed' }}>{msg}</div>
      {/* 抽取结果展示 */}
      {drawResult && (
        <div style={{ marginTop: 24, padding: 16, background: '#f6f2ff', borderRadius: 12 }}>
          <h3 style={{ color: drawResult.type === '隐藏款' ? '#ff4d4f' : '#a259ff' }}>
            恭喜你抽中了：{drawResult.type}
          </h3>
          <img src={drawResult.coverImage} alt={drawResult.name} style={{ width: 120, height: 120, borderRadius: 10, margin: '12px 0' }} />
          <div style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: 8 }}>{drawResult.name}</div>
          <div style={{ color: '#666' }}>{drawResult.description}</div>
          {/* 评论区 */}
          <div style={{ marginTop: 24 }}>
            <h4 style={{ color: '#a259ff' }}>抽取成功后评论：</h4>
            <textarea
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}
              placeholder="写下你的评论..."
              style={{ width: '100%', minHeight: 60, borderRadius: 8, border: '1px solid #ccc', marginBottom: 8 }}
            ></textarea>
            <div>
              评分：
              <input
                type="number"
                min={1}
                max={5}
                value={commentRate}
                onChange={e => setCommentRate(Number(e.target.value))}
                style={{ width: 40, marginRight: 8 }}
              />
              <button
                onClick={handleAddComment}
                disabled={commentLoading}
                style={{ background: '#a259ff', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {commentLoading ? '提交中...' : '提交评论'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 用户评论展示区保留 */}
      <h3 style={{ marginTop: 24 }}>用户评论</h3>
      <ul>
        {(box.comments || []).map((comment, idx) => (
          <li key={idx} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 'bold' }}>{comment.User?.username || '匿名'}</div>
            <div>{comment.content}</div>
            <div style={{ color: '#a259ff', fontSize: '0.95em' }}>评分：{comment.rate}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

