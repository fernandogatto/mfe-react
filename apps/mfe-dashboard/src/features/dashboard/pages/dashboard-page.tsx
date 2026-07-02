import { Handbag, Users, Wallet } from "lucide-react";
import DashboardCard from "../components/dashboard-card";
import RevenueChart from "../components/revenue-chart";

const items = [
  {
    title: "Revenue",
    value: "R$ 250.000",
    icon: <Wallet size={20} className="text-emerald-500" />,
  },
  {
    title: "Customers",
    value: "1.250",
    icon: <Users size={20} className="text-amber-500" />,
  },
  {
    title: "Products",
    value: "340",
    icon: <Handbag size={20} className="text-violet-500" />,
  },
];

const DashboardPage = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-3 gap-5">
        {items.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <RevenueChart />
    </div>
  );
};
export default DashboardPage;
