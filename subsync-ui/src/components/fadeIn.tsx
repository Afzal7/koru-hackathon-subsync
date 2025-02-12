import type { FC, ReactNode } from 'react';

import { motion } from 'motion/react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

const FadeIn: FC<FadeInProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial="pageInitial"
    animate="pageAnimate"
    variants={{
      pageInitial: {
        opacity: 0,
      },
      pageAnimate: {
        opacity: 1,
      },
    }}
    transition={{ duration: 0.7, delay }}
  >
    {children}
  </motion.div>
);

export default FadeIn;
