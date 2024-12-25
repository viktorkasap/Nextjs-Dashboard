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
              <Avatar name={customer.name} avatarUrl={customer.avatarUrl} avatarFile={customer.avatarFile} />
              <p>{customer.name}</p>
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

const Avatar = ({ name, avatarUrl, avatarFile }: { name: string; avatarUrl: string | null; avatarFile: Uint8Array | null }) => {
  let src = avatarUrl || '';

  if (avatarFile) {
    const base64String = Buffer.from(avatarFile).toString('base64');
    src = `data:image/png;base64,${base64String}`;
  }

  return (
    <>
      {/* 1) Server component */}
      <CustomerAvatarServer name={name} src={src} />
      {/* 2) Client component */}
      {/* <CustomerAvatarClient name={customer.name} src={avatarUrl || ''} /> */}
    </>
  );
};
