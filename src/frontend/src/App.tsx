import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CommandCentre } from "./pages/CommandCentre";
import { Compliance } from "./pages/Compliance";
import { DigitalHealth } from "./pages/DigitalHealth";
import { Ecosystem } from "./pages/Ecosystem";
import { Home } from "./pages/Home";
import { Hospitals } from "./pages/Hospitals";
import { Insights } from "./pages/Insights";
import { JoinNetwork } from "./pages/JoinNetwork";
import { PatientSupport } from "./pages/PatientSupport";

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
const ecosystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ecosystem",
  component: Ecosystem,
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
const joinNetworkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/join-network",
  component: JoinNetwork,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  ecosystemRoute,
  hospitalsRoute,
  commandCentreRoute,
  patientSupportRoute,
  complianceRoute,
  digitalHealthRoute,
  insightsRoute,
  joinNetworkRoute,
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
