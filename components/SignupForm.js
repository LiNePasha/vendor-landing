"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [checking, setChecking] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!phone) {
      setPhoneError("");
      return;
    }

    // تحقق سريع: أرقام فقط
    if (!/^\d*$/.test(phone)) {
      setPhoneError("❌ الرقم يجب أن يحتوي على أرقام فقط");
      return; // مش هنعمل fetch لو فيه حرف
    }

    // تحقق رقم مصري
    if (!/^01[0125]\d{8}$/.test(phone)) {
      setPhoneError("❌ الرقم يجب أن يكون رقم مصري صالح مثل 01012345678");
      return; // مش هنعمل fetch لو الرقم مش مصري
    }

    setPhoneError(""); // الرقم صح

    setChecking(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch("/api/check-phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        const result = await res.json();

        if (!res.ok) {
          setPhoneError(result.error || "❌ حصل خطأ، حاول تاني.");
        } else {
          setPhoneError("");
        }
      } catch (err) {
        console.error("Error checking phone:", err);
        setPhoneError("❌ فشل في التحقق من الرقم.");
      } finally {
        setChecking(false);
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      social: formData.get("social"),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setLoading(false);

      if (res.ok && result.success) {
        setMessage(result.message);
        e.target.reset();
        setPhone("");
        setShowPopup(true);
      } else {
        setMessage(result.error || "❌ حصل خطأ، حاول تاني.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("⚠️ في مشكلة في الاتصال بالسيرفر.");
      setLoading(false);
    }
  };

  return (
    <section id="signup" className="relative py-20 flex flex-col items-center justify-center text-center bg-gradient-to-r from-black to-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">📋 سجل متجرك</h2>

        <input
          type="text"
          name="name"
          placeholder="الاسم"
          required
          className="w-full p-3 mb-3 border rounded-lg"
        />

        <div className="mb-3 relative">
          <input
            type="tel"
            name="phone"
            dir="rtl"
            placeholder="رقم التليفون"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-3 border rounded-lg ${
              phoneError ? "border-red-500" : ""
            }`}
          />
          {checking && (
            <span className="absolute top-3 left-3 text-sm text-gray-500 animate-pulse">
              ...جاري التحقق
            </span>
          )}
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>

        <input
          type="text"
          name="social"
          placeholder="لينك السوشيال ميديا (اختياري)"
          className="w-full p-3 mb-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading || phoneError || checking}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "جاري الإرسال..." : "سجل دلوقتي"}
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>

      {/* Popup مع Overlay وFramer Motion */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Overlay مع Blur */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Popup */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-white p-6 rounded-2xl max-w-lg w-full relative shadow-xl">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
                >
                  ✕
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">
                  شكراً لتسجيلك معنا! 🎉
                </h2>
                <span className="text-center mb-4">
                  سيتم التواصل معك قريباً.
                </span>

                {/* فيديو يوتيوب تلقائي التشغيل */}
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/0pgGYCKvNlc?si=ffJY0xU4Hg3xu9od"
                    title="فيديو تعريفي"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
