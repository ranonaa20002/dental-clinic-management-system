import { useState } from "react";
import api from "../../services/Api";

export default function JoinDoctor() {
  const [doctorId, setDoctorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleJoinRequest = async () => {
    setMessage("");
    setMessageType("");

    // =========================
    // CHECK TOKEN
    // =========================

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("من فضلك سجل الدخول أولاً.");
      setMessageType("error");
      return;
    }

    // =========================
    // CHECK DOCTOR ID
    // =========================

    if (!doctorId.trim()) {
      setMessage("من فضلك اكتب ID الدكتور.");
      setMessageType("error");
      return;
    }

    const doctorIdNumber = Number(doctorId);

    if (
      !Number.isInteger(doctorIdNumber) ||
      doctorIdNumber <= 0
    ) {
      setMessage("ID الدكتور غير صحيح.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // GET CURRENT USER
      // =========================

      const meResponse = await api.get("/users/me");

      const patient = meResponse?.data;

      console.log("================================");
      console.log("CURRENT USER:", patient);
      console.log("PATIENT ID:", patient?.id);
      console.log("DOCTOR ID:", doctorIdNumber);
      console.log("ACCOUNT TYPE:", patient?.AccountType);
      console.log("================================");

      if (!patient?.id) {
        setMessage(
          "لم يتم العثور على بيانات المستخدم."
        );
        setMessageType("error");
        return;
      }

      // =========================
      // PREVENT SAME USER
      // =========================

      if (Number(patient.id) === doctorIdNumber) {
        setMessage(
          "لا يمكن إرسال طلب لنفس حسابك."
        );
        setMessageType("error");
        return;
      }

      // =========================
      // CREATE JOIN REQUEST
      // =========================

      const response = await api.post(
        "/join-requests",
        {
          data: {
            patient: patient.id,
            doctor: doctorIdNumber,
            status: "pending",
          },
        }
      );

      console.log(
        "================================"
      );

      console.log(
        "JOIN REQUEST CREATED:",
        response.data
      );

      console.log(
        "================================"
      );

      setMessage(
        "تم إرسال طلب الانضمام للطبيب بنجاح."
      );

      setMessageType("success");

      setDoctorId("");

    } catch (error) {
      console.error(
        "================================"
      );

      console.error(
        "JOIN REQUEST ERROR:",
        error
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "SERVER ERROR:",
        JSON.stringify(
          error?.response?.data,
          null,
          2
        )
      );

      console.error(
        "================================"
      );

      const status =
        error?.response?.status;

      const serverMessage =
        error?.response?.data?.error?.message;

      // =========================
      // 401
      // =========================

      if (status === 401) {
        setMessage(
          "جلسة الدخول انتهت. سجل الدخول مرة أخرى."
        );

        setMessageType("error");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("patient");

        return;
      }

      // =========================
      // 403
      // =========================

      if (status === 403) {
        setMessage(
          "ليس لديك صلاحية إنشاء طلب انضمام. فعّلي Create في صلاحيات Authenticated داخل Strapi."
        );

        setMessageType("error");

        return;
      }

      // =========================
      // 400
      // =========================

      if (status === 400) {
        setMessage(
          serverMessage ||
            "بيانات طلب الانضمام غير صحيحة. تأكدي من أسماء الحقول في Strapi."
        );

        setMessageType("error");

        return;
      }

      // =========================
      // OTHER
      // =========================

      setMessage(
        serverMessage ||
          "حدث خطأ أثناء إرسال الطلب."
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="max-w-md mx-auto p-6"
    >
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-6
          space-y-5
        "
      >

        {/* TITLE */}

        <div>
          <h2
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            الانضمام إلى عيادة
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-400
            "
          >
            أدخل ID الدكتور لإرسال طلب انضمام.
          </p>
        </div>

        {/* DOCTOR ID */}

        <div>
          <label
            className="
              block
              mb-2
              text-sm
              font-bold
              text-slate-700
            "
          >
            ID الدكتور
          </label>

          <input
            type="number"
            min="1"
            value={doctorId}
            onChange={(e) => {
              setDoctorId(e.target.value);
              setMessage("");
              setMessageType("");
            }}
            placeholder="مثال: 14"
            className="
              w-full
              h-14
              px-4
              rounded-2xl
              border
              border-slate-200
              bg-white
              text-slate-800
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* BUTTON */}

        <button
          type="button"
          onClick={handleJoinRequest}
          disabled={loading}
          className="
            w-full
            h-14
            rounded-2xl
            bg-[#0F4C81]
            hover:bg-[#1565C0]
            text-white
            font-black
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? "جاري إرسال الطلب..."
            : "طلب الانضمام"}
        </button>

        {/* MESSAGE */}

        {message && (
          <div
            className={`
              p-4
              rounded-2xl
              text-sm
              font-bold
              ${
                messageType === "success"
                  ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
                  : "bg-red-50 border border-red-100 text-red-600"
              }
            `}
          >
            {message}
          </div>
        )}

      </div>
    </div>
  );
}