import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Why FIND ME", href: "/#why-find-me" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#000F26",
        color: "#FFFFFF",
      }}
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#4A90E2",
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: "#FFFFFF" }}
                >
                  F
                </span>
              </div>

              <span
                className="font-display text-lg font-bold tracking-tight"
                style={{ color: "#FFFFFF" }}
              >
                FIND ITT BACK
              </span>
            </div>

            <p
              className="mt-3 max-w-[220px] font-body text-sm leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Helping your lost belongings find their way back home.
            </p>
          </div>


          {/* QUICK LINKS */}
          <div>
            <h3
              className="font-display text-sm font-semibold tracking-wide"
              style={{ color: "#FFFFFF" }}
            >
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-sm transition-colors hover:text-white"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>


          {/* LEGAL */}
          <div>
            <h3
              className="font-display text-sm font-semibold tracking-wide"
              style={{ color: "#FFFFFF" }}
            >
              Legal
            </h3>

            <div className="mt-4 flex flex-col gap-2.5">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-sm transition-colors hover:text-white"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>


          {/* FOLLOW US */}
          <div>
            <h3
              className="font-display text-sm font-semibold tracking-wide"
              style={{ color: "#FFFFFF" }}
            >
              Follow Us
            </h3>

            <div className="mt-4 flex items-center gap-3">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                }}
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                }}
              >
                Facebook
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                }}
              >
                LinkedIn
              </a>

            </div>
          </div>

        </div>


        {/* COPYRIGHT */}
        <div
          className="mt-12 border-t pt-6 text-center"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <p
            className="font-body text-xs"
            style={{
              color: "rgba(255,255,255,0.5)",
            }}
          >
            © {new Date().getFullYear()} FIND ME. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}