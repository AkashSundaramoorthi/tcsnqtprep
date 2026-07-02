import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const accessKey = process.env.WEB3FORMS_KEY;

    if (!accessKey) {
      console.error("WEB3FORMS_KEY is missing in environment variables.");
      return NextResponse.json(
        { success: false, message: "Server misconfiguration. Please contact admin." },
        { status: 500 }
      );
    }

    const payload = {
      ...body,
      access_key: accessKey,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ success: true, message: "Feedback sent!" });
    } else {
      return NextResponse.json(
        { success: false, message: result.message || "Failed to submit form." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
