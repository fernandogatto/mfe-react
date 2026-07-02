interface BadgeProps {
  status: "active" | "inactive";
}

export function Badge({ status }: BadgeProps) {
  const styles =
    status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded-xl text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
