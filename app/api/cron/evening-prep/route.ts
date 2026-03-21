import { NextResponse } from "next/server";
import { SCHEDULE, sendReminderEmail } from "@/lib/notifications/schedule";

// Hit by Vercel cron at 19:30 UTC = 8:30 PM WAT every day
export async function GET() {
  try {
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const action = SCHEDULE.find((a) => a.date === tomorrowStr);

    if (!action) {
      return NextResponse.json({ ok: true, message: "No action scheduled for tomorrow" });
    }

    await sendReminderEmail("prep", action);
    return NextResponse.json({ ok: true, sent: "prep", date: tomorrowStr, action: action.title });
  } catch (err: any) {
    console.error("Evening cron error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
