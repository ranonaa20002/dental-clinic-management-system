import React, { useMemo, useState } from "react";

import {
  Activity,
  AlertTriangle,
  CalendarDays,
  Clock3,
  Edit3,
  FileText,
  HeartPulse,
  Image as ImageIcon,
  Mail,
  Package,
  Phone,
  Pill,
  Plus,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  User,
  X,
  Zap,
} from "lucide-react";

export default function DentalClinicalHub() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedTooth, setSelectedTooth] = useState("16");

  const [showTreatmentModal, setShowTreatmentModal] =
    useState(false);

  const [showMedicineModal, setShowMedicineModal] =
    useState(false);

  const [showImageModal, setShowImageModal] =
    useState(false);

  const [treatments, setTreatments] = useState([
    {
      id: 1,
      title: "Examination & Diagnosis",
      date: "20 Aug 2026",
      status: "Completed",
    },
    {
      id: 2,
      title: "Root Canal Treatment",
      date: "27 Aug 2026",
      status: "Scheduled",
    },
    {
      id: 3,
      title: "Crown Placement",
      date: "03 Sep 2026",
      status: "Pending",
    },
    {
      id: 4,
      title: "Follow Up",
      date: "10 Sep 2026",
      status: "Pending",
    },
  ]);

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Augmentin 625mg",
      dose: "1 tablet",
      frequency: "2 times daily",
      duration: "5 days",
      type: "green",
    },
    {
      id: 2,
      name: "Brufen 400mg",
      dose: "1 tablet",
      frequency: "2 times daily",
      duration: "3 days",
      type: "orange",
    },
    {
      id: 3,
      name: "Mouthwash",
      dose: "Use after meals",
      frequency: "",
      duration: "7 days",
      type: "blue",
    },
  ]);

  const [newTreatment, setNewTreatment] = useState({
    title: "",
    date: "",
  });

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dose: "",
    frequency: "",
    duration: "",
  });

  const teeth = useMemo(
    () => [
      { id: "18", state: "caries" },
      { id: "17", state: "filled" },
      { id: "16", state: "filled" },
      { id: "15", state: "healthy" },
      { id: "14", state: "healthy" },
      { id: "13", state: "healthy" },
      { id: "12", state: "healthy" },
      { id: "11", state: "healthy" },

      { id: "21", state: "healthy" },
      { id: "22", state: "healthy" },
      { id: "23", state: "healthy" },
      { id: "24", state: "crown" },
      { id: "25", state: "caries" },
      { id: "26", state: "filled" },
      { id: "27", state: "healthy" },
      { id: "28", state: "healthy" },

      { id: "48", state: "healthy" },
      { id: "47", state: "filled" },
      { id: "46", state: "filled" },
      { id: "45", state: "healthy" },
      { id: "44", state: "healthy" },
      { id: "43", state: "healthy" },
      { id: "42", state: "healthy" },
      { id: "41", state: "healthy" },

      { id: "31", state: "healthy" },
      { id: "32", state: "healthy" },
      { id: "33", state: "crown" },
      { id: "34", state: "caries" },
      { id: "35", state: "filled" },
      { id: "36", state: "filled" },
      { id: "37", state: "healthy" },
      { id: "38", state: "healthy" },
    ],
    []
  );

  const addTreatment = (e) => {
    e.preventDefault();

    if (!newTreatment.title.trim()) return;

    setTreatments((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTreatment.title.trim(),
        date: newTreatment.date || "To be scheduled",
        status: "Pending",
      },
    ]);

    setNewTreatment({
      title: "",
      date: "",
    });

    setShowTreatmentModal(false);
  };

  const addMedicine = (e) => {
    e.preventDefault();

    if (!newMedicine.name.trim()) return;

    setMedications((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newMedicine.name.trim(),
        dose: newMedicine.dose || "As directed",
        frequency: newMedicine.frequency || "",
        duration: newMedicine.duration || "As directed",
        type: "blue",
      },
    ]);

    setNewMedicine({
      name: "",
      dose: "",
      frequency: "",
      duration: "",
    });

    setShowMedicineModal(false);
  };

  const deleteMedicine = (id) => {
    setMedications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const printRecord = () => {
    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=900"
    );

    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Dental Clinical Record</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #111827;
          }

          h1 {
            color: #0284c7;
            margin-bottom: 5px;
          }

          h2 {
            margin-top: 30px;
            color: #1e293b;
          }

          .muted {
            color: #64748b;
          }

          .card {
            border: 1px solid #dbe4ea;
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
          }

          .row {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            padding: 11px 0;
            border-bottom: 1px solid #edf2f7;
          }

          .row:last-child {
            border-bottom: none;
          }

          .label {
            color: #64748b;
          }

          .value {
            font-weight: 700;
          }
        </style>
      </head>

      <body>

        <h1>DENTAL CLINIC</h1>

        <div class="muted">
          Clinical Medical Record
        </div>

        <div class="card">

          <div class="row">
            <span class="label">Patient</span>
            <span class="value">Ahmed Mohamed</span>
          </div>

          <div class="row">
            <span class="label">Patient ID</span>
            <span class="value">PT-2026-00125</span>
          </div>

          <div class="row">
            <span class="label">Age</span>
            <span class="value">32 Years</span>
          </div>

          <div class="row">
            <span class="label">Doctor</span>
            <span class="value">Dr. Ahmed Ali</span>
          </div>

          <div class="row">
            <span class="label">Last Visit</span>
            <span class="value">20 Aug 2026</span>
          </div>

        </div>

        <div class="card">

          <h2>Diagnosis</h2>

          <p>
            Dental caries with pulpitis.
          </p>

          <h2>Clinical Findings</h2>

          <p>
            Deep caries in tooth 16 causing
            pain and sensitivity.
          </p>

          <h2>Treatment Required</h2>

          <p>
            Root canal treatment + Crown.
          </p>

        </div>

        <div class="card">

          <h2>Clinical Notes</h2>

          <p>
            Patient has deep caries in tooth 16.
            Started root canal treatment.
            Will complete in next visit and place crown.
          </p>

        </div>

      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="clinical-page">

      <style>{`

        * {
          box-sizing: border-box;
        }

        .clinical-page {
          min-height: 100vh;
          width: 100%;
          padding: 22px;
          position: relative;
          overflow-x: hidden;
          color: #eaf7fc;
          background:
            radial-gradient(
              circle at 8% 0%,
              rgba(0, 214, 255, .10),
              transparent 27%
            ),
            radial-gradient(
              circle at 90% 15%,
              rgba(90, 74, 255, .09),
              transparent 28%
            ),
            #020811;

          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .clinical-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .20;

          background-image:
            linear-gradient(
              rgba(0, 195, 255, .045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 195, 255, .045) 1px,
              transparent 1px
            );

          background-size: 38px 38px;
        }

        .clinical-container {
          width: 100%;
          max-width: 1550px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* =====================
           HEADER
        ===================== */

        .clinical-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 14px;
        }

        .breadcrumb {
          color: #61798a;
          font-size: 10px;
          margin-bottom: 5px;
        }

        .breadcrumb span {
          color: #22d6ff;
        }

        .clinical-heading {
          margin: 0;
          color: #f1fbff;
          font-size: 27px;
          line-height: 1.1;
          font-weight: 850;
          letter-spacing: -.7px;
        }

        .clinical-search {
          width: 280px;
          height: 40px;

          display: flex;
          align-items: center;
          gap: 8px;

          padding: 0 11px;

          border-radius: 8px;
          border: 1px solid rgba(42, 105, 140, .42);

          background:
            rgba(3, 19, 32, .88);

          box-shadow:
            inset 0 1px rgba(255,255,255,.02);
        }

        .clinical-search svg {
          color: #638094;
          flex-shrink: 0;
        }

        .clinical-search input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #e4f2f7;
          font-size: 10px;
        }

        .clinical-search input::placeholder {
          color: #536d7e;
        }

        .shortcut {
          color: #425c6d;
          font-size: 8px;
          white-space: nowrap;
        }

        /* =====================
           PATIENT
        ===================== */

        .patient-card {
          border: 1px solid rgba(42, 110, 149, .50);
          border-radius: 11px;
          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(6, 28, 46, .98),
              rgba(2, 13, 24, .98)
            );

          box-shadow:
            0 20px 55px rgba(0,0,0,.18);
        }

        .patient-main {
          min-height: 124px;
          padding: 16px;

          display: flex;
          align-items: center;
          gap: 14px;
        }

        .patient-photo {
          width: 76px;
          height: 76px;
          flex: 0 0 auto;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #31d9ff;

          border: 1px solid rgba(0, 211, 255, .43);

          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(22, 181, 230, .20),
              transparent 60%
            ),
            #071c2d;

          box-shadow:
            0 0 30px rgba(0, 192, 255, .08);
        }

        .patient-information {
          min-width: 240px;
        }

        .patient-name {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;

          color: #eefaff;
          font-size: 18px;
          font-weight: 850;
        }

        .gender {
          color: #31d8ff;
          font-size: 12px;
        }

        .patient-age {
          color: #7e98a8;
          font-size: 10px;
          font-weight: 500;
        }

        .patient-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;

          margin-top: 9px;

          color: #71899a;
          font-size: 9px;
        }

        .patient-contact-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .patient-contact-item svg {
          color: #25d5ff;
        }

        .patient-metrics {
          margin-left: auto;
          min-width: 500px;

          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
        }

        .patient-metric {
          padding: 7px 17px;
          border-left:
            1px solid rgba(48, 104, 137, .22);
        }

        .metric-label {
          margin-bottom: 6px;
          color: #5f788a;
          font-size: 8px;
          letter-spacing: .3px;
        }

        .metric-value {
          color: #dceef5;
          font-size: 11px;
          font-weight: 750;
        }

        .metric-sub {
          margin-top: 4px;
          color: #4e6879;
          font-size: 8px;
        }

        .patient-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;

          padding: 5px 9px;

          border-radius: 5px;

          color: #00dda0;
          font-size: 9px;

          border: 1px solid rgba(0, 223, 160, .20);

          background:
            rgba(0, 223, 160, .07);
        }

        /* =====================
           TABS
        ===================== */

        .clinical-tabs {
          min-height: 51px;
          padding: 0 12px;

          display: flex;
          align-items: stretch;
          gap: 3px;

          border-top:
            1px solid rgba(48, 104, 137, .24);

          overflow-x: auto;
        }

        .clinical-tab {
          height: 51px;
          flex: 0 0 auto;

          display: flex;
          align-items: center;
          gap: 7px;

          padding: 0 13px;

          border: none;
          border-bottom: 2px solid transparent;

          background: transparent;

          color: #647f91;
          font-size: 9px;

          cursor: pointer;
          transition: .2s;
        }

        .clinical-tab:hover {
          color: #a9cad8;
        }

        .clinical-tab.active {
          color: #28d9ff;
          border-bottom-color: #1bcfff;

          text-shadow:
            0 0 12px rgba(0, 204, 255, .35);
        }

        /* =====================
           MAIN
        ===================== */

        .clinical-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            330px;

          gap: 14px;

          margin-top: 14px;
        }

        .main-column {
          min-width: 0;

          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .side-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .panel {
          overflow: hidden;

          border-radius: 10px;

          border: 1px solid rgba(39, 105, 145, .43);

          background:
            linear-gradient(
              145deg,
              rgba(5, 24, 41, .97),
              rgba(2, 13, 24, .99)
            );

          box-shadow:
            0 12px 35px rgba(0,0,0,.12);
        }

        .panel-header {
          height: 51px;
          padding: 0 14px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid rgba(47, 104, 137, .22);
        }

        .panel-title {
          display: flex;
          align-items: center;
          gap: 8px;

          color: #e4f5fb;
          font-size: 12px;
          font-weight: 800;
        }

        .panel-title svg {
          color: #29d7ff;
        }

        .panel-action {
          height: 29px;
          padding: 0 9px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;

          border-radius: 6px;

          border: 1px solid rgba(0, 200, 255, .30);

          background:
            rgba(0, 174, 235, .055);

          color: #2bd8ff;

          font-size: 8px;

          cursor: pointer;

          transition: .2s;
        }

        .panel-action:hover {
          background:
            rgba(0, 190, 255, .11);

          border-color:
            rgba(0, 211, 255, .58);

          box-shadow:
            0 0 18px rgba(0, 192, 255, .08);
        }

        /* =====================
           DENTAL CHART
        ===================== */

        .dental-chart-content {
          padding: 14px;
        }

        .chart-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          overflow-x: auto;

          padding: 5px 0 13px;
        }

        .teeth-row {
          width: 100%;
          max-width: 730px;

          display: grid;
          grid-template-columns:
            repeat(16, 1fr);

          gap: 5px;
        }

        .tooth-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;

          cursor: pointer;
        }

        .tooth-number {
          color: #607b8d;
          font-size: 7px;
        }

        .tooth {
          width: 30px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;

          border-radius:
            46% 46% 40% 40%;

          border:
            1px solid #526c7b;

          color: #17242b;

          background:
            linear-gradient(
              180deg,
              #dce9ed,
              #879da5
            );

          transition: .2s;
        }

        .tooth::before {
          content: "";

          position: absolute;

          width: 15px;
          height: 11px;

          left: 7px;
          bottom: -3px;

          border-radius: 50%;

          background: inherit;
        }

        .tooth:hover {
          transform: translateY(-3px);
        }

        .tooth.selected {
          transform: translateY(-2px);

          box-shadow:
            0 0 0 2px rgba(0, 207, 255, .28),
            0 0 22px rgba(0, 207, 255, .35);
        }

        .tooth.healthy {
          color: #04251d;

          border-color: #35dbad;

          background:
            linear-gradient(
              180deg,
              #93e8cc,
              #287c69
            );
        }

        .tooth.caries {
          color: #39070d;

          border-color: #ff526c;

          background:
            linear-gradient(
              180deg,
              #ff9ea1,
              #9b303e
            );

          box-shadow:
            0 0 12px rgba(255, 74, 99, .12);
        }

        .tooth.filled {
          color: #052131;

          border-color: #1ec6ff;

          background:
            linear-gradient(
              180deg,
              #70ddff,
              #176c96
            );
        }

        .tooth.crown {
          color: #3b2700;

          border-color: #ffb62f;

          background:
            linear-gradient(
              180deg,
              #ffeba1,
              #a87915
            );
        }

        .chart-middle {
          width: 100%;
          max-width: 730px;
          height: 14px;

          position: relative;
        }

        .chart-middle::before {
          content: "";

          position: absolute;

          left: 7%;
          right: 7%;
          top: 50%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(0, 208, 255, .4),
              transparent
            );
        }

        .chart-controls {
          padding-top: 12px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 10px;

          border-top:
            1px solid rgba(44, 100, 133, .21);
        }

        .select-area {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .select-label {
          color: #668193;
          font-size: 8px;
        }

        .select-tooth {
          height: 32px;

          padding: 0 9px;

          border-radius: 6px;

          outline: none;

          color: #b5c9d3;

          background: #041522;

          border:
            1px solid rgba(47, 106, 140, .35);
        }

        .chart-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;

          gap: 9px;
        }

        .legend {
          display: flex;
          align-items: center;
          gap: 4px;

          color: #688294;
          font-size: 7px;
        }

        .legend-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .dot-green {
          background: #24d9a9;
        }

        .dot-red {
          background: #ff526c;
        }

        .dot-blue {
          background: #17bfff;
        }

        .dot-yellow {
          background: #ffb52e;
        }

        /* =====================
           LOWER GRID
        ===================== */

        .lower-grid {
          display: grid;

          grid-template-columns:
            1.25fr .75fr;

          gap: 14px;
        }

        /* =====================
           IMAGES
        ===================== */

        .images-content {
          padding: 13px;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr)
            78px;

          gap: 8px;
        }

        .medical-image {
          height: 132px;

          position: relative;

          overflow: hidden;

          border-radius: 8px;

          border:
            1px solid rgba(51, 106, 138, .38);

          background:
            radial-gradient(
              circle at 50% 45%,
              #d4dadd,
              #5c696e 42%,
              #10191f
            );

          cursor: pointer;
        }

        .xray-pattern {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: rgba(235, 245, 249, .72);
        }

        .image-label {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          padding: 7px;

          color: #a5bac5;
          font-size: 7px;

          background:
            rgba(0, 7, 13, .82);
        }

        .add-image {
          min-height: 132px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 6px;

          color: #4e91a7;

          border:
            1px dashed rgba(0, 194, 255, .30);

          border-radius: 8px;

          background:
            rgba(0, 170, 230, .025);

          cursor: pointer;

          transition: .2s;
        }

        .add-image:hover {
          color: #2bd8ff;

          border-color:
            rgba(0, 207, 255, .65);
        }

        .add-image span {
          font-size: 7px;
        }

        /* =====================
           NOTES
        ===================== */

        .notes-content {
          padding: 13px;
        }

        .notes-box {
          min-height: 123px;

          padding: 12px;

          border-radius: 8px;

          border:
            1px solid rgba(43, 106, 141, .28);

          background:
            rgba(0, 13, 24, .50);

          color: #a6bdc9;

          font-size: 9px;

          line-height: 1.7;
        }

        .note-author {
          margin-top: 10px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          color: #5e7889;

          font-size: 7px;
        }

        .note-edit {
          width: 27px;
          height: 27px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 6px;

          border:
            1px solid rgba(52, 107, 140, .34);

          background: transparent;

          color: #6191a4;

          cursor: pointer;
        }

        /* =====================
           EXAMINATION
        ===================== */

        .examination-list {
          padding: 4px 14px 11px;
        }

        .examination-item {
          padding: 11px 0;

          display: flex;
          gap: 9px;

          border-bottom:
            1px solid rgba(46, 99, 131, .19);
        }

        .examination-item:last-child {
          border-bottom: none;
        }

        .exam-icon {
          width: 33px;
          height: 33px;

          flex: 0 0 auto;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
        }

        .exam-icon.purple {
          color: #a36cff;
          border:
            1px solid rgba(163,108,255,.30);
          background:
            rgba(163,108,255,.07);
        }

        .exam-icon.red {
          color: #ff5c77;
          border:
            1px solid rgba(255,92,119,.30);
          background:
            rgba(255,92,119,.07);
        }

        .exam-icon.blue {
          color: #28d5ff;
          border:
            1px solid rgba(40,213,255,.30);
          background:
            rgba(40,213,255,.07);
        }

        .exam-icon.green {
          color: #25dfa8;
          border:
            1px solid rgba(37,223,168,.30);
          background:
            rgba(37,223,168,.07);
        }

        .exam-icon.orange {
          color: #ffb42e;
          border:
            1px solid rgba(255,180,46,.30);
          background:
            rgba(255,180,46,.07);
        }

        .exam-title {
          color: #3fcfff;
          font-size: 8px;
          margin-bottom: 4px;
        }

        .exam-text {
          color: #91a8b7;
          font-size: 9px;
          line-height: 1.5;
        }

        .pain-stars {
          color: #ffc02e;
          font-size: 12px;
          letter-spacing: 2px;
        }

        /* =====================
           TREATMENT
        ===================== */

        .treatment-list {
          padding: 12px 14px 14px;
        }

        .treatment-item {
          position: relative;

          display: grid;

          grid-template-columns:
            28px
            1fr
            auto;

          gap: 9px;

          padding-bottom: 16px;
        }

        .treatment-item:not(:last-child)::after {
          content: "";

          position: absolute;

          left: 13px;
          top: 29px;
          bottom: 0;

          width: 1px;

          background:
            linear-gradient(
              #1ddca6,
              rgba(36, 102, 133, .20)
            );
        }

        .treatment-number {
          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
          z-index: 2;

          border-radius: 7px;

          color: #7fa4b6;
          font-size: 9px;

          border:
            1px solid rgba(0,191,255,.30);

          background: #061a2a;
        }

        .treatment-item:first-child
        .treatment-number {
          color: #00dfa1;

          border-color:
            rgba(0,223,161,.45);
        }

        .treatment-name {
          color: #dcecf3;
          font-size: 9px;
          font-weight: 700;
        }

        .treatment-date {
          margin-top: 4px;
          color: #617b8d;
          font-size: 7px;
        }

        .treatment-status {
          align-self: start;

          padding: 5px 7px;

          border-radius: 5px;

          font-size: 7px;
        }

        .treatment-status.completed {
          color: #00e0a0;

          border:
            1px solid rgba(0,224,160,.18);

          background:
            rgba(0,224,160,.06);
        }

        .treatment-status.scheduled {
          color: #28cfff;

          border:
            1px solid rgba(40,207,255,.20);

          background:
            rgba(40,207,255,.06);
        }

        .treatment-status.pending {
          color: #9dafba;

          border:
            1px solid rgba(115,139,154,.20);

          background:
            rgba(115,139,154,.05);
        }

        /* =====================
           MEDICINES
        ===================== */

        .medications-list {
          padding: 9px 13px 13px;
        }

        .medicine {
          position: relative;

          display: grid;

          grid-template-columns:
            31px
            1fr
            auto;

          gap: 9px;

          align-items: center;

          padding: 11px;

          margin-bottom: 8px;

          overflow: hidden;

          border-radius: 8px;

          border:
            1px solid rgba(45,106,140,.28);

          background:
            rgba(1,13,24,.58);
        }

        .medicine::before {
          content: "";

          position: absolute;

          left: 0;
          top: 0;
          bottom: 0;

          width: 3px;

          background: #25dfa8;
        }

        .medicine.orange::before {
          background: #ffb42e;
        }

        .medicine.blue::before {
          background: #22caff;
        }

        .medicine-icon {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 7px;

          color: #8eeaff;

          background:
            rgba(0,192,255,.06);
        }

        .medicine-name {
          color: #dceef4;
          font-size: 9px;
          font-weight: 750;
        }

        .medicine-info {
          margin-top: 4px;
          color: #6e8798;
          font-size: 7px;
        }

        .medicine-duration {
          color: #b2c6d1;
          font-size: 7px;
          white-space: nowrap;
        }

        .medicine-delete {
          position: absolute;

          right: 4px;
          top: 4px;

          width: 19px;
          height: 19px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: none;

          color: #526e80;

          background: transparent;

          cursor: pointer;
        }

        .medicine-delete:hover {
          color: #ff5874;
        }

        .view-all {
          width: 100%;
          height: 31px;

          margin-top: 2px;

          border: none;
          background: transparent;

          color: #27d8ff;

          font-size: 8px;

          cursor: pointer;
        }

        /* =====================
           PAYMENTS
        ===================== */

        .payment-content {
          padding: 12px 14px;
        }

        .payment-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 9px 0;

          border-bottom:
            1px solid rgba(43,98,130,.18);

          font-size: 9px;
        }

        .payment-row:last-child {
          border-bottom: none;
        }

        .payment-label {
          color: #668093;
        }

        .payment-value {
          color: #dcecf3;
          font-weight: 750;
        }

        .payment-value.green {
          color: #00dfa0;
        }

        .payment-value.red {
          color: #ff536f;
        }

        .payment-link {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 4px;

          margin-top: 8px;

          color: #27d8ff;
          font-size: 8px;

          cursor: pointer;
        }

        /* =====================
           MODAL
        ===================== */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background:
            rgba(0, 4, 10, .82);

          backdrop-filter:
            blur(9px);
        }

        .modal {
          width: min(520px, 100%);

          overflow: hidden;

          border-radius: 13px;

          border:
            1px solid rgba(0,204,255,.45);

          background:
            linear-gradient(
              145deg,
              #061c2e,
              #020d18
            );

          box-shadow:
            0 0 60px rgba(0,188,255,.13);
        }

        .modal-header {
          height: 57px;

          padding: 0 16px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid rgba(45,104,137,.25);
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 8px;

          color: #e7f7fc;
          font-size: 13px;
          font-weight: 800;
        }

        .modal-title svg {
          color: #28d9ff;
        }

        .modal-close {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 7px;

          border:
            1px solid rgba(60,104,132,.35);

          background: transparent;

          color: #7890a0;

          cursor: pointer;
        }

        .modal-close:hover {
          color: #ff5d78;
        }

        .modal-body {
          padding: 17px;
        }

        .form-group {
          margin-bottom: 12px;
        }

        .form-label {
          display: block;

          margin-bottom: 6px;

          color: #7590a1;
          font-size: 8px;
        }

        .form-input {
          width: 100%;
          height: 40px;

          padding: 0 10px;

          border-radius: 7px;

          border:
            1px solid rgba(46,105,139,.38);

          outline: none;

          background: #03121f;

          color: #e7f4fa;

          font-size: 10px;
        }

        .form-input:focus {
          border-color:
            rgba(0,205,255,.60);

          box-shadow:
            0 0 15px rgba(0,190,255,.06);
        }

        .form-actions {
          margin-top: 16px;

          display: flex;
          justify-content: flex-end;

          gap: 8px;
        }

        .form-cancel,
        .form-submit {
          height: 38px;

          padding: 0 15px;

          border-radius: 7px;

          font-size: 9px;

          cursor: pointer;
        }

        .form-cancel {
          color: #8197a7;

          border:
            1px solid rgba(65,105,130,.35);

          background: transparent;
        }

        .form-submit {
          color: #31dcff;

          border:
            1px solid rgba(0,205,255,.50);

          background:
            rgba(0,184,245,.08);
        }

        .form-submit:hover {
          background:
            rgba(0,184,245,.14);
        }

        /* =====================
           RESPONSIVE
        ===================== */

        @media (max-width: 1250px) {

          .clinical-grid {
            grid-template-columns: 1fr;
          }

          .side-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .patient-metrics {
            min-width: 420px;
          }

        }

        @media (max-width: 900px) {

          .patient-main {
            flex-wrap: wrap;
            align-items: flex-start;
          }

          .patient-metrics {
            width: 100%;
            min-width: 0;
            margin-left: 0;
          }

          .lower-grid {
            grid-template-columns: 1fr;
          }

          .images-content {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .side-column {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 650px) {

          .clinical-page {
            padding: 12px;
          }

          .clinical-topbar {
            flex-direction: column;
            align-items: stretch;
          }

          .clinical-search {
            width: 100%;
          }

          .patient-metrics {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .patient-metric {
            padding: 9px;
            border-top:
              1px solid rgba(49,103,134,.20);
          }

          .chart-area {
            align-items: flex-start;
          }

          .teeth-row {
            min-width: 700px;
          }

          .chart-controls {
            align-items: flex-start;
            flex-direction: column;
          }

          .chart-legend {
            justify-content: flex-start;
          }

          .images-content {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }

      `}</style>

      <div className="clinical-container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="clinical-topbar">

          <div>

            <div className="breadcrumb">
              Dashboard
              {"  ›  "}
              <span>Clinical</span>
              {"  ›  "}
              Ahmed Mohamed
            </div>

            <h1 className="clinical-heading">
              Clinical Record
            </h1>

          </div>

          <div className="clinical-search">

            <Search size={15} />

            <input
              type="text"
              placeholder="Search patient..."
            />

            <span className="shortcut">
              Ctrl + K
            </span>

          </div>

        </div>

        {/* =========================
            PATIENT CARD
        ========================= */}

        <div className="patient-card">

          <div className="patient-main">

            <div className="patient-photo">
              <User size={36} />
            </div>

            <div className="patient-information">

              <div className="patient-name">

                Ahmed Mohamed

                <span className="gender">
                  ♂
                </span>

                <span className="patient-age">
                  32 Years
                </span>

              </div>

              <div className="patient-contact">

                <div className="patient-contact-item">
                  <Phone size={11} />
                  +20 100 123 4567
                </div>

                <div className="patient-contact-item">
                  <Mail size={11} />
                  ahmed.m@email.com
                </div>

                <div className="patient-contact-item">
                  <FileText size={11} />
                  PT-2026-00125
                </div>

              </div>

            </div>

            <div className="patient-metrics">

              <div className="patient-metric">

                <div className="metric-label">
                  LAST VISIT
                </div>

                <div className="metric-value">
                  20 Aug 2026
                </div>

                <div className="metric-sub">
                  2 days ago
                </div>

              </div>

              <div className="patient-metric">

                <div className="metric-label">
                  NEXT VISIT
                </div>

                <div className="metric-value">
                  27 Aug 2026
                </div>

                <div className="metric-sub">
                  in 5 days
                </div>

              </div>

              <div className="patient-metric">

                <div className="metric-label">
                  TOTAL VISITS
                </div>

                <div className="metric-value">
                  8
                </div>

                <div className="metric-sub">
                  Visits
                </div>

              </div>

              <div className="patient-metric">

                <div className="metric-label">
                  STATUS
                </div>

                <div className="patient-status">
                  <span>●</span>
                  Active
                </div>

              </div>

            </div>

          </div>

          {/* =========================
              TABS
          ========================= */}

          <div className="clinical-tabs">

            {[
              {
                name: "Overview",
                icon: Activity,
              },
              {
                name: "Examination",
                icon: Stethoscope,
              },
              {
                name: "Dental Chart",
                icon: DentalToothIcon,
              },
              {
                name: "Treatment Plan",
                icon: Syringe,
              },
              {
                name: "Images",
                icon: ImageIcon,
              },
              {
                name: "Notes",
                icon: FileText,
              },
              {
                name: "History",
                icon: Clock3,
              },
            ].map((tab) => {

              const Icon = tab.icon;

              return (
                <button
                  key={tab.name}
                  className={`clinical-tab ${
                    activeTab === tab.name
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTab(tab.name)
                  }
                >

                  <Icon size={13} />

                  {tab.name}

                </button>
              );
            })}

          </div>

        </div>

        {/* =========================
            CONTENT
        ========================= */}

        <div className="clinical-grid">

          {/* =====================
              MAIN COLUMN
          ===================== */}

          <div className="main-column">

            {/* DENTAL CHART */}

            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">

                  <DentalToothIcon size={18} />

                  Dental Chart

                </div>

                <button
                  className="panel-action"
                  onClick={() =>
                    setSelectedTooth(
                      selectedTooth
                    )
                  }
                >

                  <Edit3 size={11} />

                  Edit Chart

                </button>

              </div>

              <div className="dental-chart-content">

                <div className="chart-area">

                  <div className="teeth-row">

                    {teeth
                      .slice(0, 16)
                      .map((tooth) => (

                        <div
                          className="tooth-wrap"
                          key={tooth.id}
                          onClick={() =>
                            setSelectedTooth(
                              tooth.id
                            )
                          }
                        >

                          <div className="tooth-number">
                            {tooth.id}
                          </div>

                          <div
                            className={`tooth ${
                              tooth.state
                            } ${
                              selectedTooth ===
                              tooth.id
                                ? "selected"
                                : ""
                            }`}
                          >
                            +
                          </div>

                        </div>

                      ))}

                  </div>

                  <div className="chart-middle" />

                  <div className="teeth-row">

                    {teeth
                      .slice(16)
                      .map((tooth) => (

                        <div
                          className="tooth-wrap"
                          key={tooth.id}
                          onClick={() =>
                            setSelectedTooth(
                              tooth.id
                            )
                          }
                        >

                          <div
                            className={`tooth ${
                              tooth.state
                            } ${
                              selectedTooth ===
                              tooth.id
                                ? "selected"
                                : ""
                            }`}
                          >
                            +
                          </div>

                          <div className="tooth-number">
                            {tooth.id}
                          </div>

                        </div>

                      ))}

                  </div>

                </div>

                <div className="chart-controls">

                  <div className="select-area">

                    <span className="select-label">
                      Selected Tooth
                    </span>

                    <select
                      className="select-tooth"
                      value={selectedTooth}
                      onChange={(e) =>
                        setSelectedTooth(
                          e.target.value
                        )
                      }
                    >

                      {teeth.map((tooth) => (
                        <option
                          key={tooth.id}
                          value={tooth.id}
                        >
                          Tooth {tooth.id}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="chart-legend">

                    <div className="legend">
                      <span className="legend-dot dot-green" />
                      Healthy
                    </div>

                    <div className="legend">
                      <span className="legend-dot dot-red" />
                      Caries
                    </div>

                    <div className="legend">
                      <span className="legend-dot dot-blue" />
                      Filled
                    </div>

                    <div className="legend">
                      <span className="legend-dot dot-yellow" />
                      Crown
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* IMAGES + NOTES */}

            <div className="lower-grid">

              <div className="panel">

                <div className="panel-header">

                  <div className="panel-title">

                    <ImageIcon size={17} />

                    Images & X-rays

                  </div>

                  <button
                    className="panel-action"
                    onClick={() =>
                      setShowImageModal(true)
                    }
                  >

                    <Plus size={11} />

                    Add Image

                  </button>

                </div>

                <div className="images-content">

                  {[1, 2, 3, 4].map((item) => (

                    <div
                      className="medical-image"
                      key={item}
                      onClick={() =>
                        setShowImageModal(true)
                      }
                    >

                      <div className="xray-pattern">

                        <ToothXray />

                      </div>

                      <div className="image-label">
                        20 Aug 2026
                      </div>

                    </div>

                  ))}

                  <div
                    className="add-image"
                    onClick={() =>
                      setShowImageModal(true)
                    }
                  >

                    <Plus size={20} />

                    <span>
                      Add New
                    </span>

                  </div>

                </div>

              </div>

              <div className="panel">

                <div className="panel-header">

                  <div className="panel-title">

                    <FileText size={17} />

                    Clinical Notes

                  </div>

                  <button className="panel-action">

                    <Edit3 size={11} />

                    Edit

                  </button>

                </div>

                <div className="notes-content">

                  <div className="notes-box">

                    Patient has deep caries in
                    tooth 16. Started root canal
                    treatment. Will complete in
                    next visit and place crown.

                    <div className="note-author">

                      <span>
                        Dr. Ahmed Ali
                        <br />
                        20 Aug 2026 · 11:30 AM
                      </span>

                      <button className="note-edit">

                        <Edit3 size={12} />

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =====================
              SIDE COLUMN
          ===================== */}

          <div className="side-column">

            {/* EXAMINATION */}

            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">

                  <Stethoscope size={17} />

                  Examination

                </div>

              </div>

              <div className="examination-list">

                <ExamItem
                  icon={<Activity size={16} />}
                  color="purple"
                  title="Chief Complaint"
                  text="Toothache in upper right side"
                />

                <ExamItem
                  icon={<HeartPulse size={16} />}
                  color="red"
                  title="Diagnosis"
                  text="Dental caries with pulpitis"
                />

                <ExamItem
                  icon={
                    <DentalToothIcon size={16} />
                  }
                  color="blue"
                  title="Clinical Findings"
                  text="Deep caries in tooth 16 causing pain and sensitivity"
                />

                <ExamItem
                  icon={
                    <ShieldCheck size={16} />
                  }
                  color="green"
                  title="Treatment Required"
                  text="Root canal treatment + Crown"
                />

                <ExamItem
                  icon={
                    <AlertTriangle size={16} />
                  }
                  color="orange"
                  title="Risk Level"
                  text={
                    <span
                      style={{
                        color: "#ffb72e",
                      }}
                    >
                      Medium
                    </span>
                  }
                />

                <div className="examination-item">

                  <div className="exam-icon purple">
                    <Zap size={16} />
                  </div>

                  <div>

                    <div className="exam-title">
                      Pain Level
                    </div>

                    <div className="pain-stars">
                      ★★★★☆
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* TREATMENT */}

            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">

                  <Syringe size={17} />

                  Treatment Plan

                </div>

                <button
                  className="panel-action"
                  onClick={() =>
                    setShowTreatmentModal(
                      true
                    )
                  }
                >

                  <Plus size={12} />

                </button>

              </div>

              <div className="treatment-list">

                {treatments.map(
                  (item, index) => (

                    <div
                      className="treatment-item"
                      key={item.id}
                    >

                      <div className="treatment-number">
                        {index + 1}
                      </div>

                      <div>

                        <div className="treatment-name">
                          {item.title}
                        </div>

                        <div className="treatment-date">
                          {item.date}
                        </div>

                      </div>

                      <div
                        className={`treatment-status ${item.status
                          .toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )}`}
                      >
                        {item.status}
                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* PRESCRIPTIONS */}

            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">

                  <Pill size={17} />

                  Prescriptions

                </div>

                <button
                  className="panel-action"
                  onClick={() =>
                    setShowMedicineModal(
                      true
                    )
                  }
                >

                  <Plus size={12} />

                </button>

              </div>

              <div className="medications-list">

                {medications.map(
                  (medicine) => (

                    <div
                      className={`medicine ${medicine.type}`}
                      key={medicine.id}
                    >

                      <div className="medicine-icon">

                        <Pill size={16} />

                      </div>

                      <div>

                        <div className="medicine-name">
                          {medicine.name}
                        </div>

                        <div className="medicine-info">

                          {medicine.dose}

                          {medicine.frequency
                            ? ` · ${medicine.frequency}`
                            : ""}

                        </div>

                      </div>

                      <div className="medicine-duration">
                        {medicine.duration}
                      </div>

                      <button
                        className="medicine-delete"
                        onClick={() =>
                          deleteMedicine(
                            medicine.id
                          )
                        }
                      >

                        <X size={11} />

                      </button>

                    </div>

                  )
                )}

                <button className="view-all">
                  View All Prescriptions →
                </button>

              </div>

            </div>

            {/* PAYMENTS */}

            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">

                  <Package size={17} />

                  Payments

                </div>

                <button className="panel-action">
                  <Plus size={12} />
                </button>

              </div>

              <div className="payment-content">

                <div className="payment-row">

                  <span className="payment-label">
                    Total Cost
                  </span>

                  <span className="payment-value">
                    3,500 EGP
                  </span>

                </div>

                <div className="payment-row">

                  <span className="payment-label">
                    Paid
                  </span>

                  <span className="payment-value green">
                    1,500 EGP
                  </span>

                </div>

                <div className="payment-row">

                  <span className="payment-label">
                    Remaining
                  </span>

                  <span className="payment-value red">
                    2,000 EGP
                  </span>

                </div>

                <div className="payment-link">
                  View Payment History →
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            ADD TREATMENT MODAL
        ========================= */}

        {showTreatmentModal && (

          <div
            className="modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                setShowTreatmentModal(
                  false
                );
              }

            }}
          >

            <div className="modal">

              <div className="modal-header">

                <div className="modal-title">

                  <Syringe size={17} />

                  Add Treatment

                </div>

                <button
                  className="modal-close"
                  onClick={() =>
                    setShowTreatmentModal(
                      false
                    )
                  }
                >

                  <X size={14} />

                </button>

              </div>

              <form
                className="modal-body"
                onSubmit={addTreatment}
              >

                <div className="form-group">

                  <label className="form-label">
                    Treatment Name
                  </label>

                  <input
                    className="form-input"
                    placeholder="Root Canal Treatment"
                    value={
                      newTreatment.title
                    }
                    onChange={(e) =>
                      setNewTreatment({
                        ...newTreatment,
                        title:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Date
                  </label>

                  <input
                    className="form-input"
                    type="date"
                    value={
                      newTreatment.date
                    }
                    onChange={(e) =>
                      setNewTreatment({
                        ...newTreatment,
                        date:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-actions">

                  <button
                    type="button"
                    className="form-cancel"
                    onClick={() =>
                      setShowTreatmentModal(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="form-submit"
                  >
                    Add Treatment
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* =========================
            ADD MEDICINE MODAL
        ========================= */}

        {showMedicineModal && (

          <div
            className="modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                setShowMedicineModal(
                  false
                );
              }

            }}
          >

            <div className="modal">

              <div className="modal-header">

                <div className="modal-title">

                  <Pill size={17} />

                  Add Prescription

                </div>

                <button
                  className="modal-close"
                  onClick={() =>
                    setShowMedicineModal(
                      false
                    )
                  }
                >

                  <X size={14} />

                </button>

              </div>

              <form
                className="modal-body"
                onSubmit={addMedicine}
              >

                <div className="form-group">

                  <label className="form-label">
                    Medicine Name
                  </label>

                  <input
                    className="form-input"
                    placeholder="Augmentin 625mg"
                    value={
                      newMedicine.name
                    }
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        name:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Dose
                  </label>

                  <input
                    className="form-input"
                    placeholder="1 tablet"
                    value={
                      newMedicine.dose
                    }
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        dose:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Frequency
                  </label>

                  <input
                    className="form-input"
                    placeholder="2 times daily"
                    value={
                      newMedicine.frequency
                    }
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        frequency:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Duration
                  </label>

                  <input
                    className="form-input"
                    placeholder="5 days"
                    value={
                      newMedicine.duration
                    }
                    onChange={(e) =>
                      setNewMedicine({
                        ...newMedicine,
                        duration:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-actions">

                  <button
                    type="button"
                    className="form-cancel"
                    onClick={() =>
                      setShowMedicineModal(
                        false
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="form-submit"
                  >
                    Add Prescription
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* =========================
            IMAGE MODAL
        ========================= */}

        {showImageModal && (

          <div
            className="modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                setShowImageModal(false);
              }

            }}
          >

            <div className="modal">

              <div className="modal-header">

                <div className="modal-title">

                  <ImageIcon size={17} />

                  Medical Images

                </div>

                <button
                  className="modal-close"
                  onClick={() =>
                    setShowImageModal(
                      false
                    )
                  }
                >

                  <X size={14} />

                </button>

              </div>

              <div className="modal-body">

                <div
                  style={{
                    height: 230,
                    borderRadius: 9,
                    border:
                      "1px solid rgba(48,105,138,.30)",
                    background:
                      "radial-gradient(circle, #65757d, #17232b 55%, #020b13)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >

                  <ToothXray large />

                </div>

                <div className="form-actions">

                  <button
                    className="form-cancel"
                    onClick={() =>
                      setShowImageModal(
                        false
                      )
                    }
                  >
                    Close
                  </button>

                  <button
                    className="form-submit"
                    onClick={() =>
                      setShowImageModal(
                        false
                      )
                    }
                  >
                    Upload Image
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

/* =====================================================
   EXAMINATION ITEM
===================================================== */

function ExamItem({
  icon,
  color,
  title,
  text,
}) {
  return (
    <div className="examination-item">

      <div className={`exam-icon ${color}`}>
        {icon}
      </div>

      <div>

        <div className="exam-title">
          {title}
        </div>

        <div className="exam-text">
          {text}
        </div>

      </div>

    </div>
  );
}

/* =====================================================
   CUSTOM DENTAL TOOTH ICON
===================================================== */

function DentalToothIcon({
  size = 20,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >

      <path
        d="
          M8.2 3.2
          C6.5 2.5 4.6 3.1 3.8 4.7
          C2.9 6.5 3.6 8.9 4.3 10.6
          C5 12.3 5.4 14.1 5.5 16
          C5.6 17.7 5.9 19.4 6.7 20.5
          C7.2 21.2 8 21.7 8.7 21.5
          C9.6 21.3 9.9 20.3 10.2 19.2
          C10.5 17.9 10.7 16.5 12 16.5
          C13.3 16.5 13.5 17.9 13.8 19.2
          C14.1 20.3 14.4 21.3 15.3 21.5
          C16 21.7 16.8 21.2 17.3 20.5
          C18.1 19.4 18.4 17.7 18.5 16
          C18.6 14.1 19 12.3 19.7 10.6
          C20.4 8.9 21.1 6.5 20.2 4.7
          C19.4 3.1 17.5 2.5 15.8 3.2
          C14.6 3.7 13.5 4.1 12 4.1
          C10.5 4.1 9.4 3.7 8.2 3.2Z
        "
      />

      <path
        d="
          M8.5 8
          C9.4 7.1 10.5 6.7 12 6.7
          C13.5 6.7 14.6 7.1 15.5 8
        "
      />

    </svg>
  );
}

/* =====================================================
   XRAY TOOTH
===================================================== */

function ToothXray({
  large = false,
}) {
  return (
    <svg
      viewBox="0 0 120 150"
      style={{
        width: large ? 145 : 75,
        height: large ? 185 : 100,
        opacity: 0.68,
        color: "#e8f4f7",
        filter:
          "drop-shadow(0 0 8px rgba(230,245,250,.30))",
      }}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      <path
        d="
          M35 16
          C20 25 20 46 28 61
          C35 75 32 89 31 107
          C30 127 39 139 47 125
          C53 113 55 103 60 103
          C65 103 67 113 73 125
          C81 139 90 127 89 107
          C88 89 85 75 92 61
          C100 46 100 25 85 16
          C71 8 49 8 35 16Z
        "
        strokeWidth="4"
      />

      <path
        d="
          M42 38
          C52 29 68 29 78 38
          C82 44 81 53 76 58
          C70 63 66 65 60 65
          C54 65 50 63 44 58
          C39 53 38 44 42 38Z
        "
        fill="currentColor"
        opacity=".11"
        strokeWidth="2"
      />

      <path
        d="
          M60 65
          C54 76 54 90 60 104
          C66 90 66 76 60 65Z
        "
        strokeWidth="2"
        opacity=".8"
      />

      <circle
        cx="60"
        cy="52"
        r="4"
        fill="currentColor"
        stroke="none"
      />

    </svg>
  );
}