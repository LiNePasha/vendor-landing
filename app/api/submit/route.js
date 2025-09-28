import { google } from "googleapis";

export async function POST(req) {
  try {
    const { name, phone, social } = await req.json();

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

    // نضيف البيانات فقط
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "vendor!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [name, `'${phone}`, social || "", new Date().toLocaleString("en-EG")],
        ],
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: "✅ تم حفظ البيانات بنجاح!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Google Sheets append error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "❌ فشل في الحفظ." }),
      { status: 500 }
    );
  }
}
