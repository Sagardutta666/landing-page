'use client'
import { motion } from "framer-motion";

export default function GrainOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] overflow-hidden">
      <div 
        className="absolute inset-x-[-100%] inset-y-[-100%] w-[300%] h-[300%] bg-[url('https://res.cloudinary.com/dqr68965p/image/upload/v1689650000/noise_okf8vq.png')] opacity-50"
        style={{ animation: 'grain 8s steps(10) infinite' }}
      />
      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform:translate(0, 0) }
          10% { transform:translate(-5%, -10%) }
          20% { transform:translate(-15%, 5%) }
          30% { transform:translate(7%, -25%) }
          40% { transform:translate(-5%, 25%) }
          50% { transform:translate(-15%, 10%) }
          60% { transform:translate(15%, 0%) }
          70% { transform:translate(0%, 15%) }
          80% { transform:translate(3%, 35%) }
          90% { transform:translate(-10%, 10%) }
        }
      `}</style>
    </div>
  );
}
