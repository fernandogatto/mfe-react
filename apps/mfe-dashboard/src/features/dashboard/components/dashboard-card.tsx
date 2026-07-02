interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <div className="bg-white border p-5 rounded-xl">
      <div className="flex items-center justify-between gap-2">
        {title}
        <div className="rounded-2xl bg-neutral-100 p-3 text-neutral-700">
          {icon}
        </div>
      </div>
      <h2 className="text-2xl mt-3">{value}</h2>
    </div>
  );
};

export default DashboardCard;
