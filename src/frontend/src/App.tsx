import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AICourse } from "./pages/AICourse";
import { CommandCentre } from "./pages/CommandCentre";
import { Compliance } from "./pages/Compliance";
import { DigitalHealth } from "./pages/DigitalHealth";
import { Home } from "./pages/Home";
import { Hospitals } from "./pages/Hospitals";
import { InsightDetail } from "./pages/InsightDetail";
import { Insights } from "./pages/Insights";
import { JoinNetwork } from "./pages/JoinNetwork";
import { PatientSupport } from "./pages/PatientSupport";
import { TrainingGame } from "./pages/TrainingGame";

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// All routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
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

const routeTree = rootRoute.addChildren([
  homeRoute,
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
