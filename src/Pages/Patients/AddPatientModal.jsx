import { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Stethoscope,
  Save,
  UserPlus,
  Activity,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  ClipboardPlus,
  X,
  CheckCircle2,
  Users,
  Shield,
} from "lucide-react";

export default function AddPatientModal({
  onAdd,
  editingPatient,
  onClose,
}) {
  const initialState = {
    name: "",
    age: "",
    phone: "",
    address: "",
    gender: "",
    medicalHistory: "",
    doctorNotes: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [saved, setSaved] = useState(false);

  /* ============================================================
     LOAD EDIT DATA
  ============================================================ */

  useEffect(() => {
    if (editingPatient) {
      setFormData({
        name: editingPatient.name || "",
        age: editingPatient.age || "",
        phone: editingPatient.phone || "",
        address: editingPatient.address || "",
        gender: editingPatient.gender || "",
        medicalHistory: editingPatient.medicalHistory || "",
        doctorNotes: editingPatient.doctorNotes || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingPatient]);

  /* ============================================================
     CHANGE
  ============================================================ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ============================================================
     SUBMIT
  ============================================================ */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Patient name and phone are required.");
      return;
    }

    const patient = editingPatient
      ? {
          ...editingPatient,
          ...formData,
        }
      : {
          id: Date.now(),
          patientCode: `PAT-${Date.now()}`,
          ...formData,
          visits: [],
          appointments: [],
          payments: [],
          prescriptions: [],
          xrays: [],
        };

    if (onAdd) {
      onAdd(patient);
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      setFormData(initialState);

      if (onClose) {
        onClose();
      }
    }, 900);
  };

  /* ============================================================
     CLEAR
  ============================================================ */

  const handleClear = () => {
    setFormData(initialState);
  };

  return (
    <div className="patient-page">

      {/* ======================================================
          MEDICAL BACKGROUND
      ====================================================== */}

      <div className="medical-background">

        {/* Medical Image */}

        <div className="medical-image" />

        {/* Dark Overlay */}

        <div className="medical-overlay" />

        {/* Cyan Light */}

        <div className="medical-blue-glow" />

        {/* IMPORTANT:
            renamed from medical-grid
            to prevent CSS conflict
        */}

        <div className="medical-grid-overlay" />

        {/* Background Content */}

        <div className="background-content">

          <div className="background-title">
            <span>SMART DENTAL</span>
            <strong>CLINIC SYSTEM</strong>
          </div>

          <div className="background-description">
            One System.
            <br />
            Multiple Roles.
            <br />
            <span>Better Workflow.</span>
          </div>

          <div className="role-cards">

            <RoleCard
              icon={<Users size={16} />}
              title="ADMIN"
              text="Manage users, patients and system settings"
              type="admin"
            />

            <RoleCard
              icon={<Stethoscope size={16} />}
              title="DOCTOR"
              text="Medical records, diagnosis and treatment"
              type="doctor"
            />

            <RoleCard
              icon={<Calendar size={16} />}
              title="RECEPTION"
              text="Appointments and patient registration"
              type="reception"
            />

            <RoleCard
              icon={<User size={16} />}
              title="PATIENT"
              text="View appointments and medical records"
              type="patient"
            />

          </div>
        </div>
      </div>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="page-content">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="top-header">

          <div className="header-left">

            <div className="main-icon">

              <div className="icon-ring" />

              {editingPatient ? (
                <User size={27} />
              ) : (
                <UserPlus size={27} />
              )}

              <span className="status-dot" />

            </div>

            <div>

              <div className="eyebrow">

                <span>PATIENT MANAGEMENT</span>

                <i />

                <b>SECURE</b>

              </div>

              <h1>
                {editingPatient
                  ? "Edit Patient"
                  : "Add New Patient"}
              </h1>

              <p>
                {editingPatient
                  ? "Update patient information and medical profile."
                  : "Create a complete and secure patient profile."}
              </p>

            </div>

          </div>

          <div className="security-box">

            <ShieldCheck size={17} />

            <div>
              <small>DATA SECURITY</small>
              <strong>Protected</strong>
            </div>

          </div>

        </div>

        {/* ====================================================
            MAIN CARD
        ==================================================== */}

        <div className="main-card">

          <div className="card-top-line" />

          <div className="card-glow" />

          {/* CARD HEADER */}

          <div className="card-header">

            <div className="card-header-left">

              <div className="card-icon">
                <ClipboardPlus size={19} />
              </div>

              <div>

                <h2>Patient Information</h2>

                <p>
                  Personal details and contact information
                </p>

              </div>

            </div>

            <div className="profile-status">

              <span />

              PROFILE

            </div>

          </div>

          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="patient-form"
          >

            {/* PERSONAL INFORMATION */}

            <SectionTitle
              icon={<User size={17} />}
              title="Personal Information"
              subtitle="Basic patient information"
            />

            <div className="fields-grid">

              <InputField
                icon={<User size={16} />}
                label="Patient Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
              />

              <InputField
                icon={<Calendar size={16} />}
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
              />

              <InputField
                icon={<Phone size={16} />}
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                required
              />

              <SelectField
                icon={<User size={16} />}
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />

              <div className="full-field">

                <InputField
                  icon={<MapPin size={16} />}
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter patient address"
                />

              </div>

            </div>

            {/* DIVIDER */}

            <div className="section-divider">
              <span />
            </div>

            {/* MEDICAL INFORMATION */}

            <SectionTitle
              icon={<Stethoscope size={17} />}
              title="Medical Information"
              subtitle="Medical history and clinical notes"
              green
            />

            {/* IMPORTANT:
                renamed from medical-grid
                to medical-fields-grid
            */}

            <div className="medical-fields-grid">

              <TextAreaField
                icon={<HeartPulse size={16} />}
                label="Medical History"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Blood pressure, diabetes, allergies, previous treatments..."
              />

              <TextAreaField
                icon={<FileText size={16} />}
                label="Doctor Notes"
                name="doctorNotes"
                value={formData.doctorNotes}
                onChange={handleChange}
                placeholder="Write doctor's notes and clinical observations..."
              />

            </div>

            {/* SECURITY INFO */}

            <div className="security-info">

              <div className="info-icon">
                <Activity size={16} />
              </div>

              <div>

                <strong>
                  Patient profile security
                </strong>

                <p>
                  Patient information is stored as part of
                  the clinic's secure medical record system.
                </p>

              </div>

              <Shield
                size={16}
                className="info-shield"
              />

            </div>

            {/* BUTTONS */}

            <div className="form-footer">

              <div className="smart-label">

                <Sparkles size={14} />

                <span>
                  Smart Dental System
                </span>

              </div>

              <div className="buttons">

                <button
                  type="button"
                  onClick={handleClear}
                  className="clear-btn"
                >
                  Clear
                </button>

                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="cancel-btn"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  disabled={saved}
                  className="save-btn"
                >

                  <span className="button-shine" />

                  {saved ? (
                    <>
                      <CheckCircle2 size={15} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      {editingPatient
                        ? "Update Patient"
                        : "Save Patient"}
                    </>
                  )}

                </button>

              </div>

            </div>

          </form>
        </div>

        {/* FOOTER */}

        <div className="page-footer">

          <span />

          DENTAL CLINIC • PATIENT MANAGEMENT SYSTEM

          <span />

        </div>

      </div>

      {/* ======================================================
          CSS
      ====================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          min-height: 100%;
          margin: 0;
        }

        body {
          background: #02080d;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* ====================================================
           PAGE
        ==================================================== */

        .patient-page {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          padding: 30px 24px 45px;

          color: white;

          background:
            radial-gradient(
              circle at 78% 12%,
              rgba(15, 190, 225, .12),
              transparent 30%
            ),
            radial-gradient(
              circle at 15% 85%,
              rgba(20, 90, 150, .12),
              transparent 35%
            ),
            #02080d;
        }

        /* ====================================================
           MEDICAL BACKGROUND
        ==================================================== */

        .medical-background {
          position: fixed;
          inset: 0;

          z-index: 0;

          pointer-events: none;

          overflow: hidden;
        }

        .medical-image {
          position: absolute;
          inset: 0;

          background-image:
            url("https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=2200&q=85");

          background-size: cover;

          background-position: center right;

          filter:
            brightness(.30)
            saturate(.60)
            contrast(1.15);

          opacity: .68;

          transform: scale(1.04);
        }

        /* ====================================================
           DARK OVERLAY
        ==================================================== */

        .medical-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              #02080d 0%,
              rgba(2, 8, 13, .98) 20%,
              rgba(2, 8, 13, .91) 40%,
              rgba(2, 8, 13, .70) 63%,
              rgba(2, 8, 13, .48) 80%,
              rgba(2, 8, 13, .78) 100%
            );
        }

        /* ====================================================
           CYAN LIGHT
        ==================================================== */

        .medical-blue-glow {
          position: absolute;

          width: 800px;
          height: 800px;

          right: -250px;
          top: -220px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(29, 220, 250, .24),
              rgba(25, 150, 220, .08) 38%,
              transparent 72%
            );

          filter: blur(45px);

          animation:
            backgroundGlow 8s ease-in-out infinite;
        }

        /* ====================================================
           BACKGROUND GRID
           FIXED CLASS NAME
        ==================================================== */

        .medical-grid-overlay {
          position: absolute;
          inset: 0;

          opacity: .10;

          background-image:
            linear-gradient(
              rgba(34, 223, 255, .09) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(34, 223, 255, .09) 1px,
              transparent 1px
            );

          background-size: 55px 55px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 88%
            );
        }

        /* ====================================================
           BACKGROUND CONTENT
        ==================================================== */

        .background-content {
          position: absolute;

          left: 55px;
          bottom: 45px;

          width: 580px;

          opacity: .30;

          transform: scale(.92);

          transform-origin: bottom left;
        }

        .background-title {
          display: flex;
          flex-direction: column;

          margin-bottom: 18px;

          font-size: 11px;

          letter-spacing: .25em;

          text-transform: uppercase;
        }

        .background-title span {
          color: rgba(70, 230, 255, .70);
        }

        .background-title strong {
          margin-top: 3px;

          color: rgba(255,255,255,.58);

          font-size: 25px;

          letter-spacing: .08em;
        }

        .background-description {
          position: absolute;

          left: 325px;
          bottom: 145px;

          color: rgba(255,255,255,.45);

          font-size: 15px;

          line-height: 1.45;
        }

        .background-description span {
          color: rgba(41,220,245,.85);
        }

        /* ====================================================
           ROLE CARDS
        ==================================================== */

        .role-cards {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 7px;

          width: 510px;
        }

        .role-card {
          min-height: 86px;

          padding: 10px;

          border-radius: 9px;

          background:
            linear-gradient(
              145deg,
              rgba(7,27,38,.78),
              rgba(3,13,20,.68)
            );

          border:
            1px solid rgba(255,255,255,.08);

          backdrop-filter:
            blur(12px);

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.04),
            0 10px 35px rgba(0,0,0,.28);
        }

        .role-icon {
          width: 25px;
          height: 25px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 6px;

          border-radius: 7px;
        }

        .role-card.admin .role-icon {
          color: #38bdf8;
          background: rgba(56,189,248,.12);
        }

        .role-card.doctor .role-icon {
          color: #22d3ee;
          background: rgba(34,211,238,.12);
        }

        .role-card.reception .role-icon {
          color: #fbbf24;
          background: rgba(251,191,36,.10);
        }

        .role-card.patient .role-icon {
          color: #a78bfa;
          background: rgba(167,139,250,.12);
        }

        .role-card h4 {
          margin: 0;

          font-size: 7px;

          letter-spacing: .13em;

          color: rgba(255,255,255,.70);
        }

        .role-card p {
          margin: 4px 0 0;

          font-size: 6px;

          line-height: 1.4;

          color: rgba(255,255,255,.30);
        }

        /* ====================================================
           CONTENT
        ==================================================== */

        .page-content {
          position: relative;

          z-index: 5;

          width: 100%;
          max-width: 1160px;

          margin: 0 auto;
        }

        /* ====================================================
           HEADER
        ==================================================== */

        .top-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          margin-bottom: 25px;
        }

        .header-left {
          display: flex;

          align-items: center;

          gap: 16px;
        }

        .main-icon {
          position: relative;

          width: 60px;
          height: 60px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 18px;

          color: #42e6ff;

          background:
            linear-gradient(
              145deg,
              rgba(9,50,64,.95),
              rgba(3,17,24,.95)
            );

          border:
            1px solid rgba(54,220,247,.22);

          box-shadow:
            0 0 35px rgba(34,223,255,.13),
            inset 0 1px 0 rgba(255,255,255,.06);
        }

        .icon-ring {
          position: absolute;

          inset: -5px;

          border-radius: 22px;

          border:
            1px solid rgba(34,223,255,.10);

          animation:
            pulseRing 3s ease-in-out infinite;
        }

        .status-dot {
          position: absolute;

          width: 7px;
          height: 7px;

          right: 6px;
          bottom: 6px;

          border-radius: 50%;

          background: #36e5c4;

          box-shadow:
            0 0 12px #36e5c4;
        }

        .eyebrow {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 5px;

          font-size: 8px;

          letter-spacing: .22em;
        }

        .eyebrow span {
          color: rgba(65,222,250,.70);
        }

        .eyebrow i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #31dfff;

          box-shadow:
            0 0 8px #31dfff;
        }

        .eyebrow b {
          color: #39d8a8;

          font-weight: 600;
        }

        .top-header h1 {
          margin: 0;

          font-size: 28px;

          line-height: 1.1;

          font-weight: 650;

          color: #fff;
        }

        .top-header p {
          margin: 7px 0 0;

          font-size: 10px;

          color: rgba(255,255,255,.40);
        }

        /* ====================================================
           SECURITY BOX
        ==================================================== */

        .security-box {
          display: flex;

          align-items: center;

          gap: 10px;

          padding: 11px 15px;

          border-radius: 13px;

          background:
            rgba(5,22,30,.72);

          border:
            1px solid rgba(54,220,247,.12);

          backdrop-filter:
            blur(14px);

          box-shadow:
            0 0 25px rgba(34,223,255,.04);
        }

        .security-box > svg {
          color: #38dcb2;
        }

        .security-box small {
          display: block;

          font-size: 7px;

          color: rgba(255,255,255,.30);
        }

        .security-box strong {
          display: block;

          margin-top: 2px;

          font-size: 9px;

          color: #36d9ae;
        }

        /* ====================================================
           MAIN CARD
        ==================================================== */

        .main-card {
          position: relative;

          overflow: hidden;

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(3,20,29,.95),
              rgba(2,12,19,.94)
            );

          border:
            1px solid rgba(36,93,113,.68);

          box-shadow:
            0 35px 100px rgba(0,0,0,.52),
            0 0 70px rgba(10,150,190,.05);

          backdrop-filter:
            blur(25px);
        }

        .card-top-line {
          position: absolute;

          top: 0;

          left: 18%;
          right: 18%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(34,223,255,.85),
              transparent
            );

          box-shadow:
            0 0 20px #22dfff;
        }

        .card-glow {
          position: absolute;

          width: 350px;
          height: 350px;

          right: -150px;
          top: -180px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(34,223,255,.10),
              transparent 68%
            );

          filter: blur(20px);
        }

        /* ====================================================
           CARD HEADER
        ==================================================== */

        .card-header {
          position: relative;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 21px 28px;

          border-bottom:
            1px solid rgba(255,255,255,.055);

          background:
            linear-gradient(
              90deg,
              rgba(6,28,39,.84),
              rgba(4,19,27,.68),
              rgba(3,14,21,.75)
            );
        }

        .card-header-left {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .card-icon {
          width: 42px;
          height: 42px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 12px;

          color: #36dff9;

          background:
            rgba(34,223,255,.07);

          border:
            1px solid rgba(34,223,255,.15);

          box-shadow:
            0 0 22px rgba(34,223,255,.07);
        }

        .card-header h2 {
          margin: 0;

          font-size: 13px;

          font-weight: 650;
        }

        .card-header p {
          margin: 4px 0 0;

          font-size: 8px;

          color: rgba(255,255,255,.32);
        }

        .profile-status {
          display: flex;

          align-items: center;

          gap: 7px;

          font-size: 8px;

          color: rgba(255,255,255,.27);

          letter-spacing: .1em;
        }

        .profile-status span {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #3de3ff;

          box-shadow:
            0 0 9px #3de3ff;
        }

        /* ====================================================
           FORM
        ==================================================== */

        .patient-form {
          position: relative;

          padding: 29px;
        }

        .section-title {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .section-title-icon {
          position: relative;

          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 12px;

          color: #35def9;

          background:
            rgba(34,223,255,.065);

          border:
            1px solid rgba(34,223,255,.14);

          box-shadow:
            0 0 20px rgba(34,223,255,.06);
        }

        .section-title-icon.green {
          color: #38dfaa;

          background:
            rgba(52,211,153,.065);

          border-color:
            rgba(52,211,153,.14);
        }

        .section-title-icon span {
          position: absolute;

          width: 6px;
          height: 6px;

          right: -2px;
          top: -2px;

          border-radius: 50%;

          background: currentColor;

          box-shadow:
            0 0 9px currentColor;
        }

        .section-title h2 {
          margin: 0;

          font-size: 12px;

          font-weight: 650;
        }

        .section-title p {
          margin: 4px 0 0;

          font-size: 8px;

          color: rgba(255,255,255,.28);
        }

        /* ====================================================
           PERSONAL FIELDS
        ==================================================== */

        .fields-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 20px;

          margin-top: 20px;
        }

        .full-field {
          grid-column: 1 / -1;
        }

        /* ====================================================
           LABEL
        ==================================================== */

        .field-label {
          display: block;

          margin-bottom: 8px;

          font-size: 8px;

          font-weight: 650;

          text-transform: uppercase;

          letter-spacing: .08em;

          color: rgba(255,255,255,.48);
        }

        .required-star {
          color: #39ddf7;

          margin-left: 4px;
        }

        /* ====================================================
           INPUT
        ==================================================== */

        .input-wrap {
          position: relative;
        }

        .input-icon {
          position: absolute;

          left: 11px;
          top: 50%;

          transform:
            translateY(-50%);

          width: 28px;
          height: 28px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 8px;

          color: rgba(52,218,246,.68);

          background:
            rgba(34,223,255,.05);

          border:
            1px solid rgba(34,223,255,.08);

          z-index: 2;

          transition: .25s;
        }

        .input-wrap:focus-within .input-icon {
          color: #3ee7ff;

          background:
            rgba(34,223,255,.09);

          border-color:
            rgba(34,223,255,.20);

          box-shadow:
            0 0 15px rgba(34,223,255,.08);
        }

        .input-control,
        .select-control,
        .textarea-control {
          width: 100%;

          color:
            rgba(255,255,255,.90);

          background:
            #06151d;

          border:
            1px solid rgba(255,255,255,.075);

          outline: none;

          transition: .25s;

          font-family: inherit;
        }

        .input-control,
        .select-control {
          height: 48px;

          border-radius: 12px;

          padding-left: 50px;
          padding-right: 15px;

          font-size: 10px;
        }

        .input-control:hover,
        .select-control:hover,
        .textarea-control:hover {
          border-color:
            rgba(255,255,255,.14);
        }

        .input-control:focus,
        .select-control:focus,
        .textarea-control:focus {
          border-color:
            rgba(42,224,249,.34);

          background:
            #071a23;

          box-shadow:
            0 0 0 3px rgba(34,223,255,.04),
            0 0 25px rgba(34,223,255,.045);
        }

        .input-control::placeholder,
        .textarea-control::placeholder {
          color:
            rgba(255,255,255,.22);
        }

        /* ====================================================
           DIVIDER
        ==================================================== */

        .section-divider {
          position: relative;

          height: 1px;

          margin: 32px 0;
        }

        .section-divider::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            rgba(255,255,255,.055);
        }

        .section-divider span {
          position: absolute;

          left: 50%;
          top: -1px;

          transform:
            translateX(-50%);

          width: 80px;
          height: 2px;

          background:
            rgba(34,223,255,.45);

          box-shadow:
            0 0 13px #22dfff;
        }

        /* ====================================================
           MEDICAL FIELDS
           FIXED NAME
        ==================================================== */

        .medical-fields-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 20px;

          margin-top: 20px;
        }

        /* ====================================================
           TEXTAREA
        ==================================================== */

        .textarea-wrap {
          position: relative;
        }

        .textarea-icon {
          position: absolute;

          left: 11px;
          top: 12px;

          width: 28px;
          height: 28px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 8px;

          color:
            rgba(52,218,246,.68);

          background:
            rgba(34,223,255,.05);

          border:
            1px solid rgba(34,223,255,.08);

          z-index: 2;
        }

        .textarea-control {
          min-height: 155px;

          resize: vertical;

          border-radius: 12px;

          padding:
            15px
            15px
            15px
            50px;

          font-size: 10px;

          line-height: 1.7;
        }

        /* ====================================================
           SECURITY INFO
        ==================================================== */

        .security-info {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-top: 20px;

          padding: 14px 15px;

          border-radius: 12px;

          background:
            linear-gradient(
              90deg,
              rgba(34,223,255,.035),
              transparent,
              rgba(37,99,235,.025)
            );

          border:
            1px solid rgba(34,223,255,.10);
        }

        .info-icon {
          width: 34px;
          height: 34px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 9px;

          color: #3ce4fb;

          background:
            rgba(34,223,255,.065);

          border:
            1px solid rgba(34,223,255,.10);
        }

        .security-info strong {
          display: block;

          font-size: 9px;

          color:
            rgba(255,255,255,.70);
        }

        .security-info p {
          margin: 4px 0 0;

          font-size: 8px;

          line-height: 1.6;

          color:
            rgba(255,255,255,.27);
        }

        .info-shield {
          margin-left: auto;

          flex-shrink: 0;

          color:
            rgba(56,220,178,.48);
        }

        /* ====================================================
           FOOTER
        ==================================================== */

        .form-footer {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          margin-top: 24px;

          padding-top: 20px;

          border-top:
            1px solid rgba(255,255,255,.055);
        }

        .smart-label {
          display: flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(53,222,250,.52);

          font-size: 8px;
        }

        .buttons {
          display: flex;

          align-items: center;

          gap: 8px;
        }

        /* ====================================================
           BUTTONS
        ==================================================== */

        .clear-btn,
        .cancel-btn {
          height: 40px;

          padding: 0 19px;

          border-radius: 11px;

          border:
            1px solid rgba(255,255,255,.08);

          background:
            rgba(255,255,255,.025);

          color:
            rgba(255,255,255,.48);

          font-size: 9px;

          font-weight: 650;

          cursor: pointer;

          transition: .25s;
        }

        .clear-btn:hover,
        .cancel-btn:hover {
          background:
            rgba(255,255,255,.055);

          color:
            rgba(255,255,255,.82);

          border-color:
            rgba(255,255,255,.14);
        }

        .cancel-btn {
          display: flex;

          align-items: center;

          gap: 7px;
        }

        /* ====================================================
           SAVE BUTTON
        ==================================================== */

        .save-btn {
          position: relative;

          overflow: hidden;

          min-width: 150px;

          height: 40px;

          padding: 0 20px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          border: none;

          border-radius: 11px;

          background:
            linear-gradient(
              90deg,
              #0bbcd4,
              #14d8ee,
              #24b9ff
            );

          color:
            #021016;

          font-size: 9px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 0 25px rgba(34,223,255,.18);

          transition: .25s;
        }

        .save-btn:hover {
          transform:
            translateY(-1px);

          filter:
            brightness(1.08);

          box-shadow:
            0 0 35px rgba(34,223,255,.32);
        }

        .save-btn:disabled {
          cursor: default;

          opacity: .85;
        }

        .button-shine {
          position: absolute;

          top: 0;
          bottom: 0;

          width: 70px;

          left: -90px;

          transform:
            skewX(-20deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.30),
              transparent
            );

          animation:
            buttonShine 3.5s infinite;
        }

        /* ====================================================
           PAGE FOOTER
        ==================================================== */

        .page-footer {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          margin-top: 20px;

          font-size: 7px;

          letter-spacing: .18em;

          color:
            rgba(255,255,255,.20);
        }

        .page-footer span {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(47,220,247,.65);

          box-shadow:
            0 0 8px #22dfff;
        }

        /* ====================================================
           ANIMATIONS
        ==================================================== */

        @keyframes backgroundGlow {
          0%,
          100% {
            transform: scale(1);

            opacity: .70;
          }

          50% {
            transform: scale(1.12);

            opacity: 1;
          }
        }

        @keyframes pulseRing {
          0%,
          100% {
            opacity: .35;

            transform: scale(1);
          }

          50% {
            opacity: .80;

            transform: scale(1.04);
          }
        }

        @keyframes buttonShine {
          0% {
            left: -90px;
          }

          25%,
          100% {
            left: 180%;
          }
        }

        /* ====================================================
           RESPONSIVE
        ==================================================== */

        @media (max-width: 900px) {

          .patient-page {
            padding:
              20px
              15px
              35px;
          }

          .background-content {
            left: 20px;

            bottom: 20px;

            transform:
              scale(.75);

            opacity: .18;
          }

          .medical-image {
            background-position:
              70% center;
          }

          .top-header {
            align-items:
              flex-start;
          }

          .security-box {
            display: none;
          }

          .fields-grid,
          .medical-fields-grid {
            grid-template-columns: 1fr;
          }

          .full-field {
            grid-column: auto;
          }
        }

        @media (max-width: 600px) {

          .patient-page {
            padding:
              15px
              10px
              30px;
          }

          .header-left {
            gap: 11px;
          }

          .main-icon {
            width: 50px;
            height: 50px;

            border-radius: 15px;
          }

          .top-header h1 {
            font-size: 22px;
          }

          .top-header p {
            font-size: 8px;
          }

          .eyebrow {
            font-size: 6px;
          }

          .patient-form {
            padding:
              20px
              15px;
          }

          .card-header {
            padding:
              17px
              15px;
          }

          .profile-status {
            display: none;
          }

          .form-footer {
            align-items: stretch;

            flex-direction: column;
          }

          .smart-label {
            display: none;
          }

          .buttons {
            width: 100%;

            display: grid;

            grid-template-columns:
              1fr 1fr;
          }

          .save-btn {
            grid-column:
              1 / -1;
          }

          .background-content {
            display: none;
          }

          .security-info {
            align-items:
              flex-start;
          }
        }

        /* ====================================================
           DARK FORM CONTROLS
        ==================================================== */

        input,
        textarea,
        select {
          color-scheme: dark;
        }

        select option {
          background: #07151c;

          color: white;
        }

        /* ====================================================
           SCROLLBAR
        ==================================================== */

        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        ::-webkit-scrollbar-track {
          background:
            #02080c;
        }

        ::-webkit-scrollbar-thumb {
          background:
            rgba(34,223,255,.20);

          border-radius: 20px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background:
            rgba(34,223,255,.40);
        }

      `}</style>
    </div>
  );
}

/* ==============================================================
   ROLE CARD
============================================================== */

function RoleCard({
  icon,
  title,
  text,
  type,
}) {
  return (
    <div className={`role-card ${type}`}>

      <div className="role-icon">
        {icon}
      </div>

      <h4>
        {title}
      </h4>

      <p>
        {text}
      </p>

    </div>
  );
}

/* ==============================================================
   SECTION TITLE
============================================================== */

function SectionTitle({
  icon,
  title,
  subtitle,
  green = false,
}) {
  return (
    <div className="section-title">

      <div
        className={`section-title-icon ${
          green ? "green" : ""
        }`}
      >

        {icon}

        <span />

      </div>

      <div>

        <h2>
          {title}
        </h2>

        <p>
          {subtitle}
        </p>

      </div>

    </div>
  );
}

/* ==============================================================
   INPUT FIELD
============================================================== */

function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="field-label"
      >

        {label}

        {required && (
          <span className="required-star">
            *
          </span>
        )}

      </label>

      <div className="input-wrap">

        <div className="input-icon">
          {icon}
        </div>

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="input-control"
        />

      </div>

    </div>
  );
}

/* ==============================================================
   SELECT FIELD
============================================================== */

function SelectField({
  icon,
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="field-label"
      >
        {label}
      </label>

      <div className="input-wrap">

        <div className="input-icon">
          {icon}
        </div>

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="select-control"
        >

          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

        </select>

      </div>

    </div>
  );
}

/* ==============================================================
   TEXTAREA FIELD
============================================================== */

function TextAreaField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="field-label"
      >
        {label}
      </label>

      <div className="textarea-wrap">

        <div className="textarea-icon">
          {icon}
        </div>

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={6}
          className="textarea-control"
        />

      </div>

    </div>
  );
}