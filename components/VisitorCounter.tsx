'use client';

import { useEffect, useState } from 'react';

// 全ページ共通で1日1回カウントアップを実行するフック
export function useVisitorTracker() {
  useEffect(() => {
    const track = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const dayKey = `turedure_day_${year}_${month}_${day}`;
        const monthKey = `turedure_month_${year}_${month}`;
        const storageKey = `visited_${year}_${month}_${day}`;

        // 今日の訪問記録が既にあればスキップ
        if (localStorage.getItem(storageKey)) return;

        // 今日と今月のカウントをそれぞれ +1
        await Promise.all([
          fetch(`https://api.counterapi.dev/v1/turedure-physics/${dayKey}/up`).catch(() => null),
          fetch(`https://api.counterapi.dev/v1/turedure-physics/${monthKey}/up`).catch(() => null),
        ]);

        // 今日アクセスしたフラグを保存
        localStorage.setItem(storageKey, 'true');
      } catch {
        // エラー時は無視
      }
    };

    track();
  }, []);
}

// TOPページ右下に「今日 / 今月」の数字を表示するコンポーネント
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

        const dayKey = `turedure_day_${year}_${month}_${day}`;
        const monthKey = `turedure_month_${year}_${month}`;
        const storageKey = `visited_${year}_${month}_${day}`;
        const isVisited = localStorage.getItem(storageKey);

        let dayCount: number | null = null;
        let monthCount: number | null = null;

        // まだ今日のカウントが送信されていない場合はカウントアップしつつ取得、送信済みなら取得のみ
        const endpoint = isVisited ? '' : '/up';

        const [dayRes, monthRes] = await Promise.all([
          fetch(`https://api.counterapi.dev/v1/turedure-physics/${dayKey}${endpoint}`).catch(() => null),
          fetch(`https://api.counterapi.dev/v1/turedure-physics/${monthKey}${endpoint}`).catch(() => null),
        ]);

        if (dayRes && dayRes.ok) {
          const d = await dayRes.json();
          dayCount = typeof d.count === 'number' ? d.count : null;
        }

        if (monthRes && monthRes.ok) {
          const m = await monthRes.json();
          monthCount = typeof m.count === 'number' ? m.count : null;
        }

        if (!isVisited && (dayCount !== null || monthCount !== null)) {
          localStorage.setItem(storageKey, 'true');
        }

        setCounts({
          today: dayCount,
          month: monthCount,
        });
      } catch {
        // エラー時は非表示
      }
    };

    getCounts();
  }, []);

  // カウントが取得できていない間は何も表示しない
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