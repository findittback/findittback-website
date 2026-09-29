import { Link } from "react-router-dom";

import {
  UserPlus,
  QrCode,
  Sticker,
  CheckCircle2,
  ShieldOff,
  Users,
  HeartHandshake,
  Smartphone,
  Briefcase,
  Headphones,
  Wallet,
  KeyRound,
  Laptop,
  Camera,
  Home as HomeIcon,
  ArrowRight,
} from "lucide-react";

import heroImage from "../assets/image.webp";

const STEPS = [
  {
    n: "1",
    icon: UserPlus,
    title: "Register",
    body: "Enter your mobile number and email ID to create your profile.",
  },
  {
    n: "2",
    icon: QrCode,
    title: "Get Your QR",
    body: "Download your personal QR code in multiple sizes.",
  },
  {
    n: "3",
    icon: Sticker,
    title: "Stick It",
    body: "Print and stick it on your belongings – bag, phone, keys, wallet or anything you care about.",
  },
  {
    n: "4",
    icon: CheckCircle2,
    title: "Get It Back",
    body: "If someone finds your lost item, they scan the QR and contact you to return it.",
  },
];

const TRUST_POINTS = [
  {
    icon: ShieldOff,
    title: "No tracking. No location.",
    body: "FIND ME does not track your item or its location.",
  },
  {
    icon: Users,
    title: "Simple for everyone.",
    body: "Anyone can scan the QR. No app or login required.",
  },
  {
    icon: HeartHandshake,
    title: "A simple way back home.",
    body: "A scan today can bring your belonging back to you.",
  },
];

const EXAMPLE_USES = [
  { icon: Smartphone, label: "Mobile Phones" },
  { icon: Briefcase, label: "Bags & Backpacks" },
  { icon: Headphones, label: "AirPods / Headphones" },
  { icon: Wallet, label: "Wallets" },
  { icon: KeyRound, label: "Keys" },
  { icon: Laptop, label: "Laptops" },
  { icon: Camera, label: "Cameras & more" },
];

function buildQrModules() {
  const modules = [];
  const size = 13;
  const cell = 6.6;

  let seed = 42;

  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const inTopLeft = row < 4 && col < 4;
      const inTopRight = row < 4 && col > size - 5;
      const inBottomLeft = row > size - 5 && col < 4;

      if (inTopLeft || inTopRight || inBottomLeft) {
        continue;
      }

      if (rand() > 0.55) {
        modules.push(
          <rect
            key={`${row}-${col}`}
            x={14 + col * cell}
            y={14 + row * cell}
            width={cell - 1}
            height={cell - 1}
            rx="1"
            fill="#000F26"
          />
        );
      }
    }
  }

  return modules;
}

