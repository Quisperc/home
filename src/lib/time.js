const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const HOUR = 36e5;
const DAY = 864e5;
const pad = (n) => String(n).padStart(2, "0");

export function greeting() {
  const h = new Date().getHours();
  if (h < 6) return "夜深了";
  if (h < 9) return "早上好";
  if (h < 12) return "上午好";
  if (h < 14) return "中午好";
  if (h < 17) return "下午好";
  if (h < 19) return "傍晚好";
  if (h < 22) return "晚上好";
  return "夜深了";
}

export function clock() {
  const d = new Date();
  return {
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
    date: `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 · 星期${WEEKDAYS[d.getDay()]}`,
  };
}

export function capsule() {
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(dayStart);
  weekStart.setDate(dayStart.getDate() - ((now.getDay() + 6) % 7));
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysInYear = Math.round((new Date(now.getFullYear() + 1, 0, 1) - yearStart) / DAY);
  const make = (name, start, total, unit) => {
    const passed = Math.floor((now - start) / unit);
    return {
      name,
      passed,
      remaining: total - passed,
      unit: unit === HOUR ? "小时" : "天",
      percent: Math.min(100, (passed / total) * 100),
    };
  };
  return [
    make("今日", dayStart, 24, HOUR),
    make("本周", weekStart, 7, DAY),
    make("本月", monthStart, daysInMonth, DAY),
    make("本年", yearStart, daysInYear, DAY),
  ];
}

export function uptime(startStr) {
  const start = new Date(startStr);
  if (!startStr || isNaN(start)) return null;
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return `本站已运行 ${years} 年 ${months} 个月 ${days} 天`;
}

const MEMORIALS = {
  4.4: "清明节",
  5.12: "汶川大地震纪念日",
  7.7: "中国人民抗日战争纪念日",
  9.18: "九·一八事变纪念日",
  12.13: "南京大屠杀死难者国家公祭日",
};

export function memorialDay() {
  const d = new Date();
  return MEMORIALS[`${d.getMonth() + 1}.${d.getDate()}`] || null;
}
