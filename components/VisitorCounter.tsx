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

        const dayKey = `tp_day_${year}_${month}_${day}`;
        const monthKey = `tp_month_${year}_${month}`;
        const storageKey = `visited_${year}_${month}_${day}`;

        // 今日の訪問記録が既にあればスキップ
        if (localStorage.getItem(storageKey)) return;

        // 今日と今月のカウントをそれぞれ +1
        await Promise.all([
          fetch(`https://api.counterapi.dev/v1/turedurephysics/${dayKey}/up`, { mode: 'cors' }).catch(() => null),
          fetch(`https://api.counterapi.dev/v1/turedurephysics/${monthKey}/up`, { mode: 'cors' }).catch(() => null),
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
  const [counts, setCounts] = useState<{ today: number; month: number }>({
    today: 1,
    month: 1,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const dayKey = `tp_day_${year}_${month}_${day}`;
        const monthKey = `tp_month_${year}_${month}`;
        const storageKey = `visited_${year}_${month}_${day}`;
        const isVisited = localStorage.getItem(storageKey);

        const endpoint = isVisited ? '' : '/up';

        const [dayRes, monthRes] = await Promise.all([
          fetch(`https://api.counterapi.dev/v1/turedurephysics/${dayKey}${endpoint}`, { mode: 'cors' }).catch(() => null),
          fetch(`https://api.counterapi.dev/v1/turedurephysics/${monthKey}${endpoint}`, { mode: 'cors' }).catch(() => null),
        ]);

        let dVal = 1;
        let mVal = 1;

        if (dayRes && dayRes.ok) {
          const d = await dayRes.json();
          if (typeof d.count === 'number') dVal = d.count;
        }

        if (monthRes && monthRes.ok) {
          const m = await monthRes.json();
          if (typeof m.count === 'number') mVal = m.count;
        }

        if (!isVisited) {
          localStorage.setItem(storageKey, 'true');
        }

        setCounts({ today: dVal, month: mVal });
        setLoaded(true);
      } catch {
        setLoaded(true);
      }
    };

    getCounts();
  }, []);

  if (!loaded) return null;

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