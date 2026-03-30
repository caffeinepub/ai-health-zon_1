import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  ChevronLeft,
  Clock,
  Download,
  Loader2,
  MessageCircle,
  QrCode,
  Send,
  Star,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────
type Screen =
  | "welcome"
  | "registration"
  | "visit-reason"
  | "department"
  | "cart"
  | "insurance"
  | "confirm"
  | "payment"
  | "token"
  | "tracking"
  | "done";

const SCREEN_ORDER: Screen[] = [
  "welcome",
  "registration",
  "visit-reason",
  "department",
  "cart",
  "insurance",
  "confirm",
  "payment",
  "token",
  "tracking",
  "done",
];

type ServiceItem = { id: string; name: string; price: number; added: boolean };

const INITIAL_SERVICES: ServiceItem[] = [
  { id: "consult", name: "Consultation", price: 500, added: true },
  { id: "xray", name: "X-Ray", price: 800, added: true },
  { id: "blood", name: "Blood Test", price: 400, added: false },
  { id: "ecg", name: "ECG", price: 300, added: false },
];

// ── Kiosk Clock ────────────────────────────────────────────────────────
function KioskClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="text-xs font-mono text-slate-600">
      {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

// ── Screen wrapper ─────────────────────────────────────────────────────
function ScreenSlide({
  children,
  dir,
}: { children: React.ReactNode; dir: number }) {
  return (
    <motion.div
      initial={{ x: dir * 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -dir * 60, opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className="flex flex-col h-full"
    >
      {children}
    </motion.div>
  );
}

// ── Big option button ──────────────────────────────────────────────────
function BigBtn({
  emoji,
  label,
  color = "blue",
  onClick,
  selected = false,
}: {
  emoji: string;
  label: string;
  color?: "blue" | "green" | "amber" | "teal" | "purple" | "rose";
  onClick: () => void;
  selected?: boolean;
}) {
  const colorMap: Record<string, string> = {
    blue: selected
      ? "bg-blue-600 text-white"
      : "bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200",
    green: selected
      ? "bg-green-600 text-white"
      : "bg-green-50 hover:bg-green-100 text-green-800 border border-green-200",
    amber: selected
      ? "bg-amber-500 text-white"
      : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200",
    teal: selected
      ? "bg-teal-600 text-white"
      : "bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200",
    purple: selected
      ? "bg-purple-600 text-white"
      : "bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200",
    rose: selected
      ? "bg-rose-600 text-white"
      : "bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 ${colorMap[color]}`}
    >
      <span className="text-xl">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}

// ── Main Kiosk Simulator ───────────────────────────────────────────────
function KioskSimulator() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [qrScanned, setQrScanned] = useState(false);
  const [dept, setDept] = useState<string>("Orthopedic");
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [payMethod, setPayMethod] = useState<"UPI" | "Card" | "Cash">("UPI");
  const [insuranceResult, setInsuranceResult] = useState(false);
  const [trackStep, setTrackStep] = useState(2); // 0=Registered,1=Payment,2=Waiting,3=Consultation,4=Completed
  const [rating, setRating] = useState(0);
  const trackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepIndex = SCREEN_ORDER.indexOf(screen);
  const progress = ((stepIndex + 1) / SCREEN_ORDER.length) * 100;

  function go(next: Screen) {
    setDir(1);
    setScreen(next);
  }

  function back() {
    const idx = SCREEN_ORDER.indexOf(screen);
    if (idx > 0) {
      setDir(-1);
      setScreen(SCREEN_ORDER[idx - 1]);
    }
  }

  function withLoading(msg: string, ms: number, then: () => void) {
    setLoadingMsg(msg);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      then();
    }, ms);
  }

  function toggleService(id: string) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, added: !s.added } : s)),
    );
  }

  const addedServices = services.filter((s) => s.added);
  const total = addedServices.reduce((sum, s) => sum + s.price, 0);
  const payable = insuranceResult ? 300 : total;
  const covered = insuranceResult ? 1000 : 0;

  // Auto-advance tracking
  useEffect(() => {
    if (screen === "tracking" && trackStep < 4) {
      trackTimerRef.current = setTimeout(() => {
        setTrackStep((p) => p + 1);
      }, 3000);
    }
    return () => {
      if (trackTimerRef.current) clearTimeout(trackTimerRef.current);
    };
  }, [screen, trackStep]);

  function resetKiosk() {
    setScreen("welcome");
    setDir(1);
    setQrScanned(false);
    setDept("Orthopedic");
    setServices(INITIAL_SERVICES);
    setPayMethod("UPI");
    setInsuranceResult(false);
    setTrackStep(2);
    setRating(0);
  }

  const DEPARTMENTS = [
    { emoji: "❤️", name: "Cardiology" },
    { emoji: "🦴", name: "Orthopedic" },
    { emoji: "🧠", name: "Neurology" },
    { emoji: "👁️", name: "Ophthalmology" },
    { emoji: "🦷", name: "Dental" },
    { emoji: "🏃", name: "Physiotherapy" },
  ];

  const TRACK_STEPS = [
    { label: "Registered", icon: "✅" },
    { label: "Payment Done", icon: "✅" },
    { label: "Waiting", icon: "🟡" },
    { label: "In Consultation", icon: "🔵" },
    { label: "Completed", icon: "🟢" },
  ];

  return (
    <div className="max-w-sm mx-auto" data-ocid="kiosk.panel">
      {/* Kiosk Frame */}
      <div
        className="bg-white rounded-3xl shadow-2xl border-4 border-teal-500 overflow-hidden"
        style={{ minHeight: 680 }}
      >
        {/* Kiosk Top Bar */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xs">
              🏥 AI Health Zon Hospital
            </span>
          </div>
          <div className="flex items-center gap-2">
            <KioskClock />
            <Badge className="bg-green-400 text-green-900 text-[10px] px-1.5 py-0 font-bold">
              LIVE
            </Badge>
            <Wifi className="w-3 h-3 text-white/80" />
          </div>
        </div>

        {/* Progress */}
        <div className="bg-slate-50 px-4 pt-3 pb-2">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-slate-500 font-medium">
              Step {stepIndex + 1} of 11
            </span>
            <span className="text-[10px] text-teal-600 font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Screen Content */}
        <div
          className="px-5 py-4 flex-1 overflow-y-auto"
          style={{ minHeight: 520 }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
              <p className="text-slate-600 text-sm font-medium text-center">
                {loadingMsg}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <ScreenSlide key={screen} dir={dir}>
                {screen === "welcome" && (
                  <div className="space-y-4">
                    <div className="text-center mb-2">
                      <div className="text-5xl mb-2">🏥</div>
                      <h2 className="text-xl font-bold text-slate-800">
                        Welcome to Hospital Kiosk
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Select your visit type to begin
                      </p>
                    </div>
                    <div className="space-y-3">
                      <BigBtn
                        emoji="🔵"
                        label="Start New Visit"
                        color="blue"
                        onClick={() => go("registration")}
                      />
                      <BigBtn
                        emoji="🟢"
                        label="Repeat Visit"
                        color="green"
                        onClick={() => go("registration")}
                      />
                      <BigBtn
                        emoji="🟡"
                        label="Insurance Patient"
                        color="amber"
                        onClick={() => go("registration")}
                      />
                    </div>
                    <p className="text-center text-[10px] text-slate-400 mt-4">
                      Touch screen to interact
                    </p>
                  </div>
                )}

                {screen === "registration" && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Enter Mobile or Scan ID
                      </h2>
                      <p className="text-xs text-slate-500">
                        We'll fetch your details instantly
                      </p>
                    </div>
                    <div>
                      <label
                        className="text-xs font-medium text-slate-600 mb-1 block"
                        htmlFor="kiosk-mobile"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="9876543210"
                        maxLength={10}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        id="kiosk-mobile"
                        data-ocid="kiosk.input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setQrScanned(true)}
                      className={`w-full border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 transition-colors ${
                        qrScanned
                          ? "border-green-400 bg-green-50"
                          : "border-slate-300 hover:border-teal-400"
                      }`}
                    >
                      {qrScanned ? (
                        <>
                          <CheckCircle className="w-8 h-8 text-green-500" />
                          <span className="text-green-600 text-xs font-semibold">
                            QR Scanned ✓
                          </span>
                        </>
                      ) : (
                        <>
                          <QrCode className="w-8 h-8 text-slate-400" />
                          <span className="text-slate-500 text-xs">
                            Scan ABHA QR Code
                          </span>
                        </>
                      )}
                    </button>
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11"
                      data-ocid="kiosk.primary_button"
                      onClick={() =>
                        withLoading("Fetching your details...", 1500, () =>
                          go("visit-reason"),
                        )
                      }
                    >
                      Continue
                    </Button>
                    <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-2.5 text-xs text-teal-700">
                      ✓ Details Found: <strong>Rahul Sharma</strong>, Age 34,
                      Blood Group O+
                    </div>
                  </div>
                )}

                {screen === "visit-reason" && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Select Your Need
                      </h2>
                      <p className="text-xs text-slate-500">
                        What brings you in today?
                      </p>
                    </div>
                    <div className="space-y-3">
                      <BigBtn
                        emoji="🩺"
                        label="Doctor Consultation"
                        color="teal"
                        onClick={() => go("department")}
                      />
                      <BigBtn
                        emoji="🧪"
                        label="Lab Test"
                        color="purple"
                        onClick={() => go("department")}
                      />
                      <BigBtn
                        emoji="💊"
                        label="Health Package"
                        color="green"
                        onClick={() => go("department")}
                      />
                    </div>
                  </div>
                )}

                {screen === "department" && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Select Specialty
                      </h2>
                      <p className="text-xs text-slate-500">
                        Choose your department
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {DEPARTMENTS.map((d) => (
                        <button
                          key={d.name}
                          type="button"
                          onClick={() => setDept(d.name)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-150 text-xs font-semibold ${
                            dept === d.name
                              ? "border-teal-500 bg-teal-50 text-teal-800"
                              : "border-slate-200 hover:border-teal-300 text-slate-600"
                          }`}
                        >
                          <span className="text-2xl">{d.emoji}</span>
                          <span>{d.name}</span>
                        </button>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11"
                      onClick={() => go("cart")}
                    >
                      Continue →
                    </Button>
                  </div>
                )}

                {screen === "cart" && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Add Services
                      </h2>
                      <p className="text-xs text-slate-500">
                        Like ordering — tap to add or remove
                      </p>
                    </div>
                    <div className="space-y-2">
                      {services.map((s) => (
                        <div
                          key={s.id}
                          className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                            s.added
                              ? "border-teal-400 bg-teal-50"
                              : "border-slate-200"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {s.name}
                            </p>
                            <p className="text-xs text-teal-600 font-bold">
                              ₹{s.price}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleService(s.id)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                              s.added
                                ? "bg-teal-600 text-white"
                                : "bg-slate-200 text-slate-500 hover:bg-teal-100"
                            }`}
                          >
                            {s.added ? "−" : "+"}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-800 text-white rounded-xl px-4 py-3 flex justify-between items-center">
                      <span className="text-xs">
                        {addedServices.length} items
                      </span>
                      <span className="font-bold text-teal-300">
                        Total: ₹{total}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11"
                      onClick={() => go("insurance")}
                    >
                      Proceed →
                    </Button>
                  </div>
                )}

                {screen === "insurance" && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Do You Have Insurance?
                      </h2>
                      <p className="text-xs text-slate-500">
                        We'll check eligibility instantly
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          withLoading("Checking eligibility...", 2000, () => {
                            setInsuranceResult(true);
                          })
                        }
                        className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-300 bg-green-50 hover:bg-green-100 text-green-800 font-semibold text-sm transition-all"
                      >
                        <span className="text-3xl">✅</span>
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInsuranceResult(false);
                          go("confirm");
                        }}
                        className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-sm transition-all"
                      >
                        <span className="text-3xl">❌</span>
                        <span>No</span>
                      </button>
                    </div>
                    {insuranceResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Total Amount</span>
                            <span className="font-semibold">₹{total}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600 font-medium">
                              Insurance Covered
                            </span>
                            <span className="text-green-600 font-bold">
                              ₹{covered}
                            </span>
                          </div>
                          <div className="border-t pt-1 flex justify-between">
                            <span className="text-slate-700 font-semibold">
                              You Pay
                            </span>
                            <span className="text-teal-600 text-lg font-bold">
                              ₹{payable}
                            </span>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11"
                          onClick={() => go("confirm")}
                        >
                          Continue →
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}

                {screen === "confirm" && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Review Your Visit
                      </h2>
                      <p className="text-xs text-slate-500">
                        Confirm all details before payment
                      </p>
                    </div>
                    {[
                      { label: "Patient", value: `Rahul Sharma | ${dept}` },
                      {
                        label: "Services",
                        value:
                          addedServices.map((s) => s.name).join(" + ") || "—",
                      },
                      { label: "Total Cost", value: `₹${total}` },
                      ...(insuranceResult
                        ? [{ label: "Insurance", value: `₹${covered} covered` }]
                        : []),
                      { label: "Payable", value: `₹${payable}` },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between bg-slate-50 rounded-xl px-3 py-2.5"
                      >
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-teal-500" />{" "}
                          {item.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 text-right max-w-[120px]">
                          {item.value}
                        </span>
                      </div>
                    ))}
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11 mt-2"
                      data-ocid="kiosk.confirm_button"
                      onClick={() => go("payment")}
                    >
                      Confirm & Proceed →
                    </Button>
                  </div>
                )}

                {screen === "payment" && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Pay ₹{payable}
                      </h2>
                      <p className="text-xs text-slate-500">
                        Choose payment method
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {(["UPI", "Card", "Cash"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPayMethod(m)}
                          className={`flex-1 py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                            payMethod === m
                              ? "border-teal-500 bg-teal-600 text-white"
                              : "border-slate-200 text-slate-600 hover:border-teal-300"
                          }`}
                        >
                          {m === "UPI"
                            ? "📱 UPI"
                            : m === "Card"
                              ? "💳 Card"
                              : "💵 Cash"}
                        </button>
                      ))}
                    </div>
                    {payMethod === "UPI" && (
                      <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        {/* SVG QR placeholder */}
                        <svg
                          width="100"
                          height="100"
                          viewBox="0 0 10 10"
                          role="img"
                          aria-label="UPI QR Code"
                          className="rounded-md"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="3"
                            height="3"
                            fill="#1e293b"
                          />
                          <rect
                            x="7"
                            y="0"
                            width="3"
                            height="3"
                            fill="#1e293b"
                          />
                          <rect
                            x="0"
                            y="7"
                            width="3"
                            height="3"
                            fill="#1e293b"
                          />
                          <rect x="1" y="1" width="1" height="1" fill="#fff" />
                          <rect x="8" y="1" width="1" height="1" fill="#fff" />
                          <rect x="1" y="8" width="1" height="1" fill="#fff" />
                          <rect
                            x="4"
                            y="0"
                            width="2"
                            height="1"
                            fill="#1e293b"
                          />
                          <rect
                            x="4"
                            y="2"
                            width="1"
                            height="2"
                            fill="#1e293b"
                          />
                          <rect
                            x="3"
                            y="4"
                            width="4"
                            height="1"
                            fill="#1e293b"
                          />
                          <rect
                            x="5"
                            y="5"
                            width="2"
                            height="2"
                            fill="#1e293b"
                          />
                          <rect
                            x="3"
                            y="7"
                            width="1"
                            height="3"
                            fill="#1e293b"
                          />
                          <rect
                            x="5"
                            y="8"
                            width="2"
                            height="2"
                            fill="#1e293b"
                          />
                          <rect
                            x="8"
                            y="5"
                            width="2"
                            height="2"
                            fill="#1e293b"
                          />
                          <rect
                            x="7"
                            y="7"
                            width="1"
                            height="1"
                            fill="#1e293b"
                          />
                          <rect
                            x="9"
                            y="9"
                            width="1"
                            height="1"
                            fill="#1e293b"
                          />
                        </svg>
                        <span className="text-xs text-slate-600 font-medium">
                          Scan & Pay via UPI
                        </span>
                        <span className="text-teal-600 font-bold text-sm">
                          ₹{payable}
                        </span>
                      </div>
                    )}
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-11"
                      data-ocid="kiosk.submit_button"
                      onClick={() =>
                        withLoading("Processing payment...", 1500, () =>
                          go("token"),
                        )
                      }
                    >
                      Payment Successful ✅
                    </Button>
                  </div>
                )}

                {screen === "token" && (
                  <div className="space-y-4 text-center">
                    {/* Confetti dots */}
                    <div className="relative flex justify-center mb-1">
                      {[
                        "bg-yellow-400",
                        "bg-teal-400",
                        "bg-blue-400",
                        "bg-rose-400",
                        "bg-green-400",
                        "bg-purple-400",
                      ].map((c, i) => (
                        <motion.div
                          key={c}
                          className={`absolute w-2 h-2 rounded-full ${c}`}
                          initial={{ y: 0, x: 0, opacity: 1 }}
                          animate={{
                            y: [0, -30 - i * 8],
                            x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
                            opacity: [1, 0],
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                      <div className="text-4xl">🎉</div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                        Your Token
                      </p>
                      <div className="text-6xl font-black text-teal-600 font-mono">
                        A-102
                      </div>
                    </div>
                    <div className="space-y-2 text-left">
                      {[
                        {
                          icon: "🏥",
                          label: "Room",
                          value: "OPD-3, First Floor",
                        },
                        { icon: "⏱️", label: "Wait Time", value: "~15 minutes" },
                        {
                          icon: "👨‍⚕️",
                          label: "Doctor",
                          value: "Dr. Priya Mehta, Orthopedic",
                        },
                      ].map((info) => (
                        <div
                          key={info.label}
                          className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5"
                        >
                          <span className="text-lg">{info.icon}</span>
                          <div>
                            <p className="text-[10px] text-slate-500">
                              {info.label}
                            </p>
                            <p className="text-xs font-semibold text-slate-800">
                              {info.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11"
                      onClick={() => go("tracking")}
                    >
                      View Live Status →
                    </Button>
                  </div>
                )}

                {screen === "tracking" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">
                          Your Visit Status
                        </h2>
                        <p className="text-xs text-slate-500">Live tracking</p>
                      </div>
                      <div className="bg-teal-600 text-white px-3 py-1.5 rounded-xl">
                        <span className="font-mono font-bold text-sm">
                          A-102
                        </span>
                      </div>
                    </div>
                    <div className="relative pl-8">
                      {TRACK_STEPS.map((step, i) => {
                        const done = i < trackStep;
                        const current = i === trackStep;
                        return (
                          <div
                            key={step.label}
                            className="relative mb-5 last:mb-0"
                          >
                            {/* Line */}
                            {i < TRACK_STEPS.length - 1 && (
                              <div
                                className={`absolute left-[-18px] top-5 w-0.5 h-full ${
                                  done ? "bg-green-400" : "bg-slate-200"
                                }`}
                              />
                            )}
                            {/* Dot */}
                            <div
                              className={`absolute left-[-24px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                done
                                  ? "bg-green-500"
                                  : current
                                    ? trackStep === 3
                                      ? "bg-blue-500"
                                      : "bg-yellow-400"
                                    : "bg-slate-200"
                              } ${current ? "ring-2 ring-offset-1 ring-current" : ""}`}
                            >
                              {done && (
                                <span className="text-white text-[10px]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <div
                              className={`text-sm font-semibold ${
                                done
                                  ? "text-green-600"
                                  : current
                                    ? (
                                        trackStep === 3
                                          ? "text-blue-600"
                                          : "text-yellow-600"
                                      )
                                    : "text-slate-400"
                              }`}
                            >
                              {step.label}
                              {current && (
                                <motion.span
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 1.2,
                                  }}
                                  className="ml-1 text-[10px]"
                                >
                                  ●
                                </motion.span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {trackStep >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <p className="text-green-600 font-bold text-base mb-3">
                          Visit Completed! 🎉
                        </p>
                        <Button
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11"
                          onClick={() => go("done")}
                        >
                          View Summary →
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}

                {screen === "done" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-1">🎉</div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Visit Completed!
                      </h2>
                      <p className="text-xs text-slate-500">
                        Rahul Sharma — {new Date().toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {[
                        {
                          icon: "📄",
                          label: "Prescription",
                          action: "Download PDF",
                        },
                        {
                          icon: "📊",
                          label: "Lab Reports",
                          action: "Download PDF",
                        },
                        {
                          icon: "💊",
                          label: "Medication List",
                          action: "View",
                        },
                      ].map((doc) => (
                        <div
                          key={doc.label}
                          className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{doc.icon}</span>
                            <span className="text-xs font-semibold text-slate-700">
                              {doc.label}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="flex items-center gap-1 text-xs text-teal-600 font-semibold hover:text-teal-800"
                          >
                            <Download className="w-3 h-3" /> {doc.action}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 rounded-xl py-2.5 text-xs text-green-700 font-semibold hover:bg-green-100"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </button>
                      <button
                        type="button"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 border border-blue-200 rounded-xl py-2.5 text-xs text-blue-700 font-semibold hover:bg-blue-100"
                      >
                        <Send className="w-4 h-4" /> Email
                      </button>
                    </div>
                    {/* Rating */}
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-2">
                        Rate Your Experience
                      </p>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            className="transition-transform hover:scale-110 active:scale-95"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                n <= rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11"
                      data-ocid="kiosk.primary_button"
                      onClick={resetKiosk}
                    >
                      Start New Visit
                    </Button>
                  </div>
                )}
              </ScreenSlide>
            </AnimatePresence>
          )}
        </div>

        {/* Bottom nav bar */}
        {!loading && screen !== "welcome" && (
          <div className="border-t border-slate-100 px-5 py-3 flex items-center">
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex-1 flex justify-center">
              <div className="flex gap-1">
                {SCREEN_ORDER.map((s, i) => (
                  <div
                    key={s}
                    className={`rounded-full transition-all ${
                      i === stepIndex
                        ? "w-4 h-1.5 bg-teal-500"
                        : i < stepIndex
                          ? "w-1.5 h-1.5 bg-teal-300"
                          : "w-1.5 h-1.5 bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="w-12" />
            {/* spacer */}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────
export function PatientKiosk() {
  const simulatorRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-20">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/patient-kiosk-device.dim_1200x700.jpg"
            alt="Hospital Kiosk Device"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-teal-900/70 to-slate-900/80" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-4">
              🏥 Self-Service Kiosk Simulation
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Auto Patient Support System
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Experience a Complete Hospital Visit — Self-Service, Digital,
              Instant. Walk through all 11 kiosk screens just like a real
              patient at a hospital.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-white px-8 font-bold"
                onClick={() =>
                  simulatorRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="kiosk.primary_button"
              >
                🖥️ Start Kiosk Experience
              </Button>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>~3 min walkthrough</span>
              </div>
            </div>
          </div>
        </div>

        {/* Device image prominently */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="/assets/generated/patient-kiosk-device.dim_1200x700.jpg"
              alt="AI Health Zon Hospital Self-Service Kiosk"
              className="w-full object-cover max-h-80"
            />
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section
        ref={simulatorRef}
        className="bg-gradient-to-b from-slate-50 to-white py-16 px-6"
        data-ocid="kiosk.section"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-slate-800 mb-3">
              🖥️ Live Kiosk Simulator
            </h2>
            <p className="text-slate-500">
              You are the patient. Tap through the screens — just like using a
              real hospital kiosk.
            </p>
          </div>

          {/* Steps indicator */}
          <div className="hidden md:flex justify-center gap-2 flex-wrap mb-8">
            {[
              "Welcome",
              "Register",
              "Visit Type",
              "Department",
              "Cart",
              "Insurance",
              "Confirm",
              "Payment",
              "Token",
              "Tracking",
              "Done",
            ].map((label, i) => (
              <div key={label} className="flex items-center gap-1">
                <div className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
                <span className="text-xs text-slate-500">{label}</span>
                {i < 10 && <span className="text-slate-300 text-xs">›</span>}
              </div>
            ))}
          </div>

          <KioskSimulator />
        </div>
      </section>

      {/* What You Just Experienced Section */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
              The Future of Patient Care is Here
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              What you just experienced in 3 minutes replaces hours of
              traditional hospital queuing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Traditional */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-red-900/30">
              <h3 className="text-red-400 font-bold text-lg mb-4">
                😓 Traditional Process
              </h3>
              <div className="space-y-3">
                {[
                  "Stand in queue at reception counter",
                  "Fill paper registration forms",
                  "Wait for counter to process manually",
                  "Get redirected to another queue",
                  "No tracking — just guess and wait",
                  "Paper receipts, manual bills, confusion",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="text-red-400 font-bold text-xs mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-slate-300 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Kiosk */}
            <div className="bg-teal-900/40 rounded-2xl p-6 border border-teal-500/30">
              <h3 className="text-teal-400 font-bold text-lg mb-4">
                ⚡ AI Kiosk Process
              </h3>
              <div className="space-y-3">
                {[
                  "Tap — choose visit type instantly",
                  "Scan ABHA QR or enter mobile",
                  "Select department & add services",
                  "Insurance auto-checked in 2 seconds",
                  "Pay via UPI, Card, or Cash at kiosk",
                  "Live token tracking on screen & phone",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="text-teal-400 font-bold text-xs mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-slate-200 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: "⏱️", stat: "< 3 min", label: "Registration" },
              { icon: "📄", stat: "Zero", label: "Paperwork" },
              { icon: "🎫", stat: "Instant", label: "Token" },
              { icon: "📍", stat: "Live", label: "Tracking" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-teal-600/20 border border-teal-500/30 rounded-xl p-4 text-center"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-teal-300 font-bold text-lg leading-tight">
                  {item.stat}
                </div>
                <div className="text-slate-400 text-xs">{item.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">
              Ready to transform your hospital's patient experience?
            </p>
            <a
              href={`https://wa.me/918696766966?text=${encodeURIComponent("Hi! I just experienced the AI Health Zon Kiosk Simulator and want to deploy this at my hospital. Please share more details.")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="kiosk.primary_button"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Deploy This Kiosk at Your Hospital
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
