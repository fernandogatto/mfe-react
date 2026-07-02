export interface Customer {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: "active" | "inactive";
}
