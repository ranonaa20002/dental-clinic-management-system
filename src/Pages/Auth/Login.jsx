import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      setError("Please enter your email or username.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const loginResponse = await api.post("/auth/local", {
        identifier: formData.identifier.trim(),
        password: formData.password,
      });

      const token = loginResponse?.data?.jwt;

      if (!token) {
        throw new Error("Login token was not received.");
      }

      localStorage.setItem("token", token);

      const userResponse = await api.get("/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const user = userResponse?.data;

      if (!user) {
        throw new Error("Could not load user information.");
      }

      localStorage.setItem("user", JSON.stringify(user));

      const accountType = String(
        user?.AccountType || ""
      ).toLowerCase();

      localStorage.removeItem("patient");
      localStorage.removeItem("accountType");

      if (accountType === "doctor") {
        localStorage.setItem("accountType", "doctor");

        navigate("/dashboard");

        return;
      }

      if (accountType === "patient") {
        const patient = {
          id: user?.id ?? null,
          documentId: user?.documentId ?? null,
          username: user?.username ?? "",
          name:
            user?.name ||
            user?.fullName ||
            user?.username ||
            "Patient",
          email: user?.email || "",
          age: Number(user?.age ?? 0),
          AccountType: "patient",
          accountType: "patient",
        };

        localStorage.setItem(
          "patient",
          JSON.stringify(patient)
        );

        localStorage.setItem(
          "accountType",
          "patient"
        );

        navigate("/care");

        return;
      }

      setError("Unknown account type.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

    } catch (err) {
      console.error("Login error:", err);

      const message =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email/username or password.";

      setError(message);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("patient");
      localStorage.removeItem("accountType");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* BACKGROUND */}
      <div className="login-bg-glow login-bg-glow-one" />
      <div className="login-bg-glow login-bg-glow-two" />
      <div className="login-grid" />

      {/* LEFT */}
      <section className="login-left">

        <div className="login-brand">
          <div className="brand-icon">
            <ShieldCheck size={22} />
          </div>

          <span>DENTAL CLINIC</span>
        </div>

        <div className="login-content">

          <div className="secure-label">
            <span />
            SECURE ACCESS
          </div>

          <h1>
            Welcome
            <br />
            <strong>Back.</strong>
          </h1>

          <p className="login-description">
            Access your dental clinic management system
            <br />
            and continue your work securely.
          </p>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="input-group">

              <label>Email or Username</label>

              <div className="input-box">

                <Mail size={19} />

                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="username"
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>Password</label>

              <div className="input-box">

                <Lock size={19} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "SIGNING IN..."
                  : "SIGN IN"}
              </span>

              {!loading && (
                <ArrowRight size={20} />
              )}
            </button>

          </form>
        </div>

        <div className="login-footer">
          <span>© 2026 Dental Clinic</span>
          <span>•</span>
          <span>Secure Healthcare System</span>
        </div>

      </section>

      {/* RIGHT VISUAL */}
      <section className="login-visual">

        <div className="visual-light" />

        <div className="visual-title">

          <span className="visual-number">
            01
          </span>

          <div>
            <h2>
              DENTAL
              <br />
              <strong>CLINIC</strong>
            </h2>

            <p>
              MANAGEMENT SYSTEM
            </p>
          </div>

        </div>

        {/* DECORATION */}
        <div className="visual-line visual-line-one" />
        <div className="visual-line visual-line-two" />

        {/* TOOTH */}
        <div className="tooth-scene">

          <div className="tooth-glow-blue" />
          <div className="tooth-glow-purple" />

          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <span className="spark spark-one" />
          <span className="spark spark-two" />
          <span className="spark spark-three" />
          <span className="spark spark-four" />

          <svg
            className="big-tooth"
            viewBox="0 0 500 700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>

              <linearGradient
                id="toothGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                />

                <stop
                  offset="20%"
                  stopColor="#d9f5ff"
                />

                <stop
                  offset="45%"
                  stopColor="#9eb8ca"
                />

                <stop
                  offset="62%"
                  stopColor="#e1f5ff"
                />

                <stop
                  offset="85%"
                  stopColor="#ffffff"
                />

                <stop
                  offset="100%"
                  stopColor="#b9d9eb"
                />
              </linearGradient>

              <linearGradient
                id="toothInside"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                  stopOpacity=".8"
                />

                <stop
                  offset="50%"
                  stopColor="#91aec3"
                  stopOpacity=".5"
                />

                <stop
                  offset="100%"
                  stopColor="#496c87"
                  stopOpacity=".2"
                />
              </linearGradient>

              <filter id="blur">
                <feGaussianBlur
                  stdDeviation="7"
                />
              </filter>

            </defs>

            {/* MAIN TOOTH */}
            <path
              d="
                M108 245
                C91 218 78 181 84 143
                C91 94 125 55 174 47
                C204 42 229 54 250 76
                C271 54 296 42 326 47
                C375 55 409 94 416 143
                C422 181 409 218 392 245
                C376 270 365 291 363 320
                C361 351 369 382 360 411
                C352 437 335 452 320 470
                C304 490 301 523 299 557
                C296 602 286 645 264 679
                C258 689 248 689 243 678
                C226 645 217 603 214 558
                C212 523 209 491 193 470
                C178 452 161 437 153 411
                C144 382 152 351 150 320
                C148 291 137 270 108 245
                Z
              "
              fill="url(#toothGradient)"
              stroke="#f4ffff"
              strokeWidth="3"
            />

            {/* INNER */}
            <path
              d="
                M250 78
                C270 55 295 44 326 48
                C375 57 408 95 415 144
                C420 180 408 218 391 244
                C375 270 363 291 362 320
                C360 351 368 382 359 410
                C350 437 334 452 319 470
                C304 491 300 524 298 557
                C295 601 286 642 264 678
                C258 688 250 688 245 677
                C235 654 228 626 224 596
                C220 559 220 521 217 488
                C214 448 223 410 231 373
                C241 329 241 284 235 241
                C229 196 235 118 250 78
                Z
              "
              fill="url(#toothInside)"
              opacity=".55"
            />

            {/* CENTER */}
            <path
              d="
                M250 355
                C225 389 211 425 214 466
                C216 500 227 530 232 562
                C236 592 239 625 247 661
              "
              fill="none"
              stroke="#6e98b5"
              strokeWidth="8"
              opacity=".35"
            />

            <path
              d="
                M250 355
                C275 389 289 425 286 466
                C284 500 273 530 268 562
                C264 592 261 625 253 661
              "
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              opacity=".3"
            />

            {/* ANATOMICAL LINES */}
            <path
              d="
                M119 145
                C151 111 203 105 250 132
                C297 105 349 111 381 145
              "
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".28"
            />

            <path
              d="
                M111 190
                C150 159 201 163 250 191
                C299 163 350 159 389 190
              "
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity=".22"
            />

            {/* SHINE */}
            <path
              d="
                M143 88
                C111 120 105 171 119 209
                C128 235 143 250 149 280
              "
              fill="none"
              stroke="#ffffff"
              strokeWidth="18"
              strokeLinecap="round"
              opacity=".35"
              filter="url(#blur)"
            />

            <path
              d="
                M156 78
                C137 103 130 132 131 163
              "
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              opacity=".65"
            />

            {/* BLUE EDGE */}
            <path
              d="
                M101 142
                C88 183 101 222 124 251
              "
              fill="none"
              stroke="#36dcff"
              strokeWidth="9"
              strokeLinecap="round"
              opacity=".8"
              filter="url(#blur)"
            />

            {/* PURPLE EDGE */}
            <path
              d="
                M399 142
                C412 183 399 222 376 251
              "
              fill="none"
              stroke="#9a65ff"
              strokeWidth="9"
              strokeLinecap="round"
              opacity=".8"
              filter="url(#blur)"
            />

          </svg>
        </div>

        <div className="visual-caption">
          PRECISION
          <span>•</span>
          CARE
          <span>•</span>
          TECHNOLOGY
        </div>

      </section>
    </div>
  );
}

export default Login;