import { useMemo, useState } from "react";
import {
  Search,
  Bell,
  Moon,
  CreditCard,
  Wallet,
  Building2,
  Clock3,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  User,
  Receipt,
  Trash2,
  X,
  Sparkles,
  Banknote,
  ArrowUpRight,
  Stethoscope,
} from "lucide-react";

export default function Payments() {
  const [search, setSearch] = useState("");
  const [selectedMethod, setSelectedMethod] =
    useState("All Methods");

  const [payments, setPayments] = useState([
    {
      id: 1,
      patient: "Ahmed Mohamed",
      code: "PAT-001",
      treatment: "Root Canal",
      amount: 1500,
      method: "Visa",
      date: "Aug 15, 2026",
      status: "Paid",
    },
    {
      id: 2,
      patient: "Sara Khaled",
      code: "PAT-002",
      treatment: "Dental Cleaning",
      amount: 800,
      method: "Cash",
      date: "Aug 14, 2026",
      status: "Paid",
    },
    {
      id: 3,
      patient: "Mahmoud Hassan",
      code: "PAT-003",
      treatment: "Dental Crown",
      amount: 2200,
      method: "Mastercard",
      date: "Aug 13, 2026",
      status: "Paid",
    },
    {
      id: 4,
      patient: "Mona Ali",
      code: "PAT-004",
      treatment: "Teeth Whitening",
      amount: 1200,
      method: "Bank Transfer",
      date: "Aug 12, 2026",
      status: "Pending",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    patient: "",
    code: "",
    treatment: "",
    amount: "",
    method: "Visa",
    date: "",
  });

  const totalRevenue = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Paid")
      .reduce(
        (sum, payment) =>
          sum + Number(payment.amount || 0),
        0
      );
  }, [payments]);

  const paidCount = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const pendingCount = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const cashTotal = payments
    .filter((payment) => payment.method === "Cash")
    .reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

  const bankTotal = payments
    .filter(
      (payment) => payment.method === "Bank Transfer"
    )
    .reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

  const filteredPayments = payments.filter((payment) => {
    const value = search.toLowerCase();

    const matchesSearch =
      payment.patient
        .toLowerCase()
        .includes(value) ||
      payment.code
        .toLowerCase()
        .includes(value) ||
      payment.treatment
        .toLowerCase()
        .includes(value);

    const matchesMethod =
      selectedMethod === "All Methods" ||
      payment.method === selectedMethod;

    return matchesSearch && matchesMethod;
  });

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-EG").format(value);

  const handleAddPayment = (e) => {
    e.preventDefault();

    if (
      !formData.patient ||
      !formData.amount ||
      !formData.date
    ) {
      return;
    }

    const newPayment = {
      id: Date.now(),
      patient: formData.patient.trim(),
      code:
        formData.code.trim() ||
        `PAT-${String(
          payments.length + 1
        ).padStart(3, "0")}`,
      treatment:
        formData.treatment.trim() ||
        "General Treatment",
      amount: Number(formData.amount),
      method: formData.method,
      date: formData.date,
      status: "Paid",
    };

    setPayments((prev) => [
      newPayment,
      ...prev,
    ]);

    setFormData({
      patient: "",
      code: "",
      treatment: "",
      amount: "",
      method: "Visa",
      date: "",
    });

    setShowModal(false);
  };

  const deletePayment = (id) => {
    setPayments((prev) =>
      prev.filter(
        (payment) => payment.id !== id
      )
    );
  };

  const getMethodIcon = (method) => {
    if (method === "Cash") {
      return <Banknote size={14} />;
    }

    if (method === "Bank Transfer") {
      return <Building2 size={14} />;
    }

    return <CreditCard size={14} />;
  };

  return (
    <div className="payments-page">

      <style>{`

        .payments-page {
          width: 100%;
          min-height: calc(100vh - 0px);
          color: #eaf8ff;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 75% 5%,
              rgba(0, 174, 255, .12),
              transparent 27%
            ),
            radial-gradient(
              circle at 100% 70%,
              rgba(94, 45, 255, .10),
              transparent 25%
            ),
            #020813;

          padding: 25px;
        }

        .payments-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .25;

          background-image:
            linear-gradient(
              rgba(0, 180, 255, .035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 180, 255, .035) 1px,
              transparent 1px
            );

          background-size: 38px 38px;
        }

        .payments-content {
          position: relative;
          z-index: 2;
          max-width: 1600px;
          margin: auto;
        }

        /* =========================
           HEADER
        ========================= */

        .payments-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .payments-heading {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .payments-heading-icon {
          width: 50px;
          height: 50px;
          border-radius: 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #35ddff;

          background:
            rgba(0, 163, 255, .10);

          border:
            1px solid
            rgba(0, 204, 255, .45);

          box-shadow:
            0 0 25px
            rgba(0, 195, 255, .15);
        }

        .payments-heading h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -.7px;
        }

        .payments-heading p {
          margin: 4px 0 0;
          color: #67869e;
          font-size: 11px;
        }

        .payments-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .payments-search {
          width: 250px;
          height: 42px;

          display: flex;
          align-items: center;
          gap: 9px;

          padding: 0 13px;

          border:
            1px solid
            rgba(35, 119, 181, .28);

          border-radius: 11px;

          background:
            rgba(3, 17, 32, .75);

          color: #59778f;
        }

        .payments-search input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          color: white;
          font-size: 11px;
        }

        .payments-search input::placeholder {
          color: #506c82;
        }

        .header-icon {
          width: 42px;
          height: 42px;

          border-radius: 11px;

          border:
            1px solid
            rgba(35, 119, 181, .25);

          background:
            rgba(3, 17, 32, .75);

          color: #86a3b9;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          position: relative;
        }

        .notification-dot {
          position: absolute;

          right: -3px;
          top: -4px;

          width: 17px;
          height: 17px;

          border-radius: 50%;

          background: #ff3d64;
          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 8px;

          border: 2px solid #020813;
        }

        /* =========================
           HERO PAYMENT AREA
        ========================= */

        .payments-hero {
          display: grid;

          grid-template-columns:
            1.2fr
            1.2fr
            .8fr
            .8fr;

          gap: 15px;
        }

        /* =========================
           CREDIT CARD
        ========================= */

        .bank-card {
          height: 205px;

          position: relative;

          overflow: hidden;

          border-radius: 21px;

          padding: 21px;

          border:
            1px solid
            rgba(0, 183, 255, .40);

          background:
            radial-gradient(
              circle at 82% 18%,
              rgba(0, 203, 255, .20),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #0b3565,
              #08172e 65%,
              #030b19
            );

          box-shadow:
            0 20px 50px
            rgba(0, 0, 0, .28),
            inset 0 0 30px
            rgba(0, 190, 255, .06);
        }

        .bank-card.purple {
          border-color:
            rgba(179, 77, 255, .42);

          background:
            radial-gradient(
              circle at 80% 15%,
              rgba(170, 57, 255, .18),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #29194e,
              #11152e 65%,
              #070a18
            );
        }

        .bank-card::after {
          content: "";

          position: absolute;

          right: -70px;
          bottom: -45px;

          width: 250px;
          height: 100px;

          border:
            1px solid
            rgba(28, 209, 255, .17);

          border-radius: 50%;

          transform: rotate(-15deg);
        }

        .card-top {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-chip {
          width: 40px;
          height: 29px;

          border-radius: 7px;

          background:
            linear-gradient(
              135deg,
              #d9dddf,
              #77828b
            );

          box-shadow:
            inset 0 0 0 1px
            rgba(255,255,255,.35);
        }

        .visa-logo {
          font-size: 25px;
          font-weight: 900;
          font-style: italic;
          letter-spacing: -2px;
        }

        .master-logo {
          display: flex;
          align-items: center;
        }

        .master-logo span {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: block;
        }

        .master-logo span:first-child {
          background: #ff4141;
        }

        .master-logo span:last-child {
          background: #ffc228;
          margin-left: -9px;
        }

        .card-number {
          position: relative;
          z-index: 2;

          margin-top: 28px;

          font-family: monospace;

          letter-spacing: 3px;

          font-size: 16px;
        }

        .card-bottom {
          position: relative;
          z-index: 2;

          display: flex;
          justify-content: space-between;

          margin-top: 25px;
        }

        .card-label {
          color: #7899b2;
          font-size: 7px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .card-value {
          margin-top: 5px;
          font-size: 10px;
          font-weight: 700;
        }

        .card-watermark {
          position: absolute;

          right: 43px;
          bottom: 32px;

          opacity: .12;

          color: #38dcff;

          filter:
            drop-shadow(
              0 0 13px
              #00caff
            );
        }

        /* =========================
           STAT CARDS
        ========================= */

        .payment-stat {
          height: 205px;

          border-radius: 21px;

          padding: 20px;

          position: relative;

          overflow: hidden;

          background:
            rgba(4, 17, 32, .82);

          border:
            1px solid
            rgba(28, 143, 215, .32);
        }

        .payment-stat.green {
          border-color:
            rgba(39, 230, 165, .30);
        }

        .stat-icon {
          width: 48px;
          height: 48px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #34e2ff;

          background:
            rgba(0, 180, 255, .09);

          border:
            1px solid
            rgba(0, 210, 255, .45);

          box-shadow:
            0 0 20px
            rgba(0, 193, 255, .13);
        }

        .green .stat-icon {
          color: #2fe9a4;

          background:
            rgba(47, 233, 164, .07);

          border-color:
            rgba(47, 233, 164, .40);
        }

        .stat-title {
          margin-top: 19px;

          color: #7894aa;

          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-number {
          margin-top: 8px;

          font-size: 22px;
          font-weight: 800;

          color: #27e1ff;
        }

        .green .stat-number {
          color: #2feaa4;
        }

        .stat-footer {
          margin-top: 14px;

          display: flex;
          align-items: center;
          gap: 5px;

          color: #31dcff;

          font-size: 8px;
        }

        .green .stat-footer {
          color: #2feaa4;
        }

        .mini-chart {
          position: absolute;

          left: 18px;
          right: 18px;
          bottom: 18px;

          height: 40px;

          opacity: .75;
        }

        /* =========================
           SECONDARY STATS
        ========================= */

        .secondary-stats {
          display: grid;

          grid-template-columns:
            1fr
            1fr
            1fr;

          gap: 15px;

          margin-top: 15px;
        }

        .secondary-stat {
          min-height: 125px;

          padding: 19px;

          border-radius: 19px;

          background:
            rgba(4, 18, 34, .78);

          border:
            1px solid
            rgba(0, 156, 255, .29);

          display: flex;
          align-items: center;
          gap: 14px;
        }

        .secondary-stat.cash {
          border-color:
            rgba(42, 232, 177, .28);
        }

        .secondary-stat.bank {
          border-color:
            rgba(163, 86, 255, .32);
        }

        .secondary-stat.pending {
          border-color:
            rgba(255, 182, 45, .30);
        }

        .secondary-icon {
          width: 48px;
          height: 48px;

          min-width: 48px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #34e8be;

          background:
            rgba(0, 228, 177, .07);

          border:
            1px solid
            rgba(0, 228, 177, .38);
        }

        .bank .secondary-icon {
          color: #c071ff;

          background:
            rgba(163, 70, 255, .07);

          border-color:
            rgba(163, 70, 255, .38);
        }

        .pending .secondary-icon {
          color: #ffc54d;

          background:
            rgba(255, 182, 45, .07);

          border-color:
            rgba(255, 182, 45, .38);
        }

        .secondary-title {
          color: #8da8bb;
          font-size: 10px;
        }

        .secondary-value {
          margin-top: 5px;

          color: #2ce4c1;

          font-size: 19px;
          font-weight: 800;
        }

        .bank .secondary-value {
          color: #c87aff;
        }

        .pending .secondary-value {
          color: #ffc249;
        }

        .secondary-description {
          margin-top: 5px;

          color: #4f7088;

          font-size: 8px;
        }

        /* =========================
           MAIN LOWER AREA
        ========================= */

        .payments-lower {
          margin-top: 20px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            390px;

          gap: 15px;
        }

        .transactions-card,
        .add-payment-card {
          border-radius: 21px;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(5, 23, 43, .92),
              rgba(2, 12, 26, .90)
            );

          border:
            1px solid
            rgba(0, 159, 255, .30);
        }

        /* =========================
           TRANSACTION HEADER
        ========================= */

        .transactions-header {
          padding: 18px 20px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          border-bottom:
            1px solid
            rgba(40, 118, 168, .18);
        }

        .transactions-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .transactions-title-icon {
          color: #35dfff;

          filter:
            drop-shadow(
              0 0 8px
              rgba(0,220,255,.7)
            );
        }

        .transactions-title strong {
          display: block;
          font-size: 14px;
        }

        .transactions-title span {
          display: block;

          color: #5b7890;

          font-size: 8px;

          margin-top: 4px;
        }

        .transaction-controls {
          display: flex;
          gap: 8px;
        }

        .transaction-search {
          width: 210px;
          height: 37px;

          display: flex;
          align-items: center;
          gap: 7px;

          padding: 0 10px;

          border-radius: 9px;

          background:
            rgba(1, 11, 23, .70);

          border:
            1px solid
            rgba(35, 119, 181, .27);
        }

        .transaction-search input {
          width: 100%;

          border: none;
          outline: none;

          background: transparent;

          color: white;

          font-size: 9px;
        }

        .transaction-search input::placeholder {
          color: #4e6a80;
        }

        .method-filter {
          height: 37px;

          border-radius: 9px;

          border:
            1px solid
            rgba(35, 119, 181, .27);

          background:
            rgba(1, 11, 23, .70);

          color: #8fa8bb;

          padding: 0 9px;

          outline: none;

          font-size: 9px;
        }

        .method-filter option {
          background: #071525;
        }

        /* =========================
           TABLE
        ========================= */

        .table-scroll {
          overflow-x: auto;
        }

        .payments-table {
          width: 100%;

          min-width: 730px;

          border-collapse: collapse;
        }

        .payments-table th {
          padding: 13px;

          text-align: left;

          color: #527189;

          font-size: 8px;

          font-weight: 600;

          letter-spacing: .7px;

          border-bottom:
            1px solid
            rgba(35, 119, 181, .16);
        }

        .payments-table td {
          padding: 12px 13px;

          color: #a4bbcb;

          font-size: 9px;

          border-bottom:
            1px solid
            rgba(35, 119, 181, .10);

          white-space: nowrap;
        }

        .payments-table tr {
          transition: .2s ease;
        }

        .payments-table tbody tr:hover {
          background:
            rgba(0, 174, 255, .045);
        }

        .patient-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .patient-avatar {
          width: 30px;
          height: 30px;

          min-width: 30px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: white;

          font-size: 9px;
          font-weight: 800;

          background:
            linear-gradient(
              135deg,
              #165db5,
              #182a70
            );

          border:
            1px solid
            rgba(53,206,255,.30);
        }

        .patient-name {
          color: #e6f5ff;

          font-size: 9px;

          font-weight: 700;
        }

        .patient-code {
          color: #4d6d84;

          font-size: 7px;

          margin-top: 2px;
        }

        .payment-amount {
          color: #29e4ff !important;
          font-weight: 800;
        }

        .method-badge {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .method-icon {
          width: 27px;
          height: 21px;

          border-radius: 5px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #35e2ff;

          background:
            rgba(0, 170, 255, .08);

          border:
            1px solid
            rgba(0, 190, 255, .23);
        }

        .payment-status {
          display: inline-flex;
          align-items: center;
          gap: 4px;

          padding: 5px 8px;

          border-radius: 7px;

          font-size: 7px;
          font-weight: 700;
        }

        .payment-status.paid {
          color: #2de8a0;

          background:
            rgba(30, 225, 145, .08);

          border:
            1px solid
            rgba(30, 225, 145, .20);
        }

        .payment-status.pending {
          color: #ffc44b;

          background:
            rgba(255, 183, 42, .08);

          border:
            1px solid
            rgba(255, 183, 42, .20);
        }

        .delete-payment {
          border: none;

          background: transparent;

          color: #58748a;

          cursor: pointer;
        }

        .delete-payment:hover {
          color: #ff4d70;
        }

        .transactions-footer {
          padding: 12px 20px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          color: #527189;

          font-size: 8px;
        }

        /* =========================
           ADD PAYMENT
        ========================= */

        .add-payment-card {
          padding: 20px;

          border-color:
            rgba(0, 194, 255, .43);

          box-shadow:
            0 0 30px
            rgba(0, 157, 255, .07);
        }

        .add-title {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 18px;
        }

        .add-title-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .add-title-icon {
          color: #35e1ff;

          filter:
            drop-shadow(
              0 0 8px
              rgba(0,220,255,.6)
            );
        }

        .add-title strong {
          display: block;
          font-size: 14px;
        }

        .add-title span {
          display: block;

          color: #56748c;

          font-size: 8px;

          margin-top: 3px;
        }

        .close-add {
          border: none;

          background: transparent;

          color: #668399;

          cursor: pointer;
        }

        .payment-form {
          display: grid;

          grid-template-columns:
            1fr
            1fr;

          gap: 12px;
        }

        .form-group label {
          display: block;

          color: #91aabd;

          font-size: 8px;

          margin-bottom: 6px;
        }

        .required {
          color: #2ddfff;
        }

        .form-input,
        .form-select {
          width: 100%;
          height: 39px;

          border-radius: 8px;

          border:
            1px solid
            rgba(39,113,169,.29);

          background:
            rgba(1,10,22,.72);

          color: #e8f6ff;

          outline: none;

          padding: 0 9px;

          font-size: 9px;
        }

        .form-input::placeholder {
          color: #4e697f;
        }

        .form-input:focus,
        .form-select:focus {
          border-color:
            rgba(0,210,255,.65);

          box-shadow:
            0 0 14px
            rgba(0,196,255,.08);
        }

        .form-select option {
          background: #071525;
        }

        .form-full {
          grid-column: 1 / -1;
        }

        .form-buttons {
          grid-column: 1 / -1;

          display: grid;

          grid-template-columns:
            .7fr
            1.4fr;

          gap: 8px;

          margin-top: 4px;
        }

        .cancel-btn,
        .save-btn {
          height: 40px;

          border-radius: 9px;

          cursor: pointer;

          font-size: 9px;

          font-weight: 700;
        }

        .cancel-btn {
          color: #91a8b9;

          background:
            rgba(2,15,29,.72);

          border:
            1px solid
            rgba(48,111,157,.27);
        }

        .save-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;

          color: white;

          border:
            1px solid
            rgba(63,224,255,.52);

          background:
            linear-gradient(
              100deg,
              #3132db,
              #009cf4
            );

          box-shadow:
            0 0 22px
            rgba(0,159,255,.22);
        }

        .save-btn:hover {
          filter: brightness(1.12);
        }

        /* =========================
           MODAL
        ========================= */

        .modal-overlay {
          position: fixed;

          inset: 0;

          z-index: 999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background:
            rgba(0,5,14,.80);

          backdrop-filter: blur(12px);
        }

        .modal {
          width: min(520px, 100%);

          padding: 23px;

          border-radius: 21px;

          background:
            radial-gradient(
              circle at 90% 0%,
              rgba(0,173,255,.14),
              transparent 35%
            ),
            #061322;

          border:
            1px solid
            rgba(0,198,255,.43);

          box-shadow:
            0 30px 80px
            rgba(0,0,0,.65);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 20px;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-icon {
          width: 41px;
          height: 41px;

          border-radius: 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #35e4ff;

          background:
            rgba(0,172,255,.08);

          border:
            1px solid
            rgba(0,202,255,.43);
        }

        .modal-title strong {
          display: block;
          font-size: 15px;
        }

        .modal-title span {
          display: block;

          color: #56738a;

          font-size: 8px;

          margin-top: 3px;
        }

        .modal-close {
          width: 33px;
          height: 33px;

          border-radius: 8px;

          border:
            1px solid
            rgba(43,108,150,.25);

          background:
            rgba(1,10,20,.55);

          color: #6b859a;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
        }

        .modal-close:hover {
          color: white;
        }

        .modal-form {
          display: grid;

          grid-template-columns:
            1fr
            1fr;

          gap: 13px;
        }

        @media (max-width: 1200px) {

          .payments-hero {
            grid-template-columns:
              1fr
              1fr;
          }

          .payments-lower {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 850px) {

          .payments-page {
            padding: 18px;
          }

          .payments-header {
            align-items: flex-start;
          }

          .payments-search {
            display: none;
          }

          .secondary-stats {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .payments-header {
            flex-direction: column;
          }

          .payments-actions {
            width: 100%;
          }

          .payments-hero {
            grid-template-columns: 1fr;
          }

          .transaction-controls {
            width: 100%;
            flex-direction: column;
          }

          .transaction-search {
            width: 100%;
          }

          .method-filter {
            width: 100%;
          }

          .transactions-header {
            flex-direction: column;
            align-items: stretch;
          }

          .payment-form,
          .modal-form {
            grid-template-columns: 1fr;
          }

          .form-full,
          .form-buttons {
            grid-column: auto;
          }

        }

      `}</style>

      <div className="payments-content">

        {/* =========================
            PAYMENTS HEADER
        ========================= */}

        <header className="payments-header">

          <div className="payments-heading">

            <div className="payments-heading-icon">
              <CreditCard size={24} />
            </div>

            <div>
              <h1>
                Payments
              </h1>

              <p>
                Manage patient payments and financial
                transactions
              </p>
            </div>

          </div>

          <div className="payments-actions">

            <div className="payments-search">

              <Search size={16} />

              <input
                placeholder="Search payments..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <button className="header-icon">
              <Bell size={17} />

              <span className="notification-dot">
                3
              </span>
            </button>

            <button className="header-icon">
              <Moon size={17} />
            </button>

          </div>

        </header>

        {/* =========================
            PAYMENT CARDS + STATS
        ========================= */}

        <section className="payments-hero">

          <div className="bank-card">

            <div className="card-top">

              <div className="card-chip" />

              <div className="visa-logo">
                VISA
              </div>

            </div>

            <div className="card-number">
              4532 •••• •••• 8921
            </div>

            <div className="card-bottom">

              <div>
                <div className="card-label">
                  Card Holder
                </div>

                <div className="card-value">
                  RANA HASSAN
                </div>
              </div>

              <div>
                <div className="card-label">
                  Expires
                </div>

                <div className="card-value">
                  08/28
                </div>
              </div>

            </div>

            <ToothIcon
              size={74}
              className="card-watermark"
            />

          </div>

          <div className="bank-card purple">

            <div className="card-top">

              <div className="card-chip" />

              <div className="master-logo">
                <span />
                <span />
              </div>

            </div>

            <div className="card-number">
              5287 •••• •••• 3412
            </div>

            <div className="card-bottom">

              <div>
                <div className="card-label">
                  Card Holder
                </div>

                <div className="card-value">
                  RANA HASSAN
                </div>
              </div>

              <div>
                <div className="card-label">
                  Expires
                </div>

                <div className="card-value">
                  11/29
                </div>
              </div>

            </div>

            <ToothIcon
              size={74}
              className="card-watermark"
            />

          </div>

          <div className="payment-stat">

            <div className="stat-icon">
              <Wallet size={23} />
            </div>

            <div className="stat-title">
              Total Revenue
            </div>

            <div className="stat-number">
              EGP {formatMoney(totalRevenue)}
            </div>

            <svg
              className="mini-chart"
              viewBox="0 0 250 50"
              preserveAspectRatio="none"
            >
              <polyline
                points="
                  0,40
                  25,27
                  45,33
                  65,18
                  87,31
                  110,26
                  132,39
                  154,17
                  175,27
                  198,9
                  220,20
                  250,4
                "
                fill="none"
                stroke="#2be3ff"
                strokeWidth="2"
              />
            </svg>

            <div className="stat-footer">
              <TrendingUp size={11} />
              12.5% from last month
            </div>

          </div>

          <div className="payment-stat green">

            <div className="stat-icon">
              <CheckCircle2 size={23} />
            </div>

            <div className="stat-title">
              Paid Transactions
            </div>

            <div className="stat-number">
              {paidCount}
            </div>

            <svg
              className="mini-chart"
              viewBox="0 0 250 50"
              preserveAspectRatio="none"
            >
              <polyline
                points="
                  0,43
                  25,40
                  45,32
                  68,37
                  91,19
                  110,29
                  135,22
                  157,33
                  180,17
                  200,23
                  225,8
                  250,3
                "
                fill="none"
                stroke="#2eeaa4"
                strokeWidth="2"
              />
            </svg>

            <div className="stat-footer">
              <TrendingUp size={11} />
              8.3% from last month
            </div>

          </div>

        </section>

        {/* =========================
            SECONDARY
        ========================= */}

        <section className="secondary-stats">

          <div className="secondary-stat cash">

            <div className="secondary-icon">
              <Banknote size={22} />
            </div>

            <div>

              <div className="secondary-title">
                Cash Payments
              </div>

              <div className="secondary-value">
                EGP {formatMoney(cashTotal)}
              </div>

              <div className="secondary-description">
                Total cash received
              </div>

            </div>

          </div>

          <div className="secondary-stat bank">

            <div className="secondary-icon">
              <Building2 size={22} />
            </div>

            <div>

              <div className="secondary-title">
                Bank Transfers
              </div>

              <div className="secondary-value">
                EGP {formatMoney(bankTotal)}
              </div>

              <div className="secondary-description">
                Total bank transfers
              </div>

            </div>

          </div>

          <div className="secondary-stat pending">

            <div className="secondary-icon">
              <Clock3 size={22} />
            </div>

            <div>

              <div className="secondary-title">
                Pending Transactions
              </div>

              <div className="secondary-value">
                {pendingCount}
              </div>

              <div className="secondary-description">
                Awaiting confirmation
              </div>

            </div>

          </div>

        </section>

        {/* =========================
            LOWER
        ========================= */}

        <section className="payments-lower">

          {/* TRANSACTIONS */}

          <div className="transactions-card">

            <div className="transactions-header">

              <div className="transactions-title">

                <CreditCard
                  size={26}
                  className="transactions-title-icon"
                />

                <div>

                  <strong>
                    Recent Transactions
                  </strong>

                  <span>
                    Latest patient payments
                  </span>

                </div>

              </div>

              <div className="transaction-controls">

                <div className="transaction-search">

                  <Search
                    size={13}
                    color="#527189"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search..."
                  />

                </div>

                <select
                  className="method-filter"
                  value={selectedMethod}
                  onChange={(e) =>
                    setSelectedMethod(
                      e.target.value
                    )
                  }
                >

                  <option>
                    All Methods
                  </option>

                  <option>
                    Visa
                  </option>

                  <option>
                    Mastercard
                  </option>

                  <option>
                    Cash
                  </option>

                  <option>
                    Bank Transfer
                  </option>

                </select>

              </div>

            </div>

            <div className="table-scroll">

              <table className="payments-table">

                <thead>

                  <tr>

                    <th>
                      PATIENT
                    </th>

                    <th>
                      TREATMENT
                    </th>

                    <th>
                      AMOUNT
                    </th>

                    <th>
                      METHOD
                    </th>

                    <th>
                      DATE
                    </th>

                    <th>
                      STATUS
                    </th>

                    <th>
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredPayments.length > 0 ? (
                    filteredPayments.map(
                      (payment) => (
                        <tr key={payment.id}>

                          <td>

                            <div className="patient-cell">

                              <div className="patient-avatar">
                                {payment.patient
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>

                                <div className="patient-name">
                                  {payment.patient}
                                </div>

                                <div className="patient-code">
                                  {payment.code}
                                </div>

                              </div>

                            </div>

                          </td>

                          <td>
                            {payment.treatment}
                          </td>

                          <td className="payment-amount">
                            EGP{" "}
                            {formatMoney(
                              payment.amount
                            )}
                          </td>

                          <td>

                            <div className="method-badge">

                              <span className="method-icon">
                                {getMethodIcon(
                                  payment.method
                                )}
                              </span>

                              {payment.method}

                            </div>

                          </td>

                          <td>
                            {payment.date}
                          </td>

                          <td>

                            <span
                              className={`payment-status ${
                                payment.status ===
                                "Paid"
                                  ? "paid"
                                  : "pending"
                              }`}
                            >

                              {payment.status ===
                              "Paid" ? (
                                <CheckCircle2
                                  size={10}
                                />
                              ) : (
                                <Clock3
                                  size={10}
                                />
                              )}

                              {payment.status}

                            </span>

                          </td>

                          <td>

                            <button
                              className="delete-payment"
                              onClick={() =>
                                deletePayment(
                                  payment.id
                                )
                              }
                            >

                              <Trash2
                                size={14}
                              />

                            </button>

                          </td>

                        </tr>
                      )
                    )
                  ) : (
                    <tr>

                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "#527189",
                        }}
                      >
                        No payments found
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            <div className="transactions-footer">

              <span>
                Showing{" "}
                {filteredPayments.length} of{" "}
                {payments.length} transactions
              </span>

              <span>
                LIVE PAYMENT MONITOR
              </span>

            </div>

          </div>

          {/* ADD PAYMENT */}

          <div className="add-payment-card">

            <div className="add-title">

              <div className="add-title-left">

                <CreditCard
                  size={25}
                  className="add-title-icon"
                />

                <div>

                  <strong>
                    Add Payment
                  </strong>

                  <span>
                    New patient transaction
                  </span>

                </div>

              </div>

              <button
                className="close-add"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={18} />
              </button>

            </div>

            <form
              className="payment-form"
              onSubmit={handleAddPayment}
            >

              <div className="form-group">

                <label>
                  Patient Name{" "}
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  className="form-input"
                  value={formData.patient}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patient:
                        e.target.value,
                    })
                  }
                  placeholder="Patient name"
                />

              </div>

              <div className="form-group">

                <label>
                  Amount{" "}
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  className="form-input"
                  type="number"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount:
                        e.target.value,
                    })
                  }
                  placeholder="1500"
                />

              </div>

              <div className="form-group">

                <label>
                  Patient ID
                </label>

                <input
                  className="form-input"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code:
                        e.target.value,
                    })
                  }
                  placeholder="PAT-005"
                />

              </div>

              <div className="form-group">

                <label>
                  Payment Method{" "}
                  <span className="required">
                    *
                  </span>
                </label>

                <select
                  className="form-select"
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      method:
                        e.target.value,
                    })
                  }
                >

                  <option>
                    Visa
                  </option>

                  <option>
                    Mastercard
                  </option>

                  <option>
                    Cash
                  </option>

                  <option>
                    Bank Transfer
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Treatment
                </label>

                <input
                  className="form-input"
                  value={formData.treatment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      treatment:
                        e.target.value,
                    })
                  }
                  placeholder="Root Canal"
                />

              </div>

              <div className="form-group">

                <label>
                  Date{" "}
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  className="form-input"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setFormData({
                      patient: "",
                      code: "",
                      treatment: "",
                      amount: "",
                      method: "Visa",
                      date: "",
                    })
                  }
                >
                  Clear
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >

                  <Sparkles size={13} />

                  Save Payment

                </button>

              </div>

            </form>

          </div>

        </section>

      </div>

      {/* =========================
          MODAL
      ========================= */}

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div className="modal-title">

                <div className="modal-icon">
                  <CreditCard size={20} />
                </div>

                <div>

                  <strong>
                    Add Payment
                  </strong>

                  <span>
                    Create new transaction
                  </span>

                </div>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={16} />
              </button>

            </div>

            <form
              className="modal-form"
              onSubmit={handleAddPayment}
            >

              <div className="form-group">

                <label>
                  Patient Name *
                </label>

                <input
                  className="form-input"
                  value={formData.patient}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patient:
                        e.target.value,
                    })
                  }
                  placeholder="Ahmed Mohamed"
                />

              </div>

              <div className="form-group">

                <label>
                  Amount *
                </label>

                <input
                  className="form-input"
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount:
                        e.target.value,
                    })
                  }
                  placeholder="1500"
                />

              </div>

              <div className="form-group">

                <label>
                  Patient ID
                </label>

                <input
                  className="form-input"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code:
                        e.target.value,
                    })
                  }
                  placeholder="PAT-005"
                />

              </div>

              <div className="form-group">

                <label>
                  Payment Method
                </label>

                <select
                  className="form-select"
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      method:
                        e.target.value,
                    })
                  }
                >

                  <option>
                    Visa
                  </option>

                  <option>
                    Mastercard
                  </option>

                  <option>
                    Cash
                  </option>

                  <option>
                    Bank Transfer
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Treatment
                </label>

                <input
                  className="form-input"
                  value={formData.treatment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      treatment:
                        e.target.value,
                    })
                  }
                  placeholder="Root Canal"
                />

              </div>

              <div className="form-group">

                <label>
                  Date *
                </label>

                <input
                  className="form-input"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >

                  <Sparkles size={13} />

                  Save Payment

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

/* ==========================================
   TOOTH ICON
========================================== */

function ToothIcon({
  size = 32,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >

      <path
        d="
          M19 8
          C13 8 8 13 8 20
          C8 29 13 32 14 42
          C15 50 18 56 23 56
          C28 56 28 45 32 45
          C36 45 36 56 41 56
          C46 56 49 50 50 42
          C51 32 56 29 56 20
          C56 13 51 8 45 8
          C40 8 37 11 32 11
          C27 11 24 8 19 8Z
        "
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      <path
        d="M22 18C25 15 28 15 31 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".65"
      />

      <path
        d="M42 18C39 15 36 15 33 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".65"
      />

      <circle
        cx="32"
        cy="30"
        r="3"
        fill="currentColor"
        opacity=".75"
      />

    </svg>
  );
}