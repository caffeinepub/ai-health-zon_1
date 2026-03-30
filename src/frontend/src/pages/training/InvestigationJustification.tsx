import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  FileCheck,
  Info,
  Loader2,
  Printer,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── High-End Investigation Detection ────────────────────────────────────────

function isHighEndInvestigation(inv: string): boolean {
  const s = inv.toLowerCase().trim();
  const highEndKeywords = [
    "ct scan",
    "ct brain",
    "ct chest",
    "ct abdomen",
    "ct angiography",
    "ct ",
    "mri ",
    "mri brain",
    "mri spine",
    "mri lumbar",
    "magnetic resonance",
    "pet scan",
    "pet ct",
    "pet-ct",
    "positron emission",
    "angiography",
    "coronary angiography",
    "dsa",
    "cardiac catheterization",
    "endoscopy",
    "colonoscopy",
    "bronchoscopy",
    "laparoscopy",
    "nuclear medicine",
    "spect",
    "scintigraphy",
    "bone scan",
    "biopsy",
    "fnac",
  ];
  return highEndKeywords.some((k) => s.includes(k));
}

// ─── AI Rule-Based Auto Justification ────────────────────────────────────────

type JustificationData = {
  type: string;
  indication: string;
  risk: string;
  outcome: string;
};

function getAutoJustification(investigation: string): JustificationData {
  const inv = investigation.toLowerCase().trim();

  const match = (keywords: string[]) => keywords.some((k) => inv.includes(k));

  if (
    match([
      "ct scan",
      "ct brain",
      "ct chest",
      "ct abdomen",
      "ct ",
      "computed tomography",
    ])
  ) {
    return {
      type: "Imaging",
      indication:
        "Rule out intracranial hemorrhage, mass lesion, or organ injury based on clinical presentation",
      risk: "Missed life-threatening pathology leading to delayed treatment and adverse outcome",
      outcome:
        "Confirm or exclude critical diagnosis; guide surgical or medical intervention",
    };
  }
  if (
    match([
      "mri brain",
      "mri spine",
      "mri lumbar",
      "mri ",
      "magnetic resonance",
    ])
  ) {
    return {
      type: "Imaging",
      indication:
        "Evaluate soft tissue, nerve compression, disc herniation, or CNS pathology not visible on X-ray",
      risk: "Delayed diagnosis of neurological compromise leading to permanent disability",
      outcome:
        "Determine need for surgical intervention; plan targeted treatment",
    };
  }
  if (match(["x-ray", "xray", "chest x-ray", "cxr", "plain film"])) {
    return {
      type: "Imaging",
      indication:
        "Assess cardiopulmonary status, pneumonia, fracture, or foreign body",
      risk: "Undetected pneumonia, fracture, or pleural effusion causing clinical deterioration",
      outcome:
        "Guide antibiotic therapy, surgical planning, or conservative management",
    };
  }
  if (match(["abg", "arterial blood gas"])) {
    return {
      type: "Laboratory",
      indication:
        "Monitor acid-base balance and oxygenation in critically ill or ventilated patient",
      risk: "Undetected respiratory failure or metabolic acidosis leading to life-threatening complications",
      outcome:
        "Adjust ventilator parameters, correct metabolic imbalances, prevent respiratory collapse",
    };
  }
  if (match(["ecg", "electrocardiogram", "ekg"])) {
    return {
      type: "Cardiac",
      indication: "Rule out acute MI, arrhythmia, or cardiac conduction defect",
      risk: "Missed acute coronary event leading to sudden cardiac arrest or heart failure",
      outcome:
        "Confirm cardiac diagnosis; initiate appropriate cardiac intervention",
    };
  }
  if (match(["echo", "echocardiogram", "2d echo", "2d-echo"])) {
    return {
      type: "Cardiac",
      indication:
        "Evaluate cardiac function, wall motion, valvular pathology, and ejection fraction",
      risk: "Undiagnosed cardiac dysfunction leading to preventable heart failure or embolic event",
      outcome:
        "Determine cardiac management plan; assess need for intervention or medication",
    };
  }
  if (match(["troponin", "cardiac enzyme"])) {
    return {
      type: "Laboratory",
      indication: "Confirm or exclude myocardial injury in suspected ACS",
      risk: "Missed acute MI leading to irreversible myocardial damage",
      outcome:
        "Confirm ACS diagnosis; guide thrombolysis or catheterization decision",
    };
  }
  if (match(["lft", "liver function"])) {
    return {
      type: "Laboratory",
      indication:
        "Assess hepatic function in jaundice, liver disease, or drug toxicity monitoring",
      risk: "Undetected hepatic dysfunction leading to progressive liver failure",
      outcome:
        "Determine hepatic reserve; guide drug dosing and management protocol",
    };
  }
  if (match(["rft", "renal function", "creatinine"])) {
    return {
      type: "Laboratory",
      indication:
        "Monitor renal function in AKI, CKD, or nephrotoxic drug therapy",
      risk: "Missed renal failure progression leading to life-threatening electrolyte imbalance",
      outcome:
        "Adjust drug doses, initiate dialysis if indicated, prevent metabolic complications",
    };
  }
  if (match(["cbc", "complete blood count", "full blood count"])) {
    return {
      type: "Laboratory",
      indication:
        "Evaluate haematological status — anaemia, infection, thrombocytopenia",
      risk: "Undetected severe anaemia or infection leading to hemodynamic instability",
      outcome:
        "Guide transfusion decision, antibiotic therapy, and haematological management",
    };
  }
  if (match(["blood culture"])) {
    return {
      type: "Laboratory",
      indication:
        "Identify causative organism in suspected sepsis or bacteremia",
      risk: "Untreated bacteremia progressing to septic shock and multi-organ failure",
      outcome:
        "Targeted antibiotic therapy based on sensitivity; reduce mortality",
    };
  }
  if (match(["urine culture", "urine c/s"])) {
    return {
      type: "Laboratory",
      indication:
        "Identify pathogen in UTI, pyelonephritis, or catheter-associated infection",
      risk: "Inadequately treated UTI progressing to pyelonephritis or urosepsis",
      outcome:
        "Targeted antibiotic therapy; prevent systemic spread of infection",
    };
  }
  if (match(["ultrasound", "usg", "sonography", "usg abdomen"])) {
    return {
      type: "Imaging",
      indication:
        "Evaluate abdominal organs, free fluid, biliary pathology, or vascular structures",
      risk: "Missed intra-abdominal pathology leading to delayed surgical intervention",
      outcome:
        "Guide medical or surgical management; rule out obstructive or compressive pathology",
    };
  }
  if (match(["pet scan", "pet ct", "pet-ct"])) {
    return {
      type: "Imaging",
      indication:
        "Staging of malignancy or evaluation of treatment response in oncology patients",
      risk: "Incomplete cancer staging leading to suboptimal treatment plan",
      outcome:
        "Accurate disease staging for appropriate chemotherapy or radiotherapy protocol",
    };
  }
  if (match(["colonoscopy", "endoscopy", "gastroscopy", "oesophagoscopy"])) {
    return {
      type: "Other",
      indication:
        "Evaluate GI bleeding, mucosal pathology, or suspected malignancy",
      risk: "Missed GI lesion or malignancy leading to disease progression",
      outcome:
        "Histopathological diagnosis; guide oncological or surgical management",
    };
  }
  if (match(["biopsy", "fnac", "fine needle"])) {
    return {
      type: "Other",
      indication:
        "Histopathological confirmation of suspected malignancy or inflammatory pathology",
      risk: "Empiric treatment without diagnosis leading to inadequate or harmful therapy",
      outcome:
        "Definitive tissue diagnosis to guide targeted therapy or surgical resection",
    };
  }
  if (match(["hba1c", "glycated hemoglobin", "glycated haemoglobin"])) {
    return {
      type: "Laboratory",
      indication:
        "Assess long-term glycaemic control in diabetic patient for management adjustment",
      risk: "Uncontrolled diabetes leading to macro and microvascular complications",
      outcome:
        "Guide insulin and oral hypoglycaemic dose adjustment; set glycaemic targets",
    };
  }
  if (match(["thyroid", "tsh", "t3 t4", "t3/t4", "thyroxine"])) {
    return {
      type: "Laboratory",
      indication:
        "Evaluate thyroid function in suspected hypothyroidism, hyperthyroidism, or for drug monitoring",
      risk: "Undiagnosed thyroid disorder leading to metabolic and cardiovascular complications",
      outcome: "Guide thyroid hormone replacement or suppression therapy",
    };
  }
  if (match(["coagulation", "pt inr", "aptt", "prothrombin", "inr"])) {
    return {
      type: "Laboratory",
      indication:
        "Assess coagulation status in bleeding disorder, anticoagulation therapy, or pre-operative evaluation",
      risk: "Undetected coagulopathy leading to intraoperative or postoperative hemorrhage",
      outcome: "Guide anticoagulation management; determine surgical safety",
    };
  }
  if (match(["bone scan", "bone scintigraphy", "isotope bone"])) {
    return {
      type: "Imaging",
      indication:
        "Detect skeletal metastases or occult fractures not visible on plain X-ray",
      risk: "Missed skeletal metastasis or stress fracture leading to incorrect prognosis",
      outcome:
        "Comprehensive bone disease assessment for oncology or orthopaedic management",
    };
  }

  // Generic fallback
  return {
    type: "Other",
    indication: `Clinical indication for ${investigation} based on patient's presenting symptoms and provisional diagnosis requiring investigation to guide management`,
    risk: "Delayed or missed diagnosis leading to inappropriate treatment, clinical deterioration, and potential adverse outcome for the patient",
    outcome:
      "Confirm or exclude the working diagnosis; facilitate evidence-based clinical decision-making and optimise treatment plan",
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  patientName: string;
  abhaId: string;
  date: string;
  treatingDoctor: string;
  wardUnit: string;
  investigationRequested: string;
  investigationType: string;
  provisionalDiagnosis: string;
  clinicalFindings: string;
  specificIndication: string;
  riskIfNotDone: string;
  expectedOutcome: string;
  doctorSignature: string;
  signatureDate: string;
};

const today = new Date().toISOString().split("T")[0];

const emptyForm: FormState = {
  patientName: "",
  abhaId: "",
  date: today,
  treatingDoctor: "",
  wardUnit: "",
  investigationRequested: "",
  investigationType: "",
  provisionalDiagnosis: "",
  clinicalFindings: "",
  specificIndication: "",
  riskIfNotDone: "",
  expectedOutcome: "",
  doctorSignature: "",
  signatureDate: today,
};

// ─── Static data ─────────────────────────────────────────────────────────────

const highRiskExamples = [
  {
    investigation: "CT Scan",
    color: "border-red-200 bg-red-50",
    badge: "bg-red-100 text-red-800",
    justification:
      "Patient presents with severe headache, vomiting, and altered consciousness. CT Brain required to rule out intracranial hemorrhage / mass lesion. GCS score of 12 at presentation.",
    indication: "Altered consciousness with focal neurological signs",
  },
  {
    investigation: "MRI",
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
    justification:
      "Patient with lower back pain radiating to left leg for 3 weeks, positive SLR test at 45°. MRI Lumbar Spine required to evaluate disc herniation / nerve compression before surgical decision.",
    indication: "Radiculopathy with positive straight-leg raise",
  },
  {
    investigation: "ABG (Arterial Blood Gas)",
    color: "border-orange-200 bg-orange-50",
    badge: "bg-orange-100 text-orange-800",
    justification:
      "Patient on ventilator support with declining SpO2 from 95% to 88% over 2 hours. ABG required for acid-base status evaluation and ventilator parameter adjustment to prevent respiratory failure.",
    indication: "Declining SpO2 on ventilated patient",
  },
  {
    investigation: "Advanced Lab Panel",
    color: "border-amber-200 bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
    justification:
      "Patient with suspected multi-organ dysfunction — rising serum creatinine (3.2), elevated bilirubin (4.8), low platelets (65,000). LFT, RFT, Coagulation profile required for organ function monitoring and management.",
    indication: "Multi-organ dysfunction with rising markers",
  },
];

const rejectionReasons = [
  {
    reason: "No doctor's written investigation order attached",
    tip: "Always attach signed order slip with date and doctor name",
  },
  {
    reason: "Clinical indication field left blank in records",
    tip: "Complete the standard justification format before ordering any investigation",
  },
  {
    reason: "Diagnosis does not support the investigation requested",
    tip: "Ensure provisional diagnosis clearly links to investigation need",
  },
  {
    reason: "Duplicate investigation within 72 hours without explanation",
    tip: "Document clinical reason if same investigation is repeated within 3 days",
  },
  {
    reason: "CT/MRI ordered for routine cases without significant symptoms",
    tip: "Reserve advanced imaging for clinically justified complex cases",
  },
  {
    reason: "ABG ordered for stable non-ventilated patient",
    tip: "ABG is appropriate only for ventilated or critically compromised patients",
  },
];

const bestPractices = [
  "Document clinical indication at the time of ordering, not after the report arrives",
  "Use standard ICD-10 code for provisional diagnosis in justification forms",
  "Ensure the treating doctor signs and dates every investigation order",
  "For repeat investigations, always note the change in clinical status",
  "Attach investigation report immediately after receiving — never delay",
  "Use the ward round note to reference investigation findings",
  "For high-cost investigations, get a second clinical opinion noted in records",
  "Train nursing staff to flag missing investigation orders before tests are performed",
];

const protocolSteps = [
  {
    title: "Clinical Decision",
    desc: "Treating doctor identifies clinical need; documents provisional diagnosis and presenting symptoms in case file",
  },
  {
    title: "Senior Consultant Review",
    desc: "Mandatory co-signature from HOD/Senior Consultant confirming clinical necessity before any high-end investigation is ordered",
  },
  {
    title: "TPA/Insurer Pre-Authorization",
    desc: "Submit pre-auth request with clinical summary, diagnosis, and investigation justification to TPA before ordering the investigation",
  },
  {
    title: "Medical Superintendent Approval",
    desc: "For investigations above ₹5,000 package limit — MS/CMO approval required in writing with countersignature on request form",
  },
  {
    title: "Patient Informed Consent",
    desc: "Written informed consent documenting risks, benefits, alternatives, and cost — signed by patient or legal guardian before proceeding",
  },
  {
    title: "Investigation Order in Writing",
    desc: "Formal written order with date, time, doctor name, registration, and clinical indication — NO verbal orders accepted under any circumstances",
  },
  {
    title: "Investigation Performed & Reported",
    desc: "Investigation conducted by authorized department; report signed and dated by radiologist/pathologist; copy filed in patient record immediately",
  },
  {
    title: "Claim Documentation",
    desc: "All above documents compiled and attached with claim file before submission — no exceptions; missing documents = guaranteed claim rejection",
  },
];

const highEndCategories = [
  {
    icon: "🧠",
    title: "Advanced Imaging",
    items: "CT Scan, MRI, PET-CT, SPECT, Bone Scan, Interventional Radiology",
  },
  {
    icon: "🫀",
    title: "Cardiac Procedures",
    items:
      "Coronary Angiography, Echocardiography, Cardiac Catheterization, Stress Echo, Holter Monitoring",
  },
  {
    icon: "🔬",
    title: "Invasive Diagnostics",
    items:
      "Endoscopy, Colonoscopy, Bronchoscopy, Laparoscopy, Thoracoscopy, Biopsy",
  },
  {
    icon: "💊",
    title: "Specialized Labs",
    items:
      "Genetic Testing, Flow Cytometry, Tumor Markers, CSF Analysis, Specialized Cultures",
  },
];

const preAuthChecklist = [
  "Clinical summary (diagnosis + symptoms + duration)",
  "Investigation justification form completed",
  "Treating doctor details (name, registration, contact)",
  "Previous related investigations/reports (if any)",
  "Patient ID proof + ABHA card",
  "Insurance policy number + TPA ID",
  "Estimated cost breakdown",
  "Urgency classification (Emergency / Elective)",
];

// ─── AI Badge ─────────────────────────────────────────────────────────────────

function AIBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">
      <Sparkles className="w-2.5 h-2.5" /> AI Generated
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function InvestigationJustification() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [aiFields, setAiFields] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // If user edits an AI-filled field, remove the badge
    if (aiFields.has(field)) {
      setAiFields((prev) => {
        const next = new Set(prev);
        next.delete(field);
        return next;
      });
    }
  };

  const handleAutoFill = () => {
    if (!form.investigationRequested.trim()) {
      toast.error("Please enter an investigation name first");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const data = getAutoJustification(form.investigationRequested);
      setForm((prev) => ({
        ...prev,
        specificIndication: data.indication,
        riskIfNotDone: data.risk,
        expectedOutcome: data.outcome,
        investigationType: prev.investigationType || data.type,
      }));
      setAiFields(
        new Set([
          "specificIndication",
          "riskIfNotDone",
          "expectedOutcome",
          "investigationType",
        ]),
      );
      setIsLoading(false);
      toast.success(
        `Justification auto-filled based on: ${form.investigationRequested}`,
      );
    }, 1200);
  };

  const handleClear = () => {
    setForm(emptyForm);
    setAiFields(new Set());
  };

  const handlePrint = () => {
    window.print();
  };

  const aiCls = (field: string) =>
    aiFields.has(field) ? "bg-teal-50 border-teal-300 focus:ring-teal-400" : "";

  const showHighEndAlert = isHighEndInvestigation(form.investigationRequested);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="inv-justification.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>

        {/* Hero */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 md:p-12 text-white shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.16 40) 0%, oklch(0.55 0.18 50) 60%, oklch(0.40 0.14 35) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  Clinical Documentation Standard
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                Investigation Justification Format
              </h1>
              <p className="text-white/80 text-lg max-w-2xl">
                Standardized format for documenting clinical indication and
                necessity for all investigations — now with AI auto-fill
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Interactive AI Form ───────────────────────────────────────────── */}
        <section className="pb-10 px-4 bg-gray-50 py-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> AI Auto-Fill Form
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Investigation Justification Form
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Enter the investigation name and click{" "}
                <strong className="text-teal-700">✨ Auto-Fill</strong> to
                generate clinical justification instantly
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
              data-ocid="inv-justification.form-template"
            >
              {/* Form Header */}
              <div className="bg-teal-600 px-6 py-4 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg">
                    Standard Investigation Justification Form
                  </h3>
                  <p className="text-white/70 text-xs mt-0.5">
                    To be completed by Treating Doctor before any high-risk
                    investigation
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> AI-Powered
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Patient & Doctor Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="patientName"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Patient Name
                    </Label>
                    <Input
                      id="patientName"
                      placeholder="Enter patient name"
                      value={form.patientName}
                      onChange={(e) => set("patientName", e.target.value)}
                      data-ocid="inv-justification.input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="abhaId"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      ABHA ID
                    </Label>
                    <Input
                      id="abhaId"
                      placeholder="14-digit ABHA number"
                      value={form.abhaId}
                      onChange={(e) => set("abhaId", e.target.value)}
                      data-ocid="inv-justification.input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="date"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      data-ocid="inv-justification.input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="treatingDoctor"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Treating Doctor
                    </Label>
                    <Input
                      id="treatingDoctor"
                      placeholder="Dr. Name + Designation"
                      value={form.treatingDoctor}
                      onChange={(e) => set("treatingDoctor", e.target.value)}
                      data-ocid="inv-justification.input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label
                      htmlFor="wardUnit"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Ward / Unit
                    </Label>
                    <Input
                      id="wardUnit"
                      placeholder="e.g. ICU, Ward 4B, Cardiology"
                      value={form.wardUnit}
                      onChange={(e) => set("wardUnit", e.target.value)}
                      data-ocid="inv-justification.input"
                    />
                  </div>
                </div>

                {/* ─── KEY: Investigation Requested + AI Button ─── */}
                <div className="rounded-xl border-2 border-teal-200 bg-teal-50/40 p-4 space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="investigationRequested"
                      className="text-xs font-semibold text-teal-700 uppercase tracking-wide"
                    >
                      Investigation Requested{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="investigationRequested"
                      placeholder="e.g. CT Brain, MRI Lumbar Spine, ABG, CBC..."
                      value={form.investigationRequested}
                      onChange={(e) =>
                        set("investigationRequested", e.target.value)
                      }
                      className="border-teal-300 focus:ring-teal-400 bg-white"
                      data-ocid="inv-justification.input"
                    />
                    <p className="text-xs text-teal-600">
                      Type the investigation name above, then click Auto-Fill
                    </p>
                  </div>

                  {/* ─── HIGH-END INVESTIGATION ALERT ─── */}
                  <AnimatePresence>
                    {showHighEndAlert && (
                      <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative rounded-2xl border-2 border-amber-400 bg-amber-50 p-5 shadow-lg"
                        data-ocid="inv-justification.error_state"
                      >
                        {/* HIGH-END badge */}
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          HIGH-END
                        </span>

                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-5 h-5 text-amber-700" />
                          </div>
                          <div>
                            <h4 className="font-heading font-extrabold text-amber-900 text-base">
                              ⚠️ HIGH-END INVESTIGATION ALERT
                            </h4>
                            <p className="text-amber-800 text-xs mt-0.5">
                              This is classified as a{" "}
                              <strong>High-End Investigation</strong>. Special
                              documentation and approval protocols are{" "}
                              <strong>mandatory</strong> before proceeding.
                            </p>
                          </div>
                        </div>

                        <div className="bg-amber-100 rounded-xl px-4 py-3">
                          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                            Immediate Action Required
                          </p>
                          <ul className="space-y-1.5">
                            {[
                              "Senior Consultant co-signature mandatory",
                              "Medical Superintendent / HOD prior approval required",
                              "Pre-authorization from TPA/insurer must be obtained",
                              "Patient informed consent (written) must be documented",
                              "Clinical urgency must be clearly noted in case file",
                            ].map((item, idx) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-amber-900"
                              >
                                <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={handleAutoFill}
                    disabled={isLoading || !form.investigationRequested.trim()}
                    className="w-full py-5 text-base font-bold rounded-xl shadow-md"
                    style={{
                      background: isLoading
                        ? undefined
                        : "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                    }}
                    data-ocid="inv-justification.primary_button"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing investigation...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />✨ Auto-Fill
                        Justification with AI
                      </>
                    )}
                  </Button>
                </div>

                {/* Investigation Type */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Investigation Type
                    </Label>
                    {aiFields.has("investigationType") && <AIBadge />}
                  </div>
                  <Select
                    value={form.investigationType}
                    onValueChange={(v) => set("investigationType", v)}
                  >
                    <SelectTrigger
                      className={aiCls("investigationType")}
                      data-ocid="inv-justification.select"
                    >
                      <SelectValue placeholder="Select investigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Imaging">Imaging</SelectItem>
                      <SelectItem value="Laboratory">Laboratory</SelectItem>
                      <SelectItem value="Cardiac">Cardiac</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Provisional Diagnosis & Clinical Findings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="provisionalDiagnosis"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Provisional Diagnosis
                    </Label>
                    <Textarea
                      id="provisionalDiagnosis"
                      placeholder="Enter provisional / working diagnosis"
                      value={form.provisionalDiagnosis}
                      onChange={(e) =>
                        set("provisionalDiagnosis", e.target.value)
                      }
                      rows={3}
                      data-ocid="inv-justification.textarea"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="clinicalFindings"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Clinical Findings
                    </Label>
                    <Textarea
                      id="clinicalFindings"
                      placeholder="Relevant clinical findings, vitals, examination"
                      value={form.clinicalFindings}
                      onChange={(e) => set("clinicalFindings", e.target.value)}
                      rows={3}
                      data-ocid="inv-justification.textarea"
                    />
                  </div>
                </div>

                {/* ─── AI-Filled Fields ─── */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-teal-200" />
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                      AI-Assisted Justification Fields
                    </span>
                    <div className="h-px flex-1 bg-teal-200" />
                  </div>

                  {/* Specific Indication */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="specificIndication"
                        className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                      >
                        Specific Indication / Need
                      </Label>
                      {aiFields.has("specificIndication") && <AIBadge />}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={
                          aiFields.has("specificIndication") ? "ai" : "empty"
                        }
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Textarea
                          id="specificIndication"
                          placeholder="Specific clinical indication or need for this investigation..."
                          value={form.specificIndication}
                          onChange={(e) =>
                            set("specificIndication", e.target.value)
                          }
                          rows={2}
                          className={aiCls("specificIndication")}
                          data-ocid="inv-justification.textarea"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Risk if Not Done */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="riskIfNotDone"
                          className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                        >
                          Risk if Investigation Not Done
                        </Label>
                        {aiFields.has("riskIfNotDone") && <AIBadge />}
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={aiFields.has("riskIfNotDone") ? "ai" : "empty"}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Textarea
                            id="riskIfNotDone"
                            placeholder="Clinical risk if this investigation is not performed..."
                            value={form.riskIfNotDone}
                            onChange={(e) =>
                              set("riskIfNotDone", e.target.value)
                            }
                            rows={3}
                            className={aiCls("riskIfNotDone")}
                            data-ocid="inv-justification.textarea"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="expectedOutcome"
                          className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                        >
                          Expected Outcome / Clinical Decision
                        </Label>
                        {aiFields.has("expectedOutcome") && <AIBadge />}
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={aiFields.has("expectedOutcome") ? "ai" : "empty"}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Textarea
                            id="expectedOutcome"
                            placeholder="Expected outcome and how result will guide clinical decision..."
                            value={form.expectedOutcome}
                            onChange={(e) =>
                              set("expectedOutcome", e.target.value)
                            }
                            rows={3}
                            className={aiCls("expectedOutcome")}
                            data-ocid="inv-justification.textarea"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* AI Fill indicator banner */}
                <AnimatePresence>
                  {aiFields.size > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3"
                    >
                      <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                      <p className="text-sm text-teal-700">
                        <strong>AI justification applied.</strong> Fields
                        highlighted in teal were auto-filled — review and edit
                        as needed before use.
                      </p>
                      <Badge
                        variant="secondary"
                        className="ml-auto bg-teal-100 text-teal-700 shrink-0"
                      >
                        Editable
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Doctor Signature */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="doctorSignature"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Doctor Signature / Name
                    </Label>
                    <Input
                      id="doctorSignature"
                      placeholder="Dr. Full Name + Designation"
                      value={form.doctorSignature}
                      onChange={(e) => set("doctorSignature", e.target.value)}
                      data-ocid="inv-justification.input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="signatureDate"
                      className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      Signature Date
                    </Label>
                    <Input
                      id="signatureDate"
                      type="date"
                      value={form.signatureDate}
                      onChange={(e) => set("signatureDate", e.target.value)}
                      data-ocid="inv-justification.input"
                    />
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                    data-ocid="inv-justification.secondary_button"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear Form
                  </Button>
                  <Button
                    onClick={handlePrint}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white"
                    data-ocid="inv-justification.primary_button"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print / Download
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* Protocol for High-End Investigations */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-14 px-4 bg-slate-900"
          data-ocid="inv-justification.panel"
        >
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-extrabold uppercase tracking-widest mb-4">
                <AlertTriangle className="w-3.5 h-3.5" /> MANDATORY PROTOCOL
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
                📋 High-End Investigation Approval Protocol
              </h2>
              <p className="text-slate-300 text-base max-w-2xl mx-auto">
                Mandatory steps for CT Scan, MRI, PET Scan, Angiography,
                Endoscopy &amp; other high-cost investigations
              </p>
            </motion.div>

            {/* 8 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {protocolSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-slate-800 rounded-2xl p-5 flex gap-4 border border-slate-700"
                  data-ocid={`inv-justification.item.${i + 1}`}
                >
                  <span className="w-10 h-10 rounded-xl bg-teal-500 text-white text-lg font-extrabold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm mb-1">
                      {step.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* High-End Categories */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="font-heading text-xl font-bold text-white mb-4 text-center">
                High-End Investigation Categories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highEndCategories.map((cat, i) => (
                  <div
                    key={cat.title}
                    className="bg-slate-700 rounded-2xl p-5 border border-slate-600"
                    data-ocid={`inv-justification.card.${i + 1}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <h4 className="font-heading font-bold text-white text-sm">
                        {cat.title}
                      </h4>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {cat.items}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* TPA Pre-Authorization Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border-2 border-teal-500 bg-teal-900/30 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-teal-400 shrink-0" />
                <h3 className="font-heading font-bold text-white text-lg">
                  TPA Pre-Authorization Checklist
                </h3>
              </div>
              <p className="text-teal-200 text-xs mb-4">
                All items below must be ready before submitting pre-auth to
                TPA/insurer for any high-end investigation
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {preAuthChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-teal-100"
                  >
                    <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* High-Risk Examples */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Info className="w-3.5 h-3.5" /> Justification Examples
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                High-Risk Investigation Examples
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {highRiskExamples.map((ex, i) => (
                <motion.div
                  key={ex.investigation}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`rounded-2xl border p-5 ${ex.color}`}
                  data-ocid={`inv-justification.example.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-gray-900">
                      {ex.investigation}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ex.badge}`}
                    >
                      High Risk
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Clinical Indication
                    </p>
                    <p className="text-xs text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-200">
                      {ex.indication}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Sample Justification Note
                    </p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      &ldquo;{ex.justification}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rejection Reasons */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> Common Rejection
                Reasons
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Why Claims Get Rejected for Missing Justification
              </h2>
            </motion.div>
            <div className="space-y-3">
              {rejectionReasons.map((rr, i) => (
                <motion.div
                  key={rr.reason}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex gap-4"
                  data-ocid={`inv-justification.rejection-reason.${i + 1}`}
                >
                  <span className="w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">
                      {rr.reason}
                    </p>
                    <p className="text-xs text-teal-700 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>
                        <strong>Prevention:</strong> {rr.tip}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle className="w-3.5 h-3.5" /> Best Practices
              </span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                8 Documentation Best Practices
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestPractices.map((bp, i) => (
                <motion.div
                  key={bp}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-green-100 shadow-sm"
                  data-ocid={`inv-justification.best-practice.${i + 1}`}
                >
                  <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700">{bp}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Back Link Bottom */}
        <div className="max-w-5xl mx-auto px-4 pb-12">
          <Link
            to="/training-game"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            data-ocid="inv-justification.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Training
          </Link>
        </div>
      </div>
    </Layout>
  );
}
