import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  Lock,
  HeartPulse,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
export default function Register() {
  const navigate = useNavigate();

 

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
      .required("الاسم مطلوب"),

    age: Yup.number()
      .typeError("السن يجب أن يكون رقمًا")
      .integer("السن يجب أن يكون رقمًا صحيحًا")
      .min(1, "السن غير صحيح")
      .max(120, "السن غير صحيح")
      .required("السن مطلوب"),

    emailAddress: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });



  const formik = useFormik({
    initialValues: {
      fullName: "",
      age: "",
      emailAddress: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
     
        const res = await api.post("/auth/local/register", {
          username: values.fullName.trim(),
          email: values.emailAddress.trim(),
          password: values.password,
        });

        console.log("REGISTER RESPONSE:", res.data);

        const user = res.data.user;
        const token = res.data.jwt;

     

        if (token) {
          localStorage.setItem("token", token);
        }

     

        const patient = {
          id: user?.id,
          name: values.fullName.trim(),
          username: user?.username || values.fullName.trim(),
          email: user?.email || values.emailAddress.trim(),

      
          age: Number(values.age),
        };

       

        localStorage.setItem(
          "patient",
          JSON.stringify(patient)
        );

      

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        console.log("PATIENT SAVED:", patient);

       

        await Swal.fire({
          icon: "success",
          title: "تم التسجيل بنجاح 🎉",
          text:
            Number(values.age) < 18
              ? "أهلاً بك يا بطل الأسنان 🦷✨"
              : "أهلاً بك في عيادة الأسنان 🦷",
          confirmButtonText: "دخول",
          confirmButtonColor: "#0ea5e9",
        });

        resetForm();

      

        navigate("/care", {
          replace: true,
        });

      } catch (err) {
        console.log("REGISTER ERROR:", err);
        console.log(
          "STATUS:",
          err.response?.status
        );

        console.log(
          "STRAPI MESSAGE:",
          err.response?.data?.error?.message
        );

        console.log(
          "FULL STRAPI ERROR:",
          JSON.stringify(
            err.response?.data,
            null,
            2
          )
        );

        Swal.fire({
          icon: "error",
          title: "فشل التسجيل",
          text:
            err.response?.data?.error?.message ||
            "حدث خطأ أثناء التسجيل",
          confirmButtonText: "حاول مرة أخرى",
          confirmButtonColor: "#ef4444",
        });
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center p-4">

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
      >


        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-blue-600 to-pink-500" />

   

        <div className="text-center mb-7 mt-2">

          <div className="text-5xl mb-3">
            🦷
          </div>

          <h2 className="text-2xl font-bold text-gray-900">

            عيادة

            <span className="text-sky-600">
              {" "}الابتسامة{" "}
            </span>

            <span className="text-pink-500">
              لأسنانك
            </span>

          </h2>

          <p className="text-gray-400 text-sm mt-2">
            سجل بياناتك لحجز موعدك بسهولة
          </p>

        </div>

        <div className="space-y-4">



          <div>

            <div className="relative">

              <User
                className="absolute left-3 top-3.5 text-sky-500"
                size={20}
              />

              <input
                type="text"
                name="fullName"
                placeholder="الاسم الكامل"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
              />

            </div>

            {formik.touched.fullName &&
              formik.errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.fullName}
                </p>
              )}

          </div>


         

          <div>

            <div className="relative">

              <Calendar
                className="absolute left-3 top-3.5 text-sky-500"
                size={20}
              />

              <input
                type="number"
                name="age"
                placeholder="السن"
                min="1"
                max="120"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
              />

            </div>

            {formik.touched.age &&
              formik.errors.age && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.age}
                </p>
              )}

          </div>


  

          <div>

            <div className="relative">

              <Mail
                className="absolute left-3 top-3.5 text-sky-500"
                size={20}
              />

              <input
                type="email"
                name="emailAddress"
                placeholder="البريد الإلكتروني"
                value={formik.values.emailAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
              />

            </div>

            {formik.touched.emailAddress &&
              formik.errors.emailAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.emailAddress}
                </p>
              )}

          </div>



          <div>

            <div className="relative">

              <Lock
                className="absolute left-3 top-3.5 text-sky-500"
                size={20}
              />

              <input
                type="password"
                name="password"
                placeholder="كلمة المرور"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition"
              />

            </div>

            {formik.touched.password &&
              formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}

          </div>

        </div>


      

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full mt-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-pink-500 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >

          <HeartPulse size={20} />

          {formik.isSubmitting
            ? "جاري التسجيل..."
            : "تأكيد التسجيل في العيادة"}

        </button>

      </form>

    </div>
  );
}