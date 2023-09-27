'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Button from './Button';

interface LoadMoreProps {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const LoadMore: FC<LoadMoreProps> = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}) => {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startcursor');
      currentParams.set('endcursor', endCursor);
    } else if (direction === 'first' && hasPreviousPage) {
      currentParams.delete('endcursor');
      currentParams.set('startcursor', startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          type="button"
          title="First Page"
          handleClick={() => handleNavigation('first')}
        />
      )}
      {hasNextPage && (
        <Button
          type="button"
          title="Next Page"
          handleClick={() => handleNavigation('next')}
        />
      )}
    </div>
  );
};

export default LoadMore;
