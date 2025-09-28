import { Wrench, ShieldCheck, Truck, Store } from "lucide-react";

const features = [
  { icon: Store, title: "متجر مجاني + لوحة تحكم", desc: "اعرض منتجاتك من غير أي مصاريف خلال فترة التجربة المجانية." },
  { icon: Wrench, title: "إدارة سهلة", desc: "ارفع منتجاتك وصورك في ثواني." },
  { icon: ShieldCheck, title: "مدفوعات آمنة", desc: "بنضمنلك معاملات محمية 100%." },
  { icon: Truck, title: "اوصل اسرع لعملائك", desc: "وفر المجهود والوقت ف انك تاخد البيانات والفلوس" },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-12">مميزات منصتنا</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <f.icon className="mx-auto mb-4 w-12 h-12 text-red-600" />
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
