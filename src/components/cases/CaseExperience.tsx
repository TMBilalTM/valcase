"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { CASES } from "@/data/cases";
import { openCaseAction } from "@/app/actions";
import type { CaseReward, ValorantContent, CaseDefinition } from "@/types/valorant";
import { formatCurrency } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/panel";
import { CaseGrid } from "@/components/cases/CaseGrid";

interface Props {
  content: ValorantContent;
  initialBalance: number;
}

// Helper to generate random visual items for the reel
function generateReelItems(caseDef: CaseDefinition, content: ValorantContent, winner: CaseReward, count = 50, winnerIndex = 40) {
  const items: Array<{ id: string; image: string; color: string; name: string }> = [];
  
  // Create a pool of potential items from this case's loot table
  const poolItems = caseDef.lootTable.flatMap(entry => {
    const pool = content[entry.pool === "skins" ? "skins" : entry.pool === "agents" ? "agents" : entry.pool === "maps" ? "maps" : entry.pool === "playerCards" ? "playerCards" : "levelBorders"];
    return pool.map(p => ({ ...p, weight: entry.weight }));
  });

  for (let i = 0; i < count; i++) {
    if (i === winnerIndex) {
      items.push({ id: `winner-${winner.uuid}`, image: winner.image, color: winner.accentColor, name: winner.name });
    } else {
      // Pick random item
      const random = poolItems[Math.floor(Math.random() * poolItems.length)];
      items.push({ 
        id: `reel-${i}-${random.uuid}`, 
        image: random.image, 
        color: random.accentColor, 
        name: random.name 
      });
    }
  }
  return items;
}

