'use client';

import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <Spin size="large" />
      <h1 className="text-2xl font-semibold mt-4 text-gray-700">Loading, please wait...</h1>
    </div>
  );
}
