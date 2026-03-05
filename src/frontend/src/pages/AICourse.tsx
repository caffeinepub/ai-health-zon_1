import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronRight,
  Clock,
  FlaskConical,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Lightbulb,
  Microscope,
  Play,
  Shield,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

interface Module {
  number: number;
  title: string;
  duration: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  keyTopics: string[];
  learningOutcomes: string[];
  realWorldApp: string;
}

const modules: Module[] = [
  {
    number: 1,
    title: "Introduction to Artificial Intelligence",
    duration: "8:34",
    description:
      "Explore what AI is, how it evolved, and why it matters in today's world. Learn the difference between narrow AI and general AI, understand key terminologies, and discover how AI is transforming industries—with a special focus on healthcare applications.",
    icon: Brain,
    keyTopics: [
      "History of AI: from Turing to modern deep learning",
      "Narrow AI vs. General AI vs. Artificial Superintelligence",
      "AI vs. Machine Learning vs. Deep Learning — key differences",
      "How AI systems learn: data, algorithms, and feedback loops",
      "Major AI breakthroughs: ImageNet, GPT, AlphaGo",
      "Current AI applications in healthcare, finance, and transportation",
      "Opportunities and risks of AI adoption in clinical settings",
    ],
    learningOutcomes: [
      "Explain what AI is and how it differs from traditional programming",
      "Identify real-world AI applications in healthcare contexts",
      "Understand the AI landscape and key terminology confidently",
      "Recognize the difference between hype and genuine AI capability",
    ],
    realWorldApp:
      "AI-powered clinical decision support systems (CDSS) used in hospitals like Mayo Clinic to flag drug interactions and suggest diagnoses.",
  },
  {
    number: 2,
    title: "Fundamentals of Machine Learning",
    duration: "7:21",
    description:
      "Dive into the core concepts of machine learning: supervised, unsupervised, and reinforcement learning. Understand how models are trained on data, what algorithms power medical predictions, and how accuracy is measured—without a single line of code.",
    icon: Layers,
    keyTopics: [
      "Supervised, Unsupervised, and Reinforcement Learning explained",
      "Training data, validation data, and test data splits",
      "Common algorithms: decision trees, random forests, neural networks",
      "Overfitting, underfitting, and model generalization",
      "How medical prediction models are trained and evaluated",
      "Accuracy, precision, recall, AUC-ROC — performance metrics",
      "Introduction to deep learning and multi-layer neural networks",
    ],
    learningOutcomes: [
      "Explain how machine learning models learn from data",
      "Differentiate between the three major ML paradigms",
      "Interpret model performance metrics used in healthcare AI",
      "Understand why certain ML approaches suit specific medical problems",
    ],
    realWorldApp:
      "Predicting 30-day hospital readmission using patient records — a supervised learning problem solved at major US health systems.",
  },
  {
    number: 3,
    title: "Data in Healthcare AI",
    duration: "8:06",
    description:
      "Discover the types of healthcare data (EHR, imaging, genomics, wearables), data collection pipelines, challenges like data bias and missing values, and critical regulations like HIPAA and GDPR that govern patient data privacy.",
    icon: FlaskConical,
    keyTopics: [
      "Types of healthcare data: EHR, imaging (DICOM), genomics, wearables, claims",
      "Structured vs. unstructured data in clinical settings",
      "Data collection pipelines and interoperability (HL7, FHIR)",
      "Common data quality issues: missing values, bias, inconsistency",
      "Data annotation and labeling for AI training",
      "HIPAA and GDPR: patient data privacy regulations",
      "De-identification techniques and synthetic data generation",
    ],
    learningOutcomes: [
      "Identify the major categories of healthcare data and their AI uses",
      "Understand how data quality impacts model accuracy and safety",
      "Navigate key privacy regulations that govern health data",
      "Recognize the challenges of working with real-world clinical data",
    ],
    realWorldApp:
      "FHIR-based data exchange between hospital EHR systems enabling AI models to access unified patient histories for better predictions.",
  },
  {
    number: 4,
    title: "Natural Language Processing (NLP) in Healthcare",
    duration: "8:53",
    description:
      "Learn how machines understand and generate human language. Explore NLP applications in clinical documentation, discharge summary analysis, chatbot triage, and how NLP powers tools like IBM Watson and clinical decision support systems.",
    icon: BookOpen,
    keyTopics: [
      "How machines process and understand human language",
      "Tokenization, named entity recognition (NER), and sentiment analysis",
      "Clinical NLP: parsing discharge summaries, clinical notes, and referrals",
      "NLP in chatbot triage and patient communication systems",
      "IBM Watson for Oncology: how NLP analyzes medical literature",
      "Large Language Models (LLMs) and their healthcare applications",
      "Challenges: medical abbreviations, negation, and clinical jargon",
    ],
    learningOutcomes: [
      "Explain how NLP extracts meaning from unstructured clinical text",
      "Identify healthcare use cases where NLP delivers measurable value",
      "Understand how clinical documentation automation works",
      "Evaluate the limitations and risks of NLP in medical decision-making",
    ],
    realWorldApp:
      "Automated ICD-10 coding from clinical notes using NLP — reducing medical coder workload by up to 60% in pilot hospital implementations.",
  },
  {
    number: 5,
    title: "AI in Medical Imaging",
    duration: "9:00",
    description:
      "Uncover how deep learning analyzes radiology scans, pathology slides, and retinal images. Examine real tools used in detecting cancer, diabetic retinopathy, and COVID-19 from chest X-rays—with accuracy often rivaling specialist physicians.",
    icon: Microscope,
    keyTopics: [
      "How convolutional neural networks (CNNs) analyze medical images",
      "AI in radiology: detecting tumors in CT scans and MRIs",
      "Pathology AI: analyzing tissue slides for cancer classification",
      "Retinal imaging AI: diabetic retinopathy and macular degeneration",
      "Chest X-ray AI: COVID-19, pneumonia, and tuberculosis detection",
      "FDA-approved AI imaging tools currently in clinical use",
      "Human vs. AI accuracy comparisons in diagnostic imaging",
    ],
    learningOutcomes: [
      "Understand how deep learning processes and interprets medical images",
      "Identify major imaging specialties where AI is transforming diagnosis",
      "Evaluate AI imaging tools using real performance benchmarks",
      "Recognize the workflow integration challenges in radiology departments",
    ],
    realWorldApp:
      "Google DeepMind's AI detecting over 50 eye diseases from retinal scans with accuracy matching world-leading ophthalmologists.",
  },
  {
    number: 6,
    title: "Predictive Analytics and Diagnosis",
    duration: "7:52",
    description:
      "Understand how AI predicts disease onset, patient deterioration, and readmission risk. Study early warning systems, sepsis detection models, and how predictive scoring tools transform ICU and emergency department decision-making.",
    icon: TrendingUp,
    keyTopics: [
      "Disease onset prediction: diabetes, heart disease, cancer risk models",
      "Early Warning Scores (EWS) and AI-powered sepsis detection",
      "ICU patient deterioration models and real-time alerting systems",
      "Readmission prediction and population health management",
      "Risk stratification in insurance and hospital capacity planning",
      "Survival analysis and time-to-event modeling in oncology",
      "Explainability in predictive models: why it matters for clinical trust",
    ],
    learningOutcomes: [
      "Explain how predictive models are used in clinical risk stratification",
      "Understand how AI early warning systems reduce ICU mortality",
      "Interpret predictive model outputs and their confidence intervals",
      "Identify ethical considerations in automated clinical predictions",
    ],
    realWorldApp:
      "Epic Systems' sepsis prediction model deployed in 100+ US hospitals, alerting nurses 6 hours before sepsis onset and reducing mortality by 18%.",
  },
  {
    number: 7,
    title: "AI in Drug Discovery and Development",
    duration: "8:03",
    description:
      "Explore how AI compresses the decade-long drug pipeline. Understand protein structure prediction (AlphaFold), virtual compound screening, repurposing existing drugs for new diseases, and AI's role in accelerating COVID-19 vaccine development.",
    icon: FlaskConical,
    keyTopics: [
      "Traditional drug discovery timeline vs. AI-accelerated pipeline",
      "Protein structure prediction: AlphaFold and its global impact",
      "Virtual compound screening and molecular docking simulations",
      "Drug repurposing: finding new uses for existing molecules",
      "AI in clinical trial design and patient recruitment optimization",
      "Generative AI for novel drug molecule design",
      "AI's role in COVID-19 vaccine and antiviral development",
    ],
    learningOutcomes: [
      "Understand how AI compresses the 10–15 year drug discovery cycle",
      "Explain AlphaFold's significance for biology and medicine",
      "Identify the stages of drug development where AI adds most value",
      "Recognize the limitations of AI predictions in pharmaceutical research",
    ],
    realWorldApp:
      "Insilico Medicine using generative AI to design a novel drug candidate for idiopathic pulmonary fibrosis in 18 months — a process that normally takes 5+ years.",
  },
  {
    number: 8,
    title: "Robotics and AI in Surgery",
    duration: "7:58",
    description:
      "Examine AI-assisted surgical robots like the da Vinci System, how computer vision guides precision cuts, robotic rehabilitation platforms, and the future of autonomous surgery—balancing innovation with patient safety and surgeon oversight.",
    icon: Stethoscope,
    keyTopics: [
      "The da Vinci Surgical System: how robotic surgery works",
      "Computer vision and haptic feedback in surgical robotics",
      "AI-assisted laparoscopic and orthopedic procedures",
      "Autonomous surgical systems: current capabilities and safety limits",
      "Robotic rehabilitation platforms: stroke and spinal cord recovery",
      "AI for surgical planning: 3D modeling and pre-operative simulation",
      "Regulatory approval pathways for surgical AI (FDA 510k, De Novo)",
    ],
    learningOutcomes: [
      "Explain how AI enhances precision and reduces surgeon fatigue",
      "Understand the current boundaries of autonomous surgical AI",
      "Identify major robotic surgery platforms and their clinical applications",
      "Evaluate patient safety considerations in AI-assisted procedures",
    ],
    realWorldApp:
      "Intuitive Surgical's da Vinci system used in over 10 million procedures globally — with AI overlays now guiding real-time tissue identification during surgery.",
  },
  {
    number: 9,
    title: "AI in Patient Care and Hospital Management",
    duration: "7:35",
    description:
      "Discover AI-powered patient monitoring, smart hospital logistics, bed management, staffing optimization, and remote patient monitoring via wearables. Learn how AI is transforming the patient journey from admission to discharge.",
    icon: Heart,
    keyTopics: [
      "AI-powered continuous patient monitoring: vitals, deterioration alerts",
      "Smart hospital logistics: bed management, patient flow optimization",
      "Nurse staffing and shift scheduling using predictive AI",
      "Remote patient monitoring (RPM) via wearables and IoT devices",
      "AI-driven discharge planning and length-of-stay prediction",
      "Patient engagement chatbots and virtual care assistants",
      "AI in mental health: mood tracking, crisis prediction, therapy bots",
    ],
    learningOutcomes: [
      "Understand how AI optimizes hospital operations and resource allocation",
      "Identify RPM technologies improving chronic disease management",
      "Explain how predictive staffing models reduce burnout and improve care",
      "Recognize AI's role in the post-acute and home care continuum",
    ],
    realWorldApp:
      "Johns Hopkins Hospital using AI to predict patient flow and optimize bed allocation — reducing Emergency Department wait times by 25%.",
  },
  {
    number: 10,
    title: "Ethical, Legal, and Social Implications",
    duration: "6:35",
    description:
      "Grapple with the critical questions AI raises in healthcare: algorithmic bias, accountability for AI errors, informed consent, regulatory frameworks (FDA, CE marking), and how healthcare AI should be governed to remain fair and equitable.",
    icon: Shield,
    keyTopics: [
      "Algorithmic bias: causes, consequences, and mitigation strategies",
      "Accountability gaps: when AI makes a wrong clinical decision",
      "Informed consent in the age of AI-assisted diagnosis",
      "Regulatory frameworks: FDA AI/ML action plan, EU AI Act, CDSCO guidelines",
      "Transparency and explainability requirements in clinical AI (XAI)",
      "Health equity: how AI can widen or narrow care disparities",
      "Data sovereignty and patient rights over AI-used health data",
    ],
    learningOutcomes: [
      "Identify and explain the major ethical risks of healthcare AI",
      "Understand global regulatory frameworks governing clinical AI tools",
      "Evaluate AI systems for fairness across different patient populations",
      "Apply ethical reasoning to real-world AI deployment scenarios",
    ],
    realWorldApp:
      "The Optum insurance algorithm scandal — where a commercial AI tool systematically under-prioritized Black patients for care management enrollment due to biased training data.",
  },
  {
    number: 11,
    title: "Real-World Applications and Case Studies",
    duration: "6:39",
    description:
      "Analyze landmark deployments: IBM Watson in oncology, Google DeepMind for kidney injury prediction, AI retinal screening in diabetic clinics, and hospital logistics AI during COVID-19. Understand what worked, what failed, and why.",
    icon: Target,
    keyTopics: [
      "IBM Watson for Oncology: successes, controversies, and lessons learned",
      "Google DeepMind AKI (acute kidney injury) prediction at Royal Free Hospital",
      "AI retinal screening deployment in NHS diabetic clinics",
      "Hospital logistics AI during COVID-19 pandemic surge management",
      "WHO and UNICEF AI pilots in low-resource healthcare settings",
      "AI in insurance claim processing and fraud detection",
      "Measuring ROI: how hospitals quantify AI investment returns",
    ],
    learningOutcomes: [
      "Analyze real deployments of healthcare AI — both successes and failures",
      "Understand what factors determine whether an AI pilot scales or fails",
      "Identify transferable lessons from global healthcare AI case studies",
      "Evaluate AI projects with a critical, evidence-based lens",
    ],
    realWorldApp:
      "NHS England's AI diagnostic program — 10 AI tools deployed across 20+ hospitals, detecting cancers earlier and reducing radiologist reporting backlogs by 30%.",
  },
  {
    number: 12,
    title: "Future Trends and Career Paths",
    duration: "7:03",
    description:
      "Look ahead to generative AI in clinical notes, multimodal AI combining imaging + genomics + EHR, precision medicine, and global health AI. Explore career roles: clinical AI specialist, health informatics lead, and AI ethics officer.",
    icon: Sparkles,
    keyTopics: [
      "Generative AI in clinical documentation: ambient AI scribes (Nuance DAX, Suki)",
      "Multimodal AI: combining imaging, genomics, EHR, and wearable data",
      "Precision medicine and pharmacogenomics driven by AI",
      "Federated learning: training AI across hospitals without sharing patient data",
      "Global health AI: disease surveillance, epidemic prediction, resource allocation",
      "Emerging roles: Clinical AI Specialist, Health Informatics Lead, AI Ethics Officer",
      "How to build a career at the intersection of AI and healthcare",
    ],
    learningOutcomes: [
      "Anticipate the next wave of AI innovation in healthcare over the next decade",
      "Understand federated learning and its importance for privacy-preserving AI",
      "Identify emerging career pathways in clinical AI and health informatics",
      "Create a personal learning roadmap to enter the healthcare AI field",
    ],
    realWorldApp:
      "Microsoft Nuance DAX ambient AI scribe — automatically generating clinical notes from doctor-patient conversations, saving physicians 2+ hours per day in documentation.",
  },
];

