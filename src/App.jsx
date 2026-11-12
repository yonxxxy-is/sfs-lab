import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const page = (el) => <PageTransition>{el}</PageTransition>;

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // Scroll to top once the old page has finished leaving, so it never jumps mid-fade.
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Suspense
        fallback={
          <div role="status" className="py-16 text-center text-sm text-slate-500">
            Loading page...
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={page(<Home />)} />
          <Route path="/about" element={page(<About />)} />
          <Route path="/projects" element={page(<Projects />)} />
          <Route path="/privacy" element={page(<Privacy />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    // reducedMotion="user": movement is switched off for people who ask their OS for less motion.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="mx-auto min-h-[60vh] max-w-4xl px-5 pb-10 focus:outline-none">
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </MotionConfig>
  );
}
