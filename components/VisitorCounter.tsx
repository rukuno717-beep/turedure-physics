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
        const storageKey = `visited_${year}_${month}_${day}`;

        // 今日の訪問記録がすでにあれば何もしない
        if (localStorage.getItem(storageKey)) return;

        // 自サイトのAPI経由で +1 を送信
        await fetch('/api/counter?action=up', { cache: 'no-store' });

        localStorage.setItem(storageKey, 'true');
      } catch {
        // エラー時は無視
      }
    };

    track();
  }, []);
}

// TOPページ右下に数字を表示するコンポーネント
export default function VisitorCounter() {
  const [counts, setCounts] = useState<{ today: number; month: number } | null>(null);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const storageKey = `visited_${year}_${month}_${day}`;
        const isVisited = localStorage.getItem(storageKey);

        // 未訪問なら +1 しながら取得、訪問済みなら取得のみ
        const url = isVisited ? '/api/counter' : '/api/counter?action=up';
        const res = await fetch(url, { cache: 'no-store' });

        if (res.ok) {
          const data = await res.json();
          setCounts({
            today: data.today,
            month: data.month,
          });
          if (!isVisited) {
            localStorage.setItem(storageKey, 'true');
          }
        }
      } catch {
        // エラー時はフォールバック表示
        setCounts({ today: 1, month: 1 });
      }
    };

    getCounts();
  }, []);

  if (!counts) return null;

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