"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/app/auth/actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    
    const res = await loginAction(formData);
    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center bg-[#ff4655]">
          <span className="text-2xl font-bold text-white">V</span>
        </div>
        <h1 className="text-xl font-bold text-white">VALCASE</h1>
      </div>

      {/* Form Container */}
      <div className="w-full space-y-6 rounded-sm bg-[#181818] p-10 text-white shadow-2xl ring-1 ring-white/5">
        <h2 className="text-center text-2xl font-bold">Giriş Yap</h2>

        {error && (
          <div className="rounded bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div className="group relative">
            <input
              name="emailOrUsername"
              type="text"
              required
              className="peer w-full rounded bg-[#2b2b2b] px-3 pt-5 pb-2 text-sm font-bold text-white outline-none ring-2 ring-transparent transition focus:bg-[#333333] focus:ring-[#ff4655]"
              placeholder=" "
            />
            <label className="absolute left-3 top-3.5 text-[10px] font-bold uppercase text-[#999999] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1 peer-focus:text-[9px]">
              KULLANICI ADI
            </label>
          </div>
          
          <div className="group relative">
            <input
              name="password"
              type="password"
              required
              className="peer w-full rounded bg-[#2b2b2b] px-3 pt-5 pb-2 text-sm font-bold text-white outline-none ring-2 ring-transparent transition focus:bg-[#333333] focus:ring-[#ff4655]"
              placeholder=" "
            />
            <label className="absolute left-3 top-3.5 text-[10px] font-bold uppercase text-[#999999] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1 peer-focus:text-[9px]">
              ŞİFRE
            </label>
          </div>

          <div className="flex items-center gap-3 py-2">
            <button type="button" className="flex h-10 w-full items-center justify-center rounded bg-[#2b2b2b] transition hover:bg-[#333333]">
               <span className="text-xs font-bold text-white/70">Facebook</span>
            </button>
            <button type="button" className="flex h-10 w-full items-center justify-center rounded bg-[#2b2b2b] transition hover:bg-[#333333]">
               <span className="text-xs font-bold text-white/70">Google</span>
            </button>
            <button type="button" className="flex h-10 w-full items-center justify-center rounded bg-[#2b2b2b] transition hover:bg-[#333333]">
               <span className="text-xs font-bold text-white/70">Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
             <input type="checkbox" id="stay-signed-in" className="h-4 w-4 rounded border-white/10 bg-[#2b2b2b] text-[#ff4655] focus:ring-[#ff4655]" />
             <label htmlFor="stay-signed-in" className="text-xs font-medium text-white/60">Oturumu açık tut</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center rounded-[20px] border-2 border-transparent bg-[#ff4655] py-4 transition hover:bg-[#ff4655]/90 disabled:opacity-50"
          >
            {loading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <span className="text-sm font-bold text-white">OTURUM AÇ</span>
            )}
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#b2b2b2]">
          <Link href="/register" className="hover:text-white hover:underline">
            HESAP OLUŞTUR
          </Link>
          <Link href="#" className="hover:text-white hover:underline">
            ERİŞİM SORUNU MU YAŞIYORSUN?
          </Link>
        </div>
      </div>
      
      <div className="text-[10px] font-medium text-white/40">
        V1.0.0
      </div>
    </div>
  );
}
