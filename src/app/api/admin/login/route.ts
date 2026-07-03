import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { secret } = await req.json();
    if (!process.env.ADMIN_DASHBOARD_SECRET) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    if (secret !== process.env.ADMIN_DASHBOARD_SECRET) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const token = crypto.createHmac('sha256', process.env.ADMIN_DASHBOARD_SECRET).update(process.env.ADMIN_DASHBOARD_SECRET).digest('hex');

    const res = NextResponse.json({ ok: true });
    // set httpOnly cookie for /admin path
    res.cookies.set('admin-auth', token, {
      httpOnly: true,
      path: '/admin',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
