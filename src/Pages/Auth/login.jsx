import { useState } from "react";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Stethoscope,
  Sparkles,
  HeartPulse,
  CheckCircle2,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // =================================================
      // 1. LOGIN
      // =================================================

      const loginResponse = await api.post("/auth/local", {
        identifier: formData.identifier.trim(),
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", loginResponse.data);

      const token = loginResponse?.data?.jwt;

      if (!token) {
        throw new Error(
          "لم يتم الحصول على Token من السيرفر."
        );
      }

      // حفظ التوكن
      localStorage.setItem("token", token);

      console.log("LOGIN SUCCESS");

      // =================================================
      // 2. GET CURRENT USER
      // =================================================

      const userResponse = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userResponse?.data;

      if (!user) {
        throw new Error(
          "لم يتم العثور على بيانات المستخدم."
        );
      }

      // =================================================
      // DEBUG
      // =================================================

      console.log("========================================");
      console.log("USER JSON:");
      console.log(JSON.stringify(user, null, 2));

      console.log(
        "ACCOUNT TYPE:",
        user?.AccountType
      );

      console.log(
        "AGE:",
        user?.age
      );

      console.log("USER ID:", user?.id);
      console.log("USERNAME:", user?.username);
      console.log("EMAIL:", user?.email);

      console.log("========================================");

      // =================================================
      // 3. SAVE USER
      // =================================================

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // تنظيف بيانات قديمة
      localStorage.removeItem("patient");
      localStorage.removeItem("accountType");

      // =================================================
      // 4. GET ACCOUNT TYPE
      // =================================================

      const accountType = String(
        user?.AccountType || ""
      )
        .trim()
        .toLowerCase();

      console.log(
        "DETECTED ACCOUNT TYPE:",
        accountType
      );

      // =================================================
      // 5. DOCTOR
      // =================================================

      if (accountType === "doctor") {
        console.log("ACCOUNT TYPE: DOCTOR");

        localStorage.setItem(
          "accountType",
          "doctor"
        );

        navigate("/dashboard", {
          replace: true,
        });

        return;
      }

      // =================================================
      // 6. PATIENT
      // =================================================

      if (accountType === "patient") {
        console.log("ACCOUNT TYPE: PATIENT");

        const patient = {
          id: user?.id ?? null,

          documentId:
            user?.documentId ?? null,

          username:
            user?.username ?? "",

          name:
            user?.name ||
            user?.fullName ||
            user?.username ||
            "المريض",

          email:
            user?.email || "",

          age:
            Number(user?.age ?? 0),

          AccountType: "patient",

          accountType: "patient",
        };

        console.log(
          "PATIENT DATA:",
          patient
        );

        localStorage.setItem(
          "patient",
          JSON.stringify(patient)
        );

        localStorage.setItem(
          "accountType",
          "patient"
        );

        navigate("/care", {
          replace: true,
        });

        return;
      }

      // =================================================
      // 7. UNKNOWN ACCOUNT
      // =================================================

      console.error(
        "ACCOUNT TYPE NOT FOUND"
      );

      console.error(
        "FULL USER:",
        user
      );

      console.error(
        "AccountType:",
        user?.AccountType
      );

      setError(
        `نوع الحساب غير معروف. قيمة AccountType الحالية: ${
          user?.AccountType || "غير موجودة"
        }`
      );

      // إزالة التوكن لو الحساب غير صحيح
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("patient");
      localStorage.removeItem("accountType");

    } catch (err) {
      console.log("========================================");
      console.log("LOGIN ERROR:", err);
      console.log(
        "STATUS:",
        err?.response?.status
      );

      console.log(
        "SERVER DATA:",
        JSON.stringify(
          err?.response?.data,
          null,
          2
        )
      );

      console.log("========================================");

      const message =
        err?.response?.data?.error?.message ||
        err?.message ||
        "فشل تسجيل الدخول.";

      setError(message);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("patient");
      localStorage.removeItem("accountType");

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-[#f7fbfc]
        overflow-hidden
        relative
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          absolute
          -top-40
          -right-40
          w-[600px]
          h-[600px]
          rounded-full
          bg-sky-200/30
          blur-[100px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -left-40
          w-[600px]
          h-[600px]
          rounded-full
          bg-blue-200/20
          blur-[100px]
          pointer-events-none
        "
      />

      {/* MAIN */}

      <div
        className="
          relative
          z-10
          min-h-screen
          grid
          lg:grid-cols-2
        "
      >

        {/* =================================================
            DENTAL SIDE
        ================================================= */}

        <section
          className="
            relative
            min-h-[570px]
            lg:min-h-screen
            overflow-hidden
            flex
            flex-col
            justify-center
            px-7
            sm:px-12
            lg:px-14
            xl:px-24
            py-16
            bg-gradient-to-br
            from-[#0F4C81]
            via-[#1565C0]
            to-[#0EA5E9]
            text-white
          "
        >

          {/* CIRCLES */}

          <div
            className="
              absolute
              -top-32
              -right-32
              w-[420px]
              h-[420px]
              rounded-full
              border
              border-white/10
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              -bottom-44
              -left-44
              w-[500px]
              h-[500px]
              rounded-full
              border
              border-white/10
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              top-24
              left-20
              w-24
              h-24
              rounded-full
              bg-sky-300/10
              blur-2xl
              pointer-events-none
            "
          />

          {/* LOGO */}

          <div
            className="
              absolute
              top-8
              right-7
              sm:right-10
              lg:right-12
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-white/10
                border
                border-white/15
                backdrop-blur-md
                flex
                items-center
                justify-center
              "
            >
              <Stethoscope size={23} />
            </div>

            <div>
              <div className="font-black text-lg">
                DentalCare
              </div>

              <div
                className="
                  text-[10px]
                  text-white/50
                  tracking-widest
                "
              >
                SMART DENTAL CLINIC
              </div>
            </div>

          </div>

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              max-w-xl
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                text-xs
                font-bold
                text-blue-50
                mb-6
              "
            >
              <Sparkles size={15} />

              <span>
                مستقبل رعاية الأسنان
              </span>
            </div>

            <h1
              className="
                text-4xl
                sm:text-5xl
                xl:text-6xl
                font-black
                leading-[1.12]
                tracking-tight
              "
            >
              ابتسامتك...

              <br />

              <span className="text-blue-100">
                تستحق الأفضل.
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                sm:text-base
                leading-8
                text-white/65
              "
            >
              تجربة ذكية ومتكاملة لإدارة رعاية
              الأسنان، تجمع بين التكنولوجيا
              الحديثة والرعاية الطبية التي تستحقها.
            </p>

            {/* DENTAL VISUAL */}

            <div
              className="
                relative
                mt-7
                sm:mt-9
                h-[230px]
                sm:h-[275px]
                w-full
              "
            >

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-64
                  h-64
                  rounded-full
                  bg-sky-300/20
                  blur-[70px]
                "
              />

              <svg
                viewBox="0 0 600 260"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                "
                fill="none"
              >
                <path
                  d="M 85 65 Q 300 245 515 65"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                />

                <path
                  d="M 115 78 Q 300 220 485 78"
                  stroke="rgba(191,219,254,0.6)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              {/* TEETH */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  flex
                  items-end
                  justify-center
                  gap-1
                "
              >

                <div
                  className="
                    relative
                    w-10
                    sm:w-12
                    h-24
                    sm:h-28
                    rounded-t-[35px]
                    rounded-b-[18px]
                    bg-gradient-to-b
                    from-white
                    via-white
                    to-blue-50
                    border
                    border-white/60
                    shadow-[0_18px_35px_rgba(0,0,0,0.12)]
                    -rotate-12
                  "
                >
                  <div
                    className="
                      absolute
                      top-3
                      left-2
                      w-2
                      h-8
                      rounded-full
                      bg-white/80
                      blur-[1px]
                    "
                  />
                </div>

                <div
                  className="
                    relative
                    w-11
                    sm:w-13
                    h-28
                    sm:h-32
                    rounded-t-[38px]
                    rounded-b-[18px]
                    bg-gradient-to-b
                    from-white
                    via-white
                    to-blue-50
                    border
                    border-white/60
                    shadow-[0_18px_35px_rgba(0,0,0,0.12)]
                    -rotate-6
                  "
                >
                  <div
                    className="
                      absolute
                      top-3
                      left-2
                      w-2
                      h-9
                      rounded-full
                      bg-white/80
                    "
                  />
                </div>

                <div
                  className="
                    relative
                    w-12
                    sm:w-14
                    h-32
                    sm:h-36
                    rounded-t-[42px]
                    rounded-b-[20px]
                    bg-gradient-to-b
                    from-white
                    via-white
                    to-blue-50
                    border
                    border-white/70
                    shadow-[0_20px_45px_rgba(0,0,0,0.15)]
                    z-10
                  "
                >
                  <div
                    className="
                      absolute
                      top-3
                      left-3
                      w-2
                      h-10
                      rounded-full
                      bg-blue-50
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-3
                      left-1/2
                      -translate-x-1/2
                      w-5
                      h-1
                      rounded-full
                      bg-blue-100
                    "
                  />
                </div>

                <div
                  className="
                    relative
                    w-11
                    sm:w-13
                    h-28
                    sm:h-32
                    rounded-t-[38px]
                    rounded-b-[18px]
                    bg-gradient-to-b
                    from-white
                    via-white
                    to-blue-50
                    border
                    border-white/60
                    shadow-[0_18px_35px_rgba(0,0,0,0.12)]
                    rotate-6
                  "
                >
                  <div
                    className="
                      absolute
                      top-3
                      left-2
                      w-2
                      h-9
                      rounded-full
                      bg-white/80
                    "
                  />
                </div>

                <div
                  className="
                    relative
                    w-10
                    sm:w-12
                    h-24
                    sm:h-28
                    rounded-t-[35px]
                    rounded-b-[18px]
                    bg-gradient-to-b
                    from-white
                    via-white
                    to-blue-50
                    border
                    border-white/60
                    shadow-[0_18px_35px_rgba(0,0,0,0.12)]
                    rotate-12
                  "
                >
                  <div
                    className="
                      absolute
                      top-3
                      left-2
                      w-2
                      h-8
                      rounded-full
                      bg-white/80
                    "
                  />
                </div>

              </div>

              {/* HEART */}

              <div
                className="
                  absolute
                  top-3
                  right-[8%]
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  rotate-12
                  shadow-xl
                "
              >
                <HeartPulse size={20} />
              </div>

              {/* SHIELD */}

              <div
                className="
                  absolute
                  bottom-2
                  left-[8%]
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  -rotate-12
                  shadow-xl
                "
              >
                <ShieldCheck size={20} />
              </div>

            </div>

            {/* FEATURES */}

            <div
              className="
                flex
                flex-wrap
                gap-3
                mt-1
              "
            >

              {[
                "إدارة المرضى",
                "المواعيد",
                "رعاية متكاملة",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-xl
                    bg-white/10
                    border
                    border-white/10
                    text-xs
                    text-white/70
                  "
                >
                  <CheckCircle2
                    size={15}
                    className="text-blue-100"
                  />

                  {item}
                </div>
              ))}

            </div>

          </div>

          <div
            className="
              absolute
              bottom-6
              right-8
              lg:right-12
              text-[9px]
              text-white/25
              tracking-[0.3em]
            "
          >
            DENTAL • CARE • TECHNOLOGY
          </div>

        </section>

        {/* =================================================
            LOGIN SIDE
        ================================================= */}

        <section
          className="
            min-h-screen
            bg-[#f8fbfc]
            flex
            items-center
            justify-center
            px-6
            sm:px-10
            lg:px-14
            xl:px-24
            py-12
          "
        >

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}

            <div
              className="
                lg:hidden
                flex
                justify-center
                mb-8
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#1565C0]
                  to-[#0F4C81]
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-xl
                  shadow-blue-200
                "
              >
                <Stethoscope size={30} />
              </div>
            </div>

            {/* HEADER */}

            <div className="mb-8">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  bg-blue-50
                  border
                  border-blue-100
                  text-[#1565C0]
                  text-xs
                  font-bold
                  mb-5
                "
              >
                <Sparkles size={14} />
                مرحبًا بعودتك
              </div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-black
                  text-slate-900
                  tracking-tight
                "
              >
                تسجيل الدخول
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  text-slate-400
                  leading-7
                "
              >
                ادخل بيانات حسابك للوصول إلى
                لوحة التحكم الخاصة بك.
              </p>

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  mb-6
                  p-4
                  rounded-2xl
                  bg-red-50
                  border
                  border-red-100
                  text-red-600
                  text-sm
                  leading-6
                "
              >
                {error}
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label
                  className="
                    block
                    mb-2.5
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  البريد الإلكتروني
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      pointer-events-none
                    "
                  />

                  <input
                    type="email"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    autoComplete="email"
                    required
                    className="
                      w-full
                      h-14
                      pr-12
                      pl-4
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      text-slate-800
                      placeholder:text-slate-300
                      outline-none
                      transition-all
                      duration-200
                      focus:border-[#1565C0]
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-2.5
                  "
                >

                  <label
                    className="
                      text-sm
                      font-bold
                      text-slate-700
                    "
                  >
                    كلمة المرور
                  </label>

                  <button
                    type="button"
                    className="
                      text-xs
                      font-bold
                      text-[#1565C0]
                      hover:text-[#0F4C81]
                      transition
                    "
                  >
                    نسيت كلمة المرور؟
                  </button>

                </div>

                <div className="relative">

                  <Lock
                    size={19}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      pointer-events-none
                    "
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="
                      w-full
                      h-14
                      pr-12
                      pl-12
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      text-slate-800
                      placeholder:text-slate-300
                      outline-none
                      transition-all
                      duration-200
                      focus:border-[#1565C0]
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-[#1565C0]
                      transition
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* SECURITY */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-400
                  py-1
                "
              >
                <ShieldCheck
                  size={16}
                  className="text-emerald-500"
                />

                <span>
                  بياناتك محمية بتسجيل دخول آمن
                </span>
              </div>

              {/* LOGIN */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  relative
                  w-full
                  h-14
                  rounded-2xl
                  overflow-hidden
                  bg-gradient-to-r
                  from-[#0F4C81]
                  via-[#1565C0]
                  to-[#0EA5E9]
                  text-white
                  font-black
                  shadow-lg
                  shadow-blue-200/50
                  hover:shadow-xl
                  hover:shadow-blue-200/60
                  hover:-translate-y-0.5
                  active:translate-y-0
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition-all
                  duration-200
                "
              >

                <span
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform
                    duration-700
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  {loading ? (
                    <>
                      <span
                        className="
                          w-5
                          h-5
                          border-2
                          border-white/40
                          border-t-white
                          rounded-full
                          animate-spin
                        "
                      />

                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    <>
                      تسجيل الدخول

                      <ArrowLeft
                        size={19}
                        className="
                          transition-transform
                          group-hover:-translate-x-1
                        "
                      />
                    </>
                  )}

                </span>

              </button>

            </form>

            {/* FOOTER */}

            <div
              className="
                mt-8
                pt-6
                border-t
                border-slate-200/70
                text-center
              "
            >

              <p
                className="
                  text-xs
                  text-slate-400
                  leading-6
                "
              >
                باستخدامك للمنصة، أنت توافق على

                <span
                  className="
                    mx-1
                    text-[#1565C0]
                    font-bold
                  "
                >
                  سياسة الخصوصية
                </span>

                وشروط الاستخدام.
              </p>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}