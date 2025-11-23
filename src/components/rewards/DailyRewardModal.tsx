"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { claimDailyRewardAction, checkDailyRewardStatus } from "@/app/actions";
import { Calendar, Flame, Gift, X } from "lucide-react";

interface DailyRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (reward: number) => void;
}

export function DailyRewardModal({ isOpen, onClose, onClaim }: DailyRewardModalProps) {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [rewardData, setRewardData] = useState<{
    streak: number;
    nextReward: number;
    canClaim: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkDailyRewardStatus().then((data) => {
        setRewardData({
          canClaim: data.canClaim,
          streak: data.streak || 0,
          nextReward: data.nextReward || 650
        });
      });
    }
  }, [isOpen]);

  const handleClaim = async () => {
    if (!rewardData?.canClaim) return;
    
    setClaiming(true);
    setError(null);

    const result = await claimDailyRewardAction();

    if (result.error) {
      setError(result.error);
      setClaiming(false);
    } else {
      setClaimed(true);
      setClaiming(false);
      if (result.reward) {
        onClaim(result.reward);
        // Update local state to prevent re-opening
        setRewardData({
          canClaim: false,
          streak: result.streak || 0,
          nextReward: result.nextReward || 650
        });
        setTimeout(() => {
          onClose();
          setClaimed(false);
        }, 3000);
      }
    }
  };

  if (!isOpen || !rewardData) return null;

  const timeUntilNextClaim = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}s ${minutes}dk`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-linear-to-br from-zinc-900 via-zinc-900 to-red-950/30 border border-red-500/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                  <motion.div
                    animate={claimed ? { rotate: [0, -10, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Gift className="w-16 h-16 text-red-500 relative z-10" />
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Günlük Ödül
                </h2>
                <p className="text-zinc-400 text-center text-sm">
                  Her gün giriş yaparak ödül kazan!
                </p>
              </div>

              {/* Streak Display */}
              <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <div className="text-xs text-zinc-400">Giriş Serisi</div>
                  <div className="text-2xl font-bold text-white">
                    {rewardData.streak} Gün
                  </div>
                </div>
              </div>

              {/* Reward Amount */}
              <div className="text-center mb-6">
                <div className="text-sm text-zinc-400 mb-2">Bugünkü Ödül</div>
                <motion.div
                  animate={claimed ? { scale: [1, 1.2, 1] } : {}}
                  className="text-5xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                >
                  {rewardData.nextReward.toLocaleString("tr-TR")} VP
                </motion.div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Claim Button or Timer */}
              {rewardData.canClaim ? (
                <button
                  onClick={handleClaim}
                  disabled={claiming || claimed}
                  className="w-full py-4 bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-zinc-700 disabled:to-zinc-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {claiming ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : claimed ? (
                    "Ödül Alındı! ✓"
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Ödülü Al
                    </>
                  )}
                </button>
              ) : (
                <div className="text-center p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <div className="text-sm text-zinc-400 mb-1">Bir sonraki ödül:</div>
                  <div className="text-lg font-bold text-white">{timeUntilNextClaim()}</div>
                </div>
              )}

              {/* Next Day Info */}
              {rewardData.canClaim && (
                <div className="mt-4 text-center text-xs text-zinc-500">
                  Yarın: {(rewardData.nextReward + 50).toLocaleString("tr-TR")} VP
                </div>
              )}
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {claimed && (
                <>
                  {[...Array(20)].map((_, i) => {
                    const xPos = (i * 5) % 100;
                    return (
                      <motion.div
                        key={i}
                        initial={{ y: "100%", x: `${xPos}%`, opacity: 1 }}
                        animate={{ y: "-100%", opacity: 0 }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      />
                    );
                  })}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
