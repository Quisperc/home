import { useState, useEffect } from 'react';

export const useHitokoto = () => {
  const [data, setData] = useState({ text: '加载中...', from: '' });

  const fetchHitokoto = async () => {
    try {
      const res = await fetch('https://v1.hitokoto.cn');
      const json = await res.json();
      setData({ text: json.hitokoto, from: json.from });
    } catch {
      setData({ text: '生活明朗，万物可爱。', from: 'Quisper' });
    }
  };

  useEffect(() => {
    fetchHitokoto();
  }, []);

  return { data, fetchHitokoto };
};
