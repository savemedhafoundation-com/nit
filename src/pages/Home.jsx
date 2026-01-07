import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { Link } from "react-router-dom";
import ThreePillars from "../components/ThreePillars";
import PatientStories from "../components/PatientStories";
import SymptomChecker from "./SymptomChecker";
import heroImage from "../assets/photo/13.png";
import whentoseek from "../assets/photo/WhenToSeek.png";
import heroBackground from "../assets/photo/Rectangle 154.png";
import ethicalguide from "../assets/photo/ethicalGuidance.png";
import HerBackgroundVideo from "../../public/4.mp4";
import missionImage from "../assets/photo/Rectangle 153.png";
import beliefSecondaryImage from "../assets/photo/Rectangle 158.png";
import boosterImage from "../assets/photo/Rectangle 162.png";
import sectionVideo from "../assets/photo/demo.mp4";
import sectionBg from "../assets/photo/bg.png";
import HowNITWorks from "../components/HowNITWorks";
import NITicon from "../assets/photo/NIT ICON.png";
import nitSolution from "../assets/photo/Natural_Supplement.mp4";
import Footer from "../components/Footer";
import asknit from "../assets/photo/asknit.png";
import { RiChatAiLine } from "react-icons/ri";

const therapyTabs = [
  { label: "NATURAL CURE" },
  { label: "NON CHEMICAL THERAPY" },
  { label: "FOOD BASED HEALING" },
];

const timedHeroTexts = [
  {
    time: 0,
    text: "Rebuilding the body's healing intelligence through natural cellular balance.",
  },

  {
    time: 8.15,
    text: "Disease begins when nutrition, toxins, and signals fall out of harmony.",
  },

  {
    time: 16.5,
    text: "Natural Immunotherapy restores what cells need to repair and survive.",
  },

  {
    time: 24.75,
    text: "Instead of attacking symptoms, it corrects internal biological conditions.",
  },

  {
    time: 33,
    text: "Vitamins, minerals, and coenzymes guide cells back to normal function.",
  },

  {
    time: 41.25,
    text: "As immunity stabilizes, abnormal growths lose their biological support.",
  },

  {
    time: 49.5,
    text: "Organs recover strength when toxicity and overload are resolved.",
  },

  {
    time: 57.75,
    text: "Healing emerges naturally when the body regains cellular intelligence.",
  },
];

