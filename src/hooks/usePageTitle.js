import { useEffect } from "react";

const SITE = "Sion Felix Saragih";

// Sets a per-route document title. Pass nothing for the home page.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE}`
      : `${SITE} | Information Systems, Data Analytics & IT Governance`;
  }, [title]);
}
