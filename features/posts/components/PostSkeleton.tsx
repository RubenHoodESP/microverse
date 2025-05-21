'use client';

import { motion } from 'framer-motion';

export default function PostSkeleton() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-pulse"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-3 w-10 bg-gray-200 rounded" />
      </div>

      <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-1" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
    </motion.article>
  );
}
