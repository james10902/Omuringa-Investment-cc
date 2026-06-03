import { redirect } from "next/navigation";

// This section is not used in the current platform — redirect to dashboard home
export default function DashboardInvestmentsPage() {
  redirect("/dashboard");
}
