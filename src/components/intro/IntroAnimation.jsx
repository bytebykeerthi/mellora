import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntroContext } from '../../context/IntroContext';
import MelloraLogo from '../branding/MelloraLogo';
import Flower from '../branding/Flower';
import Button from '../ui/Button';
import './IntroAnimation.css';

const PRODUCE = [
  { id: 1, emoji: '🍎', size: 'md', delay: 0 },
  { id: 2, emoji: '🍌', size: 'sm', delay: 0.1 },
  { id: 3, emoji: '🍓', size: 'sm', delay: 0.2 },
  { id: 4, emoji: '🥕', size: 'md', delay: 0.15 },
  { id: 5, emoji: '🍅', size: 'md', delay: 0.05 },
  { id: 6, emoji: '🥬', size: 'sm', delay: 0.25 },
  { id: 7, emoji: '🍊', size: 'md', delay: 0.1 },
  { id: 8, emoji: '🍋', size: 'sm', delay: 0.3 },
];

export default function IntroAnimation({ onComplete }) {
  const { markIntroCompleted } = useContext(IntroContext);
  const [stage, setStage] = useState('produce');
  const [skipClicked, setSkipClicked] = useState(false);

  const handleSkip = () => {
    setSkipClicked(true);
    markIntroCompleted();
    setTimeout(onComplete, 300);
  };

  useEffect(() => {
    const timings = {
      produce: 2000,
      logo: 1500,
      flower: 2000,
      transition: 800,
    };

    if (stage === 'produce') {
      const timer = setTimeout(() => setStage('logo'), timings.produce);
      return () => clearTimeout(timer);
    } else if (stage === 'logo') {
      const timer = setTimeout(() => setStage('flower'), timings.logo);
      return () => clearTimeout(timer);
    } else if (stage === 'flower') {
      const timer = setTimeout(() => setStage('transition'), timings.flower);
      return () => clearTimeout(timer);
    } else if (stage === 'transition') {
      const timer = setTimeout(() => {
        markIntroCompleted();
        onComplete();
      }, timings.transition);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete, markIntroCompleted]);

  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`intro-animation ${skipClicked ? 'skip-triggered' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Skip Button */}
      <motion.button
        className="intro-skip-button"
        onClick={handleSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Skip
      </motion.button>

      {/* Background */}
      <div className="intro-background">
        <div className="intro-gradient" />
        <div className="intro-glow" />
      </div>

      {/* Produce Stage */}
      <AnimatePresence mode="wait">
        {stage === 'produce' && (
          <motion.div
            key="produce"
            className="intro-produce-container"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {PRODUCE.map((item) => (
              <ProduceItem key={item.id} item={item} sizeMap={sizeMap} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Stage */}
      <AnimatePresence mode="wait">
        {stage === 'logo' && (
          <motion.div
            key="logo"
            className="intro-logo-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <MelloraLogo size="lg" showText={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flower Stage */}
      <AnimatePresence mode="wait">
        {stage === 'flower' && (
          <motion.div
            key="flower"
            className="intro-flower-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="intro-flower-wrapper"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Flower size="lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Stage */}
      <AnimatePresence mode="wait">
        {stage === 'transition' && (
          <motion.div
            key="transition"
            className="intro-transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProduceItem({ item, sizeMap }) {
  const randomX = Math.random() * 60 - 30;
  const randomRotation = Math.random() * 360;
  const randomScale = 0.8 + Math.random() * 0.4;

  const size = sizeMap[item.size];

  return (
    <motion.div
      key={item.id}
      className="produce-item"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.6,
        left: `calc(50% + ${randomX}px)`,
      }}
      initial={{
        y: '120vh',
        x: 0,
        opacity: 0,
        rotate: randomRotation,
        scale: randomScale,
      }}
      animate={{
        y: '0vh',
        x: 0,
        opacity: 1,
        rotate: randomRotation + 360,
        scale: randomScale,
      }}
      transition={{
        duration: 1.2,
        delay: item.delay,
        ease: 'easeIn',
      }}
      onAnimationComplete={() => {
        // Landing animation
      }}
    >
      {item.emoji}
    </motion.div>
  );
}
