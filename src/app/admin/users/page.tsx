import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Search, UserCheck, UserX } from "lucide-react";

export const dynamic = 'force-dynamic';
import { UserActionsButton } from "./user-actions-button";

const statusConfig: Record<string, { label: string; color: string }> = {
  DRAFT: { label: "Draft", color: "badge-gray" },
  SUBMITTED: { label: "Submitted", color: "badge-blue" },
  UNDER_REVIEW: { label: "Under Review", color: "badge-yellow" },
  APPROVED: { label: "Approved", color: "badge-green" },
  REJECTED: { label: "Rejected", color: "badge-red" },
  MORE_INFO_REQUIRED: { label: "More Info", color: "badge-orange" },
};

const PAGE_SIZE = 20;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const where: any = { role: "TRAINEE" };
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: "insensitive" } },
      { email: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: {
        application: { select: { status: true, submittedAt: true } },
        _count: { select: { documents: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Registered Users</h2>
        <p className="text-gray-600 text-sm mt-1">
          {total} trainee{total !== 1 ? "s" : ""} registered
        </p>
      </div>

      {/* Search */}
      <div className="card p-4">
        <form className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="search"
              placeholder="Search by name or email..."
              defaultValue={searchParams.search}
              className="form-input pl-9 py-2 text-sm"
            />
          </div>
          <button type="submit" className="btn-primary py-2 px-4 text-sm">
            Search
          </button>
          {searchParams.search && (
            <Link href="/admin/users" className="btn-secondary py-2 px-4 text-sm">
              Clear
            </Link>
          )}
        </form>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {users.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium hidden sm:table-cell">Phone</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Application</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium hidden md:table-cell">Docs</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium hidden lg:table-cell">Registered</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const appStatus = user.application?.status;
                  const s = appStatus ? statusConfig[appStatus] : null;
                  return (
                    <tr
                      key={user.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 ${
                        !user.isActive ? "opacity-60" : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {user.name}
                          {!user.isActive && (
                            <span className="badge badge-red text-xs">Inactive</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{user.email}</td>
                      <td className="py-3 px-4 text-gray-700 hidden sm:table-cell">
                        {user.phone || "—"}
                      </td>
                      <td className="py-3 px-4">
                        {s ? (
                          <Link
                            href={`/admin/applications?search=${encodeURIComponent(user.email)}`}
                            className={`badge ${s.color} hover:opacity-80 transition-opacity`}
                          >
                            {s.label}
                          </Link>
                        ) : (
                          <span className="text-gray-400 text-xs">None</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-700 hidden md:table-cell">
                        {user._count.documents}
                      </td>
                      <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        {user.isActive ? (
                          <span className="flex items-center gap-1 text-green-700 text-xs font-medium">
                            <UserCheck className="w-3.5 h-3.5" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
                            <UserX className="w-3.5 h-3.5" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <UserActionsButton
                          userId={user.id}
                          userName={user.name}
                          isActive={user.isActive}
                          hasApplication={!!user.application}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {skip + 1}–{Math.min(skip + PAGE_SIZE, total)} of {total}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/users?${new URLSearchParams({
                  ...(searchParams.search ? { search: searchParams.search } : {}),
                  page: String(page - 1),
                })}`}
                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/users?${new URLSearchParams({
                  ...(searchParams.search ? { search: searchParams.search } : {}),
                  page: String(page + 1),
                })}`}
                className="px-3 py-1.5 rounded-lg bg-brand-700 text-white hover:bg-brand-800 font-medium"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
