import { google } from "googleapis";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "vendor!B:B",
    });

    const existingPhones = existingData.data.values
      ? existingData.data.values.flat()
      : [];

    if (existingPhones.includes(phone)) {
      return new Response(
        JSON.stringify({ error: "❌ الرقم ده مسجل قبل كده." }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Check phone error:", error);
    return new Response(
      JSON.stringify({ error: "❌ فشل في التحقق من الرقم." }),
      { status: 500 }
    );
  }
}