function QrGraphic() {
  const finder = (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <rect width="26" height="26" rx="4" fill="#000F26" />
      <rect
        x="4"
        y="4"
        width="18"
        height="18"
        rx="2.5"
        fill="#FFFFFF"
      />
      <rect
        x="8"
        y="8"
        width="10"
        height="10"
        rx="1.5"
        fill="#000F26"
      />
    </g>
  );

  const modules = buildQrModules();

  return (
    <svg
      viewBox="0 0 116 116"
      width="150"
      height="150"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        width="116"
        height="116"
        rx="10"
        fill="#FFFFFF"
      />

      {modules}

      {finder(6, 6)}
      {finder(84, 6)}
      {finder(6, 84)}

      <rect
        x="50"
        y="50"
        width="16"
        height="16"
        rx="4"
        fill="#4A90E2"
      />

      <circle
        cx="58"
        cy="58"
        r="3.5"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section
        style={{ backgroundColor: "#000F26" }}
        className="relative overflow-hidden"
      >

        {/* Background glow */}

        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(74,144,226,0.12), transparent 45%), radial-gradient(circle at 85% 75%, rgba(143,181,232,0.10), transparent 50%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">

          {/* HERO CONTENT */}

          <div className="rise-in">

            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs tracking-wide"
              style={{
                backgroundColor: "rgba(74,144,226,0.14)",
                color: "#8FB5E8",
              }}
            >
              findittback.com/&lt;your-tag&gt;
            </span>

            <h1
              className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "#FFFFFF" }}
            >
              Helping your lost belongings
              <br />
              find their way
              <br />

              <span style={{ color: "#8FB5E8" }}>
                back home.
              </span>
            </h1>

            {/* HERO DESCRIPTION */}

            <div
              className="mt-6 max-w-md font-body text-lg leading-relaxed"
              style={{ color: "#FFFFFF" }}
            >

              <p>
                Register with your mobile number and email ID.
                <br />
                Get your personal FIND ME QR code in
                <br />
                different sizes. Stick it on the things you
                <br />
                care about.
              </p>

              <p className="mt-4">
                If you lose it, someone who finds it can
                <br />
                scan the QR code and contact you
                <br />
                to return it.
              </p>

            </div>

            {/* HERO BUTTON */}

            <div className="mt-9 flex flex-wrap items-center gap-4">

              <Link
                to="/add"
                className="rounded-full px-10 py-5 font-body text-xl font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  backgroundColor: "#4A90E2",
                  color: "#FFFFFF",
                  boxShadow:
                    "0 12px 30px -10px rgba(74,144,226,0.55)",
                }}
              >
                Get My FIND ME QR

                <span className="ml-3">
                  →
                </span>
              </Link>

              <a
                href="#how-it-works"
                className="font-body text-sm font-medium underline decoration-dotted underline-offset-4"
                style={{ color: "#FFFFFF" }}
              >
                See how it works
              </a>

            </div>

          </div>


          {/* HERO IMAGE */}

          <div className="flex justify-center lg:justify-end">

            <div className="relative w-full max-w-md">

              <div
                className="pointer-events-none absolute -inset-6 rounded-3xl opacity-50 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(74,144,226,0.20), transparent 70%)",
                }}
              />

              <img
                src={heroImage}
                alt="Findmeback QR tag illustration"
                className="relative z-10 block w-full rounded-2xl object-contain"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          PHILOSOPHY STRIP
      ========================================================== */}

      <section
        className="border-b"
        style={{
          borderColor: "#E5EAF2",
          backgroundColor: "#FFFFFF",
        }}
      >

        <div className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-8">

          <p
            className="font-display text-xl italic sm:text-2xl"
            style={{ color: "#000F26" }}
          >
            &ldquo;Don&rsquo;t make returning a lost item complicated.
            <br />
            Scan it. See who it belongs to. Help return it.&rdquo;
          </p>

        </div>

      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}

      <section
        id="how-it-works"
        style={{ backgroundColor: "#FFFFFF" }}
        className="py-20"
      >

        <div className="mx-auto max-w-6xl px-5 sm:px-8">

          <h2
            className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "#000F26" }}
          >
            How FIND ITT works
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-4 sm:gap-x-4">

            {STEPS.map((step) => (
              <div
                key={step.n}
                className="group relative flex flex-col items-center px-3 text-center"
              >

                {/* ICON */}

                <div
                  className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
                  style={{
                    backgroundColor: "#8FB5E8",
                  }}
                >

                  <step.icon
                    className="h-7 w-7"
                    style={{ color: "#000F26" }}
                    strokeWidth={1.75}
                  />

                </div>

                {/* TITLE */}

                <h3
                  className="mt-5 font-display text-lg font-semibold"
                  style={{ color: "#000F26" }}
                >
                  {step.n}. {step.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="mt-2 max-w-[220px] font-body text-sm leading-relaxed"
                  style={{ color: "#4F6075" }}
                >
                  {step.body}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          TRUST BAND
      ========================================================== */}

      <section
        style={{ backgroundColor: "#000F26" }}
      >

        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-10">

            {/* LEFT */}

            <div>

              <h2
                className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
                style={{ color: "#FFFFFF" }}
              >
                Lost doesn&rsquo;t have
                <br />
                to mean gone.
              </h2>

              <div
                className="mt-4 h-1 w-14 rounded-full"
                style={{
                  backgroundColor: "#4A90E2",
                }}
              />

              <div className="mt-8 flex flex-col gap-6">

                {TRUST_POINTS.map((point) => (

                  <div
                    key={point.title}
                    className="flex items-start gap-4"
                  >

                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "rgba(74,144,226,0.16)",
                        border:
                          "1px solid rgba(143,181,232,0.25)",
                      }}
                    >

                      <point.icon
                        className="h-5 w-5"
                        style={{
                          color: "#8FB5E8",
                        }}
                        strokeWidth={1.75}
                      />

                    </div>

                    <div>

                      <h3
                        className="font-display text-base font-semibold"
                        style={{
                          color: "#FFFFFF",
                        }}
                      >
                        {point.title}
                      </h3>

                      <p
                        className="mt-1 font-body text-sm leading-relaxed"
                        style={{
                          color:
                            "rgba(255,255,255,0.62)",
                        }}
                      >
                        {point.body}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* CENTER QR CARD */}

            <div className="flex justify-center lg:px-6">

              <div
                className="flex w-[240px] flex-col items-center gap-5 rounded-3xl px-7 py-8"
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow:
                    "0 24px 60px -18px rgba(0,0,0,0.55), 0 0 0 1px rgba(74,144,226,0.15)",
                }}
              >

                <span
                  className="font-display text-xl font-bold tracking-tight"
                  style={{
                    color: "#000F26",
                  }}
                >
                  FIND ME
                </span>

                <div
                  className="rounded-2xl p-2"
                  style={{
                    backgroundColor: "#F3F6FB",
                    border: "1px solid #E5EAF2",
                  }}
                >
                  <QrGraphic />
                </div>

                <span
                  className="text-center font-body text-sm font-medium leading-snug"
                  style={{
                    color: "#4F6075",
                  }}
                >
                  Scan to contact
                  <br />
                  the owner
                </span>

              </div>

            </div>


            {/* RIGHT */}

            <div>

              <h3
                className="font-display text-lg font-semibold"
                style={{
                  color: "#FFFFFF",
                }}
              >
                Example uses
              </h3>

              <div className="mt-6 flex flex-col gap-1">

                {EXAMPLE_USES.map((use) => (

                  <div
                    key={use.label}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/5"
                  >

                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          "rgba(74,144,226,0.14)",
                      }}
                    >

                      <use.icon
                        className="h-4 w-4"
                        style={{
                          color: "#8FB5E8",
                        }}
                        strokeWidth={1.75}
                      />

                    </div>

                    <span
                      className="font-body text-sm"
                      style={{
                        color:
                          "rgba(255,255,255,0.85)",
                      }}
                    >
                      {use.label}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* =====================================================
              BOTTOM BANNER
          ====================================================== */}

          <div
            style={{
              backgroundColor: "#4A90E2",
            }}
            className="mt-16 rounded-2xl"
          >

            <div
              className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8"
            >

              <div className="flex items-center gap-4">

                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.15)",
                  }}
                >

                  <HomeIcon
                    className="h-6 w-6"
                    style={{
                      color: "#FFFFFF",
                    }}
                    strokeWidth={1.6}
                  />

                </div>

                <div>

                  <h3
                    className="font-display text-xl font-semibold"
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Give your belongings a way home.
                  </h3>

                  <p
                    className="mt-1 font-body text-sm"
                    style={{
                      color:
                        "rgba(255,255,255,0.85)",
                    }}
                  >
                    Register now and get your personal FIND ME QR code.
                  </p>

                </div>

              </div>

              <Link
                to="/add"
                className="flex shrink-0 items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000F26",
                }}
              >
                Get My FIND ME QR

                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}