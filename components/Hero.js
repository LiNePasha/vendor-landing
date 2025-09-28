"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const brands = [
    "اس واي ام",
    "بينيلي",
    "بجاج",
    "هوجان",
    "فيجوري",
    "دايون",
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-black to-gray-900 text-white px-6 py-20">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          افتح متجرك مجاناً 🚀  
          على أكبر ماركت بليس للموتوسيكلات والأسكوتر في مصر
        </h1>
        <p className="text-lg mb-8 opacity-90">
          سواء كنت <span className="font-bold text-red-400">ميكانيكي</span> أو{" "}
          <span className="font-bold text-red-400">تاجر</span> أو{" "}
          <span className="font-bold text-red-400">مستهلك</span> أو{" "}  
          <span className="font-bold text-red-400">حتي عاوز تشتغل فالمجال</span>...
          إحنا المنصة الوحيدة اللي هتفيد الكل 💯
          <br />
          أكبر قاعدة بيانات وقطع غيار موتوسيكلات واسكوتر في مصر 🇪🇬
        </p>
        <a href="#signup">
          <button className="px-8 py-4 bg-red-600 rounded-2xl text-xl font-bold hover:bg-red-700 shadow-lg transition">
            ابدأ دلوقتي مجاناً
          </button>
        </a>
      </motion.div>

      {/* Brands Grid */}
      <div className="relative z-10 mt-16 w-full max-w-6xl">
        <p className="text-gray-300 mb-6 text-lg">متاح لكل العلامات التجارية (قريبا اكتر...):</p>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-gray-900 rounded-xl shadow-md p-4 flex items-center justify-center gap-3 font-bold"
            >
              <p>{brand}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
