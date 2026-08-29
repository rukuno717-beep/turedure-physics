import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isUp = searchParams.get('action') === 'up';

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const dayKey = `tp_${year}_${month}_${day}`;
  const monthKey = `tp_${year}_${month}`;

  try {
    // サーバーサイドから確実なKVストレージ（api.counterapi.dev）を叩く（CORS制限を受けない）
    const method = isUp ? 'up' : '';
    const [dayRes, monthRes] = await Promise.all([
      fetch(`https://api.counterapi.dev/v1/turedure_physics_main/${dayKey}${method ? '/' + method : ''}`, {
        cache: 'no-store',
      }),
      fetch(`https://api.counterapi.dev/v1/turedure_physics_main/${monthKey}${method ? '/' + method : ''}`, {
        cache: 'no-store',
      }),
    ]);

    const dayData = dayRes.ok ? await dayRes.json() : null;
    const monthData = monthRes.ok ? await monthRes.json() : null;

    return NextResponse.json({
      today: dayData?.count ?? 1,
      month: monthData?.count ?? 1,
    });
  } catch {
    return NextResponse.json({ today: 1, month: 1 });
  }
}