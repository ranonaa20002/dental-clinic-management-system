import {
  Search,
  SlidersHorizontal,
  ScanSearch,
} from "lucide-react";

export default function PatientSearch({
  search,
  setSearch,
}) {
  return (
    <div className="relative">

      {/* =====================================================
          OUTER GLOW
      ===================================================== */}

      <div className="
        pointer-events-none
        absolute
        inset-0
        rounded-2xl
        bg-cyan-400/[0.03]
        blur-xl
      " />

      {/* =====================================================
          SEARCH CONTAINER
      ===================================================== */}

      <div className="
        relative
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-cyan-400/10
        bg-[#061421]/80
        px-4
        py-3
        shadow-[0_15px_50px_rgba(0,0,0,0.3)]
        backdrop-blur-2xl
        transition-all
        duration-300
        focus-within:border-cyan-400/30
        focus-within:bg-[#071925]/90
        focus-within:shadow-[0_0_40px_rgba(0,210,255,0.07)]
      ">

        {/* Search Icon */}

        <div className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-cyan-400/10
          bg-cyan-400/[0.07]
        ">

          <Search
            size={19}
            strokeWidth={2}
            className="text-cyan-400"
          />

        </div>

        {/* Input */}

        <div className="min-w-0 flex-1">

          <p className="
            mb-0.5
            text-[9px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-slate-600
          ">
            Patient Search
          </p>

          <input
            type="text"
            placeholder="Search by Name, Phone or ID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              border-none
              bg-transparent
              p-0
              text-sm
              text-white
              outline-none
              placeholder:text-slate-600
              focus:border-none
              focus:outline-none
              focus:ring-0
            "
          />

        </div>

        {/* Search indicator */}

        <div className="
          hidden
          items-center
          gap-2
          rounded-xl
          border
          border-white/[0.06]
          bg-white/[0.025]
          px-3
          py-2
          sm:flex
        ">

          <ScanSearch
            size={15}
            className="text-slate-600"
          />

          <span className="
            text-[10px]
            text-slate-600
          ">
            NAME / PHONE / ID
          </span>

        </div>

        {/* Filter button */}

        <button
          type="button"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            text-slate-500
            transition-all
            duration-300
            hover:border-cyan-400/20
            hover:bg-cyan-400/[0.07]
            hover:text-cyan-400
          "
          title="Search filters"
        >

          <SlidersHorizontal size={17} />

        </button>

      </div>

      {/* =====================================================
          ACTIVE LINE
      ===================================================== */}

      <div className="
        pointer-events-none
        absolute
        bottom-0
        left-[8%]
        right-[8%]
        h-px
        bg-gradient-to-r
        from-transparent
        via-cyan-400/30
        to-transparent
        opacity-0
        transition-opacity
        duration-300
        peer-focus:opacity-100
      " />

    </div>
  );
}