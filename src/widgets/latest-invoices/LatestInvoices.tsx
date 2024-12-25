import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { LatestInvoice } from '@/entites/invoice';

import { CustomerAvatarServer } from '@/features/customer-avatar';

import { lusitana } from '@/shared/assets';
export const LatestInvoices = async ({ latestInvoices }: { latestInvoices: LatestInvoice[] }) => {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx('flex flex-row items-center justify-between py-4', {
                  'border-t': i !== 0,
                })}>
                <div className="flex items-center">
                  <Avatar name={invoice.name} avatarUrl={invoice.avatarUrl} avatarFile={invoice.avatarFile} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">{invoice.name}</p>
                    <p className="hidden text-sm text-gray-500 sm:block">{invoice.email}</p>
                  </div>
                </div>
                <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>{invoice.amount}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
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
