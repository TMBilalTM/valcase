"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { sellInventoryItemAction, tradeInventoryItemsAction } from "@/app/(main)/profile/actions";
import { formatCurrency } from "@/lib/utils";
import type { InventoryItem } from "@/types/profile";
import type { CaseReward } from "@/types/valorant";

type TradeOverlayState =
  | { visible: false }
  | { visible: true; phase: "rolling"; reward?: undefined }
  | { visible: true; phase: "result"; reward: CaseReward | null };

function buildTradeReel(items: InventoryItem[]) {
  const names = items.map((item) => item.name);
  const fallback = ["Prime Relic", "Protocol Fragment", "Omega Artifact", "Radiant Cache"];
  const source = names.length ? names : fallback;
  const reel: string[] = [];
  while (reel.length < 12) {
    reel.push(source[reel.length % source.length]);
  }
  return reel;
}

const getItemToken = (item: InventoryItem) => item.instanceId ?? `${item.uuid}:${item.acquiredAt}`;

interface InventoryActionsProps {
  inventory: InventoryItem[];
}

interface ToastState {
  type: "success" | "error";
  message: string;
}

export function InventoryActions({ inventory }: InventoryActionsProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [pendingMessage, setPendingMessage] = useState<ToastState | null>(null);
  const [isPending, startTransition] = useTransition();
  const [tradeOverlay, setTradeOverlay] = useState<TradeOverlayState>({ visible: false });
  const [tradeReel, setTradeReel] = useState<string[]>([]);
  const tradeTimers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearTradeTimers = () => {
    tradeTimers.current.forEach((timer) => clearTimeout(timer));
    tradeTimers.current = [];
  };

  useEffect(() => clearTradeTimers, []);

  const toggleSelection = (token: string) => {
    setSelected((prev) => {
      if (prev.includes(token)) {
        return prev.filter((id) => id !== token);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, token];
    });
  };

  const handleSell = (token: string) => {
    startTransition(async () => {
      const result = await sellInventoryItemAction(token);
      if (result?.error) {
        setPendingMessage({ type: "error", message: result.error });
        return;
      }
      setPendingMessage({ type: "success", message: `+${formatCurrency(result.saleValue ?? 0)} VP bakiyeye aktarıldı.` });
      setSelected((prev) => prev.filter((id) => id !== token));
      router.refresh();
    });
  };

  const handleTrade = () => {
    const selectedItems = inventory.filter((item) => selected.includes(getItemToken(item)));
    if (selectedItems.length < 5) {
      setPendingMessage({ type: "error", message: "Takasa başlamak için 5 drop seçmelisin." });
      return;
    }

    setTradeReel(buildTradeReel(selectedItems));
    setTradeOverlay({ visible: true, phase: "rolling" });
    setPendingMessage(null);

    startTransition(async () => {
      const result = await tradeInventoryItemsAction(selected);
      if (result?.error) {
        clearTradeTimers();
        setTradeOverlay({ visible: false });
        setPendingMessage({ type: "error", message: result.error });
        return;
      }
      setSelected([]);
      router.refresh();
      const successMessage = `${result.reward?.name ?? "Yeni drop"} envantere eklendi.`;
      setPendingMessage({ type: "success", message: successMessage });

      clearTradeTimers();
      const reveal = setTimeout(() => {
        setTradeOverlay({ visible: true, phase: "result", reward: result.reward ?? null });
      }, 2200);
      const hide = setTimeout(() => {
        setTradeOverlay({ visible: false });
      }, 5200);
      tradeTimers.current.push(reveal, hide);
    });
  };

  const hideTradeOverlay = () => {
    clearTradeTimers();
    setTradeOverlay({ visible: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Envanter Yönetimi</p>
          <p className="text-sm text-white/60">
            Ögeleri tek tek satabilir ya da 5 drop seçip takas yaparak yeni bir drop elde edebilirsin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Seçili: {selected.length} / 5
          </span>
          <button
            type="button"
            onClick={handleTrade}
            disabled={selected.length < 5 || isPending}
            className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white transition hover:border-white/60 disabled:cursor-not-allowed disabled:opacity-40"
          >
            5 Drop Takasla
          </button>
        </div>
      </div>

      {pendingMessage ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            pendingMessage.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-red-500/40 bg-red-500/10 text-red-200"
          }`}
        >
          {pendingMessage.message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {inventory.length === 0 ? (
          <p className="text-sm text-white/60">Envanterinde henüz öge yok. Kasaları açarak drop kazan.</p>
        ) : (
          inventory.map((item) => {
            const token = getItemToken(item);
            const isSelected = selected.includes(token);
            return (
              <div
                key={token}
                className={`relative rounded-2xl border ${
                  isSelected ? "border-white/60 bg-white/10" : "border-white/10 bg-white/5"
                } p-4 transition`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/50">{item.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSelection(token)}
                    className={`text-[10px] font-black uppercase tracking-[0.4em] ${
                      isSelected ? "text-[#00f0ff]" : "text-white/40"
                    }`}
                  >
                    {isSelected ? "Seçildi" : "Seç"}
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-white">
                  <span className="font-semibold text-emerald-300">{formatCurrency(item.value)} VP</span>
                  <button
                    type="button"
                    onClick={() => handleSell(token)}
                    disabled={isPending}
                    className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/70 transition hover:text-[#ff4655] disabled:opacity-50"
                  >
                    Sat (+%80)
                  </button>
                </div>
                <p className="mt-1 text-[10px] text-white/40">{new Date(item.acquiredAt).toLocaleDateString("tr-TR")}</p>
              </div>
            );
          })
        )}
      </div>

      {tradeOverlay.visible ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#05070e] p-6 text-white shadow-[0_0_60px_rgba(0,0,0,0.6)]">
            <button
              type="button"
              onClick={hideTradeOverlay}
              className="absolute right-4 top-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/50 hover:text-white"
            >
              Kapat
            </button>
            {tradeOverlay.phase === "rolling" ? (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-[0.5em] text-[#ff4655]">Takas İşleniyor</p>
                  <p className="mt-2 text-sm text-white/60">Seçilen drop&apos;lar kasa makinesine aktarılıyor...</p>
                </div>
                <div className="relative h-64 overflow-hidden rounded-2xl border border-[#ff4655]/40 bg-[#0f1923]">
                  <div className="absolute left-1/2 top-0 z-20 h-full w-1 -translate-x-1/2 bg-[#ff4655]/80" />
                  <div className="absolute inset-0 flex items-center gap-4 px-10">
                    <div
                      className="flex animate-marquee gap-4"
                      style={{ ["--duration" as string]: "3s" }}
                    >
                      {[...tradeReel, ...tradeReel].map((name, index) => (
                        <div
                          key={`${name}-${index}`}
                          className="flex h-40 w-40 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-center"
                        >
                          <p className="text-sm font-semibold text-white/80">{name}</p>
                          <span className="mt-2 text-[10px] uppercase tracking-[0.4em] text-white/40">VAL</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <p className="text-xs font-black uppercase tracking-[0.5em] text-[#00f0ff]">Takas Tamamlandı</p>
                <h3 className="text-2xl font-black uppercase text-white">Yeni Drop Envantere Eklendi</h3>
                {tradeOverlay.reward ? (
                  <div className="space-y-4">
                    <div className="relative mx-auto h-40 w-40">
                      <Image src={tradeOverlay.reward.image} alt={tradeOverlay.reward.name} fill sizes="160px" className="object-contain" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">{tradeOverlay.reward.name}</p>
                      <p className="text-sm text-white/60">{tradeOverlay.reward.rarityLabel}</p>
                      <p className="mt-2 text-sm font-semibold text-emerald-300">{formatCurrency(tradeOverlay.reward.value)} VP</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-white/60">Yeni drop detayları senkronize edildi.</p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
