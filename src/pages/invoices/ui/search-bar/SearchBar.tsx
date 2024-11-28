'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SEARCH_QUERY_NAME = 'query';
const SEARCH_PAGE_NUMBER_NAME = 'page';

export const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback(({ query }: { query: string }) => {
    const params = new URLSearchParams(searchParams || '');

    // For a new search need to reset the page number to 1
    params.set(SEARCH_PAGE_NUMBER_NAME, '1');

    if (query) {
      params.set(SEARCH_QUERY_NAME, query);
    } else {
      params.delete(SEARCH_QUERY_NAME);
    }

    replace(`${pathname}?${params.toString()}`);

    // eslint-disable-next-line no-console
    console.log('searching:', query, params);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        placeholder={placeholder}
        defaultValue={searchParams?.get(SEARCH_QUERY_NAME)?.toString()}
        onChange={(e) => handleChange({ query: e.target.value })}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};
