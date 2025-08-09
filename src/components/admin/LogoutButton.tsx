"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handle = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    router.replace("/admin/login");
  };

  return (
    <button onClick={handle} className="text-sm text-red-500 hover:underline">
      Logout
    </button>
  );
}
