import { useEffect } from 'react';
import { useMainStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

export const Background = () => {
  const { backgroundIndex, setBackgroundIndex } = useMainStore();
  const bgUrl = `/images/background${backgroundIndex}.jpg`;

  useEffect(() => {
    const timer = setInterval(() => {
      // 假设有 10 张背景图
      setBackgroundIndex(backgroundIndex === 10 ? 1 : backgroundIndex + 1);
    }, 15000);
    return () => clearInterval(timer);
  }, [backgroundIndex, setBackgroundIndex]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.img
          key={bgUrl}
          src={bgUrl}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          alt="background"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
    </div>
  );
};
