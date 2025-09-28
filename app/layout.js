import "./globals.css";

export const metadata = {
  title: "انضم كبائع - ماركت بليس موتوسيكلات مصر",
  description: "افتح متجرك مجاناً واعرض منتجاتك على أكبر منصة للموتوسيكلات والاكسسوارات في مصر.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
