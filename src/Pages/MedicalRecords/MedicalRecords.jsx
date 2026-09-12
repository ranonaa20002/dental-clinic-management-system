import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  SlidersHorizontal,
  Eye,
  Trash2,
  MoreVertical,
  CalendarDays,
  Phone,
  User,
  Activity,
  ClipboardList,
  FileText,
  Stethoscope,
  HeartPulse,
  CheckCircle2,
  Clock3,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Pill,
  Download,
  Printer,
} from "lucide-react";

export default function MedicalRecords() {
  const [records, setRecords] = useState([
    {
      id: 1,
      recordNumber: "MR-2026-001",
      patient: "Ahmed Mohamed",
      phone: "+20 100 123 4567",
      lastVisit: "2026-08-20",
      treatment: "Root Canal",
      doctor: "Dr. Ahmed Ali",
      status: "Active",
      notes: "Patient needs follow-up after two weeks.",
      medications: ["Augmentin 625mg", "Brufen 400mg"],
      visits: 8,
      allergies: "None",
      diagnosis: "Deep dental caries",
    },
    {
      id: 2,
      recordNumber: "MR-2026-002",
      patient: "Sara Khaled",
      phone: "+20 101 234 5678",
      lastVisit: "2026-08-18",
      treatment: "Dental Cleaning",
      doctor: "Dr. Ahmed Ali",
      status: "Active",
      notes: "Regular cleaning and oral hygiene follow-up.",
      medications: ["Mouthwash"],
      visits: 5,
      allergies: "Penicillin",
      diagnosis: "Gingivitis",
    },
    {
      id: 3,
      recordNumber: "MR-2026-003",
      patient: "Mahmoud Hassan",
      phone: "+20 102 345 6789",
      lastVisit: "2026-08-15",
      treatment: "Dental Crown",
      doctor: "Dr. Omar Hassan",
      status: "Completed",
      notes: "Crown successfully installed.",
      medications: ["Amoxicillin 500mg"],
      visits: 11,
      allergies: "None",
      diagnosis: "Damaged molar",
    },
    {
      id: 4,
      recordNumber: "MR-2026-004",
      patient: "Mona Ali",
      phone: "+20 103 456 7890",
      lastVisit: "2026-08-12",
      treatment: "Teeth Whitening",
      doctor: "Dr. Ahmed Ali",
      status: "Active",
      notes: "Avoid colored drinks for 48 hours.",
      medications: [],
      visits: 3,
      allergies: "None",
      diagnosis: "Tooth discoloration",
    },
    {
      id: 5,
      recordNumber: "MR-2026-005",
      patient: "Laila Ahmed",
      phone: "+20 104 567 8901",
      lastVisit: "2026-08-10",
      treatment: "Dental Filling",
      doctor: "Dr. Omar Hassan",
      status: "Pending",
      notes: "Waiting for second appointment.",
      medications: ["Paracetamol 500mg"],
      visits: 2,
      allergies: "None",
      diagnosis: "Dental cavity",
    },
    {
      id: 6,
      recordNumber: "MR-2026-006",
      patient: "Youssef Adel",
      phone: "+20 105 678 9012",
      lastVisit: "2026-08-07",
      treatment: "Orthodontic Check",
      doctor: "Dr. Sara Hassan",
      status: "Active",
      notes: "Monthly orthodontic adjustment.",
      medications: [],
      visits: 14,
      allergies: "Latex",
      diagnosis: "Malocclusion",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    patient: "",
    phone: "",
    treatment: "",
    doctor: "",
    diagnosis: "",
    notes: "",
  });

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const text =
        `${record.patient} ${record.phone} ${record.recordNumber} ${record.treatment}`
          .toLowerCase();

      const matchesSearch = text.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const activeCount = records.filter(
    (r) => r.status === "Active"
  ).length;

  const completedCount = records.filter(
    (r) => r.status === "Completed"
  ).length;

  const pendingCount = records.filter(
    (r) => r.status === "Pending"
  ).length;

  const addRecord = (e) => {
    e.preventDefault();

    if (
      !form.patient.trim() ||
      !form.phone.trim() ||
      !form.treatment.trim()
    ) {
      return;
    }

    const newRecord = {
      id: Date.now(),
      recordNumber: `MR-${new Date().getFullYear()}-${String(
        records.length + 1
      ).padStart(3, "0")}`,
      patient: form.patient.trim(),
      phone: form.phone.trim(),
      lastVisit: new Date()
        .toISOString()
        .split("T")[0],
      treatment: form.treatment.trim(),
      doctor: form.doctor.trim() || "Dr. Ahmed Ali",
      status: "Active",
      notes:
        form.notes.trim() ||
        "No additional notes.",
      medications: [],
      visits: 1,
      allergies: "None",
      diagnosis:
        form.diagnosis.trim() ||
        "Not specified",
    };

    setRecords((prev) => [newRecord, ...prev]);

    setForm({
      patient: "",
      phone: "",
      treatment: "",
      doctor: "",
      diagnosis: "",
      notes: "",
    });

    setShowAddModal(false);
  };

  const deleteRecord = (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this medical record?"
    );

    if (!ok) return;

    setRecords((prev) =>
      prev.filter((record) => record.id !== id)
    );

    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (status === "Active") return "active";
    if (status === "Completed") return "completed";
    if (status === "Pending") return "pending";
    return "";
  };

  const getStatusIcon = (status) => {
    if (status === "Active") {
      return <Activity size={13} />;
    }

    if (status === "Completed") {
      return <CheckCircle2 size={13} />;
    }

    return <Clock3 size={13} />;
  };

  const printRecord = (record) => {
    const win = window.open(
      "",
      "_blank",
      "width=850,height=900"
    );

    if (!win) return;

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Medical Record - ${
          record.patient
        }</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 45px;
            color: #111827;
          }

          h1 {
            color: #0284c7;
            margin-bottom: 4px;
          }

          .subtitle {
            color: #64748b;
            margin-bottom: 30px;
          }

          .section {
            margin-top: 24px;
            padding: 20px;
            border: 1px solid #dbe5ec;
            border-radius: 12px;
          }

          .row {
            display: flex;
            justify-content: space-between;
            padding: 11px 0;
            border-bottom: 1px solid #edf2f7;
          }

          .row:last-child {
            border-bottom: none;
          }

          .label {
            color: #64748b;
            font-weight: bold;
          }

          .value {
            font-weight: 600;
          }
        </style>
      </head>

      <body>

        <h1>DENTAL CLINIC</h1>

        <div class="subtitle">
          Medical Record
        </div>

        <div class="section">

          <div class="row">
            <span class="label">
              Patient
            </span>

            <span class="value">
              ${record.patient}
            </span>
          </div>

          <div class="row">
            <span class="label">
              Record Number
            </span>

            <span class="value">
              ${record.recordNumber}
            </span>
          </div>

          <div class="row">
            <span class="label">
              Phone
            </span>

            <span class="value">
              ${record.phone}
            </span>
          </div>

          <div class="row">
            <span class="label">
              Last Visit
            </span>

            <span class="value">
              ${formatDate(record.lastVisit)}
            </span>
          </div>

          <div class="row">
            <span class="label">
              Treatment
            </span>

            <span class="value">
              ${record.treatment}
            </span>
          </div>

          <div class="row">
            <span class="label">
              Doctor
            </span>

            <span class="value">
              ${record.doctor}
            </span>
          </div>

          <div class="row">
            <span class="label">
              Diagnosis
            </span>

            <span class="value">
              ${record.diagnosis}
            </span>
          </div>

        </div>

        <div class="section">

          <strong>Doctor Notes</strong>

          <p>
            ${record.notes}
          </p>

        </div>

      </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="medical-records-page">
      <style>{`

        * {
          box-sizing: border-box;
        }

        .medical-records-page {
          min-height: 100vh;
          width: 100%;
          padding: 25px;
          color: #edf8ff;
          background:
            radial-gradient(
              circle at 8% 8%,
              rgba(0, 205, 255, .09),
              transparent 28%
            ),
            radial-gradient(
              circle at 94% 30%,
              rgba(110, 74, 255, .08),
              transparent 30%
            ),
            #020914;
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

        .medical-records-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .28;
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

        .records-container {
          max-width: 1550px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        /* HEADER */

        .records-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .records-title-area {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .records-logo {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          border: 1px solid rgba(0, 210, 255, .48);
          background:
            radial-gradient(
              circle,
              rgba(0, 207, 255, .13),
              transparent 70%
            ),
            rgba(4, 22, 38, .9);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1edaff;
          box-shadow:
            0 0 25px rgba(0, 205, 255, .08);
        }

        .records-logo svg {
          filter:
            drop-shadow(0 0 7px rgba(0, 215, 255, .8));
        }

        .records-kicker {
          color: #16d7ff;
          font-size: 11px;
          letter-spacing: 1.8px;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .records-title {
          margin: 0;
          font-size: 36px;
          font-weight: 850;
          letter-spacing: -.7px;
        }

        .records-subtitle {
          margin-top: 5px;
          color: #7890a4;
          font-size: 13px;
        }

        .add-record-button {
          height: 45px;
          padding: 0 18px;
          border-radius: 9px;
          border: 1px solid rgba(0, 205, 255, .62);
          color: #36dcff;
          background:
            linear-gradient(
              135deg,
              rgba(0, 192, 255, .15),
              rgba(0, 90, 170, .08)
            );
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 750;
          cursor: pointer;
          transition: .25s;
        }

        .add-record-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 25px rgba(0, 203, 255, .14);
        }

        /* STATS */

        .records-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 15px;
        }

        .record-stat {
          min-height: 112px;
          border: 1px solid rgba(39, 105, 149, .46);
          border-radius: 11px;
          background:
            linear-gradient(
              145deg,
              rgba(6, 25, 43, .96),
              rgba(2, 13, 26, .96)
            );
          padding: 17px;
          display: flex;
          align-items: center;
          gap: 13px;
          position: relative;
          overflow: hidden;
        }

        .record-stat::after {
          content: "";
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          right: -70px;
          top: -70px;
          background: rgba(0, 194, 255, .055);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue {
          color: #1ed7ff;
          border: 1px solid rgba(0, 207, 255, .55);
          box-shadow:
            0 0 20px rgba(0, 207, 255, .1);
        }

        .stat-icon.green {
          color: #00e3a0;
          border: 1px solid rgba(0, 225, 159, .55);
          box-shadow:
            0 0 20px rgba(0, 225, 159, .1);
        }

        .stat-icon.purple {
          color: #a568ff;
          border: 1px solid rgba(165, 104, 255, .55);
        }

        .stat-icon.orange {
          color: #ffb52e;
          border: 1px solid rgba(255, 181, 46, .55);
        }

        .stat-label {
          color: #7892a6;
          font-size: 10px;
          font-weight: 650;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 850;
          margin-top: 4px;
        }

        .stat-description {
          color: #5e778b;
          font-size: 9px;
          margin-top: 3px;
        }

        /* SEARCH */

        .records-toolbar {
          min-height: 62px;
          padding: 10px;
          border: 1px solid rgba(41, 105, 145, .45);
          border-radius: 11px;
          background: rgba(4, 20, 35, .9);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .search-box {
          flex: 1;
          height: 40px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          border: 1px solid rgba(42, 103, 139, .35);
          border-radius: 8px;
          background: rgba(2, 14, 25, .82);
        }

        .search-box svg {
          color: #68879d;
          flex: 0 0 auto;
        }

        .search-box input {
          width: 100%;
          height: 100%;
          border: 0;
          outline: none;
          background: transparent;
          color: #e8f5fc;
          font-size: 12px;
        }

        .search-box input::placeholder {
          color: #5f788d;
        }

        .filter-select {
          height: 40px;
          min-width: 145px;
          border-radius: 8px;
          padding: 0 10px;
          border: 1px solid rgba(42, 103, 139, .38);
          outline: none;
          color: #9ab0c0;
          background: #041321;
          cursor: pointer;
        }

        .filter-select:focus {
          border-color: rgba(0, 204, 255, .5);
        }

        .filter-tools {
          height: 40px;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(42, 103, 139, .38);
          color: #7e9aae;
          background: #041321;
          cursor: pointer;
        }

        /* CONTENT */

        .records-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 365px;
          gap: 15px;
          align-items: start;
        }

        /* TABLE */

        .records-table-panel {
          border: 1px solid rgba(39, 106, 149, .48);
          border-radius: 11px;
          overflow: hidden;
          background:
            linear-gradient(
              145deg,
              rgba(4, 22, 38, .96),
              rgba(2, 13, 25, .97)
            );
        }

        .panel-heading {
          height: 54px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(45, 101, 136, .25);
        }

        .panel-heading-left {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .panel-heading-icon {
          width: 29px;
          height: 29px;
          border-radius: 7px;
          color: #26d9ff;
          border: 1px solid rgba(0, 199, 255, .28);
          background: rgba(0, 183, 255, .07);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panel-heading-title {
          font-size: 13px;
          font-weight: 750;
        }

        .record-count {
          color: #668094;
          font-size: 10px;
        }

        .table-scroll {
          overflow-x: auto;
        }

        .records-table {
          width: 100%;
          min-width: 900px;
          border-collapse: collapse;
        }

        .records-table th {
          height: 48px;
          padding: 0 13px;
          text-align: left;
          color: #698297;
          font-size: 10px;
          font-weight: 650;
          background: rgba(0, 10, 20, .28);
          border-bottom: 1px solid rgba(42, 100, 136, .25);
          white-space: nowrap;
        }

        .records-table td {
          height: 70px;
          padding: 0 13px;
          color: #b9cad6;
          font-size: 11px;
          border-bottom: 1px solid rgba(42, 95, 127, .18);
          white-space: nowrap;
        }

        .records-table tbody tr {
          transition: .2s;
        }

        .records-table tbody tr:hover {
          background:
            rgba(0, 180, 255, .035);
        }

        .patient-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .patient-avatar {
          width: 39px;
          height: 39px;
          border-radius: 10px;
          border: 1px solid rgba(0, 198, 255, .3);
          color: #21d9ff;
          background:
            linear-gradient(
              145deg,
              rgba(0, 190, 255, .1),
              rgba(3, 25, 43, .8)
            );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .patient-name-table {
          color: #e9f5fb;
          font-weight: 700;
          font-size: 12px;
        }

        .record-number {
          color: #557489;
          font-size: 9px;
          margin-top: 3px;
        }

        .phone-cell {
          color: #8da7b9;
        }

        .date-cell {
          color: #9bb0bf;
        }

        .treatment-cell {
          color: #cbd9e2;
          font-weight: 600;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 9px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 750;
        }

        .status-pill.active {
          color: #00e5a1;
          background: rgba(0, 224, 157, .08);
          border: 1px solid rgba(0, 224, 157, .18);
        }

        .status-pill.completed {
          color: #a875ff;
          background: rgba(156, 85, 255, .09);
          border: 1px solid rgba(156, 85, 255, .18);
        }

        .status-pill.pending {
          color: #ffb72e;
          background: rgba(255, 183, 46, .08);
          border: 1px solid rgba(255, 183, 46, .18);
        }

        .table-actions {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .table-action {
          width: 31px;
          height: 31px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(44, 109, 148, .4);
          color: #5fcfff;
          cursor: pointer;
          transition: .2s;
        }

        .table-action:hover {
          background: rgba(0, 180, 255, .08);
          border-color: rgba(0, 202, 255, .6);
          box-shadow:
            0 0 13px rgba(0, 190, 255, .09);
        }

        .table-action.delete {
          color: #ff5875;
          border-color: rgba(255, 74, 105, .28);
        }

        .pagination {
          height: 54px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(42, 101, 137, .23);
        }

        .pagination-text {
          color: #607b8f;
          font-size: 10px;
        }

        .pagination-buttons {
          display: flex;
          gap: 5px;
        }

        .page-button {
          width: 32px;
          height: 32px;
          border-radius: 7px;
          background: rgba(2, 15, 27, .7);
          color: #7893a7;
          border: 1px solid rgba(44, 103, 139, .35);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .page-button.active {
          color: white;
          background: rgba(0, 155, 235, .18);
          border-color: rgba(0, 203, 255, .62);
          box-shadow:
            0 0 14px rgba(0, 190, 255, .1);
        }

        /* DETAILS */

        .details-panel {
          border: 1px solid rgba(41, 108, 151, .48);
          border-radius: 11px;
          background:
            linear-gradient(
              145deg,
              rgba(6, 25, 42, .97),
              rgba(2, 13, 25, .98)
            );
          overflow: hidden;
          position: sticky;
          top: 15px;
        }

        .details-header {
          min-height: 58px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(44, 103, 139, .25);
        }

        .details-title {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 750;
        }

        .details-title-icon {
          color: #22d8ff;
        }

        .close-details {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          border: 1px solid rgba(67, 104, 130, .35);
          color: #7890a1;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .details-content {
          padding: 16px;
        }

        .selected-patient {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(46, 101, 135, .22);
        }

        .large-avatar {
          width: 58px;
          height: 58px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #28d9ff;
          border: 1px solid rgba(0, 200, 255, .4);
          background:
            radial-gradient(
              circle,
              rgba(0, 197, 255, .1),
              transparent 70%
            );
          box-shadow:
            0 0 18px rgba(0, 190, 255, .07);
        }

        .selected-name {
          font-size: 17px;
          font-weight: 800;
        }

        .selected-record {
          color: #607e92;
          font-size: 10px;
          margin-top: 4px;
        }

        .detail-section {
          border-bottom: 1px solid rgba(46, 101, 135, .2);
          padding: 13px 0;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 8px 0;
        }

        .detail-row-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6f8da1;
          font-size: 10px;
        }

        .detail-row-left svg {
          color: #3ebeff;
        }

        .detail-row-value {
          color: #d9e7ef;
          font-size: 11px;
          text-align: right;
          font-weight: 600;
        }

        .detail-row-value.green {
          color: #00e1a0;
        }

        .detail-row-value.orange {
          color: #ffb72d;
        }

        .diagnosis-box {
          margin-top: 10px;
          padding: 12px;
          border-radius: 9px;
          border: 1px solid rgba(0, 196, 255, .18);
          background: rgba(0, 159, 225, .04);
        }

        .diagnosis-label {
          color: #648095;
          font-size: 9px;
          margin-bottom: 5px;
        }

        .diagnosis-value {
          color: #d9e9f2;
          font-size: 11px;
        }

        .notes-box {
          padding-top: 13px;
        }

        .notes-title {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #7895a8;
          font-size: 10px;
          margin-bottom: 8px;
        }

        .notes-text {
          color: #b7cad6;
          font-size: 10px;
          line-height: 1.65;
        }

        .medications {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 8px;
        }

        .medication {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 9px;
          border-radius: 7px;
          border: 1px solid rgba(53, 103, 135, .25);
          background: rgba(0, 15, 27, .55);
          color: #aec3d0;
          font-size: 10px;
        }

        .medication svg {
          color: #39d8ff;
        }

        .details-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 15px;
        }

        .details-action {
          height: 38px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
        }

        .details-action.primary {
          color: #38dbff;
          border: 1px solid rgba(0, 202, 255, .5);
          background: rgba(0, 176, 240, .08);
        }

        .details-action.secondary {
          color: #8299aa;
          border: 1px solid rgba(67, 104, 130, .35);
          background: transparent;
        }

        /* EMPTY */

        .empty-records {
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 9px;
          color: #5e778a;
        }

        .empty-records svg {
          color: #178cb5;
          filter:
            drop-shadow(
              0 0 10px rgba(0, 195, 255, .3)
            );
        }

        /* MODAL */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 5, 12, .78);
          backdrop-filter: blur(9px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal {
          width: min(620px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 14px;
          border: 1px solid rgba(0, 205, 255, .46);
          background:
            linear-gradient(
              145deg,
              rgba(5, 24, 41, .99),
              rgba(2, 12, 23, .99)
            );
          box-shadow:
            0 0 50px rgba(0, 190, 255, .12);
        }

        .modal-header {
          min-height: 62px;
          padding: 0 19px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(48, 104, 139, .24);
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 15px;
          font-weight: 800;
        }

        .modal-close {
          width: 33px;
          height: 33px;
          border-radius: 7px;
          border: 1px solid rgba(70, 108, 135, .35);
          color: #8098aa;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .modal-body {
          padding: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-label {
          display: block;
          color: #7891a3;
          font-size: 10px;
          margin-bottom: 6px;
        }

        .form-input {
          width: 100%;
          height: 42px;
          padding: 0 12px;
          border-radius: 8px;
          border: 1px solid rgba(48, 106, 141, .38);
          outline: none;
          background: rgba(2, 14, 25, .88);
          color: #e6f4fa;
          font-size: 12px;
        }

        .form-input:focus {
          border-color: rgba(0, 202, 255, .62);
          box-shadow:
            0 0 15px rgba(0, 190, 255, .07);
        }

        textarea.form-input {
          height: 85px;
          resize: vertical;
          padding-top: 11px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 18px;
        }

        .modal-cancel {
          height: 41px;
          padding: 0 16px;
          border-radius: 8px;
          border: 1px solid rgba(70, 105, 130, .38);
          background: transparent;
          color: #8aa0b0;
          cursor: pointer;
        }

        .modal-save {
          height: 41px;
          padding: 0 17px;
          border-radius: 8px;
          border: 1px solid rgba(0, 202, 255, .58);
          background: rgba(0, 183, 245, .1);
          color: #3dddff;
          font-weight: 750;
          cursor: pointer;
        }

        @media (max-width: 1200px) {
          .records-layout {
            grid-template-columns: 1fr;
          }

          .details-panel {
            position: relative;
            top: auto;
          }
        }

        @media (max-width: 900px) {
          .records-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .records-header {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
          .medical-records-page {
            padding: 15px;
          }

          .records-stats {
            grid-template-columns: 1fr;
          }

          .records-title {
            font-size: 28px;
          }

          .records-toolbar {
            flex-wrap: wrap;
          }

          .search-box {
            flex-basis: 100%;
          }

          .filter-select {
            flex: 1;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }
        }

      `}</style>

      <div className="records-container">

        {/* HEADER */}

        <div className="records-header">

          <div className="records-title-area">

            <div className="records-logo">
              <FolderOpen size={31} />
            </div>

            <div>
              <div className="records-kicker">
                DENTAL MEDICAL SYSTEM
              </div>

              <h1 className="records-title">
                Medical Records
              </h1>

              <div className="records-subtitle">
                Manage and organize patient medical records
              </div>
            </div>

          </div>

          <button
            className="add-record-button"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            <Plus size={18} />
            New Medical Record
          </button>

        </div>

        {/* STATS */}

        <div className="records-stats">

          <div className="record-stat">

            <div className="stat-icon blue">
              <FolderOpen size={24} />
            </div>

            <div>
              <div className="stat-label">
                TOTAL RECORDS
              </div>

              <div className="stat-value">
                {records.length}
              </div>

              <div className="stat-description">
                All medical records
              </div>
            </div>

          </div>

          <div className="record-stat">

            <div className="stat-icon green">
              <HeartPulse size={24} />
            </div>

            <div>
              <div className="stat-label">
                ACTIVE CASES
              </div>

              <div className="stat-value">
                {activeCount}
              </div>

              <div className="stat-description">
                Patients under treatment
              </div>
            </div>

          </div>

          <div className="record-stat">

            <div className="stat-icon purple">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <div className="stat-label">
                COMPLETED
              </div>

              <div className="stat-value">
                {completedCount}
              </div>

              <div className="stat-description">
                Completed treatments
              </div>
            </div>

          </div>

          <div className="record-stat">

            <div className="stat-icon orange">
              <Clock3 size={24} />
            </div>

            <div>
              <div className="stat-label">
                PENDING
              </div>

              <div className="stat-value">
                {pendingCount}
              </div>

              <div className="stat-description">
                Awaiting follow-up
              </div>
            </div>

          </div>

        </div>

        {/* TOOLBAR */}

        <div className="records-toolbar">

          <div className="search-box">

            <Search size={17} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search patient, phone number or record..."
            />

          </div>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Pending">
              Pending
            </option>
          </select>

          <button className="filter-tools">
            <SlidersHorizontal size={17} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="records-layout">

          {/* TABLE */}

          <div className="records-table-panel">

            <div className="panel-heading">

              <div className="panel-heading-left">

                <div className="panel-heading-icon">
                  <ClipboardList size={16} />
                </div>

                <div className="panel-heading-title">
                  Medical Records List
                </div>

              </div>

              <div className="record-count">
                {filteredRecords.length} records
              </div>

            </div>

            {filteredRecords.length > 0 ? (
              <>

                <div className="table-scroll">

                  <table className="records-table">

                    <thead>
                      <tr>

                        <th>
                          PATIENT
                        </th>

                        <th>
                          PHONE
                        </th>

                        <th>
                          LAST VISIT
                        </th>

                        <th>
                          TREATMENT
                        </th>

                        <th>
                          STATUS
                        </th>

                        <th>
                          ACTIONS
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {filteredRecords.map(
                        (record) => (
                          <tr key={record.id}>

                            <td>

                              <div className="patient-cell">

                                <div className="patient-avatar">
                                  <User size={19} />
                                </div>

                                <div>

                                  <div className="patient-name-table">
                                    {record.patient}
                                  </div>

                                  <div className="record-number">
                                    {record.recordNumber}
                                  </div>

                                </div>

                              </div>

                            </td>

                            <td>
                              <div className="phone-cell">
                                {record.phone}
                              </div>
                            </td>

                            <td>
                              <div className="date-cell">
                                {formatDate(
                                  record.lastVisit
                                )}
                              </div>
                            </td>

                            <td>
                              <div className="treatment-cell">
                                {record.treatment}
                              </div>
                            </td>

                            <td>

                              <div
                                className={`status-pill ${getStatusClass(
                                  record.status
                                )}`}
                              >
                                {getStatusIcon(
                                  record.status
                                )}

                                {record.status}
                              </div>

                            </td>

                            <td>

                              <div className="table-actions">

                                <button
                                  className="table-action"
                                  title="View"
                                  onClick={() =>
                                    setSelectedRecord(
                                      record
                                    )
                                  }
                                >
                                  <Eye size={15} />
                                </button>

                                <button
                                  className="table-action delete"
                                  title="Delete"
                                  onClick={() =>
                                    deleteRecord(
                                      record.id
                                    )
                                  }
                                >
                                  <Trash2 size={14} />
                                </button>

                                <button
                                  className="table-action"
                                  title="More"
                                >
                                  <MoreVertical
                                    size={15}
                                  />
                                </button>

                              </div>

                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

                {/* PAGINATION */}

                <div className="pagination">

                  <div className="pagination-text">
                    Showing 1–{filteredRecords.length} of{" "}
                    {records.length} records
                  </div>

                  <div className="pagination-buttons">

                    <button className="page-button">
                      <ChevronLeft size={15} />
                    </button>

                    <button className="page-button active">
                      1
                    </button>

                    <button className="page-button">
                      2
                    </button>

                    <button className="page-button">
                      3
                    </button>

                    <button className="page-button">
                      <ChevronRight size={15} />
                    </button>

                  </div>

                </div>

              </>
            ) : (
              <div className="empty-records">

                <FolderOpen size={45} />

                <strong>
                  No medical records found
                </strong>

                <span>
                  Try another search or filter
                </span>

              </div>
            )}

          </div>

          {/* DETAILS */}

          <div className="details-panel">

            <div className="details-header">

              <div className="details-title">

                <FileText
                  size={18}
                  className="details-title-icon"
                />

                Latest Medical Record

              </div>

              {selectedRecord && (
                <button
                  className="close-details"
                  onClick={() =>
                    setSelectedRecord(null)
                  }
                >
                  <X size={15} />
                </button>
              )}

            </div>

            <div className="details-content">

              {selectedRecord ? (
                <>

                  <div className="selected-patient">

                    <div className="large-avatar">
                      <User size={28} />
                    </div>

                    <div>

                      <div className="selected-name">
                        {selectedRecord.patient}
                      </div>

                      <div className="selected-record">
                        {selectedRecord.recordNumber}
                      </div>

                    </div>

                  </div>

                  <div className="detail-section">

                    <div className="detail-row">

                      <div className="detail-row-left">
                        <CalendarDays size={15} />
                        Last Visit
                      </div>

                      <div className="detail-row-value">
                        {formatDate(
                          selectedRecord.lastVisit
                        )}
                      </div>

                    </div>

                    <div className="detail-row">

                      <div className="detail-row-left">
                        <Phone size={15} />
                        Phone
                      </div>

                      <div className="detail-row-value">
                        {selectedRecord.phone}
                      </div>

                    </div>

                    <div className="detail-row">

                      <div className="detail-row-left">
                        <Activity size={15} />
                        Current Status
                      </div>

                      <div
                        className={`detail-row-value ${
                          selectedRecord.status ===
                          "Active"
                            ? "green"
                            : selectedRecord.status ===
                              "Pending"
                            ? "orange"
                            : ""
                        }`}
                      >
                        {selectedRecord.status}
                      </div>

                    </div>

                    <div className="detail-row">

                      <div className="detail-row-left">
                        <Stethoscope size={15} />
                        Doctor
                      </div>

                      <div className="detail-row-value">
                        {selectedRecord.doctor}
                      </div>

                    </div>

                    <div className="detail-row">

                      <div className="detail-row-left">
                        <ClipboardList size={15} />
                        Treatment
                      </div>

                      <div className="detail-row-value">
                        {selectedRecord.treatment}
                      </div>

                    </div>

                    <div className="detail-row">

                      <div className="detail-row-left">
                        <Activity size={15} />
                        Visits
                      </div>

                      <div className="detail-row-value">
                        {selectedRecord.visits}
                      </div>

                    </div>

                  </div>

                  <div className="diagnosis-box">

                    <div className="diagnosis-label">
                      DIAGNOSIS
                    </div>

                    <div className="diagnosis-value">
                      {selectedRecord.diagnosis}
                    </div>

                  </div>

                  <div className="detail-section">

                    <div className="notes-title">
                      <Pill size={14} />
                      PRESCRIBED MEDICATIONS
                    </div>

                    {selectedRecord.medications?.length >
                    0 ? (
                      <div className="medications">

                        {selectedRecord.medications.map(
                          (medicine, index) => (
                            <div
                              className="medication"
                              key={index}
                            >
                              <Pill size={14} />
                              {medicine}
                            </div>
                          )
                        )}

                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#5e788b",
                          fontSize: 10,
                        }}
                      >
                        No medications prescribed.
                      </div>
                    )}

                  </div>

                  <div className="notes-box">

                    <div className="notes-title">
                      <FileText size={14} />
                      DOCTOR NOTES
                    </div>

                    <div className="notes-text">
                      {selectedRecord.notes}
                    </div>

                  </div>

                  <div className="details-actions">

                    <button
                      className="details-action primary"
                      onClick={() =>
                        printRecord(selectedRecord)
                      }
                    >
                      <Printer size={15} />
                      Print Record
                    </button>

                    <button
                      className="details-action secondary"
                      onClick={() => {
                        const data =
                          JSON.stringify(
                            selectedRecord,
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

                        a.download = `${selectedRecord.recordNumber}.json`;

                        a.click();

                        URL.revokeObjectURL(
                          url
                        );
                      }}
                    >
                      <Download size={15} />
                      Export
                    </button>

                  </div>

                </>
              ) : (
                <>
                  {records[0] && (
                    <>

                      <div className="selected-patient">

                        <div className="large-avatar">
                          <User size={28} />
                        </div>

                        <div>

                          <div className="selected-name">
                            {records[0].patient}
                          </div>

                          <div className="selected-record">
                            {records[0].recordNumber}
                          </div>

                        </div>

                      </div>

                      <div className="detail-section">

                        <div className="detail-row">

                          <div className="detail-row-left">
                            <CalendarDays size={15} />
                            Last Visit
                          </div>

                          <div className="detail-row-value">
                            {formatDate(
                              records[0].lastVisit
                            )}
                          </div>

                        </div>

                        <div className="detail-row">

                          <div className="detail-row-left">
                            <Activity size={15} />
                            Current Status
                          </div>

                          <div className="detail-row-value green">
                            {records[0].status}
                          </div>

                        </div>

                        <div className="detail-row">

                          <div className="detail-row-left">
                            <Stethoscope size={15} />
                            Doctor
                          </div>

                          <div className="detail-row-value">
                            {records[0].doctor}
                          </div>

                        </div>

                        <div className="detail-row">

                          <div className="detail-row-left">
                            <HeartPulse size={15} />
                            Treatment
                          </div>

                          <div className="detail-row-value">
                            {records[0].treatment}
                          </div>

                        </div>

                      </div>

                      <div className="diagnosis-box">

                        <div className="diagnosis-label">
                          DIAGNOSIS
                        </div>

                        <div className="diagnosis-value">
                          {records[0].diagnosis}
                        </div>

                      </div>

                      <div className="notes-box">

                        <div className="notes-title">
                          <FileText size={14} />
                          DOCTOR NOTES
                        </div>

                        <div className="notes-text">
                          {records[0].notes}
                        </div>

                      </div>

                      <button
                        className="details-action primary"
                        style={{
                          width: "100%",
                          marginTop: 15,
                        }}
                        onClick={() =>
                          setSelectedRecord(
                            records[0]
                          )
                        }
                      >
                        <Eye size={15} />
                        View Full Record
                      </button>

                    </>
                  )}
                </>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ADD RECORD MODAL */}

      {showAddModal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddModal(false);
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div className="modal-title">

                <div className="panel-heading-icon">
                  <Plus size={16} />
                </div>

                New Medical Record

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                <X size={16} />
              </button>

            </div>

            <form
              className="modal-body"
              onSubmit={addRecord}
            >

              <div className="form-grid">

                <div className="form-group">

                  <label className="form-label">
                    Patient Name
                  </label>

                  <input
                    className="form-input"
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

                <div className="form-group">

                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    className="form-input"
                    placeholder="+20..."
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Treatment
                  </label>

                  <input
                    className="form-input"
                    placeholder="Root Canal..."
                    value={form.treatment}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        treatment: e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Doctor
                  </label>

                  <input
                    className="form-input"
                    placeholder="Dr. Ahmed Ali"
                    value={form.doctor}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        doctor: e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group full">

                  <label className="form-label">
                    Diagnosis
                  </label>

                  <input
                    className="form-input"
                    placeholder="Enter diagnosis..."
                    value={form.diagnosis}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        diagnosis: e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group full">

                  <label className="form-label">
                    Doctor Notes
                  </label>

                  <textarea
                    className="form-input"
                    placeholder="Write medical notes..."
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
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save"
                >
                  <Plus
                    size={16}
                    style={{
                      verticalAlign: "middle",
                      marginRight: 5,
                    }}
                  />
                  Create Record
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}