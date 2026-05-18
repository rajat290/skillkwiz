import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAssessmentRequest extends Document {
  employerId: string;
  employerName: string;
  employerEmail: string;
  companyName?: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateIdType?: string;
  skills: string[];
  amount: number;
  currency: string;
  paymentStatus: "pending" | "paid" | "failed";
  scheduleStatus: "not_scheduled" | "scheduled";
  assessmentDate?: string;
  assessmentTime?: string;
  testingCenter?: string;
  reportUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentRequestSchema = new Schema<IAssessmentRequest>(
  {
    employerId: { type: String, required: true, index: true },
    employerName: { type: String, required: true },
    employerEmail: { type: String, required: true, index: true },
    companyName: { type: String },
    candidateFirstName: { type: String, required: true },
    candidateLastName: { type: String, required: true },
    candidateEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
    candidatePhone: { type: String },
    candidateIdType: { type: String },
    skills: [{ type: String }],
    amount: { type: Number, default: 40 },
    currency: { type: String, default: "USD" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    scheduleStatus: {
      type: String,
      enum: ["not_scheduled", "scheduled"],
      default: "not_scheduled",
    },
    assessmentDate: { type: String },
    assessmentTime: { type: String },
    testingCenter: { type: String },
    reportUrl: { type: String, default: "/files/dummy-report.pdf" },
  },
  { timestamps: true }
);

const AssessmentRequest: Model<IAssessmentRequest> =
  mongoose.models.AssessmentRequest ||
  mongoose.model<IAssessmentRequest>(
    "AssessmentRequest",
    AssessmentRequestSchema
  );

export default AssessmentRequest;
