import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqCard({ question, answer }: {
    question: string;
    answer: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white w-full">{question}</h3>
                <button 
                    className="text-lime-400 text-3xl focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'x' : '+'}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 0.8, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className="text-white/70 leading-relaxed mt-4">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}