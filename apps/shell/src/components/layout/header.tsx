import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="border-b p-4 bg-white">
      <div className="flex h-full items-center justify-end gap-3 px-4 sm:px-6 lg:px-8">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 transition-all hover:bg-slate-100">
          <Bell fontSize="small" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-black"></span>
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white text-xs font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
