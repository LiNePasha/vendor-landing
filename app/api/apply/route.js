import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, social } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name & Phone required" }, { status: 400 });
    }

    // هنا هنتعامل مع البيانات: DB, Google Sheet, Email...
    console.log("📥 New Application:", { name, phone, social });

    return NextResponse.json({ success: true, message: "Data received" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
