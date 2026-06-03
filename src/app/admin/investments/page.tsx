import { redirect } from "next/navigation";

// This section is not used in the current platform — redirect to admin home
export default function AdminInvestmentsPage() {
  redirect("/admin");
}
