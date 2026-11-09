const json = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });

export const getHitokoto = () => json("https://v1.hitokoto.cn");

// 优先高德（需 Web 服务 Key），未配置时回退教书先生 API
export async function getWeather() {
  const key = import.meta.env.VITE_WEATHER_KEY;
  if (key) {
    const loc = await json(`https://restapi.amap.com/v3/ip?key=${key}`);
    if (loc.infocode !== "10000") throw new Error(loc.info);
    const res = await json(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${loc.adcode}`,
    );
    const live = res.lives?.[0];
    if (!live) throw new Error(res.info);
    return {
      city: loc.city,
      text: live.weather,
      temp: live.temperature,
      wind: `${live.winddirection}风 ${live.windpower} 级`,
    };
  }
  const { result } = await json("https://api.oioweb.cn/api/weather/GetWeather");
  const c = result.condition;
  return {
    city: result.city.City,
    text: c.day_weather,
    temp: Math.round((Number(c.min_degree) + Number(c.max_degree)) / 2),
    wind: `${c.day_wind_direction} ${c.day_wind_power} 级`,
  };
}
