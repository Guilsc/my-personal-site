import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ba-content-engine")({
  beforeLoad: () => {
    throw redirect({ to: "/curatia-content-engine" });
  },
});
