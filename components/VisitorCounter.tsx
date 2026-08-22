'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [counts, setCounts] = useState<{ today: number | null; month: number | null }>({
    today: null,
    month: null,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const dayKey = `day_${year}_${month}_${day}`;
        const monthKey = `month_${year}_${month}`;

        // 今日の訪問記録があるか確認（同一ブラウザでの二重カウント防止）
        const storageKey = `visited_${year}_${month}_${day}`;
        const isAlreadyVisitedToday = localStorage.getItem(storageKey);

        const namespace = 'turedure-physics';
        const action = isAlreadyVisitedToday ? '' : '/up';

        // 今日のカウント取得（初回は +1、2回目以降は取得のみ）
        const dayUrl = isAlreadyVisitedToday
          ? `https://api.counterapi.dev/v1/${namespace}/${dayKey}`
          : `https://api.counterapi.dev/v1/${namespace}/${dayKey}/up`;

        // 今月のカウント取得
        const monthUrl = isAlreadyVisitedToday
          ? `https://api.counterapi.dev/v1/${namespace}/${monthKey}`
          : `https://api.counterapi.dev/v1/${namespace}/${monthKey}/up`;

        const [dayRes, monthRes] = await Promise.all([
          fetch(dayUrl).catch(() => null),
          fetch(monthUrl).catch(() => null),
        ]);

        const dayData = dayRes && dayRes.ok ? await dayRes.json() : null;
        const monthData = monthRes && monthRes.ok ? await monthRes.json() : null;

        setCounts({
          today: dayData?.count ?? 1,
          month: monthData?.count ?? 1,
        });

        // 本日カウント完了の目印を保存
        localStorage.setItem(storageKey, 'true');
      } catch {
        // エラー時は非表示
      }
    };

    fetchCounts();
  }, []);

  if (counts.today === null || counts.month === null) {
    return null;
  }

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