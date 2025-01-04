import { Metadata } from 'next';

import { AcmeLogo } from '@/shared/ui';

import { Form } from './ui';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme',
    default: 'Acme Sign Up',
  },
  description: 'Test project dashboard',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export const SignUp = async () => {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Form />
      </div>
    </main>
  );
};
