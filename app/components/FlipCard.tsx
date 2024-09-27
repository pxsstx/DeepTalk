// components/FlipCard.tsx
import { motion } from "framer-motion";
import { useState } from "react";

interface FlipCardProps {
  frontText: string;
  backText: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontText, backText }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const flipCard = () => setFlipped(!flipped);

  return (
    <motion.div
      className="relative w-64 h-40 perspective-1000"
      onClick={flipCard}
      whileHover={{ scale: 1.1 }}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Front Side */}
      <motion.div
        className="absolute w-full h-full bg-blue-500 flex items-center justify-center rounded-lg shadow-lg backface-hidden"
        style={{ rotateY: 0 }}
      >
        <h2 className="text-white text-xl font-bold">{frontText}</h2>
      </motion.div>

      {/* Back Side */}
      <motion.div
        className="absolute w-full h-full bg-green-500 flex items-center justify-center rounded-lg shadow-lg backface-hidden"
        style={{ rotateY: 180 }}
      >
        <p className="text-white text-lg">{backText}</p>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;