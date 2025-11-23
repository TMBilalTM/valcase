"use client";

import { useEffect, useState } from "react";
import { DailyRewardModal } from "@/components/rewards/DailyRewardModal";
import { checkDailyRewardStatus } from "@/app/actions";

export function DailyRewardProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [hasClaimed, setHasClaimed] = useState(false);

  useEffect(() => {
    const checkReward = async () => {
      try {
        const status = await checkDailyRewardStatus();
        // Only show modal if can claim AND hasn't claimed in this session
        if (status.canClaim && !hasClaimed) {
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
  }, [hasClaimed]);

  const handleClaim = (reward: number) => {
    console.log(`Claimed reward: ${reward} VP`);
    setHasClaimed(true);
    // Reload page after modal closes to update balance in header
    setTimeout(() => {
      window.location.reload();
    }, 3500);
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
