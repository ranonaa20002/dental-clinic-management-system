import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Users,
  CreditCard,
  Pill,
  FileText,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  DollarSign,
  CheckCircle2,
  Clock3,
  Activity,
} from "lucide-react";

export default function Reports() {
  const [period, setPeriod] = useState("This Month");

  const reportData = {
    "Today": {
      patients: 12,
      appointments: 18,
      completed: 14,
      revenue: 3200,
      prescriptions: 8,
      treatments: 21,
    },
    "This Week": {
      patients: 64,
      appointments: 89,
      completed: 76,
      revenue: 14800,
      prescriptions: 35,
      treatments: 102,
    },
    "This Month": {
      patients: 248,
      appointments: 326,
      completed: 289,
      revenue: 52400,
      prescriptions: 117,
      treatments: 384,
    },
    "This Year": {
      patients: 2840,
      appointments: 3910,
      completed: 3542,
      revenue: 648500,
      prescriptions: 1290,
      treatments: 4260,
    },
  };

  const data = reportData[period];

  const completionRate = Math.round(
    (data.completed / data.appointments) * 100
  );

  const stats = [
    {
      title: "Total Patients",
      value: data.patients,
      change: "+12.5%",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      positive: true,
    },
    {
      title: "Appointments",
      value: data.appointments,
      change: "+8.2%",
      icon: CalendarDays,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      positive: true,
    },
    {
      title: "Total Revenue",
      value: `$${data.revenue.toLocaleString()}`,
      change: "+14.8%",
      icon: DollarSign,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      positive: true,
    },
    {
      title: "Prescriptions",
      value: data.prescriptions,
      change: "-3.4%",
      icon: Pill,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      positive: false,
    },
  ];

  const monthlyRevenue = useMemo(
    () => [
      { month: "Jan", value: 32000 },
      { month: "Feb", value: 41000 },
      { month: "Mar", value: 38000 },
      { month: "Apr", value: 47000 },
      { month: "May", value: 43000 },
      { month: "Jun", value: 52000 },
      { month: "Jul", value: 49000 },
      { month: "Aug", value: 56000 },
    ],
    []
  );

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.value)
  );

  const treatments = [
    {
      name: "Dental Cleaning",
      count: 86,
      percentage: 78,
    },
    {
      name: "Root Canal",
      count: 54,
      percentage: 62,
    },
    {
      name: "Teeth Whitening",
      count: 47,
      percentage: 51,
    },
    {
      name: "Dental Filling",
      count: 39,
      percentage: 43,
    },
    {
      name: "Extraction",
      count: 28,
      percentage: 31,
    },
  ];

  const recentReports = [
    {
      patient: "Ahmed Mohamed",
      treatment: "Root Canal Treatment",
      date: "17 Aug 2026",
      amount: "$450",
      status: "Completed",
    },
    {
      patient: "Sara Khaled",
      treatment: "Dental Cleaning",
      date: "17 Aug 2026",
      amount: "$120",
      status: "Completed",
    },
    {
      patient: "Mahmoud Hassan",
      treatment: "Teeth Whitening",
      date: "16 Aug 2026",
      amount: "$280",
      status: "Pending",
    },
    {
      patient: "Mariam Ali",
      treatment: "Dental Filling",
      date: "16 Aug 2026",
      amount: "$180",
      status: "Completed",
    },
  ];

  const handleExport = () => {
    alert(`Report exported successfully for ${period}.`);
  };

  return (
    <div className="space-y-7">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <BarChart3 size={18} />

            <span className="text-sm font-bold">
              Clinic Analytics
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Reports
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor your clinic performance, revenue and activities.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Period */}

          <div className="relative">

            <Filter
              size={16}
              className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="
                appearance-none
                bg-white
                border border-slate-200
                rounded-xl
                ps-9 pe-9
                py-3
                text-sm
                font-semibold
                text-slate-700
                outline-none
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
                cursor-pointer
              "
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>

          </div>

          {/* Export */}

          <button
            onClick={handleExport}
            className="
              flex items-center gap-2
              px-5 py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              text-sm
              shadow-lg shadow-blue-500/20
              transition
            "
          >
            <Download size={17} />
            Export Report
          </button>

        </div>

      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                bg-white
                rounded-2xl
                border border-slate-100
                p-5
                shadow-sm
                hover:shadow-lg
                transition
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800 mt-2">
                    {stat.value}
                  </h2>

                  <div className="flex items-center gap-1 mt-2">

                    {stat.positive ? (
                      <TrendingUp
                        size={14}
                        className="text-emerald-500"
                      />
                    ) : (
                      <TrendingDown
                        size={14}
                        className="text-red-500"
                      />
                    )}

                    <span
                      className={`text-xs font-bold ${
                        stat.positive
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>

                    <span className="text-xs text-slate-400">
                      vs last period
                    </span>

                  </div>

                </div>

                <div
                  className={`w-12 h-12 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}
                >
                  <Icon size={22} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* ================= MAIN CHART + PERFORMANCE ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Revenue Chart */}

        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <div className="flex items-center justify-between mb-7">

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Revenue Overview
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Monthly clinic revenue performance
              </p>

            </div>

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={19} />
            </div>

          </div>

          {/* Chart */}

          <div className="h-64 flex items-end gap-3 sm:gap-5">

            {monthlyRevenue.map((item) => {

              const height =
                (item.value / maxRevenue) * 100;

              return (
                <div
                  key={item.month}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                >

                  <div className="relative w-full h-full flex items-end">

                    <div
                      className="
                        w-full
                        rounded-t-xl
                        bg-gradient-to-t
                        from-blue-600
                        to-blue-400
                        hover:from-blue-700
                        hover:to-blue-500
                        transition-all
                        cursor-pointer
                        group
                      "
                      style={{
                        height: `${height}%`,
                      }}
                    >

                      <div
                        className="
                          absolute
                          -top-8
                          left-1/2
                          -translate-x-1/2
                          bg-slate-800
                          text-white
                          text-[10px]
                          font-semibold
                          px-2
                          py-1
                          rounded-lg
                          opacity-0
                          group-hover:opacity-100
                          transition
                          whitespace-nowrap
                        "
                      >
                        ${item.value.toLocaleString()}
                      </div>

                    </div>

                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {item.month}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

        {/* Appointment Performance */}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Appointment Performance
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Overall appointment completion
              </p>

            </div>

            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarDays size={19} />
            </div>

          </div>

          {/* Circle */}

          <div className="flex justify-center py-8">

            <div className="relative w-40 h-40">

              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(#2563eb ${
                    completionRate * 3.6
                  }deg, #e2e8f0 ${
                    completionRate * 3.6
                  }deg)`,
                }}
              />

              <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">

                <span className="text-3xl font-bold text-slate-800">
                  {completionRate}%
                </span>

                <span className="text-xs text-slate-400">
                  Completed
                </span>

              </div>

            </div>

          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">

              <div className="flex items-center gap-2">

                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />

                <span className="text-sm font-medium text-slate-700">
                  Completed
                </span>

              </div>

              <span className="font-bold text-emerald-600">
                {data.completed}
              </span>

            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">

              <div className="flex items-center gap-2">

                <Clock3
                  size={17}
                  className="text-amber-600"
                />

                <span className="text-sm font-medium text-slate-700">
                  Pending
                </span>

              </div>

              <span className="font-bold text-amber-600">
                {data.appointments - data.completed}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= TREATMENTS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Activity size={19} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Popular Treatments
              </h2>

              <p className="text-xs text-slate-400">
                Most requested dental procedures
              </p>

            </div>

          </div>

          <div className="space-y-5">

            {treatments.map((treatment) => (

              <div key={treatment.name}>

                <div className="flex items-center justify-between mb-2">

                  <span className="text-sm font-semibold text-slate-700">
                    {treatment.name}
                  </span>

                  <span className="text-xs font-bold text-slate-500">
                    {treatment.count} cases
                  </span>

                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{
                      width: `${treatment.percentage}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Clinic Summary */}

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100 text-sm">
                Clinic Performance
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Great Work!
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <BarChart3 size={23} />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-white/10 rounded-xl p-4">

              <Users
                size={18}
                className="text-blue-100"
              />

              <p className="text-2xl font-bold mt-2">
                {data.patients}
              </p>

              <p className="text-xs text-blue-100">
                Patients
              </p>

            </div>

            <div className="bg-white/10 rounded-xl p-4">

              <FileText
                size={18}
                className="text-blue-100"
              />

              <p className="text-2xl font-bold mt-2">
                {data.treatments}
              </p>

              <p className="text-xs text-blue-100">
                Treatments
              </p>

            </div>

            <div className="bg-white/10 rounded-xl p-4">

              <CreditCard
                size={18}
                className="text-blue-100"
              />

              <p className="text-2xl font-bold mt-2">
                ${data.revenue.toLocaleString()}
              </p>

              <p className="text-xs text-blue-100">
                Revenue
              </p>

            </div>

            <div className="bg-white/10 rounded-xl p-4">

              <Pill
                size={18}
                className="text-blue-100"
              />

              <p className="text-2xl font-bold mt-2">
                {data.prescriptions}
              </p>

              <p className="text-xs text-blue-100">
                Prescriptions
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-800">
              Recent Treatment Reports
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Latest clinic financial activities
            </p>

          </div>

          <FileText
            size={20}
            className="text-slate-400"
          />

        </div>

        {/* Desktop Table */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-start px-6 py-4 font-semibold text-slate-500">
                  Patient
                </th>

                <th className="text-start px-6 py-4 font-semibold text-slate-500">
                  Treatment
                </th>

                <th className="text-start px-6 py-4 font-semibold text-slate-500">
                  Date
                </th>

                <th className="text-start px-6 py-4 font-semibold text-slate-500">
                  Amount
                </th>

                <th className="text-start px-6 py-4 font-semibold text-slate-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentReports.map((report) => (

                <tr
                  key={report.patient}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {report.patient
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span className="font-semibold text-slate-700">
                        {report.patient}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {report.treatment}
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {report.date}
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-700">
                    {report.amount}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                        report.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {report.status === "Completed" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <Clock3 size={13} />
                      )}

                      {report.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}