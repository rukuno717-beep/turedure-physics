'use client';

import { useVisitorTracker } from './VisitorCounter';

export default function GlobalTracker() {
  useVisitorTracker();
  return null;
}