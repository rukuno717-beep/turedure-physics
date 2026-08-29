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

        const dayKey = `turedure_physics_day_${year}_${month}_${day}`;
        const monthKey = `turedure_physics_month_${year}_${month}`;
        const storageKey = `visited_${year}_${month}_${day}`;

        // 今日の訪問記録が既にあれば何もしない
        if (localStorage.getItem(storageKey)) return;

        // 今日と今月のカウントをそれぞれ確実に +1
        await Promise.all([
          fetch(`https://countapi.mileshilliard.com/api/v1/hit/${dayKey}`).catch(() => null),
          fetch(`https://countapi.mileshilliard.com/api/v1/hit/${monthKey}`).catch(() => null),
        ]);

        // 今日カウントした目印をブラウザに保存
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

        const dayKey = `turedure_physics_day_${year}_${month}_${day}`;
        const monthKey = `turedure_physics_month_${year}_${month}`;
        const storageKey = `visited_${year}_${month}_${day}`;
        const isVisited = localStorage.getItem(storageKey);

        // まだ今日カウントされていない場合は hit（+1）、カウント済みなら get（取得のみ）
        const action = isVisited ? 'get' : 'hit';

        const [dayRes, monthRes] = await Promise.all([
          fetch(`https://countapi.mileshilliard.com/api/v1/${action}/${dayKey}`).catch(() => null),
          fetch(`https://countapi.mileshilliard.com/api/v1/${action}/${monthKey}`).catch(() => null),
        ]);

        let dVal: number | null = null;
        let mVal: number | null = null;

        if (dayRes && dayRes.ok) {
          const d = await dayRes.json();
          dVal = Number(d.value) || null;
        }

        if (monthRes && monthRes.ok) {
          const m = await monthRes.json();
          mVal = Number(m.value) || null;
        }

        if (!isVisited && (dVal !== null || mVal !== null)) {
          localStorage.setItem(storageKey, 'true');
        }

        setCounts({
          today: dVal ?? 1,
          month: mVal ?? 1,
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