const featuredModules = [modules[2], modules[5], modules[9]];

const audienceCards = [
  {
    icon: Stethoscope,
    title: "Healthcare Professionals",
    description:
      "Doctors, nurses, and administrators exploring AI tools to improve patient outcomes and operational efficiency.",
    color: "bg-health-blue-light",
    iconColor: "text-health-blue",
  },
  {
    icon: Microscope,
    title: "Medical Researchers",
    description:
      "Scientists and researchers looking to leverage AI for discovery, clinical trials, and evidence-based medicine.",
    color: "bg-health-teal-light",
    iconColor: "text-health-teal",
  },
  {
    icon: Brain,
    title: "Tech Enthusiasts",
    description:
      "Technology professionals aiming to transition into healthcare, building the next generation of medtech solutions.",
    color: "bg-health-blue-light",
    iconColor: "text-health-blue",
  },
  {
    icon: GraduationCap,
    title: "Students & Policy Makers",
    description:
      "Future leaders in digital health, public health advocates, and policymakers shaping the future of medical innovation.",
    color: "bg-health-teal-light",
    iconColor: "text-health-teal",
  },
];

const courseStats = [
  { icon: Layers, value: "12", label: "Modules" },
  { icon: Clock, value: "96", label: "Minutes" },
  { icon: GraduationCap, value: "Beginner", label: "Level" },
  { icon: Award, value: "Certificate", label: "On Completion" },
];

