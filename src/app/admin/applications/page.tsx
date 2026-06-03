import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Search } from "lucide-react";

export const dynamic = 'force-dynamic';

const statusConfig: Record<string, { label: string; color: string }> = {
  DRAFT: { label: "Draft", color: "badge-gray" },
  SUBMITTED: { label: "Submitted", color: "badge-blue" },
  UNDER_REVIEW: { label: "Under Review", color: "badge-yellow" },
  APPROVED: { label: "Approved", color: "badge-green" },
  REJECTED: { label: "Rejected", color: "badge-red" },
  MORE_INFO_REQUIRED: { label: "More Info Required", color: "badge-orange" },
};

const PAGE_SIZE = 20;

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const where: any = {};
  if (searchParams.status) where.status = searchParams.status;
  if (searchParams.search) {
    where.OR = [
      { firstName: { contains: searchParams.search, mode: "insensitive" } },
      { lastName: { contains: searchParams.search, mode: "insensitive" } },
      { user: { name: { contains: searchParams.search, mode: "insensitive" } } },
      { user: { email: { contains: searchParams.search, mode: "insensitive" } } },
    ];
  }

  const [applications, total] = await Promise.all([
    prisma.traineeApplication.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: {
        user: { select: { name: true, email: true, phone: true } },
        documents: { select: { id: true, type: true } },
      },
    }),
    prisma.traineeApplication.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = {
      ...(searchParams.status ? { status: searchParams.status } : {}),
      ...(searchParams.search ? { search: searchParams.search } : {}),
      ...overrides,
    };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    return `/admin/applications${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
          <p className="text-gray-600 text-sm mt-1">
            {total} application{total !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3">
        <form className="flex gap-2 flex-1 min-w-[200px]">
          {searchParams.status && (
            <input type="hidden" name="status" value={searchParams.status} />
          )}
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
            <Link
              href={buildHref({ search: undefined, page: undefined })}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Clear
            </Link>
          )}
        </form>

        <div className="flex flex-wrap gap-2">
          {["", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "MORE_INFO_REQUIRED"].map(
            (s) => (
              <Link
                key={s}
                href={buildHref({ status: s || undefined, page: undefined })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  searchParams.status === s || (!searchParams.status && !s)
                    ? "bg-brand-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s ? statusConfig[s]?.label : "All"}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {applications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Applicant</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Full Name</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium hidden md:table-cell">Docs</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium hidden lg:table-cell">Submitted</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const s = statusConfig[app.status];
                  return (
                    <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{app.user.name}</div>
                        <div className="text-gray-500 text-xs">{app.user.email}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {app.firstName} {app.lastName}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge ${s?.color}`}>{s?.label}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 hidden md:table-cell">
                        {app.documents.length}
                      </td>
                      <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">
                        {app.submittedAt ? formatDate(app.submittedAt) : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="text-brand-700 font-medium hover:underline"
                        >
                          Review
                        </Link>
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
                href={buildHref({ page: String(page - 1) })}
                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={buildHref({ page: String(page + 1) })}
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
