import { Button } from "@shared/ui";
import { Input } from "@shared/ui";
import { useEffect, useState } from "react";
import { CustomerTable } from "../components/customer-table";
import { getCustomers } from "../services/customers-service";
import { Customer } from "../types/customer.type";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground text-xs">
          {customers.length} customer{customers.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex justify-between">
        <Input placeholder="Search customers..." className="w-1/3" />

        <Button>Add Customer</Button>
      </div>

      <CustomerTable customers={customers} />
    </div>
  );
};
export default CustomersPage;