const requirements = [
  "No coding or programming knowledge required",
  "No prior AI or machine learning experience needed",
  "Basic interest in healthcare or technology is helpful",
  "Accessible to learners from medical and non-medical backgrounds",
  "No specialized software or tools required",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AICourse() {
  const totalMinutes = 96;
  const totalModules = 12;

  return (
    <Layout section="ai-course">
      {/* ── HERO ── */}
      <section
        data-ocid="ai-course.hero.section"
        className="relative overflow-hidden pt-20 pb-16"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 health-gradient" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, oklch(0.7 0.2 185) 0%, transparent 45%), radial-gradient(circle at 85% 20%, oklch(0.5 0.18 220) 0%, transparent 40%), radial-gradient(circle at 60% 80%, oklch(0.45 0.15 200) 0%, transparent 35%)",
          }}
        />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Online Course
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-400/20 border border-green-400/30 text-green-200 text-xs font-semibold">
                ✦ Free to Enroll
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
              Basics of{" "}
              <span className="relative">
                <span
                  className="relative z-10 text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, oklch(0.9 0.12 185), oklch(0.85 0.15 200))",
                  }}
                >
                  AI in Healthcare
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.7 0.18 185), oklch(0.6 0.15 200))",
                  }}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              AI-Powered Knowledge for the Modern Healthcare Professional —
              learn how machine learning, NLP, and data science are reshaping
              the future of medicine.
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Layers, text: `${totalModules} Modules` },
                { icon: Clock, text: `~${totalMinutes} min total` },
                { icon: GraduationCap, text: "Beginner Level" },
                { icon: Award, text: "Certificate on Completion" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-white/70" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button
                data-ocid="ai-course.enroll.primary_button"
                size="lg"
                className="bg-white text-health-blue hover:bg-white/90 font-semibold shadow-lg px-8 gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Enroll Now
              </Button>
              <Button
                data-ocid="ai-course.preview.secondary_button"
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm gap-2"
              >
                <Play className="w-4 h-4" />
                Preview Course
              </Button>
            </div>
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 shadow-2xl"
          >
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">
              Course At a Glance
            </p>
            <div className="space-y-3">
              {[
                { label: "Total Modules", value: "12", color: "text-white" },
                {
                  label: "Total Duration",
                  value: "~96 min",
                  color: "text-green-300",
                },
                {
                  label: "Difficulty",
                  value: "Beginner",
                  color: "text-sky-300",
                },
                {
                  label: "Certificate",
                  value: "Included",
                  color: "text-yellow-300",
                },
                {
                  label: "Prerequisites",
                  value: "None",
                  color: "text-white/80",
                },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">{label}</span>
                  <span className={`text-sm font-semibold ${color}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-xs">
                  Healthcare + Tech learners
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {courseStats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row items-center gap-3 px-6 py-5 text-center sm:text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-health-blue-light flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-health-blue" />
                </div>
                <div>
                  <p className="font-heading font-bold text-xl text-health-blue leading-none">
                    {value}
                  </p>
                  <p className="text-muted-foreground text-sm">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED MODULES ── */}
      <section className="py-16 px-4 sm:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge className="bg-health-blue-light text-health-blue border-0 mb-3 font-semibold">
              ✦ Highlighted Modules
            </Badge>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Key Learning Areas
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Three pillars that make this course uniquely valuable for
              healthcare and technology professionals alike.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div key={mod.number} variants={itemVariants}>
                  <Card className="h-full group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-border overflow-hidden">
                    <div className="h-1.5 w-full health-gradient" />
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-health-blue-light flex items-center justify-center shrink-0 group-hover:bg-health-blue transition-colors duration-300">
                          <Icon className="w-6 h-6 text-health-blue group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              Module {mod.number}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-health-teal-light text-health-teal text-xs font-semibold">
                              <Clock className="w-3 h-3" />
                              {mod.duration}
                            </span>
                          </div>
                          <h3 className="font-heading font-bold text-base text-foreground leading-snug">
                            {mod.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {mod.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FULL CURRICULUM ── */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge className="bg-health-teal-light text-health-teal border-0 mb-3 font-semibold">
              📚 Full Curriculum
            </Badge>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
              All 12 Modules
            </h2>
            <p className="text-muted-foreground text-base">
              A structured learning path from AI fundamentals to real-world
              healthcare applications. Click any module to explore detailed
              topics and learning outcomes.
            </p>
          </motion.div>

          <Accordion
            type="multiple"
            data-ocid="ai-course.curriculum.panel"
            className="space-y-3"
          >
            {modules.map((mod) => {
              const Icon = mod.icon;
              const ocid = `ai-course.module.item.${mod.number}` as const;
              return (
                <AccordionItem
                  key={mod.number}
                  value={`module-${mod.number}`}
                  data-ocid={ocid}
                  className="border border-border rounded-xl overflow-hidden shadow-xs bg-white data-[state=open]:shadow-md data-[state=open]:border-health-blue/30 transition-all duration-200"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 [&>svg]:hidden group">
                    <div className="flex items-center gap-4 w-full text-left">
                      {/* Module number badge */}
                      <div className="w-9 h-9 rounded-full health-gradient flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm">
                        {mod.number}
                      </div>
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-lg bg-health-blue-light flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-health-blue" />
                      </div>
                      {/* Title */}
                      <span className="flex-1 font-semibold text-foreground text-sm sm:text-base group-hover:text-health-blue transition-colors">
                        {mod.title}
                      </span>
                      {/* Duration chip */}
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-health-teal-light text-health-teal text-xs font-semibold shrink-0">
                        <Clock className="w-3 h-3" />
                        {mod.duration}
                      </span>
                      {/* Expand arrow */}
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-5 pb-6 pt-1">
                      <div className="ml-[calc(2.25rem+2rem+1rem)] pl-4 border-l-2 border-health-blue/20 space-y-5">
                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {mod.description}
                        </p>

                        {/* Duration chip (mobile) */}
                        <div className="flex items-center gap-2">
                          <span className="sm:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-health-teal-light text-health-teal text-xs font-semibold">
                            <Clock className="w-3 h-3" />
                            {mod.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-health-teal" />
                            Conceptual — no coding required
                          </span>
                        </div>

                        {/* Key Topics Covered */}
                        <div>
                          <h4 className="font-heading font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-health-teal-light flex items-center justify-center shrink-0">
                              <BookOpen className="w-3 h-3 text-health-teal" />
                            </div>
                            Key Topics Covered
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            {mod.keyTopics.map((topic) => (
                              <div
                                key={topic}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-health-teal shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-xs leading-relaxed">
                                  {topic}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* What You'll Learn */}
                        <div>
                          <h4 className="font-heading font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-health-blue-light flex items-center justify-center shrink-0">
                              <Target className="w-3 h-3 text-health-blue" />
                            </div>
                            What You'll Learn
                          </h4>
                          <div className="space-y-2">
                            {mod.learningOutcomes.map((outcome) => (
                              <div
                                key={outcome}
                                className="flex items-start gap-2"
                              >
                                <ChevronRight className="w-3.5 h-3.5 text-health-blue shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-xs leading-relaxed">
                                  {outcome}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Real-World Application callout */}
                        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Lightbulb className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-amber-800 mb-0.5 flex items-center gap-1.5">
                              <Globe className="w-3 h-3" />
                              Real-World Application
                            </p>
                            <p className="text-xs text-amber-700 leading-relaxed">
                              {mod.realWorldApp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* ── COURSE DESCRIPTION ── */}
      <section className="py-16 px-4 sm:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Badge className="bg-health-blue-light text-health-blue border-0 mb-3 font-semibold">
                📖 About This Course
              </Badge>
              <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
                Course Description
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Artificial Intelligence is revolutionizing the way we diagnose
                  diseases, manage patient care, and design treatment
                  strategies. In this beginner-friendly course, you'll explore
                  how AI, machine learning, and data science are reshaping the
                  future of medicine—one algorithm at a time.
                </p>
                <p>
                  Whether you come from a medical, technical, or research
                  background, this course is designed to give you a solid
                  foundation in how AI tools are used in clinical settings,
                  diagnostics, imaging, hospital management, and beyond. You'll
                  learn about key technologies like machine learning, deep
                  learning, and natural language processing (NLP), as well as
                  practical applications including disease prediction, robotic
                  surgery, drug discovery, and mental health monitoring.
                </p>
                <p>
                  We'll also dive into real-world case studies—such as IBM
                  Watson in cancer care, AI-powered retinal screening tools, and
                  hospital logistics during the COVID-19 crisis—so you can see
                  the impact of AI in action. Alongside the technical insights,
                  you'll gain awareness of important issues like algorithmic
                  bias, ethical dilemmas, legal frameworks, and data privacy
                  regulations (HIPAA, GDPR).
                </p>
                <p className="font-semibold text-foreground">
                  No coding skills? No problem! This course focuses on concepts,
                  use cases, and real-world understanding—not programming.
                </p>
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24 bg-white rounded-2xl border border-border shadow-sm p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-health-teal" />
                  Requirements
                </h3>
                <ul className="space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-health-teal-light flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-health-teal" />
                      </div>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-health-blue-light">
                    <GraduationCap className="w-5 h-5 text-health-blue shrink-0" />
                    <p className="text-health-blue text-sm font-medium">
                      Earn a certificate upon completing all 12 modules
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge className="bg-health-teal-light text-health-teal border-0 mb-3 font-semibold">
              🎯 Who This Is For
            </Badge>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Is This Course Right for You?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Designed for learners from diverse backgrounds — no specialized
              knowledge required to get started.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {audienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title} variants={itemVariants}>
                  <Card className="h-full group card-hover border-border">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-6 h-6 ${card.iconColor}`} />
                      </div>
                      <h3 className="font-heading font-bold text-base text-foreground mb-2">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 health-gradient" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 70%, oklch(0.7 0.2 185) 0%, transparent 50%), radial-gradient(circle at 70% 30%, oklch(0.5 0.18 220) 0%, transparent 40%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Start Learning Today — It's Free
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-white/75 text-lg mb-8 leading-relaxed">
            Join thousands of healthcare professionals and tech enthusiasts
            building their AI knowledge — no prerequisites, no code, no barrier.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              data-ocid="ai-course.cta.primary_button"
              size="lg"
              className="bg-white text-health-blue hover:bg-white/90 font-bold shadow-xl px-10 gap-2 text-base"
            >
              <GraduationCap className="w-5 h-5" />
              Enroll Now — Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm gap-2 text-base"
            >
              View All Modules
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Reassurance row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
            {[
              "✓ No coding required",
              "✓ Beginner friendly",
              "✓ Certificate included",
              "✓ Self-paced",
            ].map((text) => (
              <span key={text} className="text-white/65 text-sm">
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
