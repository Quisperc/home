import { motion } from 'framer-motion';
import { useTimeCapsule } from '@/hooks/useTimeCapsule';

export const TimeCapsule = () => {
  const time = useTimeCapsule();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="glass-card p-6 flex flex-col justify-between"
    >
      <h2 className="text-xl font-semibold mb-4 text-white/90">时光胶囊</h2>
      
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-sm text-white/70 mb-1 font-medium tracking-wide">
            <span>今年已度过</span>
            <span>{time.passedDays} 天</span>
          </div>
          <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${time.progress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full relative"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
            </motion.div>
          </div>
          <p className="text-right text-xs text-white/50 mt-2 tracking-widest">{time.progress}%</p>
        </div>
        
        <div className="text-sm font-light text-white/80 leading-relaxed border-t border-white/10 pt-4">
          <p>
            今天是 {time.year} 年 {time.month} 月 {time.day} 日
            星期{['日', '一', '二', '三', '四', '五', '六'][time.week]}
          </p>
          <p className="mt-1 opacity-80">时间流逝，珍惜当下。</p>
        </div>
      </div>
    </motion.div>
  );
};
