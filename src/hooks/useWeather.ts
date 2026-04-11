import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [weather, setWeather] = useState({ city: '北京', temp: '25', text: '晴' });

  useEffect(() => {
    // 模拟天气数据或调用免费API
    // 因为这里没有高德或和风的Key，我们先使用一个默认值或通过ip定位的简易天气API
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://wttr.in/?format=j1');
        const json = await res.json();
        setWeather({
          city: json.nearest_area[0].areaName[0].value,
          temp: json.current_condition[0].temp_C,
          text: json.current_condition[0].lang_zh[0].value || json.current_condition[0].weatherDesc[0].value,
        });
      } catch {
        setWeather({ city: '本地', temp: '20', text: '多云' });
      }
    };
    fetchWeather();
  }, []);

  return weather;
};
