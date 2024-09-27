"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { data } from './data/content'; // Ensure the correct path to data

const deepTalkQuestions = data.questions; // Access the questions array

export default function DeepTalkPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleShake = (event: DeviceMotionEvent) => {
      if (event.acceleration && event.acceleration.x) {
        const acceleration = event.acceleration.x;
        console.log('Acceleration:', acceleration); // Debugging line
        if (Math.abs(acceleration) > 10) { // Adjust threshold as needed
          flipCard();
        }
      }
    };

    const addEventListener = () => {
      window.addEventListener('devicemotion', handleShake);
    };

    const removeEventListener = () => {
      window.removeEventListener('devicemotion', handleShake);
    };

    // Request permission for device motion (if needed)
    const requestPermission = async () => {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
          const response = await DeviceMotionEvent.requestPermission();
          if (response === 'granted') {
            addEventListener();
          } else {
            console.warn('Device motion permission denied');
          }
        } catch (error) {
          console.error('Error requesting device motion permission:', error);
        }
      } else {
        // Older browsers or devices
        addEventListener();
      }
    };

    requestPermission();

    return () => {
      removeEventListener();
    };
  }, []);

  const flipCard = () => {
    setShowText(false);
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setCurrentQuestion(Math.floor(Math.random() * deepTalkQuestions.length));
    }
    setTimeout(() => setShowText(true), 300); // Show text after half of the flip animation
  };

  return (
    <div className="min-h-svh h-svh bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Deep Talk Cards</h1>
      <div className="w-full max-w-md aspect-[3/4] perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card w-full h-full bg-white shadow-xl rounded-xl p-6 flex items-center justify-center cursor-pointer absolute backface-hidden"
               onClick={flipCard}>
            <AnimatePresence>
              {showText && !isFlipped && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-semibold text-center"
                >
                  Flip for a deep question
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="card w-full h-full bg-white shadow-xl rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer absolute backface-hidden"
               style={{ transform: 'rotateY(180deg)' }}
               onClick={flipCard}>
            <AnimatePresence>
              {showText && isFlipped && (
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-4xl font-bold text-purple-600 mb-4"
                  >
                    Deep Talk
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xl font-semibold text-center text-black"
                  >
                    {deepTalkQuestions[currentQuestion]}
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <button onClick={flipCard} className="mt-8 btn btn-primary">
        <Shuffle className="mr-2 h-4 w-4" aria-hidden="true" />
        Shuffle and Flip
      </button>
      <p className="text-white mt-4 text-sm">
        (On mobile, you can actually shake your device to flip the card!)
      </p>
    </div>
  );
}