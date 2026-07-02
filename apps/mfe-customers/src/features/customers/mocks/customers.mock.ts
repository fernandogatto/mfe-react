import { Customer } from "../types/customer.type";

export const customers: Customer[] = [
  {
    id: 1,
    name: "Fernando Gatto",
    email: "fernando@mail.com",
    plan: "Premium",
    status: "active",
  },
  {
    id: 2,
    name: "Ana Costa",
    email: "ana@mail.com",
    plan: "Basic",
    status: "inactive",
  },
  {
    id: 3,
    name: "Carlos Silva",
    email: "carlos@mail.com",
    plan: "Enterprise",
    status: "active",
  },
];
