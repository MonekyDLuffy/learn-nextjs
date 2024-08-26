import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { invoices, customers } from "../../lib/placeholder-data";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

function getTotalCustomer(): number {
  return customers.length;
}

function delayedGetTotalCustomer(delay: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTotalCustomer());
    }, delay);
  });
}

function getTotalInvoice(): number {
  return invoices.length;
}

function getTotalPaidInvoices(): string {
  let total = 0;
  invoices
    .filter((inv) => inv.status === "paid")
    .forEach((inv) => {
      total += inv.amount;
    });
  return `$${total}`;
}

function getTotalPendingInvoices(): string {
  let total = 0;
  invoices
    .filter((inv) => inv.status === "pending")
    .forEach((inv) => {
      total += inv.amount;
    });
  return `$${total}`;
}

export default async function CardWrapper() {
  const totalPaidInvoices = getTotalPaidInvoices();
  const totalPendingInvoices = getTotalPendingInvoices();
  const numberOfInvoices = getTotalInvoice();
  const numberOfCustomers = await delayedGetTotalCustomer(2500);
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
