import { useState } from "react";
import { 
  Activity, 
  FileText, 
  Image as ImageIcon, 
  Package, 
  CheckCircle2, 
  Clock, 
  Upload, 
  UserCheck, 
  Plus
} from "lucide-react";

export default function DentalClinicalHub() {
  const language = localStorage.getItem("language") || "ar";
  const [activeTab, setActiveTab] = useState("chart");

  const [selectedTooth, setSelectedTooth] = useState(16);
  const [toothStatus, setToothStatus] = useState({
    16: { condition: language === "ar" ? "تسوس (علاج مطلوب)" : "Caries (Treatment Needed)", color: "bg-rose-500 text-white" },
    11: { condition: language === "ar" ? "حشو مكتمل" : "Completed Filling", color: "bg-blue-500 text-white" },
  });

  const handleToothClick = (toothNumber) => {
    setSelectedTooth(toothNumber);
  };

  const [treatmentPlans] = useState([
    {
      id: 1,
      patient: language === "ar" ? "أحمد محمد علي" : "Ahmed Mohamed Ali",
      procedure: language === "ar" ? "زراعة أسنان وتيجان" : "Dental Implants & Crowns",
      stages: [
        { name: language === "ar" ? "المرحلة الأولى: الخلع والتحضير" : "Stage 1: Extraction & Prep", cost: "$300", status: "completed" },
        { name: language === "ar" ? "المرحلة الثانية: غرس المزروع" : "Stage 2: Implant Placement", cost: "$800", status: "in-progress" },
        { name: language === "ar" ? "المرحلة الثالثة: تركيب التاج النهائي" : "Stage 3: Final Crown", cost: "$400", status: "pending" },
      ],
      totalCost: "$1,500",
      signed: true,
    }
  ]);

  const [labOrders] = useState([
    {
      id: 1,
      patient: language === "ar" ? "سارة خالد" : "Sara Khaled",
      item: language === "ar" ? "تاج سيراميك (Zirconia Crown)" : "Zirconia Crown",
      lab: language === "ar" ? "معمل النخبة للأسنان" : "Elite Dental Lab",
      status: "in-manufacturing",
      dueDate: "2026-07-25"
    },
    {
      id: 2,
      patient: language === "ar" ? "محمود حسن" : "Mahmoud Hassan",
      item: language === "ar" ? "طقم أسنان جزئي" : "Partial Denture",
      lab: language === "ar" ? "معمل الابتسامة" : "Smile Lab",
      status: "shipped",
      dueDate: "2026-07-22"
    }
  ]);

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            {language === "ar" ? "النظام الإكلينيكي المتقدم للأسنان" : "Advanced Dental Clinical System"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {language === "ar" ? "مخطط الأسنان، خطط العلاج، الأرشيف المرئي، وإدارة المعامل." : "Dental charts, treatment plans, radiology, and lab tracking."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "chart" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-200/50"}`}
          >
            {language === "ar" ? "🦷 مخطط الأسنان" : "🦷 Dental Chart"}
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "plans" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-200/50"}`}
          >
            {language === "ar" ? "📋 خطط العلاج" : "📋 Treatment Plans"}
          </button>
          <button
            onClick={() => setActiveTab("radiology")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "radiology" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-200/50"}`}
          >
            {language === "ar" ? "🩻 الأرشيف والأشعة" : "🩻 Radiology Archiving"}
          </button>
          <button
            onClick={() => setActiveTab("lab")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "lab" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-200/50"}`}
          >
            {language === "ar" ? "🧪 إدارة المعامل" : "🧪 Lab Tracking"}
          </button>
        </div>
      </div>

      {activeTab === "chart" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-800">
              {language === "ar" ? "رسم بياني للفك (أسنان البالغين 32 سنّة)" : "Jaw Diagram (Adult 32 Teeth)"}
            </h2>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{language === "ar" ? "الفك العلوي (Upper Arch)" : "Upper Arch"}</span>
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleToothClick(num)}
                    className={`w-10 h-12 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition border ${
                      selectedTooth === num ? "ring-2 ring-blue-600 scale-105" : ""
                    } ${toothStatus[num]?.color || "bg-white text-slate-700 border-slate-200 hover:bg-blue-50"}`}
                  >
                    <span>{num}</span>
                  </button>
                ))}
              </div>
              <div className="w-full h-[1px] bg-slate-200 my-2"></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{language === "ar" ? "الفك السفلي (Lower Arch)" : "Lower Arch"}</span>
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {[48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleToothClick(num)}
                    className={`w-10 h-12 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition border ${
                      selectedTooth === num ? "ring-2 ring-blue-600 scale-105" : ""
                    } ${toothStatus[num]?.color || "bg-white text-slate-700 border-slate-200 hover:bg-blue-50"}`}
                  >
                    <span>{num}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-2">
                {language === "ar" ? `تفاصيل السن رقم: #${selectedTooth}` : `Tooth Details: #${selectedTooth}`}
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setToothStatus({...toothStatus, [selectedTooth]: { condition: language === "ar" ? "تسوس (علاج مطلوب)" : "Caries", color: "bg-rose-500 text-white" }})}
                  className="w-full text-start p-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold border border-rose-100 hover:bg-rose-100 transition"
                >
                  🔴 {language === "ar" ? "تسجيل مكان تسوس (أحمر)" : "Mark Decay (Red)"}
                </button>
                <button 
                  onClick={() => setToothStatus({...toothStatus, [selectedTooth]: { condition: language === "ar" ? "حشو مكتمل (أزرق)" : "Completed Filling", color: "bg-blue-500 text-white" }})}
                  className="w-full text-start p-3 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100 hover:bg-blue-100 transition"
                >
                  🔵 {language === "ar" ? "تسجيل حشو مكتمل (أزرق)" : "Mark Completed Filling (Blue)"}
                </button>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs font-bold text-slate-400 block mb-1">{language === "ar" ? "الحالة الحالية للسن:" : "Current Status:"}</span>
              <span className="text-sm font-bold text-slate-800">
                {toothStatus[selectedTooth]?.condition || (language === "ar" ? "سليم تماماً" : "Healthy")}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "plans" && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">{language === "ar" ? "خطط العلاج والمراحل" : "Treatment Plans & Stages"}</h2>
          <div className="space-y-4">
            {treatmentPlans.map((plan) => (
              <div key={plan.id} className="border border-slate-200/80 rounded-2xl p-5 space-y-4 bg-slate-50/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{plan.patient}</h3>
                    <span className="text-xs text-blue-600 font-semibold">{plan.procedure}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-100">
                      💰 {language === "ar" ? "التكلفة الإجمالية: " : "Total: "} {plan.totalCost}
                    </span>
                    {plan.signed && (
                      <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl flex items-center gap-1 border border-blue-100">
                        <UserCheck size={14} />
                        {language === "ar" ? "معتمد وموقع من المريض" : "Signed by Patient"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "radiology" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ImageIcon className="text-blue-600" size={20} />
              {language === "ar" ? "مستودع الأشعة (X-Ray, Panorama, CBCT)" : "Radiology Repository"}
            </h2>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
              <Upload className="text-blue-600 mb-2" size={28} />
              <p className="text-xs font-bold text-slate-700">{language === "ar" ? "اسحب وأفلت ملف الأشعة هنا أو انقر للرفع" : "Drag & drop X-ray file here"}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "lab" && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <h2 className="text-lg font-bold text-slate-800">{language === "ar" ? "أوامر ومتابعة المعامل" : "Lab Orders Tracking"}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400">
                  <th className="pb-3 text-start">{language === "ar" ? "المريض" : "Patient"}</th>
                  <th className="pb-3 text-start">{language === "ar" ? "الصنف المطلُوب" : "Item"}</th>
                  <th className="pb-3 text-start">{language === "ar" ? "المعمل" : "Lab"}</th>
                  <th className="pb-3 text-start">{language === "ar" ? "تاريخ الاستحقاق" : "Due Date"}</th>
                  <th className="pb-3 text-start">{language === "ar" ? "حالة التوصيل" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {labOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 font-bold text-slate-800">{order.patient}</td>
                    <td className="py-4 text-slate-600">{order.item}</td>
                    <td className="py-4 text-slate-500 font-medium">{order.lab}</td>
                    <td className="py-4 text-blue-600 font-semibold">📅 {order.dueDate}</td>
                    <td className="py-4">
                      {order.status === "in-manufacturing" && (
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-xl text-xs font-bold inline-flex items-center gap-1">
                          <Clock size={12} /> {language === "ar" ? "تحت التصنيع" : "In Manufacturing"}
                        </span>
                      )}
                      {order.status === "shipped" && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold inline-flex items-center gap-1">
                          <Package size={12} /> {language === "ar" ? "تم الشحن" : "Shipped"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}