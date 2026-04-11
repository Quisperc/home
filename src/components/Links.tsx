import { motion } from 'framer-motion';
import { Book, PenTool, FolderOpen, Disc, Mail, LucideIcon } from 'lucide-react';
import siteLinks from '@/assets/siteLinks.json';

const iconMap: Record<string, LucideIcon> = {
  Book,
  Blog: PenTool,
  FolderOpen,
  CompactDisc: Disc,
  MailBulk: Mail,
};

export const Links = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="glass-card p-6 flex flex-col justify-between h-full"
    >
      <h2 className="text-2xl font-semibold mb-6 tracking-wide text-white/90">常用导航</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {siteLinks.map((item, index) => {
          const Icon = iconMap[item.icon] || Book;
          return (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 gap-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/20 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.1)] group backdrop-blur-md"
            >
              <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {item.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};
