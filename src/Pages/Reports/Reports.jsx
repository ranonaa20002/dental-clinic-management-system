import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Download,
  ChevronDown,
  Users,
  CalendarCheck,
  DollarSign,
  Activity,
  UserPlus,
  RefreshCw,
  CheckCircle2,
  BarChart3,
  MoreHorizontal,
  TrendingUp,
  Sparkles,
  Search,
} from "lucide-react";

export default function Reports() {
  const [period, setPeriod] = useState("Month");
  const [reportType, setReportType] = useState("Revenue");

  const stats = [
    {
      title: "TOTAL PATIENTS",
      value: "248",
      change: "+12.4%",
      icon: Users,
      type: "cyan",
      data: [35, 42, 38, 55, 49, 64, 76],
    },
    {
      title: "APPOINTMENTS",
      value: "186",
      change: "+8.2%",
      icon: CalendarCheck,
      type: "purple",
      data: [30, 36, 31, 48, 43, 57, 70],
    },
    {
      title: "REVENUE",
      value: "84,500",
      suffix: "EGP",
      change: "+14.6%",
      icon: DollarSign,
      type: "green",
      data: [28, 34, 31, 47, 43, 58, 74],
    },
    {
      title: "TREATMENTS",
      value: "92",
      change: "+9.3%",
      icon: Activity,
      type: "orange",
      data: [32, 40, 36, 50, 45, 58, 76],
    },
  ];

  const treatmentData = [
    {
      name: "Root Canal",
      count: 30,
      percentage: 32,
      type: "cyan",
    },
    {
      name: "Cleaning",
      count: 24,
      percentage: 26,
      type: "green",
    },
    {
      name: "Crown",
      count: 19,
      percentage: 21,
      type: "purple",
    },
    {
      name: "Filling",
      count: 11,
      percentage: 12,
      type: "orange",
    },
    {
      name: "Other",
      count: 8,
      percentage: 9,
      type: "blue",
    },
  ];

  const doctors = [
    {
      name: "Dr. Ahmed Mohamed",
      patients: "84",
      patientsChange: "+12%",
      appointments: "62",
      appointmentsChange: "+9%",
      treatments: "42",
      treatmentsChange: "+11%",
      completed: "38",
      completedChange: "+10%",
      revenue: "32,400",
      rating: "4.8",
      avatar: "AM",
    },
    {
      name: "Dr. Sara Khaled",
      patients: "71",
      patientsChange: "+8%",
      appointments: "53",
      appointmentsChange: "+6%",
      treatments: "31",
      treatmentsChange: "+7%",
      completed: "27",
      completedChange: "+8%",
      revenue: "27,800",
      rating: "4.7",
      avatar: "SK",
    },
    {
      name: "Dr. Mahmoud Hassan",
      patients: "53",
      patientsChange: "+5%",
      appointments: "41",
      appointmentsChange: "+4%",
      treatments: "19",
      treatmentsChange: "+6%",
      completed: "13",
      completedChange: "+5%",
      revenue: "24,300",
      rating: "4.6",
      avatar: "MH",
    },
  ];

  const topTreatments = [
    { name: "Root Canal", value: 32, type: "cyan" },
    { name: "Cleaning", value: 26, type: "green" },
    { name: "Crown", value: 21, type: "purple" },
    { name: "Filling", value: 12, type: "orange" },
    { name: "Other", value: 9, type: "blue" },
  ];

  const linePoints = useMemo(() => {
    const values = [15, 30, 25, 44, 52, 68, 62, 78];
    const width = 780;
    const height = 210;

    const max = Math.max(...values);
    const min = Math.min(...values);

    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * width;
        const y =
          height -
          ((value - min) / (max - min)) * (height - 30) -
          10;

        return `${x},${y}`;
      })
      .join(" ");
  }, []);

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="reports-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .reports-page {
          min-height: 100vh;
          width: 100%;
          padding: 28px;
          background:
            radial-gradient(circle at 10% 5%, rgba(0, 200, 255, .08), transparent 28%),
            radial-gradient(circle at 90% 15%, rgba(109, 72, 255, .07), transparent 25%),
            radial-gradient(circle at 80% 90%, rgba(0, 255, 180, .04), transparent 28%),
            #020914;
          color: #f4f9ff;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .reports-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .28;
          background-image:
            linear-gradient(rgba(0, 180, 255, .035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 180, 255, .035) 1px, transparent 1px);
          background-size: 38px 38px;
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .reports-page::after {
          content: "";
          position: fixed;
          width: 420px;
          height: 420px;
          right: -220px;
          top: 180px;
          border-radius: 50%;
          background: rgba(0, 180, 255, .06);
          filter: blur(80px);
          pointer-events: none;
        }

        .reports-container {
          max-width: 1500px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* HEADER */

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 22px;
        }

        .reports-brand {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .reports-logo {
          width: 94px;
          height: 94px;
          border-radius: 18px;
          border: 1px solid rgba(0, 204, 255, .55);
          background:
            radial-gradient(circle, rgba(0, 217, 255, .12), transparent 65%),
            rgba(4, 18, 32, .88);
          box-shadow:
            0 0 20px rgba(0, 200, 255, .16),
            inset 0 0 30px rgba(0, 160, 255, .05);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .reports-logo::after {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(0, 210, 255, .16);
          border-radius: 14px;
        }

        .tooth-logo {
          width: 57px;
          height: 57px;
          filter:
            drop-shadow(0 0 7px rgba(0, 220, 255, .8))
            drop-shadow(0 0 17px rgba(0, 170, 255, .45));
        }

        .brand-small {
          color: #00ddff;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1.7px;
          margin-bottom: 3px;
        }

        .reports-title {
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -.8px;
          margin: 0;
          background: linear-gradient(90deg, #fff, #d9f8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .reports-subtitle {
          color: #8095aa;
          font-size: 16px;
          margin-top: 8px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .date-select {
          height: 46px;
          min-width: 300px;
          border-radius: 11px;
          border: 1px solid rgba(51, 126, 182, .48);
          background: rgba(5, 18, 32, .84);
          color: #dceaf6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 15px;
          box-shadow: inset 0 0 20px rgba(0, 160, 255, .025);
        }

        .date-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .date-left svg {
          color: #70dfff;
        }

        .export-button {
          height: 46px;
          padding: 0 20px;
          border-radius: 11px;
          border: 1px solid rgba(0, 209, 255, .65);
          background: linear-gradient(
            135deg,
            rgba(0, 191, 255, .18),
            rgba(0, 90, 180, .12)
          );
          color: #54ddff;
          font-weight: 700;
          letter-spacing: .4px;
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          transition: .25s ease;
          box-shadow: 0 0 22px rgba(0, 180, 255, .08);
        }

        .export-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 28px rgba(0, 210, 255, .18),
            inset 0 0 20px rgba(0, 190, 255, .08);
        }

        .period-switch {
          display: flex;
          height: 38px;
          border: 1px solid rgba(49, 101, 145, .42);
          border-radius: 10px;
          overflow: hidden;
          background: rgba(3, 14, 26, .82);
          margin-top: 10px;
        }

        .period-button {
          min-width: 90px;
          padding: 0 16px;
          color: #91a6bb;
          border: none;
          border-right: 1px solid rgba(49, 101, 145, .25);
          background: transparent;
          cursor: pointer;
          font-size: 13px;
          transition: .2s ease;
        }

        .period-button:last-child {
          border-right: 0;
        }

        .period-button:hover {
          color: #dffaff;
        }

        .period-button.active {
          color: #63e3ff;
          background: linear-gradient(
            180deg,
            rgba(0, 166, 255, .22),
            rgba(0, 108, 190, .08)
          );
          box-shadow: inset 0 0 18px rgba(0, 195, 255, .1);
        }

        /* STAT CARDS */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .stat-card {
          min-height: 136px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(39, 112, 163, .48);
          border-radius: 13px;
          background:
            linear-gradient(
              135deg,
              rgba(7, 25, 43, .94),
              rgba(3, 14, 27, .92)
            );
          padding: 22px;
          box-shadow:
            inset 0 0 28px rgba(0, 160, 255, .025),
            0 10px 30px rgba(0, 0, 0, .16);
          transition: .25s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(63, 191, 255, .7);
          box-shadow:
            0 0 25px rgba(0, 177, 255, .08),
            inset 0 0 30px rgba(0, 150, 255, .04);
        }

        .stat-card::before {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          right: -90px;
          top: -80px;
          background: rgba(0, 190, 255, .05);
          filter: blur(2px);
        }

        .stat-content {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          height: 100%;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          border: 1px solid currentColor;
          background: rgba(0, 0, 0, .18);
        }

        .stat-icon.cyan {
          color: #00cfff;
          box-shadow: 0 0 20px rgba(0, 207, 255, .16);
        }

        .stat-icon.purple {
          color: #9d6bff;
          box-shadow: 0 0 20px rgba(157, 107, 255, .16);
        }

        .stat-icon.green {
          color: #00e59b;
          box-shadow: 0 0 20px rgba(0, 229, 155, .16);
        }

        .stat-icon.orange {
          color: #ffb329;
          box-shadow: 0 0 20px rgba(255, 179, 41, .15);
        }

        .stat-title {
          color: #a1b4c8;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .3px;
        }

        .stat-value {
          font-size: 34px;
          font-weight: 800;
          line-height: 1.05;
          margin-top: 4px;
        }

        .stat-value span {
          font-size: 14px;
          font-weight: 600;
          color: #b8c7d5;
          margin-left: 4px;
        }

        .stat-change {
          color: #00e9a0;
          font-size: 13px;
          margin-top: 7px;
          font-weight: 600;
        }

        .mini-chart {
          align-self: flex-end;
          width: 145px;
          height: 70px;
          opacity: .95;
        }

        .mini-chart polyline {
          fill: none;
          stroke-width: 2;
          vector-effect: non-scaling-stroke;
        }

        .mini-chart.cyan polyline {
          stroke: #00cfff;
          filter: drop-shadow(0 0 5px rgba(0, 207, 255, .65));
        }

        .mini-chart.purple polyline {
          stroke: #ae73ff;
          filter: drop-shadow(0 0 5px rgba(174, 115, 255, .6));
        }

        .mini-chart.green polyline {
          stroke: #00e8a0;
          filter: drop-shadow(0 0 5px rgba(0, 232, 160, .6));
        }

        .mini-chart.orange polyline {
          stroke: #ffb52e;
          filter: drop-shadow(0 0 5px rgba(255, 181, 46, .55));
        }

        /* MAIN CHART AREA */

        .analytics-grid {
          display: grid;
          grid-template-columns: 1.25fr .95fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .panel {
          border: 1px solid rgba(36, 109, 159, .48);
          border-radius: 13px;
          background:
            linear-gradient(
              145deg,
              rgba(6, 23, 39, .96),
              rgba(2, 13, 25, .95)
            );
          box-shadow:
            inset 0 0 30px rgba(0, 170, 255, .025),
            0 12px 35px rgba(0, 0, 0, .15);
          overflow: hidden;
        }

        .panel-header {
          height: 60px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(48, 106, 146, .2);
        }

        .panel-title {
          font-size: 16px;
          font-weight: 750;
          letter-spacing: .3px;
        }

        .panel-control {
          height: 34px;
          min-width: 110px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border: 1px solid rgba(44, 112, 161, .4);
          border-radius: 8px;
          background: rgba(3, 15, 27, .9);
          color: #d7e5ef;
          font-size: 12px;
        }

        .chart-wrapper {
          height: 285px;
          padding: 22px 18px 12px;
          position: relative;
        }

        .chart-grid {
          position: absolute;
          inset: 24px 20px 32px 60px;
          background-image:
            linear-gradient(rgba(73, 132, 172, .11) 1px, transparent 1px),
            linear-gradient(90deg, rgba(73, 132, 172, .08) 1px, transparent 1px);
          background-size: 100% 25%, 14.28% 100%;
          border-bottom: 1px solid rgba(73, 132, 172, .16);
        }

        .chart-svg {
          position: relative;
          width: calc(100% - 40px);
          height: 210px;
          margin-left: 42px;
          overflow: visible;
        }

        .chart-area {
          fill: url(#areaGradient);
        }

        .chart-line {
          fill: none;
          stroke: #12cfff;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter:
            drop-shadow(0 0 5px rgba(0, 204, 255, .8))
            drop-shadow(0 0 11px rgba(0, 204, 255, .35));
        }

        .chart-dot {
          fill: #effcff;
          stroke: #19cfff;
          stroke-width: 2;
          filter: drop-shadow(0 0 7px rgba(0, 210, 255, .9));
        }

        .y-labels {
          position: absolute;
          left: 16px;
          top: 22px;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #61778b;
          font-size: 11px;
        }

        .x-labels {
          position: absolute;
          left: 68px;
          right: 18px;
          bottom: 10px;
          display: flex;
          justify-content: space-between;
          color: #687e92;
          font-size: 11px;
        }

        .chart-tooltip {
          position: absolute;
          right: 24%;
          top: 96px;
          width: 114px;
          padding: 10px 12px;
          border-radius: 9px;
          background: rgba(4, 17, 30, .96);
          border: 1px solid rgba(40, 151, 207, .55);
          box-shadow: 0 0 22px rgba(0, 175, 255, .12);
          text-align: center;
        }

        .chart-tooltip small {
          display: block;
          color: #6d91a7;
          font-size: 10px;
          margin-bottom: 4px;
        }

        .chart-tooltip strong {
          font-size: 16px;
          color: #f4fbff;
        }

        /* DONUT */

        .treatment-content {
          min-height: 285px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
        }

        .donut-wrapper {
          width: 205px;
          height: 205px;
          position: relative;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut {
          width: 190px;
          height: 190px;
          border-radius: 50%;
          background:
            conic-gradient(
              #0aaeff 0 32%,
              #00d99a 32% 58%,
              #8c55ff 58% 79%,
              #ff9d1d 79% 91%,
              #24bfe9 91% 100%
            );
          box-shadow:
            0 0 24px rgba(0, 172, 255, .15),
            inset 0 0 20px rgba(0, 0, 0, .2);
          position: relative;
        }

        .donut::before {
          content: "";
          position: absolute;
          inset: 30px;
          border-radius: 50%;
          background: #04101d;
          border: 1px solid rgba(54, 131, 171, .3);
          box-shadow: inset 0 0 20px rgba(0, 190, 255, .06);
        }

        .donut::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px dashed rgba(0, 203, 255, .24);
          animation: spin 18s linear infinite;
        }

        .donut-center {
          position: absolute;
          z-index: 2;
          text-align: center;
        }

        .donut-center svg {
          color: #2bd8ff;
          filter: drop-shadow(0 0 7px rgba(0, 205, 255, .8));
          margin-bottom: 4px;
        }

        .donut-center div {
          font-size: 10px;
          color: #7591a4;
          letter-spacing: .8px;
        }

        .treatment-list {
          flex: 1;
          min-width: 0;
        }

        .treatment-row {
          display: grid;
          grid-template-columns: 10px 1fr auto;
          gap: 9px;
          align-items: center;
          min-height: 46px;
          border-bottom: 1px solid rgba(62, 105, 133, .17);
        }

        .treatment-row:last-child {
          border-bottom: 0;
        }

        .treatment-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .treatment-dot.cyan { color: #00bfff; background: #00bfff; }
        .treatment-dot.green { color: #00df9c; background: #00df9c; }
        .treatment-dot.purple { color: #955eff; background: #955eff; }
        .treatment-dot.orange { color: #ff9f1c; background: #ff9f1c; }
        .treatment-dot.blue { color: #2bc7ed; background: #2bc7ed; }

        .treatment-name {
          font-size: 13px;
          color: #e1edf5;
        }

        .treatment-count {
          color: #728a9d;
          font-size: 10px;
          margin-top: 2px;
        }

        .treatment-percent {
          font-size: 13px;
          color: #eaf7ff;
        }

        /* LOWER STATS */

        .lower-grid {
          display: grid;
          grid-template-columns: 1.65fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .small-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          min-height: 146px;
        }

        .small-stat {
          position: relative;
          padding: 22px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          border-right: 1px solid rgba(48, 106, 146, .24);
        }

        .small-stat:last-child {
          border-right: 0;
        }

        .small-stat-icon {
          width: 52px;
          height: 52px;
          flex: 0 0 auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid currentColor;
          background: rgba(0, 0, 0, .16);
        }

        .small-stat-icon.cyan {
          color: #00cfff;
          box-shadow: 0 0 20px rgba(0, 207, 255, .14);
        }

        .small-stat-icon.green {
          color: #00e19b;
          box-shadow: 0 0 20px rgba(0, 225, 155, .14);
        }

        .small-stat-icon.purple {
          color: #a15cff;
          box-shadow: 0 0 20px rgba(161, 92, 255, .14);
        }

        .small-title {
          color: #849aae;
          font-size: 11px;
          font-weight: 600;
        }

        .small-value {
          font-size: 29px;
          font-weight: 800;
          margin-top: 4px;
        }

        .small-change {
          color: #00e9a0;
          font-size: 11px;
          margin-top: 5px;
        }

        /* TOP TREATMENTS */

        .top-treatments {
          padding: 18px 20px;
          min-height: 146px;
        }

        .top-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 13px;
        }

        .top-title {
          font-size: 14px;
          font-weight: 750;
        }

        .view-all {
          border: 1px solid rgba(31, 132, 194, .45);
          background: rgba(0, 130, 220, .05);
          color: #54cfff;
          border-radius: 6px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 10px;
        }

        .top-treatment-row {
          display: grid;
          grid-template-columns: 74px 1fr 30px;
          align-items: center;
          gap: 9px;
          margin-bottom: 7px;
        }

        .top-treatment-name {
          color: #c6d4df;
          font-size: 11px;
        }

        .progress-track {
          height: 6px;
          border-radius: 999px;
          background: rgba(83, 116, 139, .16);
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          border-radius: inherit;
          box-shadow: 0 0 8px currentColor;
        }

        .progress-bar.cyan {
          background: #0ab8ff;
          color: #0ab8ff;
        }

        .progress-bar.green {
          background: #00d99a;
          color: #00d99a;
        }

        .progress-bar.purple {
          background: #955fff;
          color: #955fff;
        }

        .progress-bar.orange {
          background: #ff9f1e;
          color: #ff9f1e;
        }

        .progress-bar.blue {
          background: #21bfe9;
          color: #21bfe9;
        }

        .top-percentage {
          font-size: 10px;
          color: #b5c8d6;
          text-align: right;
        }

        /* DOCTOR PERFORMANCE */

        .performance-panel {
          padding-bottom: 12px;
        }

        .performance-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .performance-title-icon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #59dfff;
          background: rgba(0, 173, 255, .08);
          border: 1px solid rgba(0, 190, 255, .25);
        }

        .table-scroll {
          overflow-x: auto;
          padding: 0 10px;
        }

        .performance-table {
          width: 100%;
          min-width: 920px;
          border-collapse: separate;
          border-spacing: 0;
          border: 1px solid rgba(44, 107, 148, .4);
          border-radius: 9px;
          overflow: hidden;
        }

        .performance-table th {
          height: 42px;
          padding: 0 14px;
          color: #67cfff;
          background: rgba(4, 21, 36, .88);
          border-right: 1px solid rgba(47, 102, 139, .25);
          border-bottom: 1px solid rgba(47, 102, 139, .3);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: .3px;
          text-align: center;
          white-space: nowrap;
        }

        .performance-table th:first-child {
          text-align: left;
        }

        .performance-table td {
          height: 52px;
          padding: 0 14px;
          border-right: 1px solid rgba(47, 102, 139, .2);
          border-bottom: 1px solid rgba(47, 102, 139, .2);
          color: #d8e4ed;
          font-size: 12px;
          text-align: center;
          white-space: nowrap;
        }

        .performance-table tbody tr {
          background: rgba(2, 15, 28, .48);
          transition: .2s ease;
        }

        .performance-table tbody tr:hover {
          background: rgba(0, 139, 198, .06);
        }

        .doctor-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
        }

        .doctor-avatar {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 800;
          color: #dffaff;
          border: 1px solid rgba(0, 204, 255, .42);
          background:
            radial-gradient(circle at 30% 25%, rgba(0, 210, 255, .3), transparent 35%),
            #0b2638;
          box-shadow: 0 0 11px rgba(0, 200, 255, .1);
        }

        .doctor-name {
          font-size: 12px;
          color: #edf7fd;
        }

        .metric {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .metric-change {
          color: #00e99e;
          font-size: 9px;
        }

        .rating {
          color: #ffc42e;
          letter-spacing: 1px;
        }

        .rating-number {
          color: #d8e6ef;
          margin-left: 5px;
          letter-spacing: 0;
        }

        .more-button {
          width: 32px;
          height: 28px;
          border-radius: 7px;
          border: 1px solid rgba(41, 124, 181, .5);
          background: rgba(0, 118, 190, .05);
          color: #68cfff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* ANIMATION */

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media print {
          .reports-page {
            background: #020914 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .export-button,
          .period-switch {
            display: none;
          }
        }

        /* RESPONSIVE */

        @media (max-width: 1250px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .lower-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 800px) {
          .reports-page {
            padding: 16px;
          }

          .reports-header {
            flex-direction: column;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .date-select {
            min-width: 240px;
          }

          .period-switch {
            width: 100%;
          }

          .period-button {
            flex: 1;
            min-width: 0;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .small-stats {
            grid-template-columns: 1fr;
          }

          .small-stat {
            border-right: 0;
            border-bottom: 1px solid rgba(48, 106, 146, .24);
          }

          .small-stat:last-child {
            border-bottom: 0;
          }

          .treatment-content {
            flex-direction: column;
          }
        }

        @media (max-width: 520px) {
          .reports-brand {
            align-items: flex-start;
          }

          .reports-logo {
            width: 70px;
            height: 70px;
          }

          .tooth-logo {
            width: 42px;
            height: 42px;
          }

          .reports-title {
            font-size: 32px;
          }

          .header-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .date-select,
          .export-button {
            width: 100%;
          }

          .stat-card {
            padding: 18px;
          }

          .mini-chart {
            width: 100px;
          }

          .donut-wrapper {
            width: 175px;
            height: 175px;
          }

          .donut {
            width: 160px;
            height: 160px;
          }
        }
      `}</style>

      <div className="reports-container">

        {/* HEADER */}
        <header className="reports-header">
          <div className="reports-brand">
            <div className="reports-logo">
              <svg
                className="tooth-logo"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M28 22
                  C18 25 14 37 17 48
                  C20 58 25 63 26 73
                  C27 83 31 91 38 91
                  C44 91 45 79 50 79
                  C55 79 56 91 62 91
                  C69 91 73 83 74 73
                  C75 63 80 58 83 48
                  C86 37 82 25 72 22
                  C64 19 57 24 50 24
                  C43 24 36 19 28 22Z"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  d="M31 35 C37 30 43 31 50 35 C57 31 63 30 69 35"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity=".7"
                />

                <circle
                  cx="50"
                  cy="53"
                  r="4"
                  fill="currentColor"
                />

                <path
                  d="M50 42V64M39 53H61"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity=".65"
                />
              </svg>
            </div>

            <div>
              <div className="brand-small">
                DENTAL CLINIC
              </div>

              <h1 className="reports-title">
                REPORTS
              </h1>

              <div className="reports-subtitle">
                Clinical & Financial Intelligence
              </div>
            </div>
          </div>

          <div className="header-actions">
            <div className="date-select">
              <div className="date-left">
                <CalendarDays size={17} />
                <span>
                  01 May 2026&nbsp;&nbsp;–&nbsp;&nbsp;31 May 2026
                </span>
              </div>

              <ChevronDown size={16} />
            </div>

            <button
              className="export-button"
              onClick={handleExport}
            >
              <Download size={17} />
              EXPORT REPORT
            </button>

            <div className="period-switch">
              {["Today", "Week", "Month", "Year", "Custom"].map(
                (item) => (
                  <button
                    key={item}
                    className={`period-button ${
                      period === item ? "active" : ""
                    }`}
                    onClick={() => setPeriod(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </header>

        {/* STAT CARDS */}
        <section className="stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            const points = stat.data
              .map((value, index) => {
                const x =
                  (index / (stat.data.length - 1)) * 145;

                const max = Math.max(...stat.data);
                const min = Math.min(...stat.data);

                const y =
                  65 -
                  ((value - min) / (max - min)) * 52;

                return `${x},${y}`;
              })
              .join(" ");

            return (
              <div
                className="stat-card"
                key={stat.title}
              >
                <div className="stat-content">
                  <div className="stat-info">
                    <div
                      className={`stat-icon ${stat.type}`}
                    >
                      <Icon size={25} />
                    </div>

                    <div className="stat-title">
                      {stat.title}
                    </div>

                    <div className="stat-value">
                      {stat.value}

                      {stat.suffix && (
                        <span>{stat.suffix}</span>
                      )}
                    </div>

                    <div className="stat-change">
                      {stat.change} ↑
                    </div>
                  </div>

                  <svg
                    className={`mini-chart ${stat.type}`}
                    viewBox="0 0 145 70"
                    preserveAspectRatio="none"
                  >
                    <polyline points={points} />
                  </svg>
                </div>
              </div>
            );
          })}
        </section>

        {/* ANALYTICS */}
        <section className="analytics-grid">

          {/* REVENUE CHART */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                REVENUE ANALYTICS
              </div>

              <div className="panel-control">
                <span>{reportType}</span>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="chart-wrapper">
              <div className="chart-grid" />

              <div className="y-labels">
                <span>90K</span>
                <span>60K</span>
                <span>30K</span>
                <span>0</span>
              </div>

              <svg
                className="chart-svg"
                viewBox="0 0 780 210"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#00cfff"
                      stopOpacity=".27"
                    />
                    <stop
                      offset="100%"
                      stopColor="#00cfff"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <polygon
                  className="chart-area"
                  points={`0,200 ${linePoints} 780,200`}
                />

                <polyline
                  className="chart-line"
                  points={linePoints}
                />

                {[15, 30, 25, 44, 52, 68, 62, 78].map(
                  (value, index) => {
                    const x =
                      (index / 7) * 780;

                    const min = 15;
                    const max = 78;

                    const y =
                      210 -
                      ((value - min) / (max - min)) *
                        180 -
                      10;

                    return (
                      <circle
                        key={index}
                        className="chart-dot"
                        cx={x}
                        cy={y}
                        r="4"
                      />
                    );
                  }
                )}
              </svg>

              <div className="chart-tooltip">
                <small>MAY 2026</small>
                <strong>84,500 EGP</strong>
              </div>

              <div className="x-labels">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
              </div>
            </div>
          </div>

          {/* TREATMENT OVERVIEW */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                TREATMENT OVERVIEW
              </div>
            </div>

            <div className="treatment-content">
              <div className="donut-wrapper">
                <div className="donut" />

                <div className="donut-center">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path
                      d="M28 22C18 25 14 37 17 48C20 58 25 63 26 73C27 83 31 91 38 91C44 91 45 79 50 79C55 79 56 91 62 91C69 91 73 83 74 73C75 63 80 58 83 48C86 37 82 25 72 22C64 19 57 24 50 24C43 24 36 19 28 22Z"
                      stroke="currentColor"
                      strokeWidth="5"
                    />
                  </svg>

                  <div>TREATMENTS</div>
                </div>
              </div>

              <div className="treatment-list">
                {treatmentData.map((item) => (
                  <div
                    className="treatment-row"
                    key={item.name}
                  >
                    <span
                      className={`treatment-dot ${item.type}`}
                    />

                    <div>
                      <div className="treatment-name">
                        {item.name}
                      </div>

                      <div className="treatment-count">
                        {item.count} treatments
                      </div>
                    </div>

                    <div className="treatment-percent">
                      {item.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LOWER STATISTICS */}
        <section className="lower-grid">

          <div className="panel small-stats">
            <div className="small-stat">
              <div className="small-stat-icon cyan">
                <UserPlus size={24} />
              </div>

              <div>
                <div className="small-title">
                  NEW PATIENTS
                </div>

                <div className="small-value">
                  42
                </div>

                <div className="small-change">
                  +15.2% ↑
                </div>
              </div>
            </div>

            <div className="small-stat">
              <div className="small-stat-icon green">
                <RefreshCw size={24} />
              </div>

              <div>
                <div className="small-title">
                  RETURNING PATIENTS
                </div>

                <div className="small-value">
                  136
                </div>

                <div className="small-change">
                  +9.7% ↑
                </div>
              </div>
            </div>

            <div className="small-stat">
              <div className="small-stat-icon purple">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <div className="small-title">
                  COMPLETED TREATMENTS
                </div>

                <div className="small-value">
                  78
                </div>

                <div className="small-change">
                  +11.3% ↑
                </div>
              </div>
            </div>
          </div>

          {/* TOP TREATMENTS */}
          <div className="panel top-treatments">
            <div className="top-title-row">
              <div className="top-title">
                TOP TREATMENTS
              </div>

              <button className="view-all">
                View All
              </button>
            </div>

            {topTreatments.map((item) => (
              <div
                className="top-treatment-row"
                key={item.name}
              >
                <div className="top-treatment-name">
                  {item.name}
                </div>

                <div className="progress-track">
                  <div
                    className={`progress-bar ${item.type}`}
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

                <div className="top-percentage">
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DOCTOR PERFORMANCE */}
        <section className="panel performance-panel">
          <div className="panel-header">
            <div className="performance-title">
              <div className="performance-title-icon">
                <BarChart3 size={17} />
              </div>

              <div className="panel-title">
                DOCTOR PERFORMANCE
              </div>
            </div>

            <Sparkles
              size={18}
              color="#3fdcff"
            />
          </div>

          <div className="table-scroll">
            <table className="performance-table">
              <thead>
                <tr>
                  <th>DOCTOR</th>
                  <th>PATIENTS</th>
                  <th>APPOINTMENTS</th>
                  <th>TREATMENTS</th>
                  <th>COMPLETED</th>
                  <th>REVENUE</th>
                  <th>SATISFACTION</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.name}>
                    <td>
                      <div className="doctor-cell">
                        <div className="doctor-avatar">
                          {doctor.avatar}
                        </div>

                        <div className="doctor-name">
                          {doctor.name}
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="metric">
                        <span>
                          {doctor.patients}
                        </span>

                        <span className="metric-change">
                          {doctor.patientsChange}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="metric">
                        <span>
                          {doctor.appointments}
                        </span>

                        <span className="metric-change">
                          {doctor.appointmentsChange}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="metric">
                        <span>
                          {doctor.treatments}
                        </span>

                        <span className="metric-change">
                          {doctor.treatmentsChange}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="metric">
                        <span>
                          {doctor.completed}
                        </span>

                        <span className="metric-change">
                          {doctor.completedChange}
                        </span>
                      </div>
                    </td>

                    <td>
                      {doctor.revenue} EGP
                    </td>

                    <td>
                      <span className="rating">
                        ★★★★★
                      </span>

                      <span className="rating-number">
                        {doctor.rating}
                      </span>
                    </td>

                    <td>
                      <button className="more-button">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}