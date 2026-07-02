import { customers } from "../mocks/customers.mock";

export async function getCustomers() {
  return Promise.resolve(customers);
}
