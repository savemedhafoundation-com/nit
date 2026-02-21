import { Link } from "react-router-dom";
import AnimatedDepthHero from "../components/AnimatedDepthHero";
import EyeFollowWord from "../components/EyeFollowWord";
import aboutImageOne from "../assets/photo/Rectangle 151.png";
import aboutImageTwo from "../assets/photo/Rectangle 153.png";
import aboutImageThree from "../assets/photo/Rectangle 162.png";
import sectionBg from "../assets/photo/bg.png";
import WhatNit from "../assets/photo/aboutNit.png";

const principles = [
  {
    title: "Detoxify",
    description:
      "Remove toxins and excess proteins from blood and vital organs so cells can breathe again.",
  },
  {
    title: "Replenish",
    description:
      "Supply 77 minerals and 13 vitamins that re-establish balance and metabolic clarity.",
  },
  {
    title: "Reprogram",
    description:
      "Reactivate innate cellular intelligence to repair, adapt, and protect without drugs.",
  },
];

const missionItems = [
  "Bring NIT to every district and every country.",
  "Educate doctors, researchers, and families about cellular intelligence.",
  "Launch Cancer-Free District and Thalassemia-Free District campaigns worldwide.",
  "Build the Medha Institute of Natural Science for education and research.",
];

const achievements = [
  "Over 10,000 patients fully recovered through Natural Immunotherapy.",
  "95% success rate in blood cancer and thalassemia cases.",
  "Proven recovery in chronic kidney disease without dialysis.",
  "Early success in reversing autism, SMA, and vitiligo.",
  "Recognition from global wellness communities and CSR partners.",
];

