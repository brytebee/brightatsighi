import { NextResponse } from "next/server";
import { SCHEDULE, sendReminderEmail } from "@/lib/notifications/schedule";

// Hit by Vercel cron at 07:00 UTC = 8:00 AM WAT every day
export async function GET() {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const action = SCHEDULE.find((a) => a.date === todayStr);

    if (!action) {
      return NextResponse.json({ ok: true, message: "No action scheduled for today" });
    }

    await sendReminderEmail("action", action);
    return NextResponse.json({ ok: true, sent: "action", date: todayStr, action: action.title });
  } catch (err: any) {
    console.error("Morning cron error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
