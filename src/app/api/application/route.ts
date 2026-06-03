import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendApplicationConfirmation } from "@/lib/email";
import { applicationSchema } from "@/lib/validations";

async function getUser(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) return null;
  const session = await getSessionByToken(token);
  return session?.user ?? null;
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const application = await prisma.traineeApplication.findUnique({
    where: { userId: user.id },
    include: { documents: true },
  });

  return NextResponse.json({ application });
}

export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { action, ...formData } = body;

  // Validate on submit
  if (action === "submit") {
    const parsed = applicationSchema.safeParse(formData);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }
  }

  const existing = await prisma.traineeApplication.findUnique({
    where: { userId: user.id },
  });

  // Block editing submitted applications (unless MORE_INFO_REQUIRED)
  if (
    existing &&
    !["DRAFT", "MORE_INFO_REQUIRED"].includes(existing.status)
  ) {
    return NextResponse.json(
      { error: "Application cannot be edited at this stage." },
      { status: 403 }
    );
  }

  const data = {
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
    gender: formData.gender || null,
    nationality: formData.nationality || null,
    idNumber: formData.idNumber || "",
    phone: formData.phone || "",
    email: formData.email || "",
    address: formData.address || null,
    city: formData.city || null,
    highestQualification: formData.highestQualification || null,
    schoolName: formData.schoolName || null,
    yearCompleted: formData.yearCompleted || null,
    motivation: formData.motivation || null,
    previousExperience: formData.previousExperience || null,
    preferredStartDate: formData.preferredStartDate
      ? new Date(formData.preferredStartDate)
      : null,
    status: action === "submit" ? ("SUBMITTED" as const) : ("DRAFT" as const),
    ...(action === "submit" && { submittedAt: new Date() }),
  };

  let application;
  if (existing) {
    application = await prisma.traineeApplication.update({
      where: { userId: user.id },
      data,
    });
  } else {
    application = await prisma.traineeApplication.create({
      data: { ...data, userId: user.id },
    });
  }

  if (action === "submit") {
    sendApplicationConfirmation(user.email, user.name).catch(console.error);
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Application Submitted",
        message:
          "Your training application has been submitted and is now under review.",
      },
    });
  }

  return NextResponse.json({ application });
}
