// src/app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminIndex() {
  // server-side redirect to login
  redirect("/admin/login");
}
