"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, UserX, UserCheck, FileText } from "lucide-react";
import Link from "next/link";

interface Props {
  userId: string;
  userName: string;
  isActive: boolean;
  hasApplication: boolean;
}

export function UserActionsButton({ userId, userName, isActive, hasApplication }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleActive = async () => {
    if (
      !confirm(
        `${isActive ? "Deactivate" : "Activate"} account for ${userName}? ${
          isActive
            ? "They will not be able to log in."
            : "They will be able to log in again."
        }`
      )
    )
      return;

    setLoading(true);
    setOpen(false);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update user.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-50"
        aria-label="User actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[160px]">
            {hasApplication && (
              <Link
                href={`/admin/applications?search=${encodeURIComponent(userId)}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                <FileText className="w-4 h-4" />
                View Application
              </Link>
            )}
            <button
              onClick={toggleActive}
              className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-colors ${
                isActive
                  ? "text-red-600 hover:bg-red-50"
                  : "text-green-700 hover:bg-green-50"
              }`}
            >
              {isActive ? (
                <>
                  <UserX className="w-4 h-4" />
                  Deactivate
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Activate
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
