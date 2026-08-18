import React from 'react';

export const CardSkeleton = () => (
  <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 animate-pulse">
    <div className="w-full aspect-video bg-slate-800/80 rounded-xl" />
    <div className="h-6 bg-slate-800/80 rounded-md w-3/4" />
    <div className="space-y-2">
      <div className="h-4 bg-slate-800/50 rounded-md w-full" />
      <div className="h-4 bg-slate-800/50 rounded-md w-5/6" />
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-6 bg-slate-800/60 rounded w-16" />
      <div className="h-6 bg-slate-800/60 rounded w-16" />
      <div className="h-6 bg-slate-800/60 rounded w-16" />
    </div>
  </div>
);

export const SkillSkeleton = () => (
  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-800" />
        <div className="space-y-1.5">
          <div className="h-4 bg-slate-800 rounded w-24" />
          <div className="h-3 bg-slate-800/60 rounded w-16" />
        </div>
      </div>
      <div className="h-4 bg-slate-800 rounded w-8" />
    </div>
    <div className="w-full bg-slate-800 rounded-full h-1.5" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="w-full space-y-3 animate-pulse">
    <div className="h-10 bg-slate-800/70 rounded-xl w-full" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-14 bg-slate-900/60 border border-slate-800 rounded-xl w-full" />
    ))}
  </div>
);
