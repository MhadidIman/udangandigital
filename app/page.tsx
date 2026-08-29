"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { CalendarDays, MapPin, Copy, Check, Heart, Send, Disc3, Play, ArrowDownToLine, MousePointerClick, Home, Gift, MessageSquare } from "lucide-react";
import Image from "next/image";
import { supabase } from "../lib/supabase";

// -- COMPONENTS --

// -- JAVANESE ORNAMENTS --

const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = [...Array(40)].map(() => ({
      width: Math.random() * 4 + 1 + "px",
      height: Math.random() * 4 + 1 + "px",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      yDest: -100 - Math.random() * 100,
      xDest: (Math.random() - 0.5) * 50,
      scaleDest: Math.random() * 1.5 + 1,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-gold rounded-full opacity-60"
          style={{
            width: p.width,
            height: p.height,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, p.yDest],
            x: [0, p.xDest],
            opacity: [0, 0.8, 0],
            scale: [1, p.scaleDest, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const BatikBackground = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
    <pattern id="kawung" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M40 0 C 60 0, 80 20, 80 40 C 80 60, 60 80, 40 80 C 20 80, 0 60, 0 40 C 0 20, 20 0, 40 0 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="40" cy="40" r="15" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="5" fill="#D4AF37" />
      <path d="M20 20 L 60 60 M 20 60 L 60 20" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
      {/* Additional classic kawung details */}
      <circle cx="0" cy="0" r="10" fill="none" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="80" cy="0" r="10" fill="none" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="0" cy="80" r="10" fill="none" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="80" cy="80" r="10" fill="none" stroke="#D4AF37" strokeWidth="1" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#kawung)" />
  </svg>
);

const Gunungan = ({ className, reverse = false }: { className?: string; reverse?: boolean }) => (
  <div className={`${className} relative`}>
    <Image
      src="/gunungan.png"
      alt="Gunungan Wayang"
      fill
      className={`object-contain transition-transform ${reverse ? 'scale-x-[-1]' : ''}`}
      priority
    />
  </div>
);

const AnimatedButterfly = ({ delay = 0, initialX = 0, initialY = 0, reverse = false }) => (
  <motion.div
    className="absolute pointer-events-none z-30"
    initial={{ x: initialX, y: initialY, scale: 0 }}
    animate={{ 
      x: [initialX, initialX + (reverse ? -40 : 40), initialX - (reverse ? -20 : 20), initialX + (reverse ? -10 : 10), initialX],
      y: [initialY, initialY - 60, initialY - 100, initialY - 30, initialY],
      scale: [0, 1, 1, 1, 0],
      rotate: [0, reverse ? -15 : 15, reverse ? 15 : -15, reverse ? -10 : 10, 0]
    }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear", delay }}
  >
    <motion.svg 
      width="30" height="30" viewBox="0 0 24 24" fill="none"
      animate={{ scaleX: [1, 0.2, 1] }}
      transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
      className={reverse ? 'scale-x-[-1]' : ''}
    >
      <path d="M12 12C12 12 14 6 18 6C22 6 22 10 18 14C14 18 12 12 12 12Z" fill="#D4AF37" opacity="0.8"/>
      <path d="M12 12C12 12 10 6 6 6C2 6 2 10 6 14C10 18 12 12 12 12Z" fill="#D4AF37" opacity="0.8"/>
      <path d="M12 12C12 12 14 18 16 18C18 18 18 16 16 14C14 12 12 12 12 12Z" fill="#D4AF37" opacity="0.6"/>
      <path d="M12 12C12 12 10 18 8 18C6 18 6 16 8 14C10 12 12 12 12 12Z" fill="#D4AF37" opacity="0.6"/>
    </motion.svg>
  </motion.div>
);


const BatikDivider = () => (
  <div className="w-full flex justify-center items-center py-8 opacity-80 max-w-4xl mx-auto">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/50"></div>
    <div className="px-4 text-gold">
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C 80 0, 100 20, 100 50 C 100 80, 80 100, 50 100 C 20 100, 0 80, 0 50 C 0 20, 20 0, 50 0 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <path d="M50 20 C 65 20, 80 35, 80 50 C 80 65, 65 80, 50 80 C 35 80, 20 65, 20 50 C 20 35, 35 20, 50 20 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#D4AF37" />
      </svg>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/50"></div>
  </div>
);

function AudioPlayer({ isPlaying, setIsPlaying }: { isPlaying: boolean, setIsPlaying: (val: boolean) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio 
        ref={audioRef} 
        src="/MUARA - Adera.mp3" 
        loop 
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative w-12 h-12 rounded-full bg-gold/90 text-[#1a120d] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-transform hover:scale-110"
      >
        <Disc3 size={24} className={isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''} />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white backdrop-blur-[1px]">
            <Play size={18} className="ml-1" />
          </div>
        )}
      </button>
    </div>
  );
}


function CopyButton({ text, label = "Salin No. Rekening" }: { text: string, label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button suppressHydrationWarning onClick={handleCopy} className="mt-4 text-xs flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-stone-300 mx-auto">
      {copied ? <><Check size={14} className="text-green-400" /> Tersalin</> : <><Copy size={14} /> {label}</>}
    </button>
  );
}

// 1. Cover Component
function Cover({ onOpen, to }: { onOpen: () => void; to: string | null }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800); // Trigger page transition smoothly
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a120d] text-stone-100 overflow-hidden perspective-[1000px] px-4"
    >
      {/* Cover Particles */}
      {!isOpening && <FloatingParticles />}
      {/* WAYANG BACKGROUND (Shadow Effect) */}
      <div className="absolute inset-0 bg-[url('/wayang-bg..jpg')] bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"></div>

      {/* DARK OVERLAY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a120d] via-transparent to-[#1a120d] pointer-events-none"></div>

      <BatikBackground />

      {/* VINTAGE FLORAL FRAME */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: 0, scale: 1.2 } : { opacity: 0.65, scale: 1.15 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-10 pointer-events-none bg-[url('/cover-frame.png')] bg-contain bg-center bg-no-repeat mix-blend-screen"
        style={{ filter: "invert(1) brightness(1.5)", willChange: "transform, opacity" }}
      ></motion.div>

      {/* ANIMATED GUNUNGAN (WAYANG) BEHIND ENVELOPE */}
      <AnimatePresence>
        {!isOpening && (
          <div className="absolute inset-x-0 bottom-[10%] flex justify-center items-end pointer-events-none z-10 overflow-hidden h-[60%]">
            <motion.div
              initial={{ opacity: 0, x: 0, y: 150, rotate: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, x: "-65%", y: 0, rotate: -12, scale: 1 }}
              exit={{ opacity: 0, x: 0, y: 150, rotate: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              className="absolute w-[200px] sm:w-[280px] aspect-[2/3] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] origin-bottom"
            >
              <div className="w-full h-full">
                <Gunungan className="w-full h-full" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 0, y: 150, rotate: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, x: "65%", y: 0, rotate: 12, scale: 1 }}
              exit={{ opacity: 0, x: 0, y: 150, rotate: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              className="absolute w-[200px] sm:w-[280px] aspect-[2/3] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] origin-bottom"
            >
              <div className="w-full h-full">
                <Gunungan className="w-full h-full" reverse={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TEXT SECTION ABOVE ENVELOPE */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-8 z-40"
          >
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-2 text-gold font-medium"
            >
              The Wedding Of
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
              className="relative mb-8"
            >
              <h1 className="font-serif italic text-6xl sm:text-7xl text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] relative z-10">
                Rudi & Cella
              </h1>
              {/* Glowing Pulse Effect Behind Title */}
              <motion.div
                animate={{ opacity: [0, 0.4, 0], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gold/20 blur-xl z-0 rounded-full"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="bg-white/5 backdrop-blur-md border border-gold/30 px-10 py-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-12"
            >
              <p className="text-xs sm:text-sm text-stone-300 mb-2 tracking-widest uppercase">Kepada Yth. Bapak/Ibu/Saudara/i,</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-gold drop-shadow-md">{to || "Tamu Undangan"}</h2>
            </motion.div>

            {/* OPEN BUTTON */}
            <motion.button
              suppressHydrationWarning
              onClick={handleOpen}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold tracking-widest text-[#2C1E16] transition-all duration-300 ease-in-out bg-gradient-to-r from-gold via-[#FFF2B2] to-gold bg-[length:200%_auto] hover:bg-right rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)] overflow-hidden mt-4"
            >
              <span className="relative z-10 text-sm uppercase">Buka Undangan</span>
              <motion.div
                className="absolute inset-0 bg-gold/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return <p className={className}>{displayText}<span className="animate-pulse">|</span></p>;
}

// Countdown Component
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const targetDate = new Date("2026-10-17T08:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return <div className="h-20 mt-12"></div>;

  return (
    <div className="flex justify-center gap-3 sm:gap-6 mt-8 text-stone-200">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center bg-white/5 backdrop-blur-md border border-gold/20 rounded-2xl w-16 h-16 sm:w-24 sm:h-24 justify-center shadow-lg">
          <span className="font-serif text-2xl sm:text-4xl text-gold mb-1">{value.toString().padStart(2, '0')}</span>
          <span className="text-[9px] sm:text-xs uppercase tracking-widest text-stone-400">{unit}</span>
        </div>
      ))}
    </div>
  );
}

// 2. Hero Section
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1E16]/80 via-[#2C1E16]/60 to-[#2C1E16]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <p className="tracking-[0.4em] text-sm uppercase mb-6 text-gold/80">We Are Getting Married</p>
        <div className="relative inline-block">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-stone-100 mb-4 shimmer-text">
            Rudi
          </h1>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-gold my-4 italic">&</h2>
        <div className="relative inline-block">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-stone-100 mb-12 shimmer-text">
            Cella
          </h1>
        </div>

        <div className="mt-8 border-t border-gold/30 pt-8 max-w-lg mx-auto">
          <p className="tracking-[0.3em] uppercase text-sm text-gold mb-2">Save The Date</p>
          <p className="tracking-widest text-xl sm:text-2xl text-stone-300 font-serif italic mb-6">
            17 Oktober 2026
          </p>
          <Countdown />
        </div>
      </motion.div>
    </section>
  );
}

// 3. Quote Section
function Quote() {
  return (
    <section className="py-24 px-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-4">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </p>
          <p className="text-gold text-xs font-semibold tracking-widest uppercase">Surah Ar-Rum : 21</p>
        </div>

        <div className="w-12 h-[1px] bg-gold/50 mx-auto my-12"></div>

        <div>
          <p className="font-serif italic text-2xl md:text-3xl text-gold/90 mb-2">
            "Tresno jalaran soko kulino"
          </p>
          <p className="text-stone-400 text-xs tracking-widest">"Cinta Atau Rasa Sayang Tumbuh Karena Terbiasa"</p>
        </div>
      </motion.div>
    </section>
  );
}

// 4. Profiles Section
function Profiles() {
  return (
    <section id="couple" className="py-24 px-4 relative">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto text-center mb-16 px-4 relative z-10"
      >
        <h2 className="font-serif text-3xl md:text-4xl text-gold mb-6 leading-relaxed">
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </h2>
        <p className="text-stone-300 text-sm md:text-base leading-loose max-w-2xl mx-auto">
          Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan.
          <br /><br />
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan putra-putri kami:
        </p>
      </motion.div>

      <div className="max-w-md mx-auto flex flex-col gap-12 relative z-10">

        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <div className="bg-[#2C1E16]/60 backdrop-blur-md border border-gold/30 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500">
            {/* Soft glow behind card */}
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <AnimatedButterfly delay={0} initialX={-60} initialY={80} />
              <AnimatedButterfly delay={4} initialX={70} initialY={150} reverse={true} />
              <div className="w-56 h-72 mb-8 border-[3px] border-[#3B2C24] p-1.5 rounded-t-[100px] rounded-b-2xl shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full rounded-t-[100px] rounded-b-xl overflow-hidden relative border border-gold/20 bg-[#1a120d]">
                  <Image src="/mempelai pria adat jawa.jpg" alt="Groom" fill className="object-cover" />
                </div>
              </div>
            </div>

            <h3 className="font-serif italic text-5xl text-gold mb-3 drop-shadow-md">Rudi</h3>
            <h4 className="font-serif text-sm tracking-[0.2em] text-stone-200 uppercase mb-8">Rudi Priska Julianto</h4>

            <p className="text-xs text-stone-400 mb-1 tracking-widest uppercase">Putra dari</p>
            <p className="text-stone-300 font-medium mb-2">Bapak Harnoto & Ibu Pasriatun</p>
          </div>
        </motion.div>

        {/* Bride */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <div className="bg-[#2C1E16]/60 backdrop-blur-md border border-gold/30 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500">
            {/* Soft glow behind card */}
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <AnimatedButterfly delay={2} initialX={-70} initialY={120} />
              <AnimatedButterfly delay={6} initialX={50} initialY={60} reverse={true} />
              <div className="w-56 h-72 mb-8 border-[3px] border-[#3B2C24] p-1.5 rounded-t-[100px] rounded-b-2xl shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full rounded-t-[100px] rounded-b-xl overflow-hidden relative border border-gold/20 bg-[#1a120d]">
                  <Image src="/mempelai perempuan adat jawa.jpg" alt="Bride" fill className="object-cover" />
                </div>
              </div>
            </div>

            <h3 className="font-serif italic text-5xl text-gold mb-3 drop-shadow-md">Cella</h3>
            <h4 className="font-serif text-sm tracking-[0.2em] text-stone-200 uppercase mb-8">Naycella Dwi Olivia Amanda</h4>

            <p className="text-xs text-stone-400 mb-1 tracking-widest uppercase">Putri dari</p>
            <p className="text-stone-300 font-medium mb-2">Bapak Rozikin & Ibu Sriyati</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// 5. Event Details Section
function EventDetails() {
  return (
    <section id="event" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532054944415-1811ee36109c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed opacity-10"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="font-serif text-4xl md:text-5xl text-gold mb-16 text-center"
        >
          Event Details
        </motion.h2>

        <div className="flex justify-center w-full">
          {/* Akad Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center hover:scale-[1.02] hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500 cursor-default"
          >
            <h3 className="font-serif text-3xl mb-2 text-white">Akad Nikah</h3>
            <div className="w-12 h-[1px] bg-gold mb-6"></div>

            <div className="space-y-4 mb-8">
              <div className="flex flex-col items-center">
                <CalendarDays className="text-gold mb-2" size={24} />
                <p className="font-semibold text-lg text-stone-200">Saturday, 17 October 2026</p>
                <p className="text-stone-400">08:00 AM - 10:00 AM</p>
              </div>

              <div className="flex flex-col items-center pt-4">
                <MapPin className="text-gold mb-2" size={24} />
                <p className="font-semibold text-lg text-stone-200 text-center">USTP PT GRAHA CAKRA MULIA (PT GCM)</p>
                <p className="text-stone-400 text-sm mt-1 text-center">Jalan Kantor Besar</p>
                <CopyButton text="USTP PT GRAHA CAKRA MULIA (PT GCM), Jalan Kantor Besar" label="Salin Alamat" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-md"
        >
          <button className="flex-1 bg-gold text-[#2C1E16] font-semibold py-3 px-6 rounded-full hover:bg-gold-hover transition-colors flex items-center justify-center gap-2">
            <CalendarDays size={18} /> Add to Calendar
          </button>
          <a href="https://maps.app.goo.gl/snAktsCEBNC7shbx7?g_st=ac" target="_blank" rel="noopener noreferrer" className="flex-1 bg-transparent border border-gold text-gold font-semibold py-3 px-6 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <MapPin size={18} /> View Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// 6. Gallery Section
// 6. Love Story Section (Timeline)
function LoveStory() {
  const timeline = [
    {
      title: "Pertemuan",
      desc: "Sebuah sapaan sederhana yang menjadi awal dari segalanya. Di saat yang tak terduga, semesta mempertemukan dua jalan cerita menjadi satu."
    },
    {
      title: "Pendekatan",
      desc: "Seiring berjalannya waktu, percakapan yang mengalir begitu saja menumbuhkan rasa nyaman dan keyakinan di antara kami."
    },
    {
      title: "Lamaran",
      desc: "Dengan niat yang tulus, sebuah komitmen diutarakan. Membawa restu dari keluarga untuk melangkah ke jenjang yang lebih serius."
    },
    {
      title: "Pernikahan",
      desc: "Hari di mana doa-doa terjawab, dua hati bersatu dalam ikatan suci pernikahan untuk saling melengkapi sepanjang usia."
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-6">Kisah Kami</h2>
          <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed text-sm md:text-base italic px-4">
            "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri."
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/50 -translate-x-1/2"
          ></motion.div>
          
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-start md:items-center w-full ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gold -translate-x-1/2 mt-5 md:mt-0 shadow-[0_0_10px_rgba(212,175,55,0.8)] z-10"></div>
                
                {/* Content Card */}
                <div className="w-full md:w-1/2 ml-10 md:ml-0 md:px-12">
                  <div className={`bg-white/5 backdrop-blur-sm border border-gold/20 p-6 rounded-2xl text-left ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} shadow-lg group hover:border-gold/50 transition-colors duration-300`}>
                    <h3 className="font-serif text-2xl text-gold mb-2">{item.title}</h3>
                    <p className="text-stone-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 7. Digital Gift Section
function DigitalGift() {
  const [copiedBank, setCopiedBank] = useState(false);
  const [waName, setWaName] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleWaConfirm = () => {
    if (!waName) {
      alert("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    const message = `Assalamu'alaikum, halo! Saya ${waName}. Saya ingin mengonfirmasi terkait kehadiran/hadiah untuk acara pernikahan Rudi & Cella. Terima kasih.`;
    const phoneNumber = "6282211351039";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="gift" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546949281-bbdc84c7a6fc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.05] mix-blend-screen"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">Wedding Gift</h2>
          <p className="text-stone-400 max-w-lg mx-auto">
            Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui dompet digital berikut:
          </p>
        </motion.div>

        <div className="flex justify-center">
          {/* Bank Transfer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 text-center flex flex-col justify-center items-center"
          >
            <div className="bg-white w-[140px] h-[48px] rounded-xl mb-4 relative overflow-hidden flex justify-center items-center shadow-sm">
              <Image 
                src="/logo_mandiri.png" 
                alt="Bank Mandiri" 
                fill
                className="object-cover object-left p-2" 
              />
            </div>
            <p className="font-semibold text-lg text-stone-200 tracking-widest mt-2">1590 0106 7359 7</p>
            <p className="text-stone-400 text-sm mt-1">A.n Rudi Priska Julianto</p>
            <CopyButton text="1590010673597" />
          </motion.div>
        </div>

        {/* WhatsApp Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="mt-12 bg-[#2C1E16]/80 backdrop-blur-md border border-gold/30 rounded-[2rem] p-8 max-w-lg mx-auto shadow-2xl"
        >
          <h3 className="font-serif text-xl md:text-2xl text-gold mb-2 uppercase tracking-widest text-center">
            Konfirmasi Hadiah / Kehadiran
          </h3>
          <p className="text-sm text-stone-300 text-center mb-6">
            Tulis nama Anda untuk konfirmasi langsung ke nomor mempelai:
          </p>

          <input
            type="text"
            value={waName}
            onChange={(e) => setWaName(e.target.value)}
            placeholder="Nama Lengkap Anda..."
            className="w-full bg-[#1a120d]/80 border border-gold/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold mb-4 transition-colors placeholder:text-stone-500"
          />

          <button
            onClick={handleWaConfirm}
            className="w-full bg-[#25D366] text-white font-semibold py-3 px-6 rounded-xl flex justify-center items-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Confirm via WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// 8. RSVP & Wishes
function RSVPWishes() {
  const [wishes, setWishes] = useState<{name: string, text: string}[]>([]);
  const [formData, setFormData] = useState({ name: "", attendance: "yes", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .select('name, message, created_at')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setWishes(data.map((d: any) => ({ name: d.name, text: d.message })));
        } else {
          setWishes([]);
        }
      } catch (err) {
        console.error("Error fetching wishes:", err);
        setWishes([]);
      }
    };
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([
          { name: formData.name, attendance: formData.attendance, message: formData.message }
        ]);
        
      if (error) throw error;
      
      setWishes([{ name: formData.name, text: formData.message }, ...wishes]);
      setFormData({ name: "", attendance: "yes", message: "" });
    } catch (err) {
      console.error("Error inserting wish:", err);
      alert("Maaf, terjadi kesalahan saat mengirim ucapan. Pastikan database sudah terkonfigurasi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="font-serif text-4xl text-gold mb-2">Buku Tamu</h2>
          <p className="text-stone-400 mb-8">Mohon konfirmasi kehadiran Anda</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-stone-300 mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm text-stone-300 mb-2">Apakah Anda akan hadir?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                  <input type="radio" name="attendance" value="yes" checked={formData.attendance === "yes"} onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="accent-gold" />
                  Ya, saya akan hadir
                </label>
                <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                  <input type="radio" name="attendance" value="no" checked={formData.attendance === "no"} onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="accent-gold" />
                  Maaf, saya tidak bisa
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-stone-300 mb-2">Pesan & Doa</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
                placeholder="Tulis pesan dan doa Anda di sini..."
              ></textarea>
            </div>

            <button disabled={isLoading} type="submit" className="w-full bg-gold text-[#2C1E16] font-semibold py-3 px-6 rounded-xl hover:bg-gold-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              <Send size={18} /> {isLoading ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </motion.div>

        {/* Wishes List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 h-[600px] flex flex-col"
        >
          <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
            <Heart className="text-gold" size={24} /> Ucapan & Doa
          </h3>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {wishes.length === 0 ? (
              <div className="flex items-center justify-center h-full text-stone-400 text-sm italic">
                Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
              </div>
            ) : (
              wishes.map((wish, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="font-semibold text-gold mb-1">{wish.name}</p>
                  <p className="text-stone-300 text-sm leading-relaxed">{wish.text}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function BottomNavBar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "couple", "event", "gift", "rsvp"];
      let current = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#3a2a20]/95 backdrop-blur-md border border-gold/20 px-6 py-4 rounded-full flex gap-6 sm:gap-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
    >
      <button onClick={() => scrollTo("home")} className={`transition-all duration-300 ${active === "home" ? "text-gold scale-110" : "text-stone-400 hover:text-stone-200"}`}>
        <Home size={22} strokeWidth={1.5} />
      </button>
      <button onClick={() => scrollTo("couple")} className={`transition-all duration-300 ${active === "couple" ? "text-gold scale-110" : "text-stone-400 hover:text-stone-200"}`}>
        <Heart size={22} strokeWidth={1.5} />
      </button>
      <button onClick={() => scrollTo("event")} className={`transition-all duration-300 ${active === "event" ? "text-gold scale-110" : "text-stone-400 hover:text-stone-200"}`}>
        <CalendarDays size={22} strokeWidth={1.5} />
      </button>
      <button onClick={() => scrollTo("gift")} className={`transition-all duration-300 ${active === "gift" ? "text-gold scale-110" : "text-stone-400 hover:text-stone-200"}`}>
        <Gift size={22} strokeWidth={1.5} />
      </button>
      <button onClick={() => scrollTo("rsvp")} className={`transition-all duration-300 ${active === "rsvp" ? "text-gold scale-110" : "text-stone-400 hover:text-stone-200"}`}>
        <MessageSquare size={22} strokeWidth={1.5} />
      </button>
    </motion.div>
  );
}

// MAIN PAGE COMPONENT
export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  return (
    <main className="bg-[#1a120d] min-h-screen text-stone-100 font-sans selection:bg-gold/30 relative overflow-x-hidden">

      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Gebyok Background (Static) */}
        <div className="absolute inset-0 bg-[url('/gebyok-bg.jpg')] bg-cover bg-center opacity-30"></div>
        {/* Gradient to darken top and bottom slightly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a120d]/80 via-[#1a120d]/40 to-[#1a120d]/90"></div>
        
        {/* Global Floating Particles when opened */}
        {isOpen && <FloatingParticles />}
      </div>

      <div className="relative z-50">
        <AnimatePresence>
          {!isOpen && (
            <SuspenseBoundary>
              <CoverWithParams onOpen={handleOpen} />
            </SuspenseBoundary>
          )}
        </AnimatePresence>
      </div>

      <div className={`relative z-10 ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>

        {isOpen && (
          <>
            <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <BottomNavBar />
          </>
        )}

        <Hero />
        <BatikDivider />
        <Profiles />
        <BatikDivider />
        <EventDetails />
        <BatikDivider />
        <LoveStory />
        <Quote />
        <BatikDivider />
        <DigitalGift />
        <RSVPWishes />

        <footer className="py-12 text-center border-t border-white/10 relative z-10 flex flex-col items-center justify-center">
          <p className="text-stone-500 text-sm mb-8">Made with <Heart className="inline text-gold w-4 h-4 mx-1" /> for Rudi & Cella</p>
          
          <div className="bg-white/5 backdrop-blur-md border border-gold/20 p-6 rounded-2xl w-full max-w-sm flex flex-col items-center gap-3 mb-8 shadow-lg hover:border-gold/40 transition-colors">
             <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em]">Undangan Digital Oleh</p>
             <h4 className="font-serif text-2xl text-gold drop-shadow-sm">Hadid</h4>
             
             <div className="flex justify-center gap-6 mt-2">
                <a href="https://wa.me/6287798645424" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-gold transition-colors text-xs font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp
                </a>
                <a href="https://www.instagram.com/mhmdhdid___?igsi=MWZwNGZtNzUwdHhpbw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-gold transition-colors text-xs font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  Instagram
                </a>
             </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

// Wrapper to handle useSearchParams safely
import { Suspense } from "react";

function CoverWithParams({ onOpen }: { onOpen: () => void }) {
  const searchParams = useSearchParams();
  const to = searchParams.get("to");

  return <Cover onOpen={onOpen} to={to} />;
}

function SuspenseBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Cover onOpen={() => { }} to={null} />}>
      {children}
    </Suspense>
  );
}
