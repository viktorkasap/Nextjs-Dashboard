import { CustomerTable } from '@/entites/customer';
import { CustomerAvatarServer } from '@/features/customer-avatar';
import { formatCurrency } from '@/shared/lib';

interface RowProps {
  customer: CustomerTable;
}

export const MobileTableRow = ({ customer }: RowProps) => {
  return (
    <div key={customer.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <div className="flex items-center gap-3">
              {/* Server component */}
              <CustomerAvatarServer name={customer.name} src={customer.imageUrl} />
              {/* Client component */}
              {/* <CustomerAvatarClient name={customer.name} src={customer.image_url} /> */} <p>{customer.name}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{customer.email}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-b py-5">
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Pending</p>
          <p className="font-medium">{formatCurrency(customer.totalPending)}</p>
        </div>
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Paid</p>
          <p className="font-medium">{formatCurrency(customer.totalPaid)}</p>
        </div>
      </div>
      <div className="pt-4 text-sm">
        <p>{customer.totalInvoices} invoices</p>
      </div>
    </div>
  );
};
