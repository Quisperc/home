import { motion } from 'framer-motion';
import { useWeather } from '@/hooks/useWeather';
import { CloudRain, Sun, Cloud, Snowflake, Wind, Moon } from 'lucide-react';

export const Weather = () => {
  const weather = useWeather();

  const getWeatherIcon = (text: string) => {
    if (text.includes('晴')) return <Sun className="w-10 h-10 text-yellow-400" />;
    if (text.includes('雨')) return <CloudRain className="w-10 h-10 text-blue-400" />;
    if (text.includes('雪')) return <Snowflake className="w-10 h-10 text-blue-200" />;
    if (text.includes('风')) return <Wind className="w-10 h-10 text-gray-300" />;
    if (text.includes('云') || text.includes('阴')) return <Cloud className="w-10 h-10 text-gray-400" />;
    return <Moon className="w-10 h-10 text-indigo-300" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="glass-card p-6 flex items-center justify-between group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
    >
      <div className="flex flex-col z-10 relative">
        <h2 className="text-sm font-semibold tracking-widest text-white/60 uppercase mb-1">
          {weather.city}
        </h2>
        <div className="flex items-end gap-2">
          <span className="text-4xl md:text-5xl font-light font-['UnidreamLED'] drop-shadow-md">
            {weather.temp}°
          </span>
          <span className="text-lg font-medium text-white/80 pb-1">{weather.text}</span>
        </div>
      </div>
      
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="z-10 relative p-3 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      >
        {getWeatherIcon(weather.text)}
      </motion.div>
      
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-3xl rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-150"></div>
    </motion.div>
  );
};
