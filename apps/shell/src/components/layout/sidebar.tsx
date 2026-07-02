import { LayoutDashboard, Package, Users } from "lucide-react";

interface Props {
  page: string;
  setPage: (page: string) => void;
}

export function Sidebar({ page, setPage }: Props) {
  const itemClass = (isActive: boolean) =>
    `flex gap-2 w-full items-center rounded-md px-3 py-2 transition-colors ${
      isActive ? "bg-black text-white" : "hover:bg-slate-200"
    }`;

  return (
    <aside className="w-64 bg-slate-100 text-black border-r p-5 h-screen">
      <h1 className="text-2xl mb-10">Atlas Admin</h1>

      <nav className="space-y-2">
        <button
          onClick={() => setPage("dashboard")}
          className={itemClass(page === "dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          onClick={() => setPage("customers")}
          className={itemClass(page === "customers")}
        >
          <Users size={18} />
          Customers
        </button>

        <button
          onClick={() => setPage("products")}
          className={itemClass(page === "products")}
        >
          <Package size={18} />
          Products
        </button>
      </nav>
    </aside>
  );
}
