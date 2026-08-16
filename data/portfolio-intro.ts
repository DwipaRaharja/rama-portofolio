export const PORTFOLIO_INTRO_EVENT = "portfolio-intro-complete";
export const PORTFOLIO_INTRO_STORAGE_KEY = "ramadwipa-portfolio-intro-seen";

export function shouldPlayPortfolioIntro() {
  if (typeof window === "undefined") return true;

  const forceIntro = new URLSearchParams(window.location.search).get("intro") === "1";

  if (forceIntro) return true;

  try {
    return sessionStorage.getItem(PORTFOLIO_INTRO_STORAGE_KEY) !== "true";
  } catch {
    return true;
  }
}

export function markPortfolioIntroAsSeen() {
  try {
    sessionStorage.setItem(PORTFOLIO_INTRO_STORAGE_KEY, "true");
  } catch {
    // The intro still works when browser storage is unavailable.
  }
}
