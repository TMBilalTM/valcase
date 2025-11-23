"use client";

import { useEffect, useState } from "react";
import { DailyRewardModal } from "@/components/rewards/DailyRewardModal";
import { checkDailyRewardStatus } from "@/app/actions";

export function DailyRewardProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkReward = async () => {
      try {
        const status = await checkDailyRewardStatus();
        if (status.canClaim) {
          // Wait a bit before showing modal for better UX
          setTimeout(() => {
            setIsModalOpen(true);
          }, 1000);
        }
      } catch (error) {
        console.error("Failed to check daily reward status:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkReward();
  }, []);

  const handleClaim = (reward: number) => {
    console.log(`Claimed reward: ${reward} VP`);
    // The modal will close itself after showing the success animation
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (isChecking) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <DailyRewardModal 
        isOpen={isModalOpen}
        onClose={handleClose}
        onClaim={handleClaim}
      />
    </>
  );
}
