import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Globe,
  LineChart,
  MapPin,
  NotebookPen,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

const featureCards = [
  {
    icon: FileText,
    title: "Track Applications",
    description:
      "Save every application with company, role, location, salary, notes, and tags.",
  },
  {
    icon: CalendarDays,
    title: "Schedule Interviews",
    description:
      "Create interview reminders and keep upcoming events visible in one place.",
  },
  {
    icon: LineChart,
    title: "Analytics Dashboard",
    description:
      "Visualize offer rate, interview rate, monthly applications, top companies, and application sources.",
  },
  {
    icon: Search,
    title: "Search & Filter",
    description:
      "Find applications quickly by company, status, role, tags, or source.",
  },
  {
    icon: NotebookPen,
    title: "Personal Notes",
    description:
      "Keep interview notes, recruiter conversations, and follow-up reminders attached to each application.",
  },
  {
    icon: Globe,
    title: "Chrome Extension",
    description:
      "Works with any job portal so you can save applications without depending on a specific website layout.",
  },
];

const gettingStartedSteps = [
  "Download Chrome Extension",
  "Open chrome://extensions",
  "Enable Developer Mode",
  "Load the Extension Folder",
  "Pin the Extension",
  "Visit Any Job Portal",
  "Click the Extension",
  "Login",
  "Fill the Job Form",
  "Click Save",
];

const walkthroughCards = [
  {
    title: "Login",
    icon: ShieldCheck,
    points: [
      "Sign in once using your Job Tracker account.",
      "Your login session remains active.",
    ],
  },
  {
    title: "Save Job",
    icon: BriefcaseBusiness,
    points: [
      "Fill company, role, location, source, salary, status, notes, and tags.",
      "Click Save to store the application instantly.",
    ],
  },
  {
    title: "Dashboard",
    icon: CheckCircle2,
    points: [
      "Immediately view applications, analytics, interview schedules, and notes.",
    ],
  },
];

const supportedSources = [
  "LinkedIn",
  "Indeed",
  "Naukri",
  "Wellfound",
  "Internshala",
  "Company Websites",
  "Any Job Portal",
];

const faqs = [
  {
    question: "Does it work on LinkedIn?",
    answer: "Yes.",
    supported: true,
  },
  {
    question: "Does it work on Naukri?",
    answer: "Yes.",
    supported: true,
  },
  {
    question: "Does it work on company career pages?",
    answer: "Yes.",
    supported: true,
  },
  {
    question: "Does it automatically apply for jobs?",
    answer:
      "No. It helps organize and track applications after you apply.",
    supported: false,
  },
  {
    question: "Is my data secure?",
    answer: "Applications are stored securely in your personal account.",
    supported: true,
  },
];

function Feature() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_40%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-18 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <Globe size={16} className="text-indigo-600" />
              Built for real job application tracking
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Track Every Job Application
              <br />
              in One Place
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A simple Chrome extension that lets you save job applications
              from any job portal and manage them from one dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#getting-started"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Download size={16} />
                Download Extension
              </a>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Open Dashboard
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Why Use Job Tracker?
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Everything you need to stay organized during your job search
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="getting-started"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-12"
      >
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Getting Started
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Set up the extension and start saving applications in minutes
          </h2>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {gettingStartedSteps.map((step, index) => (
              <div key={step} className="relative rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                  Step {index + 1}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {step}
                </p>
                {index < gettingStartedSteps.length - 1 && (
                  <div className="mt-4 text-slate-300">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Done
            </p>
            <h3 className="mt-2 text-2xl font-bold">Your job instantly appears in the dashboard.</h3>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Extension Walkthrough
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            What the experience looks like after installation
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {walkthroughCards.map(({ title, icon: Icon, points }) => (
            <article
              key={title}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon size={24} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                {title}
              </h3>
              <div className="mt-5 space-y-3">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-1 shrink-0 text-emerald-500"
                    />
                    <p className="leading-7 text-slate-600">{point}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Works Everywhere
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Save applications from the platforms you already use
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {supportedSources.map((source) => (
            <div
              key={source}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <MapPin size={18} />
                </div>
                <p className="text-lg font-semibold text-slate-900">{source}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-4xl text-base leading-8 text-slate-600">
          The extension works on any website because applications are saved
          through a popup form rather than relying on a specific website layout.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Clear expectations for how the extension works
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {faqs.map(({ question, answer, supported }) => (
            <article
              key={question}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${
                    supported
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {supported ? <CheckCircle2 size={18} /> : <X size={18} />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {question}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">{answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="rounded-[2rem] bg-slate-900 px-6 py-12 text-center text-white shadow-xl sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
            Download Section
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to organize your job search?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Download the Chrome Extension and keep every application, interview,
            and note in one place.
          </p>

          <a
            href="#getting-started"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </section>
    </main>
  );
}

export default Feature;
