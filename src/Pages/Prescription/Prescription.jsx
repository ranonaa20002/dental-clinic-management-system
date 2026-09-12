import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  CalendarDays,
  Filter,
  User,
  Pill,
  Clock3,
  FileText,
  Eye,
  Printer,
  Trash2,
  CheckCircle2,
  Activity,
  ClipboardList,
  X,
  ChevronDown,
  Download,
  MoreVertical,
  CircleUserRound,
} from "lucide-react";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patient: "Ahmed Mohamed",
      medicine: "Augmentin 625mg",
      dosage: "1 tablet",
      frequency: "3 times daily",
      duration: "5 days",
      notes: "Take after meals",
      date: "17 Aug 2026",
      status: "Active",
    },
    {
      id: 2,
      patient: "Sara Khaled",
      medicine: "Brufen 400mg",
      dosage: "1 tablet",
      frequency: "2 times daily",
      duration: "3 days",
      notes: "Take after meals",
      date: "16 Aug 2026",
      status: "Active",
    },
    {
      id: 3,
      patient: "Mahmoud Hassan",
      medicine: "Amoxicillin 500mg",
      dosage: "1 capsule",
      frequency: "3 times daily",
      duration: "7 days",
      notes: "Complete full course",
      date: "14 Aug 2026",
      status: "Completed",
    },
    {
      id: 4,
      patient: "Laila Ahmed",
      medicine: "Paracetamol 500mg",
      dosage: "1 tablet",
      frequency: "Every 8 hours",
      duration: "4 days",
      notes: "For pain and fever",
      date: "13 Aug 2026",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] =
    useState(null);

  const [form, setForm] = useState({
    patient: "",
    medicine: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  const activeCount = prescriptions.filter(
    (p) => p.status === "Active"
  ).length;

  const completedCount = prescriptions.filter(
    (p) => p.status === "Completed"
  ).length;

  const medicinesCount = new Set(
    prescriptions.map((p) => p.medicine)
  ).size;

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((p) => {
      const matchesSearch =
        p.patient.toLowerCase().includes(search.toLowerCase()) ||
        p.medicine.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [prescriptions, search, statusFilter]);

  const handleAddPrescription = (e) => {
    e.preventDefault();

    if (
      !form.patient.trim() ||
      !form.medicine.trim() ||
      !form.dosage.trim()
    ) {
      return;
    }

    const newPrescription = {
      id: Date.now(),
      patient: form.patient.trim(),
      medicine: form.medicine.trim(),
      dosage: form.dosage.trim(),
      frequency: form.frequency.trim() || "As prescribed",
      duration: form.duration.trim() || "Not specified",
      notes: form.notes.trim() || "No additional instructions",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
    };

    setPrescriptions((prev) => [
      newPrescription,
      ...prev,
    ]);

    setForm({
      patient: "",
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: "",
    });

    setShowModal(false);
  };

  const deletePrescription = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmed) return;

    setPrescriptions((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (selectedPrescription?.id === id) {
      setSelectedPrescription(null);
    }
  };

  const printPrescription = (prescription) => {
    const printWindow = window.open(
      "",
      "_blank",
      "width=800,height=900"
    );

    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Dental Prescription</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #111;
          }

          .header {
            border-bottom: 2px solid #00aeea;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }

          h1 {
            color: #00aeea;
            margin: 0;
          }

          .row {
            margin: 14px 0;
          }

          .label {
            font-weight: bold;
          }

          .medicine {
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 12px;
          }
        </style>
      </head>

      <body>
        <div class="header">
          <h1>DENTAL CLINIC</h1>
          <p>Medical Prescription</p>
        </div>

        <div class="row">
          <span class="label">Patient:</span>
          ${prescription.patient}
        </div>

        <div class="row">
          <span class="label">Date:</span>
          ${prescription.date}
        </div>

        <div class="medicine">
          <h2>${prescription.medicine}</h2>

          <div class="row">
            <span class="label">Dosage:</span>
            ${prescription.dosage}
          </div>

          <div class="row">
            <span class="label">Frequency:</span>
            ${prescription.frequency}
          </div>

          <div class="row">
            <span class="label">Duration:</span>
            ${prescription.duration}
          </div>

          <div class="row">
            <span class="label">Doctor Notes:</span>
            ${prescription.notes}
          </div>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="prescriptions-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .prescriptions-page {
          min-height: 100vh;
          width: 100%;
          padding: 26px;
          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(0, 207, 255, .08),
              transparent 28%
            ),
            radial-gradient(
              circle at 92% 20%,
              rgba(123, 72, 255, .08),
              transparent 28%
            ),
            #020914;
          color: #f4f9ff;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .prescriptions-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .25;
          background-image:
            linear-gradient(
              rgba(0, 190, 255, .035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 190, 255, .035) 1px,
              transparent 1px
            );
          background-size: 38px 38px;
        }

        .prescriptions-container {
          max-width: 1500px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        /* HEADER */

        .rx-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .rx-brand {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .rx-logo {
          width: 88px;
          height: 88px;
          border-radius: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 211, 255, .65);
          background:
            radial-gradient(
              circle,
              rgba(0, 215, 255, .12),
              transparent 65%
            ),
            rgba(3, 19, 33, .92);
          box-shadow:
            0 0 24px rgba(0, 196, 255, .12),
            inset 0 0 25px rgba(0, 190, 255, .04);
        }

        .rx-logo svg {
          width: 52px;
          height: 52px;
          color: #20d8ff;
          filter:
            drop-shadow(0 0 7px rgba(0, 220, 255, .8))
            drop-shadow(0 0 17px rgba(0, 180, 255, .4));
        }

        .rx-small-title {
          color: #00d8ff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.7px;
          margin-bottom: 4px;
        }

        .rx-title {
          margin: 0;
          font-size: clamp(31px, 4vw, 47px);
          line-height: 1;
          letter-spacing: -.8px;
          font-weight: 850;
          background:
            linear-gradient(
              90deg,
              #ffffff,
              #ccefff
            );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .rx-subtitle {
          color: #8095a9;
          font-size: 15px;
          margin-top: 8px;
        }

        .new-rx-button {
          height: 48px;
          padding: 0 20px;
          border-radius: 10px;
          border: 1px solid rgba(0, 211, 255, .7);
          background:
            linear-gradient(
              135deg,
              rgba(0, 199, 255, .17),
              rgba(0, 88, 180, .1)
            );
          color: #35dcff;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          transition: .25s;
          box-shadow:
            0 0 22px rgba(0, 190, 255, .08);
        }

        .new-rx-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 28px rgba(0, 210, 255, .2),
            inset 0 0 20px rgba(0, 200, 255, .08);
        }

        /* STATS */

        .rx-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 17px;
        }

        .rx-stat {
          min-height: 116px;
          border: 1px solid rgba(42, 112, 160, .48);
          border-radius: 12px;
          padding: 18px;
          background:
            linear-gradient(
              145deg,
              rgba(6, 24, 41, .95),
              rgba(2, 13, 25, .96)
            );
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          overflow: hidden;
        }

        .rx-stat::after {
          content: "";
          position: absolute;
          width: 130px;
          height: 130px;
          right: -85px;
          top: -75px;
          border-radius: 50%;
          background: rgba(0, 195, 255, .06);
        }

        .rx-stat-icon {
          width: 52px;
          height: 52px;
          flex: 0 0 auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid currentColor;
        }

        .rx-stat-icon.cyan {
          color: #00cfff;
          box-shadow: 0 0 20px rgba(0, 207, 255, .14);
        }

        .rx-stat-icon.green {
          color: #00e5a0;
          box-shadow: 0 0 20px rgba(0, 229, 160, .14);
        }

        .rx-stat-icon.purple {
          color: #a268ff;
          box-shadow: 0 0 20px rgba(162, 104, 255, .14);
        }

        .rx-stat-icon.orange {
          color: #ffad2e;
          box-shadow: 0 0 20px rgba(255, 173, 46, .14);
        }

        .rx-stat-title {
          color: #8198ab;
          font-size: 11px;
          font-weight: 600;
        }

        .rx-stat-value {
          font-size: 30px;
          font-weight: 800;
          margin-top: 4px;
        }

        .rx-stat-description {
          color: #657e92;
          font-size: 10px;
          margin-top: 3px;
        }

        /* MAIN GRID */

        .rx-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          gap: 17px;
          align-items: start;
        }

        /* SEARCH */

        .search-panel {
          height: 62px;
          border: 1px solid rgba(41, 108, 151, .45);
          border-radius: 11px;
          background:
            rgba(4, 20, 35, .88);
          display: flex;
          align-items: center;
          padding: 0 18px;
          gap: 12px;
          margin-bottom: 15px;
        }

        .search-panel svg {
          color: #6b9bb7;
          flex: 0 0 auto;
        }

        .search-panel input {
          flex: 1;
          min-width: 0;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #e9f6fd;
          font-size: 14px;
        }

        .search-panel input::placeholder {
          color: #60788c;
        }

        .filter-button {
          height: 38px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          gap: 7px;
          border-radius: 8px;
          border: 1px solid rgba(47, 118, 163, .4);
          background: rgba(4, 20, 34, .9);
          color: #91abc0;
          cursor: pointer;
        }

        .filter-button.active {
          color: #43d9ff;
          border-color: rgba(0, 190, 255, .5);
        }

        /* PRESCRIPTION CARDS */

        .rx-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .prescription-card {
          border: 1px solid rgba(43, 113, 157, .48);
          border-radius: 12px;
          background:
            linear-gradient(
              145deg,
              rgba(6, 25, 43, .96),
              rgba(2, 13, 26, .97)
            );
          overflow: hidden;
          position: relative;
          transition: .25s;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, .12);
        }

        .prescription-card:hover {
          transform: translateY(-3px);
          border-color: rgba(54, 183, 235, .68);
          box-shadow:
            0 0 25px rgba(0, 180, 255, .08);
        }

        .prescription-card.active-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #00e6a0;
          box-shadow: 0 0 14px #00e6a0;
        }

        .prescription-card.completed-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #a35cff;
          box-shadow: 0 0 14px #a35cff;
        }

        .rx-card-top {
          min-height: 95px;
          padding: 17px 18px 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .patient-info {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .patient-avatar {
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 191, 255, .38);
          color: #12cfff;
          background:
            linear-gradient(
              145deg,
              rgba(0, 177, 255, .09),
              rgba(4, 29, 49, .75)
            );
          box-shadow:
            inset 0 0 15px rgba(0, 170, 255, .04);
        }

        .patient-name {
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .medicine-name {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #14d4ff;
          margin-top: 7px;
          font-size: 14px;
          font-weight: 600;
        }

        .medicine-name svg {
          filter: drop-shadow(
            0 0 5px rgba(0, 205, 255, .55)
          );
        }

        .rx-card-actions {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .status-badge {
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .status-badge.active {
          color: #00e6a0;
          background: rgba(0, 220, 151, .1);
          box-shadow:
            0 0 14px rgba(0, 225, 155, .07);
        }

        .status-badge.completed {
          color: #c18cff;
          background: rgba(151, 82, 255, .12);
        }

        .more-btn {
          border: none;
          background: transparent;
          color: #7890a2;
          cursor: pointer;
        }

        .rx-details {
          margin: 0 18px;
          border: 1px solid rgba(44, 103, 141, .32);
          border-radius: 9px;
          overflow: hidden;
        }

        .rx-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .rx-detail {
          min-height: 64px;
          padding: 11px;
          border-right: 1px solid rgba(44, 103, 141, .24);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rx-detail:last-child {
          border-right: none;
        }

        .rx-detail-icon {
          width: 30px;
          height: 30px;
          flex: 0 0 auto;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(70, 126, 164, .09);
          color: #8ba9c0;
        }

        .rx-detail-value {
          font-size: 12px;
          color: #edf7fc;
          line-height: 1.2;
        }

        .rx-detail-label {
          font-size: 9px;
          color: #617c91;
          margin-top: 3px;
        }

        .rx-notes {
          min-height: 60px;
          padding: 11px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-top: 1px solid rgba(44, 103, 141, .24);
        }

        .rx-notes svg {
          color: #819eb3;
        }

        .rx-notes-value {
          color: #dce8ef;
          font-size: 12px;
        }

        .rx-notes-label {
          color: #617c91;
          font-size: 9px;
          margin-top: 3px;
        }

        .rx-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 18px 15px;
        }

        .rx-date {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #7e97aa;
          font-size: 11px;
        }

        .rx-date svg {
          color: #5e8ba5;
        }

        .card-buttons {
          display: flex;
          gap: 7px;
        }

        .card-button {
          width: 40px;
          height: 35px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(0, 100, 160, .04);
          border: 1px solid rgba(35, 126, 181, .48);
          color: #54d8ff;
          transition: .2s;
        }

        .card-button:hover {
          background: rgba(0, 170, 255, .1);
          box-shadow: 0 0 13px rgba(0, 190, 255, .1);
        }

        .card-button.delete {
          color: #ff5574;
          border-color: rgba(255, 60, 91, .42);
        }

        .card-button.delete:hover {
          background: rgba(255, 50, 80, .08);
        }

        /* RIGHT PANEL */

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .side-panel {
          border: 1px solid rgba(42, 112, 159, .47);
          border-radius: 12px;
          background:
            linear-gradient(
              145deg,
              rgba(6, 24, 41, .97),
              rgba(2, 13, 26, .97)
            );
          overflow: hidden;
        }

        .side-panel-header {
          min-height: 54px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(47, 105, 143, .24);
        }

        .side-panel-icon {
          width: 29px;
          height: 29px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3bdcff;
          background: rgba(0, 188, 255, .08);
          border: 1px solid rgba(0, 194, 255, .24);
        }

        .side-panel-title {
          font-size: 14px;
          font-weight: 750;
        }

        .new-rx-form {
          padding: 15px;
        }

        .form-group {
          margin-bottom: 10px;
        }

        .form-field {
          width: 100%;
          height: 41px;
          border-radius: 8px;
          border: 1px solid rgba(46, 103, 140, .4);
          outline: none;
          background: rgba(3, 16, 29, .88);
          color: #dcebf3;
          padding: 0 12px;
          font-size: 12px;
          transition: .2s;
        }

        .form-field:focus {
          border-color: rgba(0, 201, 255, .62);
          box-shadow:
            0 0 14px rgba(0, 188, 255, .06);
        }

        .form-field::placeholder {
          color: #647d91;
        }

        textarea.form-field {
          height: 76px;
          padding-top: 12px;
          resize: vertical;
        }

        .add-rx-button {
          width: 100%;
          height: 43px;
          margin-top: 3px;
          border-radius: 8px;
          border: 1px solid rgba(0, 204, 255, .65);
          color: #4bddff;
          background:
            linear-gradient(
              135deg,
              rgba(0, 190, 255, .15),
              rgba(0, 93, 175, .1)
            );
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .add-rx-button:hover {
          box-shadow: 0 0 20px rgba(0, 200, 255, .12);
        }

        /* SUMMARY */

        .summary-content {
          padding: 18px;
        }

        .summary-flex {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .summary-donut {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background:
            conic-gradient(
              #00d99a 0 65.6%,
              #985aff 65.6% 100%
            );
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 24px rgba(0, 211, 158, .08);
          flex: 0 0 auto;
        }

        .summary-donut::before {
          content: "";
          position: absolute;
          inset: 22px;
          border-radius: 50%;
          background: #04101d;
          border: 1px solid rgba(47, 116, 151, .32);
        }

        .summary-center {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .summary-number {
          font-size: 23px;
          font-weight: 800;
        }

        .summary-label {
          font-size: 9px;
          color: #71899b;
          margin-top: 2px;
        }

        .summary-list {
          flex: 1;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px 0;
          border-bottom: 1px solid rgba(52, 99, 128, .18);
          font-size: 11px;
        }

        .summary-item:last-child {
          border-bottom: 0;
        }

        .summary-name {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #bdccd7;
        }

        .summary-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .summary-dot.green {
          background: #00dd9c;
          box-shadow: 0 0 7px #00dd9c;
        }

        .summary-dot.purple {
          background: #9a5aff;
          box-shadow: 0 0 7px #9a5aff;
        }

        .summary-value {
          color: #e5f1f8;
        }

        /* QUICK ACTIONS */

        .quick-actions {
          padding: 15px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .quick-action {
          height: 58px;
          border: 1px solid rgba(48, 110, 150, .36);
          border-radius: 9px;
          background: rgba(3, 17, 30, .75);
          color: #9eb4c5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
          font-size: 11px;
        }

        .quick-action:hover {
          color: #53dfff;
          border-color: rgba(0, 193, 255, .48);
          background: rgba(0, 144, 211, .05);
        }

        /* EMPTY */

        .empty-state {
          min-height: 300px;
          border: 1px dashed rgba(50, 112, 148, .4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
          color: #617a8e;
        }

        .empty-state svg {
          color: #168bb4;
          filter: drop-shadow(
            0 0 10px rgba(0, 190, 255, .35)
          );
        }

        /* MODAL */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 5, 12, .76);
          backdrop-filter: blur(9px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal {
          width: min(580px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid rgba(0, 202, 255, .45);
          border-radius: 15px;
          background:
            linear-gradient(
              145deg,
              rgba(5, 24, 41, .98),
              rgba(2, 12, 23, .99)
            );
          box-shadow:
            0 0 50px rgba(0, 190, 255, .12);
        }

        .modal-header {
          height: 66px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(50, 105, 140, .25);
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 750;
        }

        .close-modal {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid rgba(75, 115, 143, .35);
          background: transparent;
          color: #8096a7;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .modal-full {
          grid-column: 1 / -1;
        }

        .modal-label {
          display: block;
          color: #8299aa;
          font-size: 10px;
          margin-bottom: 6px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 18px;
        }

        .modal-cancel {
          height: 42px;
          padding: 0 17px;
          border-radius: 8px;
          border: 1px solid rgba(72, 108, 133, .4);
          background: transparent;
          color: #8ea3b3;
          cursor: pointer;
        }

        .modal-submit {
          height: 42px;
          padding: 0 19px;
          border-radius: 8px;
          border: 1px solid rgba(0, 204, 255, .6);
          background: rgba(0, 174, 235, .1);
          color: #45ddff;
          font-weight: 700;
          cursor: pointer;
        }

        /* DETAILS MODAL */

        .rx-preview {
          border: 1px solid rgba(45, 113, 155, .42);
          border-radius: 12px;
          overflow: hidden;
          background:
            linear-gradient(
              145deg,
              rgba(6, 25, 42, .9),
              rgba(2, 14, 26, .94)
            );
        }

        .rx-preview-header {
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(48, 106, 143, .23);
        }

        .preview-clinic {
          color: #29d9ff;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .preview-label {
          color: #728a9d;
          font-size: 10px;
          margin-top: 4px;
        }

        .preview-status {
          color: #00e4a0;
          background: rgba(0, 220, 153, .09);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 10px;
        }

        .preview-patient {
          padding: 17px;
          border-bottom: 1px solid rgba(48, 106, 143, .2);
        }

        .preview-patient-label {
          color: #657e91;
          font-size: 10px;
        }

        .preview-patient-name {
          font-size: 19px;
          font-weight: 750;
          margin-top: 4px;
        }

        .preview-medicine {
          margin: 17px;
          padding: 17px;
          border-radius: 10px;
          border: 1px solid rgba(0, 183, 255, .28);
          background:
            rgba(0, 149, 214, .045);
        }

        .preview-medicine-title {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #22d7ff;
          font-size: 17px;
          font-weight: 750;
        }

        .preview-data {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          margin-top: 15px;
        }

        .preview-data-item {
          padding: 10px;
          border-radius: 8px;
          background: rgba(2, 13, 24, .62);
          border: 1px solid rgba(48, 105, 140, .2);
        }

        .preview-data-label {
          color: #657e91;
          font-size: 9px;
        }

        .preview-data-value {
          color: #e6f2f8;
          font-size: 11px;
          margin-top: 4px;
        }

        @media (max-width: 1200px) {
          .rx-main-grid {
            grid-template-columns: 1fr;
          }

          .right-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }

          .side-panel:last-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 900px) {
          .rx-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .rx-cards {
            grid-template-columns: 1fr;
          }

          .rx-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .right-column {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .prescriptions-page {
            padding: 15px;
          }

          .rx-logo {
            width: 68px;
            height: 68px;
          }

          .rx-logo svg {
            width: 42px;
            height: 42px;
          }

          .rx-stats {
            grid-template-columns: 1fr;
          }

          .search-panel {
            height: auto;
            min-height: 60px;
            flex-wrap: wrap;
            padding: 10px;
          }

          .search-panel input {
            min-height: 38px;
          }

          .filter-button {
            flex: 1;
          }

          .rx-detail-grid {
            grid-template-columns: 1fr;
          }

          .rx-detail {
            border-right: 0;
            border-bottom: 1px solid rgba(44, 103, 141, .24);
          }

          .rx-detail:last-child {
            border-bottom: 0;
          }

          .modal-grid {
            grid-template-columns: 1fr;
          }

          .modal-full {
            grid-column: auto;
          }

          .preview-data {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="prescriptions-container">

        {/* HEADER */}
        <div className="rx-header">
          <div className="rx-brand">

            <div className="rx-logo">
              <svg
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="
                    M28 22
                    C18 25 14 37 17 48
                    C20 58 25 63 26 73
                    C27 83 31 91 38 91
                    C44 91 45 79 50 79
                    C55 79 56 91 62 91
                    C69 91 73 83 74 73
                    C75 63 80 58 83 48
                    C86 37 82 25 72 22
                    C64 19 57 24 50 24
                    C43 24 36 19 28 22Z
                  "
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  d="M31 35C37 30 43 31 50 35C57 31 63 30 69 35"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity=".65"
                />

                <circle
                  cx="50"
                  cy="53"
                  r="4"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div>
              <div className="rx-small-title">
                DENTAL CLINIC
              </div>

              <h1 className="rx-title">
                PRESCRIPTIONS
              </h1>

              <div className="rx-subtitle">
                Create and manage patient prescriptions
              </div>
            </div>
          </div>

          <button
            className="new-rx-button"
            onClick={() => setShowModal(true)}
          >
            <Plus size={19} />
            New Prescription
          </button>
        </div>

        {/* STATS */}
        <div className="rx-stats">

          <div className="rx-stat">
            <div className="rx-stat-icon cyan">
              <FileText size={24} />
            </div>

            <div>
              <div className="rx-stat-title">
                TOTAL PRESCRIPTIONS
              </div>

              <div className="rx-stat-value">
                {prescriptions.length}
              </div>

              <div className="rx-stat-description">
                All prescriptions
              </div>
            </div>
          </div>

          <div className="rx-stat">
            <div className="rx-stat-icon green">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <div className="rx-stat-title">
                ACTIVE
              </div>

              <div className="rx-stat-value">
                {activeCount}
              </div>

              <div className="rx-stat-description">
                Currently active
              </div>
            </div>
          </div>

          <div className="rx-stat">
            <div className="rx-stat-icon purple">
              <Clock3 size={24} />
            </div>

            <div>
              <div className="rx-stat-title">
                COMPLETED
              </div>

              <div className="rx-stat-value">
                {completedCount}
              </div>

              <div className="rx-stat-description">
                Completed treatments
              </div>
            </div>
          </div>

          <div className="rx-stat">
            <div className="rx-stat-icon orange">
              <Pill size={24} />
            </div>

            <div>
              <div className="rx-stat-title">
                MEDICINES
              </div>

              <div className="rx-stat-value">
                {medicinesCount}
              </div>

              <div className="rx-stat-description">
                Prescribed medicines
              </div>
            </div>
          </div>

        </div>

        {/* MAIN */}
        <div className="rx-main-grid">

          {/* LEFT */}
          <div>

            {/* SEARCH */}
            <div className="search-panel">
              <Search size={19} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by patient or medicine..."
              />

              <button
                className={`filter-button ${
                  statusFilter !== "All"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setStatusFilter(
                    statusFilter === "All"
                      ? "Active"
                      : statusFilter === "Active"
                      ? "Completed"
                      : "All"
                  )
                }
              >
                <Filter size={15} />

                {statusFilter === "All"
                  ? "Filter"
                  : statusFilter}

                <ChevronDown size={14} />
              </button>
            </div>

            {/* CARDS */}
            {filteredPrescriptions.length > 0 ? (
              <div className="rx-cards">

                {filteredPrescriptions.map(
                  (prescription) => (
                    <div
                      className={`prescription-card ${
                        prescription.status ===
                        "Active"
                          ? "active-card"
                          : "completed-card"
                      }`}
                      key={prescription.id}
                    >

                      {/* TOP */}
                      <div className="rx-card-top">

                        <div className="patient-info">

                          <div className="patient-avatar">
                            <CircleUserRound size={25} />
                          </div>

                          <div>
                            <div className="patient-name">
                              {prescription.patient}
                            </div>

                            <div className="medicine-name">
                              <Pill size={16} />
                              {prescription.medicine}
                            </div>
                          </div>

                        </div>

                        <div className="rx-card-actions">

                          <div
                            className={`status-badge ${
                              prescription.status ===
                              "Active"
                                ? "active"
                                : "completed"
                            }`}
                          >
                            <span>●</span>{" "}
                            {prescription.status}
                          </div>

                          <button className="more-btn">
                            <MoreVertical
                              size={17}
                            />
                          </button>

                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="rx-details">

                        <div className="rx-detail-grid">

                          <div className="rx-detail">
                            <div className="rx-detail-icon">
                              <ClipboardList
                                size={16}
                              />
                            </div>

                            <div>
                              <div className="rx-detail-value">
                                {prescription.dosage}
                              </div>

                              <div className="rx-detail-label">
                                Dosage
                              </div>
                            </div>
                          </div>

                          <div className="rx-detail">
                            <div className="rx-detail-icon">
                              <Clock3 size={16} />
                            </div>

                            <div>
                              <div className="rx-detail-value">
                                {prescription.frequency}
                              </div>

                              <div className="rx-detail-label">
                                Frequency
                              </div>
                            </div>
                          </div>

                          <div className="rx-detail">
                            <div className="rx-detail-icon">
                              <Clock3 size={16} />
                            </div>

                            <div>
                              <div className="rx-detail-value">
                                {prescription.duration}
                              </div>

                              <div className="rx-detail-label">
                                Duration
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="rx-notes">
                          <FileText size={18} />

                          <div>
                            <div className="rx-notes-value">
                              {prescription.notes}
                            </div>

                            <div className="rx-notes-label">
                              Doctor Notes
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* BOTTOM */}
                      <div className="rx-card-bottom">

                        <div className="rx-date">
                          <CalendarDays size={14} />
                          {prescription.date}
                        </div>

                        <div className="card-buttons">

                          <button
                            className="card-button"
                            title="View"
                            onClick={() =>
                              setSelectedPrescription(
                                prescription
                              )
                            }
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            className="card-button"
                            title="Print"
                            onClick={() =>
                              printPrescription(
                                prescription
                              )
                            }
                          >
                            <Printer size={17} />
                          </button>

                          <button
                            className="card-button delete"
                            title="Delete"
                            onClick={() =>
                              deletePrescription(
                                prescription.id
                              )
                            }
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </div>

                    </div>
                  )
                )}

              </div>
            ) : (
              <div className="empty-state">
                <FileText size={46} />
                <strong>
                  No prescriptions found
                </strong>
                <span>
                  Try changing your search or filter
                </span>
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="right-column">

            {/* NEW PRESCRIPTION */}
            <div className="side-panel">

              <div className="side-panel-header">
                <div className="side-panel-icon">
                  <FileText size={16} />
                </div>

                <div className="side-panel-title">
                  NEW PRESCRIPTION
                </div>
              </div>

              <form
                className="new-rx-form"
                onSubmit={handleAddPrescription}
              >

                <div className="form-group">
                  <input
                    className="form-field"
                    placeholder="Patient Name"
                    value={form.patient}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        patient: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-field"
                    placeholder="Medicine Name"
                    value={form.medicine}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        medicine: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-field"
                    placeholder="Dosage (e.g. 1 tablet)"
                    value={form.dosage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dosage: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-field"
                    placeholder="Frequency (e.g. 3 times daily)"
                    value={form.frequency}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        frequency: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-field"
                    placeholder="Duration (e.g. 5 days)"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-field"
                    placeholder="Doctor Notes (optional)"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  className="add-rx-button"
                  type="submit"
                >
                  <Plus size={17} />
                  Add Prescription
                </button>

              </form>
            </div>

            {/* SUMMARY */}
            <div className="side-panel">

              <div className="side-panel-header">
                <div className="side-panel-title">
                  PRESCRIPTION SUMMARY
                </div>
              </div>

              <div className="summary-content">

                <div className="summary-flex">

                  <div className="summary-donut">
                    <div className="summary-center">
                      <div className="summary-number">
                        {prescriptions.length}
                      </div>

                      <div className="summary-label">
                        Total
                      </div>
                    </div>
                  </div>

                  <div className="summary-list">

                    <div className="summary-item">
                      <div className="summary-name">
                        <span className="summary-dot green" />
                        Active
                      </div>

                      <div className="summary-value">
                        {activeCount}
                      </div>
                    </div>

                    <div className="summary-item">
                      <div className="summary-name">
                        <span className="summary-dot purple" />
                        Completed
                      </div>

                      <div className="summary-value">
                        {completedCount}
                      </div>
                    </div>

                    <div className="summary-item">
                      <div className="summary-name">
                        Total
                      </div>

                      <div className="summary-value">
                        {prescriptions.length}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="side-panel">

              <div className="side-panel-header">
                <div className="side-panel-title">
                  QUICK ACTIONS
                </div>
              </div>

              <div className="quick-actions">

                <button
                  className="quick-action"
                  onClick={() => {
                    prescriptions.forEach(
                      (prescription) =>
                        printPrescription(
                          prescription
                        )
                    );
                  }}
                >
                  <Printer size={17} />
                  Print All
                </button>

                <button
                  className="quick-action"
                  onClick={() => {
                    const data =
                      JSON.stringify(
                        prescriptions,
                        null,
                        2
                      );

                    const blob = new Blob(
                      [data],
                      {
                        type: "application/json",
                      }
                    );

                    const url =
                      URL.createObjectURL(blob);

                    const a =
                      document.createElement("a");

                    a.href = url;
                    a.download =
                      "prescriptions.json";

                    a.click();

                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download size={17} />
                  Export
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ADD MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="modal">

            <div className="modal-header">

              <div className="modal-title">
                <div className="side-panel-icon">
                  <Plus size={17} />
                </div>

                New Prescription
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={17} />
              </button>

            </div>

            <form
              className="modal-body"
              onSubmit={handleAddPrescription}
            >

              <div className="modal-grid">

                <div>
                  <label className="modal-label">
                    Patient Name
                  </label>

                  <input
                    className="form-field"
                    placeholder="Enter patient name"
                    value={form.patient}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        patient: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="modal-label">
                    Medicine Name
                  </label>

                  <input
                    className="form-field"
                    placeholder="Enter medicine"
                    value={form.medicine}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        medicine: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="modal-label">
                    Dosage
                  </label>

                  <input
                    className="form-field"
                    placeholder="1 tablet"
                    value={form.dosage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dosage: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="modal-label">
                    Frequency
                  </label>

                  <input
                    className="form-field"
                    placeholder="3 times daily"
                    value={form.frequency}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        frequency: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="modal-label">
                    Duration
                  </label>

                  <input
                    className="form-field"
                    placeholder="5 days"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="modal-full">
                  <label className="modal-label">
                    Doctor Notes
                  </label>

                  <textarea
                    className="form-field"
                    placeholder="Additional instructions..."
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-submit"
                >
                  <Plus
                    size={16}
                    style={{
                      verticalAlign: "middle",
                      marginRight: 5,
                    }}
                  />
                  Create Prescription
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedPrescription && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedPrescription(null);
            }
          }}
        >
          <div className="modal">

            <div className="modal-header">

              <div className="modal-title">
                <Activity
                  size={19}
                  color="#2bdcff"
                />

                Prescription Details
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedPrescription(null)
                }
              >
                <X size={17} />
              </button>

            </div>

            <div className="modal-body">

              <div className="rx-preview">

                <div className="rx-preview-header">

                  <div>
                    <div className="preview-clinic">
                      DENTAL CLINIC
                    </div>

                    <div className="preview-label">
                      DIGITAL PRESCRIPTION
                    </div>
                  </div>

                  <div className="preview-status">
                    {selectedPrescription.status}
                  </div>

                </div>

                <div className="preview-patient">

                  <div className="preview-patient-label">
                    PATIENT
                  </div>

                  <div className="preview-patient-name">
                    {selectedPrescription.patient}
                  </div>

                </div>

                <div className="preview-medicine">

                  <div className="preview-medicine-title">
                    <Pill size={20} />

                    {selectedPrescription.medicine}
                  </div>

                  <div className="preview-data">

                    <div className="preview-data-item">
                      <div className="preview-data-label">
                        DOSAGE
                      </div>

                      <div className="preview-data-value">
                        {selectedPrescription.dosage}
                      </div>
                    </div>

                    <div className="preview-data-item">
                      <div className="preview-data-label">
                        FREQUENCY
                      </div>

                      <div className="preview-data-value">
                        {selectedPrescription.frequency}
                      </div>
                    </div>

                    <div className="preview-data-item">
                      <div className="preview-data-label">
                        DURATION
                      </div>

                      <div className="preview-data-value">
                        {selectedPrescription.duration}
                      </div>
                    </div>

                  </div>

                  <div
                    style={{
                      marginTop: 16,
                      color: "#7892a5",
                      fontSize: 10,
                    }}
                  >
                    DOCTOR NOTES
                  </div>

                  <div
                    style={{
                      marginTop: 5,
                      color: "#dceaf2",
                      fontSize: 12,
                    }}
                  >
                    {selectedPrescription.notes}
                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="modal-cancel"
                  onClick={() =>
                    setSelectedPrescription(null)
                  }
                >
                  Close
                </button>

                <button
                  className="modal-submit"
                  onClick={() =>
                    printPrescription(
                      selectedPrescription
                    )
                  }
                >
                  <Printer
                    size={16}
                    style={{
                      verticalAlign: "middle",
                      marginRight: 5,
                    }}
                  />
                  Print Prescription
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}