export function CaseExperience({ content, initialBalance }: Props) {
  const [balance, setBalance] = useState(initialBalance);
  const [history, setHistory] = useState<CaseReward[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  
  // Reel state
  const [reelItems, setReelItems] = useState<Array<{ id: string; image: string; color: string; name: string }>>([]);
  const [reelOffset, setReelOffset] = useState(0);
  const [showReel, setShowReel] = useState(false);

  // Modal state
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [lastReward, setLastReward] = useState<CaseReward | null>(null);

  useEffect(() => {
    setBalance(initialBalance);
  }, [initialBalance]);

  const recent = history.slice(0, 5);
  const featuredReward = useMemo(() => history[0], [history]);

  const handleOpen = async (caseId: string) => {
    const caseDef = CASES.find((c) => c.id === caseId);
    if (!caseDef || balance < caseDef.price || isRolling) return;

    setIsRolling(true);
    setBalance((prev) => prev - caseDef.price);

    try {
      const result = await openCaseAction(caseId);
      
      if (result.error || !result.success || !result.reward) {
        setBalance((prev) => prev + caseDef.price);
        alert(result.error || "Hata oluştu.");
        setIsRolling(false);
        return;
      }

      // Prepare animation
      const WINNER_INDEX = 35;
      const ITEM_WIDTH = 256; // w-64
      const GAP = 16; // gap-4
      const items = generateReelItems(caseDef, content, result.reward, 50, WINNER_INDEX);
      
      setReelItems(items);
      setShowReel(true);
      setReelOffset(0); // Reset position

      // Force reflow to ensure start position is rendered before transition
      await new Promise(r => setTimeout(r, 50));

      // Start roll
      // Calculate offset to center the winner
      // Formula: -1 * (WINNER_INDEX * (ITEM_WIDTH + GAP) + (ITEM_WIDTH / 2))
      // This aligns the center of the winner item with the start of the flex container (which is centered via px-[50%])
      const targetOffset = -1 * (WINNER_INDEX * (ITEM_WIDTH + GAP) + (ITEM_WIDTH / 2));
      
      setReelOffset(targetOffset);

      // Wait for animation (e.g. 6s)
      await new Promise((resolve) => setTimeout(resolve, 6000));

      setBalance(result.newBalance);
      setHistory((prev) => [result.reward!, ...prev].slice(0, 20));
      setLastReward(result.reward);
      
      // Show modal and hide reel
      setTimeout(() => {
        setShowReel(false);
        setShowRewardModal(true);
        setIsRolling(false);
      }, 500);

    } catch (error) {
      console.error(error);
      setBalance((prev) => prev + caseDef.price);
      setIsRolling(false);
    }
  };

  return (
    <section className="space-y-10">
      {/* Stats Panel - Always Visible */}
      <GlassPanel className="rounded-none border-white/10 bg-[#0f1923]">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-l-4 border-[#ff4655] pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">VP BAKİYESİ</p>
            <p className="text-4xl font-black uppercase italic tracking-tighter text-white">{formatCurrency(balance)}</p>
            <p className="text-sm font-medium text-white/60">KULLANILABİLİR TUTAR</p>
          </div>
          <div className="border border-white/10 bg-[#ece8e1]/5 px-5 py-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">SİSTEM</p>
            <p className="text-2xl font-black uppercase italic tracking-wider">{isRolling ? "AÇILIYOR..." : "HAZIR"}</p>
            <p className="text-xs font-medium text-white/50">BAĞLANTI STABİL</p>
          </div>
          <div className="border border-white/10 bg-[#ece8e1]/5 px-5 py-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">SON KAZANIM</p>
            <p className="truncate text-lg font-bold uppercase">{featuredReward ? featuredReward.name : "BEKLENİYOR"}</p>
            <p className="text-xs font-medium text-white/60">ENVANTERE EKLENDİ</p>
          </div>
        </div>
      </GlassPanel>

      {/* Full Screen Animation Overlay */}
      {showReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative h-96 w-full max-w-7xl overflow-hidden rounded-none border-y-4 border-[#ff4655] bg-[#0f1923] shadow-[0_0_50px_rgba(255,70,85,0.2)]">
            <div className="absolute left-1/2 top-0 z-20 h-full w-1 -translate-x-1/2 bg-[#ff4655] shadow-[0_0_20px_#ff4655]" />
            <div 
              className="flex h-full items-center gap-4 px-[50%] transition-transform duration-6000 ease-[cubic-bezier(0.15,0,0.10,1)]"
              style={{ transform: `translateX(${reelOffset}px)` }}
            >
              {reelItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative flex h-64 w-64 shrink-0 flex-col items-center justify-center gap-4 border border-white/10 bg-[#ece8e1]/5 p-6"
                  style={{ borderColor: item.color }}
                >
                  <div className="relative h-32 w-full">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <p className="text-center text-sm font-bold uppercase text-white/90 line-clamp-2">{item.name}</p>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 h-1.5 w-full" style={{ backgroundColor: item.color }} />
                </div>
              ))}
            </div>
            
            {/* Overlay Text */}
            <div className="absolute top-6 left-0 w-full text-center z-30">
               <p className="text-[#ff4655] font-bold tracking-[0.3em] text-sm uppercase drop-shadow-md">KASA AÇILIYOR</p>
            </div>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {showRewardModal && lastReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
           <div className="relative w-full max-w-md border-2 border-[#ff4655] bg-[#0f1923] p-1 shadow-[0_0_50px_rgba(255,70,85,0.4)]">
              <div className="flex flex-col items-center gap-6 bg-[#ece8e1]/5 p-8 text-center">
                 <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">KAZANDIN!</h2>
                 <div className="relative h-48 w-48">
                    <Image src={lastReward.image} alt={lastReward.name} fill className="object-contain drop-shadow-2xl" />
                 </div>
                 <div className="space-y-2">
                    <p className="text-xl font-bold uppercase text-white">{lastReward.name}</p>
                    <p className="text-sm font-medium text-[#ff4655]">{lastReward.rarityLabel || "ÖZEL EŞYA"}</p>
                 </div>
                 <button 
                    onClick={() => setShowRewardModal(false)}
                    className="mt-4 w-full bg-[#ff4655] py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#ff4655]/80 cursor-pointer"
                 >
                    TAMAM
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px]">
        <div className="space-y-8">
          <CaseGrid cases={CASES} onOpen={handleOpen} balance={balance} />
        </div>
        <div className="space-y-6">
          <GlassPanel className="rounded-none border-white/10 bg-[#0f1923]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">KASA GEÇMİŞİ</p>
            <div className="mt-4 space-y-4">
              {recent.length === 0 ? (
                <p className="text-sm font-medium text-white/60">Henüz işlem yok.</p>
              ) : (
                recent.map((entry) => (
                  <div
                    key={`${entry.caseId}-${entry.uuid}-${entry.value}`}
                    className="border border-white/10 bg-[#ece8e1]/5 px-4 py-3 transition hover:bg-[#ece8e1]/10"
                  >
                    <p className="text-sm font-bold uppercase text-white">{entry.name}</p>
                    <p className="text-xs font-medium text-white/60">
                      {entry.caseTitle} · {entry.rarityLabel}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#ff4655]">{formatCurrency(entry.value)}</p>
                  </div>
                ))
              )}
            </div>
          </GlassPanel>
          <GlassPanel className="rounded-none border-white/10 bg-[#0f1923]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">VİTRİN</p>
            {featuredReward ? (
              <div className="mt-4 space-y-4">
                <div className="overflow-hidden border border-white/10 bg-[#ece8e1]/5">
                  <Image
                    src={featuredReward.image}
                    alt={featuredReward.name}
                    width={640}
                    height={320}
                    className="h-56 w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xl font-black uppercase italic text-white">{featuredReward.name}</p>
                  <p className="text-sm font-medium text-white/60">{featuredReward.subtitle}</p>
                  <p className="text-sm font-bold text-[#ff4655]">{formatCurrency(featuredReward.value)} DEĞERİNDE</p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm font-medium text-white/60">İlk ödülünü kazanmak için kasa aç.</p>
            )}
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
