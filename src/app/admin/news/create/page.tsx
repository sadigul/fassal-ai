import { Suspense } from 'react';
import CreateOrEditNews from './CreateOrEditNews';

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-32 px-6 text-center text-gray-500">Loading...</div>}>
      <CreateOrEditNews />
    </Suspense>
  );
}
