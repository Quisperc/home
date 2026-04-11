import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music as MusicIcon, Volume2, VolumeX } from 'lucide-react';

export const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error('Play failed', e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  useEffect(() => {
    const audio = new Audio('https://music.163.com/song/media/outer/url?id=1382576173.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="glass-card p-6 flex flex-col justify-between gap-4 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
    >
      <div className="flex justify-between items-center z-10 relative">
        <h2 className="text-xl font-semibold tracking-wide text-white/90">音乐</h2>
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="p-2 bg-white/10 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md"
        >
          <MusicIcon className="w-6 h-6 text-pink-400" />
        </motion.div>
      </div>

      <div className="flex items-center gap-4 z-10 relative">
        <button
          onClick={togglePlay}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-pink-500/50 group-hover:scale-110"
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? <Pause className="w-5 h-5 text-white/90" /> : <Play className="w-5 h-5 text-white/90 ml-0.5" />}
        </button>

        <div className="flex items-center gap-2 flex-1">
          <button onClick={toggleMute} className="p-1 hover:bg-white/10 rounded-full transition-colors focus:outline-none" title={isMuted ? '取消静音' : '静音'}>
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-white/70" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer hover:bg-white/30 transition-colors accent-pink-500 focus:outline-none"
            style={{
              background: `linear-gradient(to right, rgb(236 72 153) ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%)`,
            }}
          />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-150"></div>
    </motion.div>
  );
};
