'use client'

import { Badge } from '@/components/ui/badge'

interface NRBadgeProps {
  nrs: string[]
  size?: 'sm' | 'md' | 'lg'
}

const nrColors: Record<string, string> = {
  'NR-1': 'bg-red-500',
  'NR-5': 'bg-blue-500',
  'NR-6': 'bg-green-500',
  'NR-7': 'bg-yellow-500',
  'NR-8': 'bg-purple-500',
  'NR-9': 'bg-pink-500',
  'NR-10': 'bg-orange-500',
  'NR-11': 'bg-teal-500',
  'NR-12': 'bg-cyan-500',
  'NR-13': 'bg-indigo-500',
  'NR-15': 'bg-rose-500',
  'NR-16': 'bg-amber-500',
  'NR-17': 'bg-emerald-500',
  'NR-18': 'bg-violet-500',
  'NR-20': 'bg-fuchsia-500',
  'NR-23': 'bg-lime-500',
  'NR-24': 'bg-sky-500',
  'NR-26': 'bg-stone-500',
  'NR-33': 'bg-amber-700',
  'NR-35': 'bg-orange-700',
  'NR-36': 'bg-teal-700',
  'NR-37': 'bg-cyan-700',
}

export function NRBadge({ nrs, size = 'md' }: NRBadgeProps) {
  if (!nrs || nrs.length === 0) return null

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {nrs.map((nr) => (
        <Badge
          key={nr}
          className={`${nrColors[nr] || 'bg-gray-500'} ${sizeClasses[size]} text-white font-medium`}
        >
          {nr}
        </Badge>
      ))}
    </div>
  )
}
