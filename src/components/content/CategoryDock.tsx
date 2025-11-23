import { Dock, DockItem } from "@/components/ui/dock";

const categories = [
  { code: "SKN", title: "SİLAH KAPLAMALARI", meta: "ARSENAL" },
  { code: "AGN", title: "AJANLAR", meta: "KADRO" },
  { code: "MAP", title: "HARİTALAR", meta: "ARENALAR" },
  { code: "CRD", title: "KARTLAR", meta: "KİMLİK" },
  { code: "BDR", title: "ÇERÇEVELER", meta: "SEVİYE" },
];

export function CategoryDock() {
  return (
    <section aria-label="Koleksiyon kategorileri" className="space-y-3">
      <div className="border-l-4 border-[#ff4655] pl-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">OYUN MODLARI</p>
        <h2 className="text-xl font-black uppercase italic tracking-wide text-white">SAVAŞ HAZIRLIĞI</h2>
      </div>
      <div className="overflow-x-auto pb-1">
        <Dock className="min-w-full flex-nowrap gap-4 rounded-none border border-white/10 bg-[#0f1923] px-4 py-3">
          {categories.map((category, index) => (
            <DockItem
              key={category.code}
              icon={
                <span className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-[#ece8e1]/5 text-xs font-bold text-[#ff4655]">
                  {category.code}
                </span>
              }
              label={
                <span className="flex flex-col text-left leading-tight">
                  <span className="text-sm font-bold uppercase text-white">{category.title}</span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">{category.meta}</span>
                </span>
              }
              active={index === 0}
            />
          ))}
        </Dock>
      </div>
    </section>
  );
}
