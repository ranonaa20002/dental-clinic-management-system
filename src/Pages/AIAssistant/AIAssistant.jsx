import { useState } from "react";
import { Sparkles, Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, Image as ImageIcon } from "lucide-react";

export default function AIRadiologyAssistant() {
  const language = localStorage.getItem("language") || "ar";

  const t = {
    ar: {
      tag: "تحليل مدعوم بالذكاء الاصطناعي",
      title: "مساعد الأشعة والتشخيص الذكي",
      subTitle: "قم برفع صورة الأشعة لتوليد تقرير تشخيصي مبدئي بواسطة الذكاء الاصطناعي.",
      uploadTitle: "رفع صورة الأشعة",
      clickToChange: "انقر لتغيير الصورة",
      uploadPrompt: "اسحب وأفdrop صورة الأشعة هنا، أو انقر للاختيار",
      reportTitle: "تقرير تحليل الذكاء الاصطناعي",
      suggestedDiagnosis: "التشخيص المقترح",
      keyFindings: "الملاحظات الرئيسية:",
      finding1: "تسوس يصل إلى طبقة العاج (Dentin).",
      finding2: "لا توجد التهابات ظاهرة في قناة الجذر.",
      finding3: "يوصى بعمل علاج عشو أو حشو تجميلي بعد الفحص السريري.",
      recommendation: "التوصية: إزالة التسوس وعلاج الجذور أو الحشو المركب.",
      reset: "إعادة تعيين",
    },
    en: {
      tag: "AI POWERED ANALYSIS",
      title: "Dental AI Radiology Assistant",
      subTitle: "Upload an X-Ray image to generate a preliminary AI diagnostic report.",
      uploadTitle: "Upload X-Ray Image",
      clickToChange: "Click to change image",
      uploadPrompt: "Drag & drop X-ray image here, or click to browse",
      reportTitle: "AI Analysis Report",
      suggestedDiagnosis: "SUGGESTED DIAGNOSIS",
      keyFindings: "KEY FINDINGS:",
      finding1: "Caries reaching the Dentin layer.",
      finding2: "No visible inflammation in the Root Canal.",
      finding3: "Initial root canal or composite filling recommended upon clinical check.",
      recommendation: "Recommendation: Caries removal and Composite/Root Canal treatment.",
      reset: "Reset",
    },
  };

  const currentLang = t[language] || t.ar;
  const [image, setImage] = useState("https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80");
  const [analyzing, setAnalyzing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnalyzing(true);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      // محاكاة وقت التحليل
      setTimeout(() => {
        setAnalyzing(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col space-y-6 pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-md">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold mb-3 tracking-wide">
          <Sparkles size={14} />
          {currentLang.tag}
        </div>
        <h1 className="text-3xl font-extrabold mb-2">{currentLang.title}</h1>
        <p className="text-blue-100 text-sm md:text-base">{currentLang.subTitle}</p>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Upload & View X-Ray */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <FileText className="text-blue-600" size={20} />
              {currentLang.uploadTitle}
            </h2>

            <label className="relative border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 transition group overflow-hidden bg-gray-50/50 min-h-[320px]">
              {image ? (
                <div className="w-full flex flex-col items-center">
                  <img 
                    src={image} 
                    alt="X-Ray" 
                    className="max-h-[280px] w-full object-contain rounded-xl shadow-sm"
                  />
                  <span className="text-xs text-gray-500 mt-3 group-hover:text-blue-600 font-medium">
                    {currentLang.clickToChange}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Upload size={28} />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{currentLang.uploadPrompt}</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        {/* Right Card: AI Analysis Report */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Sparkles className="text-purple-600" size={20} />
              {currentLang.reportTitle}
            </h2>

            {analyzing ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-3">
                <RefreshCw className="animate-spin text-purple-600" size={32} />
                <p className="text-sm font-medium animate-pulse">جاري تحليل الأشعة بالذكاء الاصطناعي...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Suggested Diagnosis Box */}
                <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-600 tracking-wider block mb-1">
                      {currentLang.suggestedDiagnosis}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      {language === "ar" ? "تسوس حاد في الضرس السفلي الأيمن" : "Severe Caries in Lower Right Molar"}
                    </h3>
                  </div>
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-xs">
                    94.8%
                  </span>
                </div>

                {/* Key Findings */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 tracking-wider mb-3">
                    {currentLang.keyFindings}
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl text-sm text-gray-700 border border-gray-100">
                      <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                      <span>{currentLang.finding1}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl text-sm text-gray-700 border border-gray-100">
                      <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                      <span>{currentLang.finding2}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl text-sm text-gray-700 border border-gray-100">
                      <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                      <span>{currentLang.finding3}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendation Alert Box */}
                <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 text-blue-900 text-sm">
                  <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                  <span className="font-medium leading-relaxed">
                    {currentLang.recommendation}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}