import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const typeLabels: Record<string, string> = {
  CONTACT: "Contact",
  QUOTE_REQUEST: "Quote Request",
  PARTNERSHIP: "Partnership",
  TRAINING_ENQUIRY: "Training Enquiry",
};

const typeColors: Record<string, string> = {
  CONTACT: "badge-blue",
  QUOTE_REQUEST: "badge-green",
  PARTNERSHIP: "badge-yellow",
  TRAINING_ENQUIRY: "badge-orange",
};

const PAGE_SIZE = 15;

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: { type?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const where: any = {};
  if (searchParams.type) where.type = searchParams.type;

  const [submissions, total] = await Promise.all([
    prisma.formSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.formSubmission.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Mark visible submissions as read
  const unreadIds = submissions.filter((s) => !s.read).map((s) => s.id);
  if (unreadIds.length > 0) {
    await prisma.formSubmission.updateMany({
      where: { id: { in: unreadIds } },
      data: { read: true },
    });
  }

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = {
      ...(searchParams.type ? { type: searchParams.type } : {}),
      ...overrides,
    };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    return `/admin/submissions${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Form Submissions</h2>
        <p className="text-gray-600 text-sm mt-1">
          {total} submission{total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {["", "CONTACT", "QUOTE_REQUEST", "PARTNERSHIP", "TRAINING_ENQUIRY"].map((t) => (
          <Link
            key={t}
            href={buildHref({ type: t || undefined, page: undefined })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              searchParams.type === t || (!searchParams.type && !t)
                ? "bg-brand-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t ? typeLabels[t] : "All"}
          </Link>
        ))}
      </div>

      {submissions.length === 0 ? (
        <div className="card p-12 text-center text-gray-500">No submissions found.</div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`badge ${typeColors[sub.type]}`}>
                    {typeLabels[sub.type]}
                  </span>
                  <span className="font-semibold text-gray-900">{sub.name}</span>
                  {!sub.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" title="Unread" />
                  )}
                </div>
                <span className="text-gray-500 text-xs flex-shrink-0">
                  {formatDateTime(sub.createdAt)}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Email: </span>
                  <a
                    href={`mailto:${sub.email}`}
                    className="text-brand-700 hover:underline"
                  >
                    {sub.email}
                  </a>
                </div>
                {sub.phone && (
                  <div>
                    <span className="text-gray-500">Phone: </span>
                    <a href={`tel:${sub.phone}`} className="text-brand-700 hover:underline">
                      {sub.phone}
                    </a>
                  </div>
                )}
                {sub.company && (
                  <div>
                    <span className="text-gray-500">Company: </span>
                    <span className="text-gray-900">{sub.company}</span>
                  </div>
                )}
                {sub.service && (
                  <div>
                    <span className="text-gray-500">Service: </span>
                    <span className="text-gray-900">{sub.service}</span>
                  </div>
                )}
                {sub.subject && (
                  <div>
                    <span className="text-gray-500">Subject: </span>
                    <span className="text-gray-900">{sub.subject}</span>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
                {sub.message}
              </div>
              <div className="mt-3 flex gap-3">
                <a
                  href={`mailto:${sub.email}?subject=Re: ${sub.subject || typeLabels[sub.type]}`}
                  className="text-brand-700 text-xs font-medium hover:underline"
                >
                  Reply via Email
                </a>
                {sub.phone && (
                  <a
                    href={`tel:${sub.phone}`}
                    className="text-brand-700 text-xs font-medium hover:underline"
                  >
                    Call
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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
