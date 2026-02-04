"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function buildPages(current, total) {
  if (total <= 12) return Array.from({ length: total }, (_, i) => i + 1);

  // match your screenshot style:
  // page 1 => 1..10 ... (total-1) total
  if (current <= 6) return [...Array.from({ length: 10 }, (_, i) => i + 1), "...", total - 1, total];

  // near the end => 1 ( ... ) last 10
  if (current >= total - 5) return [1, "...", ...Array.from({ length: 10 }, (_, i) => total - 9 + i)];

  // middle => 1 ... (current-1 current current+1) ... last
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const currentPage = Math.max(1, Number(search.get("page") || 1));

  const pages = useMemo(
    () => buildPages(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const goTo = (page) => {
    const sp = new URLSearchParams(search.toString());
    sp.set("page", String(page));
    router.push(`${pathname}?${sp.toString()}`);
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav className="flex justify-center my-8 pb-8" aria-label="Pagination">
      <div className="inline-flex items-center border-2 border-gray-300 bg-white overflow-hidden">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={isFirst}
          className={`px-4 py-2 border-r-2 border-gray-300 font-bold text-sm ${
            isFirst ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          ‹ পূর্ববর্তী
        </button>

        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-4 py-2 text-sm text-gray-500 border-r-2 border-gray-300">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={`px-4 py-2 text-sm border-r-2 border-gray-300 font-bold hover:bg-gray-100 ${
                p === currentPage ? "bg-black text-white hover:bg-gray-800" : ""
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={isLast}
          className={`px-4 py-2 font-bold text-sm ${
            isLast ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          পরবর্তী ›
        </button>
      </div>
    </nav>
  );
}
