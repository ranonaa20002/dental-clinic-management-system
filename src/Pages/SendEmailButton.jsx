import { Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SendEmailButton({ patientName, patientEmail, appointmentDate, appointmentTime }) {
  const [loading, setLoading] = useState(false);

  const handleSendEmail = () => {
    setLoading(true);

    // تجهيز عنوان الرسالة ونصها تلقائياً باللغة العربية
    const subject = encodeURIComponent("تذكير بموعد زيارة عيادة الأسنان");
    const body = encodeURIComponent(
      `مرحباً ${patientName}،\n\nنود تذكيركم بموعدكم القادم في عيادة الأسنان:\n📅 التاريخ: ${appointmentDate}\n⏰ الوقت: ${appointmentTime}\n\nنتطلع لقاءكم.\nمع تحيات عيادة الأسنان.`
    );

    // فتح تطبيق الإيميل وتعبئة البيانات تلقائياً
    window.location.href = `mailto:${patientEmail}?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleSendEmail}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
    >
      <Mail size={16} />
      <span>إرسال إيميل بالموعد</span>
    </button>
  );
}