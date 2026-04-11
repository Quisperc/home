import { motion } from 'framer-motion';
import socialData from '@/assets/socialLinks.json';

export const SocialLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="glass-card p-6 flex flex-wrap gap-4 items-center justify-center lg:justify-start"
    >
      {socialData.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30"
          title={item.tip}
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-8 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-md"
          />
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-300 bg-black/80 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap pointer-events-none backdrop-blur-md">
            {item.tip}
          </span>
        </a>
      ))}
    </motion.div>
  );
};
