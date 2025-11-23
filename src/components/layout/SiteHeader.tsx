import Link from "next/link";
import { getSessionId } from "@/app/actions";
import { getUserProfile } from "@/lib/profile";
import { formatCurrency } from "@/lib/utils";
import { logoutAction } from "@/app/auth/actions";

const links = [
  { href: "/", label: "KASALAR" },
];

export async function SiteHeader() {
  const userId = await getSessionId();
  const profile = userId ? await getUserProfile(userId) : null;

  return (
    <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-8">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center bg-[#ff4655]">
          <span className="font-bold text-white">V</span>
        </div>
        <span className="text-xl font-black uppercase italic tracking-tighter text-white">
          VALCASE
        </span>
      </Link>
      
      <div className="flex items-center gap-8">
        <nav className="hidden gap-6 text-sm font-bold uppercase tracking-wider text-white/70 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#ff4655]"
            >
              {link.label}
            </Link>
          ))}
          {profile && (
             <Link href="/profile" className="transition hover:text-[#ff4655]">
               PROFİL
             </Link>
          )}
        </nav>

        {profile ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-none border border-white/10 bg-[#0f1923] px-4 py-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-[#ff4655]/10">
                <span className="text-[10px] font-bold text-[#ff4655]">VP</span>
              </div>
              <span className="text-lg font-black italic tracking-wide text-white">
                {formatCurrency(profile.balance).replace(" VP", "")}
              </span>
            </div>
            <form action={logoutAction}>
              <button className="text-xs font-bold uppercase text-white/50 hover:text-white">
                ÇIKIŞ
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#ff4655]"
            >
              GİRİŞ YAP
            </Link>
            <Link 
              href="/register" 
              className="bg-[#ff4655] px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff4655]/80"
            >
              KAYIT OL
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