const About = () => {
  return (
    <div className="min-h-screen w-full bg-[#f4fbe7] text-slate-900">
      <div className="mx-auto max-w-full px-6 lg:px-0">
        <AnimatedDepthHero variant="section" />
        <div
          className="
    absolute
    inset-x-0
    top-[52vh]
    h-[20px]
    bg-gradient-to-r
    from-[#0d6615]
    via-[#76e16d]
    to-[#0d6615]
    z-[5]
  "
        />
      </div>
      {/* Section 1 - Introduction */}
      <section className="bg-gradient-to-r from-[#E0FFBF00] to-[#E0FFBF]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-12 lg:grid-cols-[1fr,1.1fr] lg:gap-16 lg:px-8">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-5">
                  <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
                    <img
                      src={aboutImageOne}
                      alt="Natural Immunotherapy energy visualization"
                      className="h-[250px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
                    <img
                      src={aboutImageTwo}
                      alt="Cellular regeneration illustration"
                      className="h-[250px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="sm:mt-28">
                  <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
                    <img
                      src={aboutImageThree}
                      alt="Technology guided healing"
                      className="h-[250px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-2xl font-semibold uppercase tracking-[0.35em] text-[#0d4f16]">
              About us
            </p>
            <h1 className="mt-3 text-[2.2rem] font-semibold leading-tight text-[#000000] sm:text-[2.2rem]">
              Natural Immunotherapy (NIT)
            </h1>
            <p className="mt-3 text-lg font-medium italic text-[#1f8d2d]">
              Healing the Body by Restoring Its Natural Intelligence
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[#1f3b1f]">
              Natural Immunotherapy is a science-guided healing approach that
              focuses on correcting internal imbalances-nutritional
              deficiencies, toxin overload, and cellular miscommunication-so the
              body can repair itself naturally.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - The Vision */}
      <section
        id="vision"
        className="bg-gradient-to-b from-[#E0FFBF00] to-[#E0FFBF] py-16"
      >
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className=" p-8">
            <div className="text-center">
              <p className="flex flex-wrap items-center justify-center gap-3 pb-2 text-center text-xl font-bold uppercase tracking-[0.13em] text-[#2a7a2f] sm:text-3xl">
                <span>Keeping A Caring</span>
                <EyeFollowWord />
                <span>On Your Health</span>
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#000000] sm:text-3xl">
                What Is{" "}
                <span className="text-[#1f8d2d]">Natural Immunotherapy?</span>
              </h2>
              <p className="mt-3 text-base leading-6 text-[#000000]">
                Natural Immunotherapy (NIT) is not a drug, surgery, or invasive
                treatment.
                <span className="block">
                  It is a restorative process that supports the body&apos;s
                  immune intelligence by:
                </span>
              </p>
              <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#2f9a3a] to-transparent" />
            </div>

            <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr,0.9fr]">
              <ul className="space-y-3 text-base text-[#3a5a3a] sm:text-lg">
                {[
                  "Replenishing essential vitamins and minerals",
                  "Reducing toxic burden",
                  "Supporting organ detoxification (liver, kidney, gut)",
                  "Restoring cellular communication",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#2f9a3a]" />
                    <span className="text-[#373B37]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mx-auto w-full max-w-[320px]">
                <div className="overflow-hidden rounded-[18px] border border-white/70 bg-white shadow-[0_16px_32px_rgba(0,0,0,0.18)]">
                  <img
                    src={WhatNit}
                    alt="Fresh nutrition for healthy healing"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div
              className="
    mt-8
    rounded-[18px]
    border border-[#000000]
    bg-cover bg-center
    relative
    overflow-hidden
    px-6 py-5
    text-center text-white

    shadow-[-9px_11px_9px_0px_rgba(0,0,0,0.25)]
    backdrop-blur-sm

    transition-all duration-300
    hover:shadow-[-6px_16px_18px_0px_rgba(0,0,0,0.35)]
  "
              style={{ backgroundImage: `url(${sectionBg})` }}
            >
              <span className="absolute inset-0 bg-[#0b2c10]/45" aria-hidden="true" />
              <p className="text-lg font-medium relative bg-[#7fc342]/65 rounded-md border-2 border-dashed border-[#FFFFFF] p-4">
                At Save Medha Foundation, we apply Natural Immunotherapy principles to help patients facing serious health challenges, including cancer.
              </p>
            </div>

            {/* call to action */}
            <div className="relative mt-10 overflow-hidden rounded-[34px] border border-[#2a7a2f]/25 bg-gradient-to-br from-[#f5ffe8] via-[#e8f8d3] to-[#d7f1bc] p-6 shadow-[0_24px_56px_rgba(20,100,33,0.2)] sm:p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#a7df72]/40 blur-2xl"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-14 -right-10 h-52 w-52 rounded-full bg-[#4fb948]/25 blur-3xl"
              />

              <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-[#2a7a2f]/25 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1e6225]">
                    Call To Action
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#103f16] sm:text-3xl">
                    We Work With Natural Immunotherapy to Restore Health - Even
                    in Cancer Cases
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#1f3f1f] sm:text-lg">
                    Our approach focuses on restoring immune balance, improving
                    cellular communication, and addressing root causes - not
                    just symptoms.
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#28502b] sm:text-lg">
                    Thousands of families have trusted this method to regain
                    strength, stability, and hope.
                  </p>

                  <a
                    href="https://savemedha.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center justify-center rounded-full bg-[linear-gradient(180deg,#1daf22_0%,#0b6f12_100%)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_28px_rgba(11,111,18,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(11,111,18,0.45)]"
                  >
                    Visit Save Medha Foundation
                  </a>
                </div>

                <div className="rounded-[26px] border border-white/60 bg-white/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_16px_30px_rgba(18,87,30,0.18)] backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2c6f31]">
                    Why Families Choose us
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      "We look beyond symptoms and focus on correcting internal imbalances through Natural Immunotherapy.",
                      "Our philosophy is based on continuous internal regulation, immune balance, and micronutrient correction.",
                      "We support the body’s natural intelligence instead of aggressively weakening it.",
                      "Our mission is bigger than treatment — we aim to build a disease-resilient society."
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-[#d5ebc1] bg-[#f8ffef] px-3 py-3"
                      >
                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#189c26]" />
                        <span className="text-sm leading-6 text-[#204224] sm:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3 - Founder */}
      <section className="bg-[#f7ffe8] py-16">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
          <div className="rounded-[36px] border border-[#dff5c2] bg-white/80 p-8 shadow-[0_24px_56px_rgba(15,121,39,0.15)] lg:p-12">
            <span className="inline-flex rounded-full bg-[#0d8b1f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Founder's message
            </span>
            <h3 className="mt-4 text-3xl font-semibold text-[#0b3d14]">
              From the Desk of Subhankar Sarkar
            </h3>
            <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[#6c7b65]">
              Founder, Save Medha Foundation &amp; Dantura Botanics
            </p>
            <div className="mt-8 space-y-6 text-lg leading-8 text-[#1e371f] font-lora">
              <p>
                "When I began my journey in healthcare, I saw countless
                patients-cancer, thalassemia, kidney failure-all told the same
                thing: 'Nothing more can be done.' But what I discovered changed
                everything. These were not genetic failures. They were
                nutritional and toxin-related imbalances that could be corrected
                naturally. Once the body received the right micronutrients-the
                exact vitamins and minerals that drive cellular decisions-the
                recovery began on its own."
              </p>
              <p>
                Natural Immunotherapy was born from this observation-not as an
                alternative therapy, but as a return to biological truth. Today,
                thousands of patients around the world are living proof that the
                body, when guided correctly, can heal any system that has gone
                wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Philosophy */}
      <section
        id="how-nit-works"
        className="relative overflow-hidden bg-[#0a3c13] py-20 text-white"
      >
        <img
          src={sectionBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="relative mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-12">
            <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">
              Our philosophy
            </span>
            <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Your Body Is Not Weak - It Is Misguided.
            </h3>
            <p className="mt-6 text-lg leading-8 text-slate-100">
              Every disease is a sign of miscommunication between cells. When
              toxins enter your body or when essential nutrients are missing,
              your cells receive wrong signals. Natural Immunotherapy repairs
              that communication using pure micronutrients-no chemicals, no
              herbs, no artificial stimulants. The result is not suppression of
              symptoms but a re-education of cells to function intelligently
              once again.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-[28px] border border-white/20 bg-[#0f4f1c] p-6 shadow-[0_18px_36px_rgba(0,0,0,0.25)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9bf9c4]">
                    {principle.title}
                  </p>
                  <p className="mt-4 text-base leading-7 text-white/90">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Global Mission */}
      <section className="bg-[#f7ffe8] py-16">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="grid gap-10 rounded-[36px] bg-white p-8 shadow-[0_22px_48px_rgba(22,108,39,0.12)] lg:grid-cols-[1.05fr,0.95fr] lg:p-12">
            <div>
              <span className="inline-flex rounded-full bg-[#f8d547] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3c1e]">
                Global mission
              </span>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#0d4f16] sm:text-4xl">
                Making Natural Immunotherapy a Global Movement.
              </h3>
              <p className="mt-4 text-lg leading-8 text-[#1f3b1f] font-lora">
                Through Save Medha Foundation (non-profit) and Dantura Botanics
                Pvt. Ltd. (research and formulation), our mission is
                action-focused. We are building a network of educators,
                clinicians, and advocates who can bring Cellular Intelligence to
                every family.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#e6f6d3] bg-[#f6ffe9] p-6 shadow-inner shadow-white/40">
              <ul className="space-y-4 text-base leading-7 text-[#1b3c1e]">
                {missionItems.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0d8b1f] text-white shadow-[0_10px_18px_rgba(15,121,39,0.25)]">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="m6 10 3 3 5-6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Achievements */}
      <section id="achievements" className="bg-white py-16">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-[36px] bg-[#f6ffe9] p-8 shadow-[0_28px_64px_rgba(22,108,39,0.12)] lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-[#0d8b1f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Our achievements
                </span>
                <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#0d4f16] sm:text-4xl">
                  Real People. Real Recovery. Real Proof.
                </h3>
              </div>
              <a
                href="/#patient-stories"
                className="inline-flex items-center gap-3 rounded-full border border-[#0d8b1f]/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0d8b1f] shadow-[0_16px_32px_rgba(20,110,33,0.2)] transition hover:-translate-y-0.5 hover:bg-[#f8d547] hover:text-[#1b3c1e]"
              >
                📚 See Recovery Stories
              </a>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement}
                  className="rounded-[28px] border border-white bg-white/80 p-6 text-base leading-7 text-[#1f3b1f] shadow-sm"
                >
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 - Science Behind NIT */}
      <section id="science" className="bg-[#f7ffe8] py-16">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="overflow-hidden rounded-[36px] border border-[#e6f6d3] bg-gradient-to-br from-[#0b5f10] via-[#0f8f28] to-[#31a12d] p-8 text-white shadow-[0_30px_60px_rgba(0,0,0,0.25)] lg:p-12">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">
                Science behind NIT
              </span>
              <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
                When Nutrition Meets Intelligence, Medicine Evolves.
              </h3>
              <p className="text-lg leading-8 text-white/90 font-lora">
                Modern science isolates disease; NIT studies the intelligence of
                the body as a whole. Our research focuses on how cells interpret
                signals, and how micronutrients control decisions at the DNA
                level. Through controlled nutrient therapy, we have observed
                reactivation of stem-like behavior in bone marrow, restoration
                of liver detox capacity, and normalization of immune response
                without drugs.
              </p>
            </div>
            <a
              href="#vision"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.25em] text-[#0d4f16] shadow-[0_18px_36px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f8d547] hover:text-[#1b3c1e]"
            >
              🔎 Explore the Science of Healing
            </a>
          </div>
        </div>
      </section>

      {/* Section 8 - Join the Movement */}
      <section className="bg-[#f7ffe8] py-20">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-8">
          <span className="inline-flex rounded-full bg-[#f8d547] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3c1e]">
            Join the movement
          </span>
          <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#0b3d14] sm:text-4xl">
            Be Part of the Natural Immunotherapy Revolution.
          </h3>
          <p className="mt-6 text-lg leading-8 text-[#1f3b1f] font-lora">
            Healing is no longer a miracle-it is a choice backed by science.
            Join hands with us to spread awareness, volunteer in our projects,
            or support patients who cannot afford treatment. Together, we can
            make the vision of a disease-free planet a living reality.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-r-[32px] border border-[#0d8b1f]/20 bg-[#0d8b1f] px-8 py-3 text-base font-semibold uppercase tracking-[0.3em] text-white shadow-[0_20px_36px_rgba(15,121,39,0.35)] transition hover:-translate-y-0.5 hover:bg-[#0b5f10]"
            >
              🌱 Volunteer Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-[#0d8b1f]/30 bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.25em] text-[#0d8b1f] shadow-[0_18px_32px_rgba(22,108,39,0.15)] transition hover:-translate-y-0.5 hover:bg-[#f8d547] hover:text-[#1b3c1e]"
            >
              💬 Share Your Story
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-[#f8d547]/40 bg-[#f8d547] px-8 py-3 text-base font-semibold uppercase tracking-[0.25em] text-[#1b3c1e] shadow-[0_18px_32px_rgba(146,108,5,0.35)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0d8b1f]"
            >
              💖 Support Save Medha Foundation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
