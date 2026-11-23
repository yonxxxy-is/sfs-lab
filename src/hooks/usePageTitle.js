import { useEffect } from "react";

const SITE = "SFS Lab | Sion Felix Saragih";

// Sets a per-route document title. Pass nothing for the home page.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE}`
      : `${SITE} — Data Analytics & IT Governance`;
  }, [title]);
}
