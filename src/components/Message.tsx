import { motion } from 'framer-motion';

export const Message = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-card p-8 flex flex-col justify-center h-full group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 font-['Pacifico'] tracking-wider drop-shadow-md">
        Quisper
      </h1>
      <div className="text-lg md:text-xl text-gray-200 leading-relaxed font-light mt-2 space-y-2">
        <p>👋 你好，很高兴认识你。</p>
        <p className="text-sm md:text-base opacity-80">
          这是一个基于 React 与 Framer Motion 重构的全新极简主页，致力于在繁忙的网络世界中为你提供一片静谧的驻足之地。
        </p>
      </div>
    </motion.div>
  );
};
