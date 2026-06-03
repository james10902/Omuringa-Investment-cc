export type UserRole = "SUPER_ADMIN" | "CONTENT_ADMIN" | "APPLICATION_ADMIN" | "TRAINEE";

export type ApplicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "MORE_INFO_REQUIRED";

export type DocumentType =
  | "CV"
  | "CERTIFIED_ID"
  | "SCHOOL_CERTIFICATE"
  | "CERTIFICATE_OF_CONDUCT"
  | "SUPPORTIVE_DOCUMENT"
  | "OTHER";

export type FormType = "CONTACT" | "QUOTE_REQUEST" | "PARTNERSHIP" | "TRAINING_ENQUIRY";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TraineeApplication {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  status: ApplicationStatus;
  adminNotes?: string | null;
  submittedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: DocumentType;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  createdAt: Date;
}
