'use client';

import { useEffect, useState } from 'react';

// カウント処理を行う関数（全ページ共通で1日1回だけカウントアップ）
export function useVisitorTracker() {
  useEffect(() => {
    const track = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const dayKey = `day_${year}_${month}_${day}`;
        const monthKey = `month_${year}_${month}`;
        const storageKey = `visited_${year}_${month}_${day}`;

        // すでに今日カウント済みなら何もしない
        if (localStorage.getItem(storageKey)) return;

        const namespace = 'turedure-physics';
        await Promise.all([
          fetch(`https://api.counterapi.dev/v1/${namespace}/${dayKey}/up`).catch(() => null),
          fetch(`https://api.counterapi.dev/v1/${namespace}/${monthKey}/up`).catch(() => null),
        ]);

        localStorage.setItem(storageKey, 'true');
      } catch {
        // エラー時は無視
      }
    };

    track();
  }, []);
}

// TOPページの右下に数字だけを表示するコンポーネント
export default function VisitorCounter() {
  const [counts, setCounts] = useState<{ today: number | null; month: number | null }>({
    today: null,
    month: null,
  });

  useEffect(() => {
    const getCounts = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const dayKey = `day_${year}_${month}_${day}`;
        const monthKey = `month_${year}_${month}`;
        const namespace = 'turedure-physics';

        const [dayRes, monthRes] = await Promise.all([
          fetch(`https://api.counterapi.dev/v1/${namespace}/${dayKey}`).catch(() => null),
          fetch(`https://api.counterapi.dev/v1/${namespace}/${monthKey}`).catch(() => null),
        ]);

        const dayData = dayRes && dayRes.ok ? await dayRes.json() : null;
        const monthData = monthRes && monthRes.ok ? await monthRes.json() : null;

        setCounts({
          today: dayData?.count ?? 1,
          month: monthData?.count ?? 1,
        });
      } catch {
        // エラー時は非表示
      }
    };

    getCounts();
  }, []);

  if (counts.today === null || counts.month === null) return null;

  return (
    <div
      className="text-right text-[11px] text-neutral-400 font-mono tracking-widest pt-6 select-none"
      title={`今日: ${counts.today} / 今月: ${counts.month}`}
    >
      <span>{counts.today}</span>
      <span className="mx-2 opacity-50">/</span>
      <span>{counts.month}</span>
    </div>
  );
}