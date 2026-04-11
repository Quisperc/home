import { Background } from '@/components/Background';
import { Message } from '@/components/Message';
import { SocialLinks } from '@/components/SocialLinks';
import { Links } from '@/components/Links';
import { Hitokoto } from '@/components/Hitokoto';
import { TimeCapsule } from '@/components/TimeCapsule';
import { Weather } from '@/components/Weather';
import { Music } from '@/components/Music';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 selection:bg-white/30 selection:text-white relative">
      <Background />
      
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 z-10 relative mt-12 md:mt-0">
        
        {/* Left Column - Main Profile & Social */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 lg:gap-8 order-1">
          <div className="flex-1 min-h-[250px] lg:min-h-[300px]">
            <Message />
          </div>
          <SocialLinks />
        </div>

        {/* Right Column - Widgets & Links */}
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6 lg:gap-8 order-2">
          
          {/* Top Row of Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <Weather />
            <TimeCapsule />
          </div>

          {/* Hitokoto (Full width) */}
          <Hitokoto />

          {/* Bottom Row - Links & Music */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 flex-1">
            <Links />
            <Music />
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 left-0 w-full text-center text-xs text-white/40 font-light tracking-widest pointer-events-none"
      >
        <p>&copy; {new Date().getFullYear()} Quisper. All Rights Reserved.</p>
      </motion.footer>
    </div>
  );
}
