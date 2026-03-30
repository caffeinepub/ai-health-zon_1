import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ABDMCompliance } from "./pages/ABDMCompliance";
import { AICourse } from "./pages/AICourse";
import { CommandCentre } from "./pages/CommandCentre";
import { Compliance } from "./pages/Compliance";
import { CurrentAffairs } from "./pages/CurrentAffairs";
import { DigitalHealth } from "./pages/DigitalHealth";
import { Hospitals } from "./pages/Hospitals";
import { InsightDetail } from "./pages/InsightDetail";
import { Insights } from "./pages/Insights";
import { InvestorPitch } from "./pages/InvestorPitch";
import { JoinNetwork } from "./pages/JoinNetwork";
import { JourneyFilm } from "./pages/JourneyFilm";
import { NHCX } from "./pages/NHCX";
import { PatientKiosk } from "./pages/PatientKiosk";
import { PatientSupport } from "./pages/PatientSupport";
import { Pricing } from "./pages/Pricing";
import { TrainingGame } from "./pages/TrainingGame";
import { ClaimAuditTemplates } from "./pages/training/ClaimAuditTemplates";
import { ClaimBibleManual } from "./pages/training/ClaimBibleManual";
import { CleanClaimChecklist } from "./pages/training/CleanClaimChecklist";
import { DepartmentMatrix } from "./pages/training/DepartmentMatrix";
import { InvestigationJustification } from "./pages/training/InvestigationJustification";

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// All routes
const currentAffairsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CurrentAffairs,
});
const hospitalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hospitals",
  component: Hospitals,
});
const commandCentreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/command-centre",
  component: CommandCentre,
});
const patientSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient-support",
  component: PatientSupport,
});
const complianceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compliance",
  component: Compliance,
});
const digitalHealthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/digital-health",
  component: DigitalHealth,
});
const insightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/insights",
  component: Insights,
});
const insightDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/insights/$id",
  component: InsightDetail,
});
const joinNetworkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/join-network",
  component: JoinNetwork,
});
const trainingGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/training-game",
  component: TrainingGame,
});
const aiCourseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-course",
  component: AICourse,
});
const journeyFilmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journey-film",
  component: JourneyFilm,
});
const abdmComplianceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/abdm-compliance",
  component: ABDMCompliance,
});
const nhcxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nhcx",
  component: NHCX,
});
const investorPitchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/investor-pitch",
  component: InvestorPitch,
});
const patientKioskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patient-kiosk",
  component: PatientKiosk,
});

// Training Materials routes
const claimBibleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/training-materials/claim-bible",
  component: ClaimBibleManual,
});
const cleanClaimChecklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/training-materials/clean-claim-checklist",
  component: CleanClaimChecklist,
});
const claimAuditTemplatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/training-materials/claim-audit-templates",
  component: ClaimAuditTemplates,
});
const departmentMatrixRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/training-materials/department-responsibility-matrix",
  component: DepartmentMatrix,
});
const investigationJustificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/training-materials/investigation-justification",
  component: InvestigationJustification,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: Pricing,
});

const routeTree = rootRoute.addChildren([
  currentAffairsRoute,
  hospitalsRoute,
  commandCentreRoute,
  patientSupportRoute,
  complianceRoute,
  digitalHealthRoute,
  insightsRoute,
  insightDetailRoute,
  joinNetworkRoute,
  trainingGameRoute,
  aiCourseRoute,
  journeyFilmRoute,
  nhcxRoute,
  abdmComplianceRoute,
  investorPitchRoute,
  patientKioskRoute,
  claimBibleRoute,
  cleanClaimChecklistRoute,
  claimAuditTemplatesRoute,
  departmentMatrixRoute,
  investigationJustificationRoute,
  pricingRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
