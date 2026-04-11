import { motion } from 'framer-motion';
import { useHitokoto } from '@/hooks/useHitokoto';
import { RefreshCw } from 'lucide-react';

export const Hitokoto = () => {
  const { data, fetchHitokoto } = useHitokoto();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="glass-card p-8 flex flex-col justify-center items-center text-center group relative overflow-hidden"
    >
      <button
        onClick={fetchHitokoto}
        className="absolute top-4 right-4 p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
        title="换一句"
      >
        <RefreshCw className="w-4 h-4 text-white/80" />
      </button>
      
      <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed max-w-xl italic">
        "{data.text}"
      </p>
      <div className="mt-6 text-sm text-white/60 font-medium tracking-widest flex items-center gap-2">
        <span className="w-8 h-[1px] bg-white/30"></span>
        {data.from}
      </div>
    </motion.div>
  );
};