const Home = () => {
  const [activeTherapyTab, setActiveTherapyTab] = useState(
    therapyTabs[0].label
  );
  const [currentHeroText, setCurrentHeroText] = useState(
    timedHeroTexts[0].text
  );
  const [showHeroPanel, setShowHeroPanel] = useState(true);
  const heroVideoRef = useRef(null);
  const heroTypedRef = useRef(null);
  const heroTypedInstanceRef = useRef(null);
  const heroCompactTypedRef = useRef(null);
  const heroCompactTypedInstanceRef = useRef(null);
  const heroPanelTimerRef = useRef(null);
  const heroVideoTimeRef = useRef(0);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleMobilePlay = () => {
    if (!mobileVideoRef.current) {
      return;
    }
    mobileVideoRef.current.play();
    setIsMobilePlaying(true);
  };

  useEffect(() => {
    const videoEl = heroVideoRef.current;
    if (!videoEl) {
      return;
    }

    const getTextForTime = (time) => {
      let nextText = timedHeroTexts[0].text;
      for (let i = 0; i < timedHeroTexts.length; i += 1) {
        if (time >= timedHeroTexts[i].time) {
          nextText = timedHeroTexts[i].text;
        } else {
          break;
        }
      }

      return nextText;
    };

    const handleTimeUpdate = () => {
      const time = videoEl.currentTime;
      const nextText = getTextForTime(time);
      if (time < heroVideoTimeRef.current) {
        setShowHeroPanel(true);
        if (heroPanelTimerRef.current) {
          clearTimeout(heroPanelTimerRef.current);
        }
        heroPanelTimerRef.current = setTimeout(() => {
          setShowHeroPanel(false);
        }, 7000);
      }
      heroVideoTimeRef.current = time;
      setCurrentHeroText((prevText) =>
        prevText === nextText ? prevText : nextText
      );
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("loadedmetadata", handleTimeUpdate);
    videoEl.addEventListener("seeked", handleTimeUpdate);
    videoEl.addEventListener("playing", handleTimeUpdate);
    return () => {
      if (heroPanelTimerRef.current) {
        clearTimeout(heroPanelTimerRef.current);
      }
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("loadedmetadata", handleTimeUpdate);
      videoEl.removeEventListener("seeked", handleTimeUpdate);
      videoEl.removeEventListener("playing", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!heroTypedRef.current) {
      return;
    }

    const initTyped = (targetRef, instanceRef) => {
      if (!targetRef.current) {
        return;
      }

      if (instanceRef.current) {
        instanceRef.current.destroy();
      }

      instanceRef.current = new Typed(targetRef.current, {
        strings: [currentHeroText],
        typeSpeed: 38,
        backSpeed: 0,
        showCursor: true,
        cursorChar: "|",
      });
    };

    initTyped(heroTypedRef, heroTypedInstanceRef);
    initTyped(heroCompactTypedRef, heroCompactTypedInstanceRef);

    return () => {
      if (heroTypedInstanceRef.current) {
        heroTypedInstanceRef.current.destroy();
        heroTypedInstanceRef.current = null;
      }
      if (heroCompactTypedInstanceRef.current) {
        heroCompactTypedInstanceRef.current.destroy();
        heroCompactTypedInstanceRef.current = null;
      }
    };
  }, [currentHeroText]);

  useEffect(() => {
    heroPanelTimerRef.current = setTimeout(() => {
      setShowHeroPanel(false);
    }, 7000);

    return () => {
      if (heroPanelTimerRef.current) {
        clearTimeout(heroPanelTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-[100px] w-full bg-[#f4fbe7] absolute">
      <section className="relative h-[90vh] w-full overflow-hidden text-white bg-[#f4fbe7]">
        {/* bg-gradient-to-r from-[#0b5f10]/95 via-[#11841b]/82 to-[#6bca60]/55  */}
        {/* Background Overlay Image */}
        {/* <img
          src={heroBackground}
          alt="Leafy green backdrop"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-soft-light"
        /> */}
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-[80vh] w-full object-cover"
          src={HerBackgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Content Container */}
        <div
          className={`relative top-40 z-10 mx-auto flex max-w-[1200px] flex-col-reverse gap-8 transition-opacity duration-700 ${
            showHeroPanel ? "opacity-100" : "pointer-events-none opacity-0"
          }
rounded-3xl 
bg-gradient-to-r 
from-[#0b5f10]/45 
via-[#11841b]/40 
to-[#6bca60]/45 
backdrop-blur-2xl 
backdrop-saturate-150
border border-white/20
shadow-xl shadow-black/30
px-6 py-16 
lg:flex-row lg:items-center lg:justify-between lg:px-8`}
        >
          {/* Right side icon */}
          <div
            className="
      flex items-center justify-center
      h-[140px] w-[140px] 
      sm:h-[160px] sm:w-[160px] 
      lg:h-[180px] lg:w-[180px]
      rounded-full
    "
          >
            <img
              src={NITicon}
              alt="Natural Immunotherapy Icon"
              className="
        h-[90px] w-[90px]
        sm:h-[110px] sm:w-[110px]
        lg:h-[125px] lg:w-[125px]
        object-contain
        opacity-100
      "
            />
          </div>

          {/* ---------- LEFT SIDE: Text ---------- */}
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/85">
              Recharge your health
            </p>

            <h1 className="mt-4 text-[3.2rem] lg:text-[4.2rem] font-limelight leading-tight font-normal text-white">
              Natural Immunotherapy
            </h1>

            <p
              className="
    mt-6
    max-w-[502px]
    h-[93px]
    text-[36px]
    leading-[52px]
    tracking-normal
    font-lora
    font-normal
    text-white
    opacity-100
  "
            >
              <span ref={heroTypedRef} />
            </p>
            <div className="mt-8 flex justify-center lg:justify-center">
              <a
                href="#therapies"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#76e16d] via-[#31a12d] to-[#0d6615] px-10 py-3 text-lg font-semibold text-white shadow-[0_16px_32px_rgba(20,110,33,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(20,110,33,0.45)] font-montserrat"
              >
                Ask Your Problem
              </a>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-40 z-10 flex justify-center px-6 transition-opacity duration-700 ${
            showHeroPanel ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex min-h-[280px] w-full max-w-[720px] min-w-[320px] flex-col items-center gap-6 rounded-3xl border border-white/20 bg-white/10 px-8 py-10 text-center backdrop-blur-xl">
            <p
              className="min-h-[40px]
    sm:min-h-[44px]
    md:min-h-[48px] text-[34px] leading-[48px] font-lora font-normal text-white"
            >
              <span ref={heroCompactTypedRef} />
            </p>
            <a
              href="#therapies"
              className="
    inline-flex items-center justify-center
    uppercase rounded-full
    bg-gradient-to-b from-[#76e16d] via-[#31a12d] to-[#0d6615]
    px-10 py-3 text-lg font-semibold text-white
    shadow-[0_16px_32px_rgba(20,110,33,0.35)]
    transition hover:-translate-y-0.5
    hover:shadow-[0_18px_36px_rgba(20,110,33,0.45)]
    font-montserrat
  "
            >
              Ask Your Problem
            </a>
          </div>
        </div>
        {/* <div className="absolute inset-x-0 bottom-[-24px] z-10 flex justify-center px-6 sm:bottom-[-32px] lg:bottom-[50px]">
          <div className="w-full max-w-[980px]">
            <div className="flex items-center justify-between gap-4 rounded-[36px] bg-white px-6 py-5 shadow-[0_16px_34px_rgba(15,90,32,0.28)] sm:px-10 sm:py-6">
              {therapyTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTherapyTab(tab.label)}
                  className={`min-h-[64px] flex-1 rounded-[22px] px-6 py-3 text-base font-semibold uppercase tracking-[0.18em] sm:text-lg ${
                    activeTherapyTab === tab.label
                      ? "bg-gradient-to-b from-[#7ae86c] via-[#33a733] to-[#0d6a18] text-white shadow-[0_14px_24px_rgba(12,111,32,0.35)]"
                      : "bg-transparent text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div> */}
        <div
          className="
    absolute
    inset-x-0
    top-[80vh]
    h-[20px]
    bg-gradient-to-r
    from-[#0d6615]
    via-[#76e16d]
    to-[#0d6615]
    z-[5]
  "
        />
      </section>

      <section id="therapies" className=" mt-0 bg-[#f7ffe8] pb-20">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid items-center gap-12 rounded-[36px] bg-[#f6ffe9] p-8 shadow-[0_22px_48px_rgba(22,108,39,0.18)] lg:grid-cols-[1.05fr,0.95fr]">
            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_18px_36px_rgba(22,108,39,0.18)]">
              <div className="absolute left-6 top-6 flex flex-col gap-1.5">
                <span className="h-1 w-10 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-7 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-5 rounded-full bg-[#0f8f28]" />
              </div>
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/src/assets/photo/Rectangle 151.png"
              >
                <source src={sectionVideo} type="video/mp4" />
              </video>
            </div>

            <div className="space-y-6 text-primary-900">
              <div className="flex items-start gap-4">
                <h2 className="text-3xl font-semibold leading-snug text-[#0e4d1b] font-montserrat">
                  <span className="text-[#0d7f1f]">
                    Healing Beyond Medicine
                  </span>
                  <span className="text-[#17371e]">
                    {" "}
                    Uniting Nature's Intelligence with Scientific Understanding.
                  </span>
                </h2>
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0d8b1f] text-white shadow-[0_10px_18px_rgba(15,121,39,0.3)]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v9.5A2.5 2.5 0 0 0 4.5 18H8l4 3 4-3h3.5A2.5 2.5 0 0 0 22 15.5V6a2 2 0 0 0-2-2z" />
                  </svg>
                </span>
              </div>
              <div className="space-y-4 text-[1.05rem] leading-8 text-[#1f3b1f] font-lora">
                <p className="italic font-semibold text-[#0c5c18]">
                  When modern medicine says "no cure,"{" "}
                  <span className="font-bold not-italic text-[#0b4713]">
                    Nature whispers "try again."
                  </span>
                </p>
                <p>
                  At Natural Immunotherapy (NIT), we bring hope where
                  conventional medicine gives up. Our therapies rebuild the
                  body's natural healing intelligence to cure critical diseases
                  without chemotherapy, surgery, or radiation.
                </p>
                <p>
                  We have witnessed patients recover from cancer, kidney
                  failure, heart disease, thalassemia, nerve disorders, and
                  spinal atrophy through our scientifically designed Natural
                  Immunotherapy process.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-[#76e16d] via-[#31a12d] to-[#0d6615] px-10 py-3 text-lg font-semibold text-white shadow-[0_16px_32px_rgba(20,110,33,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(20,110,33,0.45)] font-montserrat"
              >
                Our Mission
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="symptom-checker"
        className="bg-[#e9f8dd] py-16 pb-20 px-4 sm:px-6 lg:px-10"
      >
        <div
          className="
    relative
    h-[120px]
    mb-8
    -ml-12
    mr-[140px]
    overflow-hidden
    bg-gradient-to-r
    from-[#0a5f12]
    via-[#1a7f1f]
    to-[#2f8f2d]
    px-6
    py-5
    text-center
    text-white
    shadow-[0_18px_36px_rgba(7,71,21,0.35)]
    sm:px-10
    flex
    flex-col
    items-center
    justify-center
        rounded-tr-[28px]
    rounded-br-[28px]
  "
        >
          <h3 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl font-montserrat max-w-[1180px]">
            Body / Symptom Selector
          </h3>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/90 sm:text-base font-montserrat max-w-[1180px]">
            &rarr; Head | Chest | Gut | Kidney | Skin | Neuro | Cancer
          </p>
        </div>
        <div className="mx-auto max-w-[1180px] space-y-6 rounded-[36px] bg-gradient-to-r from-[#f6fff0] via-white to-[#ecf9e2] p-6 shadow-[0_26px_54px_rgba(13,93,23,0.12)] lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0d7120]">
                Symptom Checker
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-[#123a1e] sm:text-4xl font-montserrat">
                Explore conditions that may match your symptoms
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[#21412b] font-lora">
                Start the non-diagnostic checker right on the home page or open
                the full experience on its dedicated page.
              </p>
            </div>
            <Link
              to="/symptom-checker"
              className="inline-flex items-center justify-center rounded-full border border-[#0d7120] bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#0d7120] shadow-[0_14px_28px_rgba(13,93,23,0.16)] transition hover:-translate-y-0.5 hover:bg-[#e8f7ed]"
            >
              Open full checker
            </Link>
          </div>
          <SymptomChecker embedded />
        </div>
      </section>
      <>
        <div
          className="h-[120px] flex items-center justify-center mt-10 mb-8 ml-[140px] overflow-hidden rounded-tl-[28px]
    rounded-bl-[28px] bg-gradient-to-r from-[#0a5f12] via-[#1a7f1f] to-[#2f8f2d] px-6 py-5 text-center text-white shadow-[0_18px_36px_rgba(7,71,21,0.35)] sm:px-10"
        >
          <h3 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl font-montserrat max-w-[980px]">
            What is Natural Immunotherapy ?
          </h3>
        </div>
        <div className=" z-10 flex justify-center px-2">
          <div className="w-full max-w-[1180px]">
            <div className="flex flex-col items-center gap-10 rounded-[36px] bg-[#f6ffe9] p-8  lg:flex-row lg:gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold leading-tight text-slate-900">
                  Why Natural Immunotherapy?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-800">
                  Natural Immunotherapy (NIT) is not just a therapy; it is a
                  scientific awakening. It restores what your body was always
                  meant to do: heal itself. Our mission is to educate, empower,
                  and help people rediscover the intelligence hidden within
                  their own cells. Through Cellular Intelligence, Nutrient
                  Signaling, and Toxin Detoxification, NIT offers a new
                  direction-beyond chemo, beyond radiation, beyond the fear of
                  genetics.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ThreePillars />
      </>

      <section className="bg-[#f7ffe8] py-20">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid items-center gap-12 rounded-[36px] bg-[#f2ffdb] p-8 pb-16 shadow-[0_20px_46px_rgba(17,109,36,0.18)] lg:grid-cols-[1.1fr,0.9fr] lg:p-12 lg:pb-20">
            <div className="space-y-6 text-[#1f3b1f]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0f8f28] text-white shadow-[0_12px_26px_rgba(17,109,36,0.35)]">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v9.5A2.5 2.5 0 0 0 4.5 18H8l4 3 4-3h3.5A2.5 2.5 0 0 0 22 15.5V6a2 2 0 0 0-2-2z" />
                  </svg>
                </span>
                <h3 className="text-3xl font-semibold leading-snug text-[#0f3f19] sm:text-[2.2rem] font-montserrat">
                  <span className="text-[#0d7f1f]">
                    We Believe Every Body Can Heal Itself
                  </span>
                  <span className="text-[#17361d]"> If Guided Right.</span>
                </h3>
              </div>
              <div className="space-y-5 text-lg leading-8 text-[#22432a] font-lora">
                <p>
                  Your body is not broken it is intelligent. At Natural
                  Immunotherapy, we reactivate that intelligence through
                  nutrients, not chemicals. Our process focuses on restoring
                  cellular balance and awakening natural immunity to fight
                  disease from within.
                </p>
                <p>
                  We treat not just symptoms, but the cause giving patients a
                  new life, naturally.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -right-6 top-6 hidden flex-col gap-1.5 lg:flex">
                <span className="h-1 w-12 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-9 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-7 rounded-full bg-[#0f8f28]" />
              </div>
              <div className="relative w-full max-w-[420px]">
                <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_18px_36px_rgba(17,109,36,0.22)]">
                  <img
                    src={beliefSecondaryImage}
                    alt="Guided natural healing"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-14 left-6 w-[220px] overflow-hidden rounded-[28px] border-4 border-[#f2ffdb] shadow-[0_18px_32px_rgba(17,109,36,0.25)]">
                  <img
                    src={boosterImage}
                    alt="Immune system support"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        <HowNITWorks />
      </>
      {/* What Problem NIT can help with section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto">
          <div className="md:hidden">
            <div className="mx-auto max-w-[360px]">
              <div className="rounded-2xl bg-gradient-to-r from-[#0a5f12] via-[#1a7f1f] to-[#2f8f2d] px-4 py-3 text-center text-white shadow-[0_12px_24px_rgba(7,71,21,0.25)]">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] font-montserrat leading-[1.3]">
                  What Problems NIT Can Help With
                </h3>
              </div>

              <div className="mt-4 rounded-[28px] bg-gradient-to-b from-[#54E040] to-[#1b7a16] p-3 shadow-[0_18px_36px_rgba(7,71,21,0.25)]">
                <div className="overflow-hidden rounded-[22px] bg-white">
                  <div className="relative">
                    <video
                      ref={mobileVideoRef}
                      src={nitSolution}
                      controls={isMobilePlaying}
                      playsInline
                      className="h-[190px] w-full object-cover"
                      poster={beliefSecondaryImage}
                    />

                    {!isMobilePlaying && (
                      <button
                        onClick={handleMobilePlay}
                        aria-label="Play video"
                        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:scale-105"
                      >
                        <svg
                          className="h-5 w-5 translate-x-[1px] text-red-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5.5v13l10-6.5-10-6.5z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center font-inter text-[13px] font-semibold leading-[1.35] text-[#B93A0C]">
                Natural Immunotherapy is intended as a supportive and
                complementary approach and should be used under proper guidance.
              </p>

              <p className="mt-3 text-center font-inter text-[12px] leading-[1.6] text-slate-700">
                Natural Immunotherapy (NIT) has shown positive supportive
                outcomes in managing chronic conditions such as cancer, kidney
                disorders, heart disease, spinal problems, and neurological
                conditions by strengthening the immune system through natural
                food-based supplements. It helps improve energy levels,
                immunity, cellular health, detoxification, and overall quality
                of life. Many patients experience better physical strength,
                reduced fatigue, improved nerve and organ support, and enhanced
                well-being while following Natural Immunotherapy as a holistic,
                nutrition-focused approach.
              </p>

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-[#53d744] via-[#2ea02e] to-[#0b5d16] px-6 py-2 text-[11px] font-semibold uppercase text-white shadow-[0_10px_20px_rgba(12,89,31,0.35)]"
                >
                  Read Full
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div
              className=" relative
                 h-[120px]
    mb-8
    -ml-12
    mr-[140px]
    overflow-hidden
    bg-gradient-to-r
    from-[#0a5f12]
    via-[#1a7f1f]
    to-[#2f8f2d]
    px-6
    py-5
    text-center
    text-white
    shadow-[0_18px_36px_rgba(7,71,21,0.35)]
    sm:px-10
    flex
    flex-col
    items-center
    justify-center
        rounded-tr-[28px]
    rounded-br-[28px]"
            >
              <h3 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl font-montserrat max-w-[800px]">
                What Problems NIT Can Help With ?
              </h3>
            </div>

            {/* <div className="mx-auto max-w-[980px]">
            <div className="rounded-[60px] bg-gradient-to-r from-[#53d744] via-[#2ea02e] to-[#0b5d16] p-6 shadow-[0_18px_40px_rgba(12,89,31,0.35)] sm:p-8">
              <div className="overflow-hidden rounded-[36px] border-4 border-white bg-white shadow-[0_20px_40px_rgba(12,18,12,0.35)]">
                <div className="relative">
                  <iframe
                    className="h-[300px] w-full sm:h-[380px]"
                    src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                    title="Big Buck Bunny"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div> */}
            <div className="mx-auto max-w-[1200px] px-4 pb-[90px]">
              {/* Outer green frame */}
              <div className="relative  rounded-tl-[64px] rounded-tr-[22px] rounded-bl-[0px] rounded-br-[0px] bg-gradient-to-r from-[#53d744] via-[#2ea02e] to-[#0b5d16] p-5 sm:p-6 min-h-[550px]">
                {/* Inner white card */}
                <div className="absolute top-[20px] right-[50px] overflow-hidden rounded-[110px] bg-white shadow-[0_22px_50px_rgba(0,0,0,0.18)]">
                  <div className="relative flex h-[600px] w-[800px] items-center justify-center">
                    {/* Video */}
                    <video
                      ref={videoRef}
                      src={nitSolution}
                      controls={isPlaying}
                      playsInline
                      className="h-[600px] w-[800px] object-fill"
                      poster={beliefSecondaryImage}
                    />

                    {/* Custom Play Button */}
                    {!isPlaying && (
                      <button
                        onClick={handlePlay}
                        aria-label="Play video"
                        className="absolute flex h-16 w-16 items-center justify-center
                       rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                       hover:scale-105 transition"
                      >
                        <svg
                          className="h-7 w-7 text-red-600 translate-x-[1px]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5.5v13l10-6.5-10-6.5z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p
              className="
    mx-auto
    mt-8
    max-w-[980px]
 
    px-6
    py-4

    text-center
    font-inter
    text-[36px]
    font-semibold
    leading-[1]
    tracking-[0.05em]
    text-[#B93A0C]
  "
            >
              Natural Immunotherapy is intended as a supportive and
              complementary approach and should be used under proper guidance.
            </p>

            <p
              className="  mx-auto mt-4 max-w-[980px] font-inter font-normal text-[24px] leading-[1] tracking-[0.08em] text-justify text-black leading-[1.25] sm:leading-[1.6]"
            >
              Natural Immunotherapy (NIT) has shown positive supportive outcomes
              in managing chronic conditions such as cancer, kidney disorders,
              heart disease, spinal problems, and neurological conditions by
              strengthening the immune system through natural food-based
              supplements. It helps improve energy levels, immunity, cellular
              health, detoxification, and overall quality of life. Many patients
              experience better physical strength, reduced fatigue, improved
              nerve and organ support, and enhanced well-being while following
              Natural Immunotherapy as a holistic, nutrition-focused approach.
            </p>
          </div>
        </div>
      </section>

      {/* WHEN TO SEEK MEDICAL HELP (ETHICAL GUIDANCE) section */}
      <section className="bg-white py-16 mb-10">
        <div
          className="relative
        h-[120px]
    mb-8
    -ml-12
    mr-[140px]
    overflow-hidden
    bg-gradient-to-r
    from-[#0a5f12]
    via-[#1a7f1f]
    to-[#2f8f2d]
    px-6
    py-5
    text-center
    text-white
    shadow-[0_18px_36px_rgba(7,71,21,0.35)]
    sm:px-10
    flex
    flex-col
    items-center
    justify-center
        rounded-tr-[28px]
    rounded-br-[28px]"
        >
          <h3 className="text-xl font-semibold uppercase tracking-[0.22em] font-montserrat sm:text-2xl">
            When to Seek Medical Help ?
          </h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-white/90 font-montserrat">
            (Ethical Guidance)
          </p>
        </div>

        <div className="mx-auto max-w-[1180px] px-6 pt-10 lg:px-10">
          <div className="grid lg:grid-cols-[0.7fr,1fr] items-stretch h-[900px]">
            {/* LEFT CARD */}
            <div
              className="
    relative
    flex flex-col
    justify-center
    align-center
    overflow-hidden
    shadow-[0_18px_36px_rgba(18,41,25,0.2)]
    bg-right-bottom bg-no-repeat bg-cover
  "
              style={{
                backgroundImage: `url(${whentoseek})`,
              }}
            >
              {/* OVERLAY for readability */}
              <div className="absolute inset-0 bg-[#f4f0ea]/40" />

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col items-center Justify-center gap-10 px-8 py-10 text-center">
                {/* <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
      <img
        src={NITicon}
        alt="Natural Immunotherapy icon"
        className="h-10 w-10 object-contain"
      />
    </div> */}

                <h4 className="text-2xl font-semibold text-[#2b3a2f] font-montserrat">
                  Natural Immunotherapy (NIT)
                </h4>

                <p className="mt-3 max-w-[340px] text-lg font-semibold leading-6 text-[#48584a] font-lora">
                  Even if you follow Natural Immunotherapy (NIT) or other
                  natural therapies, there are situations where immediate
                  conventional medical care is ethically essential.
                </p>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="overflow-hidden shadow-[0_18px_36px_rgba(18,41,25,0.2)] bg-white">
              {/* IMAGE SECTION (TOP) */}
              <div className="h-[380px] w-full">
                <img
                  src={ethicalguide}
                  alt="Medical team"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* TEXT SECTION (BOTTOM) */}
              <div
                className="
    flex-1
    px-8 py-6
    bg-[#1B212C]
    text-white
    h-full
  "
              >
                <p className="text-2xl font-semibold uppercase tracking-[0.2em] text-[#E23A3A] font-montserrat">
                  Emergency Conditions –
                </p>

                <h4 className="mt-2 text-2xl font-semibold uppercase text-[#E23A3A] font-montserrat">
                  Do Not Delay Medical Care
                </h4>

                <p className="mt-5 text-xl text-white/85 font-lora">
                  Natural Immunotherapy should not be used as a substitute in
                  the following situations:
                </p>

                <ul className="mt-5 space-y-1 text-lg text-white/90 font-lora">
                  <li>• Severe trauma / accidents</li>
                  <li>• Heart attack symptoms</li>
                  <li>• Stroke symptoms</li>
                  <li>• Severe bleeding</li>
                  <li>• Acute infections</li>
                  <li>• High fever in infants</li>
                  <li>• Loss of consciousness</li>
                  <li>• Sudden, severe pain</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Emergency conditions when choose for substitute */}
        <div>
          <div className="mx-auto max-w-[980px] rounded-[24px] bg-white px-6 py-10  sm:px-10">
            <h3 className="text-2xl font-bold uppercase tracking-[0.18em] text-[#E23A3A] font-montserrat sm:text-xl">
              Emergency Conditions When Choose for Substitute:
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-lg leading-7 text-[#1f2933] font-lora">
              <li>
                Severe chest pain, suspected heart attack, or stroke symptoms
                (sudden weakness, slurred speech, facial drooping)
              </li>
              <li>Unconsciousness, seizures, or sudden collapse</li>
              <li>Severe breathing difficulty, choking, or bluish lips/face</li>
              <li>Heavy bleeding, major injury, fractures, or head trauma</li>
              <li>High fever with confusion, stiff neck, or seizures</li>
              <li>
                Severe allergic reactions (swelling of face/throat, hives,
                breathlessness)
              </li>
              <li>
                Acute abdominal pain (appendicitis, intestinal obstruction,
                perforation)
              </li>
              <li>Poisoning, overdose, or snake/insect bites</li>
              <li>
                Pregnancy emergencies (heavy bleeding, severe pain, reduced
                fetal movement)
              </li>
              <li>
                Severe dehydration, persistent vomiting, or diarrhea (especially
                in children/elderly)
              </li>
              <li>Sudden loss of vision or speech</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Discover the science of natural immunotherapy */}

      {/* <PatientStories /> */}
      <div className="mb-10 relative">
        <section
          className="relative overflow-hidden py-16 -mt-20 text-white z-10"
          style={{
            clipPath:
              "polygon(0 18%, 50% 0, 100% 18%, 100% 82%, 50% 100%, 0 82%)",
          }}
        >
          <img
            src={sectionBg}
            alt="Herbal background"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="relative z-10  px-6 text-center flex flex-col items-center justify-center">
            <div
              className="
    relative
    w-screen
    h-[300px]
    -mx-4
    sm:-mx-6
    lg:-mx-10

    px-8
    py-10

    flex
    flex-col
    justify-center
    items-center
    space-y-6

    shadow-[0_24px_48px_rgba(8,62,16,0.35)]
  "
            >
              <h2 className="text-2xl font-semibold sm:text-[46px] font-montserrat">
                Discover the Science of Natural Immunotherapy
              </h2>

              <p className="text-sm text-white/90 sm:text-base font-lora">
                Learn how Cellular Intelligence, Micronutrients, and
                Detoxification work together to heal your body naturally.
              </p>

              <button
                onClick={() => window.open("https://dantura.com", "_blank")}
                className="
      w-fit
      items-center
      justify-center
      rounded-md
      bg-white
      px-6
      py-2
      text-base
      font-semibold
      uppercase
      tracking-[0.2em]
      text-[#114616]
      shadow-[0_14px_26px_rgba(0,0,0,0.28)]
    "
              >
                Explore Today
              </button>
            </div>
          </div>
        </section>
        <div
          className=" absolute w-[100%] h-[850px] top-[300px] pt-80 mt-12 flex flex-col items-center gap-4   bg-center
    bg-no-repeat
    bg-cover"
          style={{
            backgroundImage: `url(${asknit})`,
          }}
        >
          <p
            className="
  text-[46px]
  font-semibold
  uppercase
  tracking-[0.20em]
  text-white
  font-montserrat
  [text-shadow:0px_2px_10px_rgba(0,0,0,0.45),0px_6px_19px_rgba(0,0,0,0.55)]
   leading-[1.35]
  flex
  flex-col
  justify-center
  items-center
  pb-16
"
          >
            <span className="block">Ask our NIT Chatbot Agent</span>
            <span className="block">For your any queries.</span>
          </p>
          <div
            className="
    flex items-center justify-center
    h-32 w-32
    rounded-full
    bg-gradient-to-b
    from-[#2ebd3a]
    to-[#0b6c1a]

    shadow-[0_0_45px_rgba(255,255,255,0.70),0_0_80px_rgba(255,255,255,0.65)]
  "
          >
            <div
              className="
      flex items-center justify-center
      h-22 w-22
      rounded-full
      border-2 border-white
      bg-white/10
      p-5
    "
            >
              <RiChatAiLine
                className="
        h-14 w-14
        text-white
        drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]
      "
              />
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 mb-5 mt-[800px] lg:px-10">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[40px] bg-gradient-to-r from-[#0c4d1a] via-[#0b8d26] to-[#0c4d1a] shadow-[0_32px_60px_rgba(5,46,16,0.4)]">
          <div className="flex flex-col items-center gap-10 px-8 py-12 text-center text-white lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-[520px] space-y-4 font-lora text-lg leading-9">
              <p className="text-2xl font-semibold text-white/95">
                “We don't treat diseases we restore life.”
              </p>
              <p className="text-white/85">
                Book a free health assessment and begin your natural recovery
                plan. Our specialists listen, map your immune terrain, and craft
                nutrient-driven protocols customized to your journey.
              </p>
            </div>
            <div className="relative flex w-full max-w-[360px] flex-col items-center">
              <div className="w-full rounded-full bg-white/20 p-1.5 shadow-[0_20px_36px_rgba(0,0,0,0.25)]">
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-3 text-base font-semibold text-[#0d7f1f] transition hover:-translate-y-0.5 hover:bg-[#f9fff3] hover:text-[#0a4f15] font-montserrat"
                >
                  Book a Free Health Assessment
                  <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-[#0d8b1f] text-white">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M7.5 4.5 12.5 10 7.5 15.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
