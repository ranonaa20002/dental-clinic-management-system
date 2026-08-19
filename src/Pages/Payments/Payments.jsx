import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
  X,
} from "lucide-react";

export default function Payments() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("All");

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

  const [form, setForm] = useState({
    patient: "",
    code: "",
    treatment: "",
    amount: "",
    method: "Visa",
    date: "",
  });

  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const paidCount = payments.filter(
    (item) => item.status === "Paid"
  ).length;

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.patient.toLowerCase().includes(search.toLowerCase()) ||
      payment.code.toLowerCase().includes(search.toLowerCase()) ||
      payment.treatment.toLowerCase().includes(search.toLowerCase());

    const matchesMethod =
      selectedMethod === "All" ||
      payment.method === selectedMethod;

    return matchesSearch && matchesMethod;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.patient || !form.amount) {
      alert("Patient and amount are required");
      return;
    }

    const newPayment = {
      id: Date.now(),
      patient: form.patient,
      code: form.code || "PAT-NEW",
      treatment: form.treatment || "General Treatment",
      amount: Number(form.amount),
      method: form.method,
      date: form.date || "Aug 17, 2026",
      status: "Paid",
    };

    setPayments([newPayment, ...payments]);

    setForm({
      patient: "",
      code: "",
      treatment: "",
      amount: "",
      method: "Visa",
      date: "",
    });

    setShowModal(false);
  };

  const money = (value) =>
    new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="space-y-7">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <p className="text-sm text-blue-600 font-semibold mb-1">
            Financial Management
          </p>

          <h1 className="text-3xl font-bold text-slate-800">
            Payments
          </h1>

          <p className="text-slate-500 mt-1">
            Manage patient payments and transactions
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 transition"
        >
          <Plus size={20} />
          Add Payment
        </button>

      </div>

      {/* ================= PAYMENT CARDS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* VISA */}

        <div className="relative h-52 rounded-3xl overflow-hidden p-6 text-white shadow-xl bg-gradient-to-br from-[#111827] via-[#1d4ed8] to-[#2563eb]">

          <div className="absolute -right-10 -top-10 w-36 h-36 bg-white/10 rounded-full" />
          <div className="absolute -right-5 -bottom-16 w-44 h-44 bg-white/5 rounded-full" />

          <div className="relative z-10 flex flex-col justify-between h-full">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-xs text-blue-100">
                  Primary Card
                </p>

                <h3 className="font-bold text-lg">
                  Visa
                </h3>
              </div>

              <CreditCard size={27} />
            </div>

            <div>
              <p className="text-xl tracking-[4px] font-medium">
                4532 •••• •••• 8921
              </p>

              <div className="flex justify-between items-end mt-5">

                <div>
                  <p className="text-[9px] text-blue-100">
                    CARD HOLDER
                  </p>

                  <p className="text-sm font-semibold">
                    RANA HASSAN
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-blue-100">
                    EXPIRES
                  </p>

                  <p className="text-sm font-semibold">
                    08/28
                  </p>
                </div>

                <div className="font-black italic text-xl">
                  VISA
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* MASTERCARD */}

        <div className="relative h-52 rounded-3xl overflow-hidden p-6 text-white shadow-xl bg-gradient-to-br from-[#111827] via-[#374151] to-[#111827]">

          <div className="relative z-10 flex flex-col justify-between h-full">

            <div className="flex justify-between">

              <div>
                <p className="text-xs text-slate-300">
                  Secondary Card
                </p>

                <h3 className="font-bold text-lg">
                  Mastercard
                </h3>
              </div>

              <div className="flex">
                <div className="w-7 h-7 bg-red-500 rounded-full" />
                <div className="w-7 h-7 bg-yellow-400 rounded-full -ml-3 opacity-90" />
              </div>

            </div>

            <div>

              <p className="text-xl tracking-[4px] font-medium">
                5287 •••• •••• 3412
              </p>

              <div className="flex justify-between items-end mt-5">

                <div>
                  <p className="text-[9px] text-slate-400">
                    CARD HOLDER
                  </p>

                  <p className="text-sm font-semibold">
                    RANA HASSAN
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-slate-400">
                    EXPIRES
                  </p>

                  <p className="text-sm font-semibold">
                    11/29
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* CASH */}

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-start">

            <div>
              <p className="text-sm text-slate-500">
                Cash Payments
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-2">
                {money(
                  payments
                    .filter((p) => p.method === "Cash")
                    .reduce((s, p) => s + p.amount, 0)
                )}
              </h2>
            </div>

            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <Banknote
                size={24}
                className="text-emerald-600"
              />
            </div>

          </div>

          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-7">
            <ArrowUpRight size={14} />
            Cash received
          </div>

        </div>

        {/* BANK */}

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-start">

            <div>
              <p className="text-sm text-slate-500">
                Bank Transfers
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-2">
                {money(
                  payments
                    .filter(
                      (p) => p.method === "Bank Transfer"
                    )
                    .reduce((s, p) => s + p.amount, 0)
                )}
              </h2>
            </div>

            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
              <Building2
                size={24}
                className="text-purple-600"
              />
            </div>

          </div>

          <div className="flex items-center gap-1 text-purple-600 text-xs font-semibold mt-7">
            <ArrowUpRight size={14} />
            Bank received
          </div>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Wallet
                className="text-blue-600"
                size={23}
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Revenue
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {money(totalRevenue)}
              </h2>
            </div>

          </div>

        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <CheckCircle2
                className="text-emerald-600"
                size={23}
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Paid Transactions
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {paidCount}
              </h2>
            </div>

          </div>

        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
              <Clock3
                className="text-amber-600"
                size={23}
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {
                  payments.filter(
                    (p) => p.status === "Pending"
                  ).length
                }
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* ================= TRANSACTIONS ================= */}

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Recent Transactions
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Latest patient payments
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search..."
                  className="w-full sm:w-56 bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                />

              </div>

              <select
                value={selectedMethod}
                onChange={(e) =>
                  setSelectedMethod(e.target.value)
                }
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none"
              >
                <option value="All">All Methods</option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">
                  Mastercard
                </option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">
                  Bank Transfer
                </option>
              </select>

            </div>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-xs text-slate-500 font-bold">
                  PATIENT
                </th>

                <th className="text-left px-6 py-4 text-xs text-slate-500 font-bold">
                  TREATMENT
                </th>

                <th className="text-left px-6 py-4 text-xs text-slate-500 font-bold">
                  AMOUNT
                </th>

                <th className="text-left px-6 py-4 text-xs text-slate-500 font-bold">
                  METHOD
                </th>

                <th className="text-left px-6 py-4 text-xs text-slate-500 font-bold">
                  DATE
                </th>

                <th className="text-left px-6 py-4 text-xs text-slate-500 font-bold">
                  STATUS
                </th>

                <th className="px-6 py-4" />

              </tr>

            </thead>

            <tbody>

              {filteredPayments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {payment.patient.charAt(0)}
                      </div>

                      <div>

                        <p className="font-bold text-sm text-slate-800">
                          {payment.patient}
                        </p>

                        <p className="text-xs text-slate-400">
                          {payment.code}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {payment.treatment}
                  </td>

                  <td className="px-6 py-5 font-bold text-slate-800">
                    {money(payment.amount)}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      {payment.method === "Visa" && (
                        <CreditCard
                          size={17}
                          className="text-blue-600"
                        />
                      )}

                      {payment.method === "Mastercard" && (
                        <CreditCard
                          size={17}
                          className="text-red-500"
                        />
                      )}

                      {payment.method === "Cash" && (
                        <Banknote
                          size={17}
                          className="text-emerald-600"
                        />
                      )}

                      {payment.method === "Bank Transfer" && (
                        <Building2
                          size={17}
                          className="text-purple-600"
                        />
                      )}

                      <span className="text-sm text-slate-600">
                        {payment.method}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-sm text-slate-500">
                    {payment.date}
                  </td>

                  <td className="px-6 py-5">

                    {payment.status === "Paid" ? (

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 size={13} />
                        Paid
                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold">
                        <Clock3 size={13} />
                        Pending
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-5">

                    <button className="p-2 rounded-lg hover:bg-slate-100">
                      <MoreHorizontal
                        size={18}
                        className="text-slate-400"
                      />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= ADD PAYMENT MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b border-slate-100">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add Payment
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add a new patient transaction
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Patient Name *
                  </label>

                  <input
                    name="patient"
                    value={form.patient}
                    onChange={handleChange}
                    placeholder="Patient name"
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Patient ID
                  </label>

                  <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    placeholder="PAT-005"
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Treatment
                  </label>

                  <input
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    placeholder="Root Canal"
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Amount *
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="1500"
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Payment Method
                  </label>

                  <select
                    name="method"
                    value={form.method}
                    onChange={handleChange}
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-blue-500"
                  >
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">
                      Mastercard
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
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