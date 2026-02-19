import type { TableColumn } from "react-data-table-component";
import { HiOutlineDocumentText } from "react-icons/hi";

export interface PatientRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  updatedAt: string;
  status: string;
}

// Table 1 Columns: Care Queue
export const CARE_QUEUE_COLUMNS: TableColumn<PatientRecord>[] = [
  { name: "Full Name", selector: (row) => row.name, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Phone", selector: (row) => row.phone },
  { name: "Updated At", selector: (row) => row.updatedAt },
  {
    name: "Status",
    cell: (row) => (
      <span className="text-[#FBBF24] font-medium">{row.status}</span>
    ),
  },
  {
    name: "Action",
    cell: () => (
      <div className="flex gap-3">
        <button className="text-[#F97316] font-semibold text-sm">Remove</button>
        <button className="bg-[#EBE5F1] text-[#705295] px-4 py-1 rounded-lg font-semibold text-sm">
          Accept
        </button>
      </div>
    ),
  },
];

// Table 2 Columns: Past Visits
export const PAST_VISITS_COLUMNS: TableColumn<PatientRecord>[] = [
  { name: "Full Name", selector: (row) => row.name, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Phone", selector: (row) => row.phone },
  { name: "Updated At", selector: (row) => row.updatedAt },
  {
    name: "Status",
    cell: (row) => {
      const colors: any = {
        "Prescription Sent": "text-[#3B82F6]",
        Completed: "text-[#22C55E]",
        "Resend Prescription": "text-[#92400E]",
      };
      return (
        <span
          className={`${colors[row.status] || "text-gray-600"} font-medium`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    name: "Action",
    cell: () => (
      <HiOutlineDocumentText className="text-[#705295] text-2xl cursor-pointer" />
    ),
  },
];

export const DUMMY_DATA: PatientRecord[] = [
  {
    id: 1,
    name: "Jospan Franklin",
    email: "jospan@gmail.com",
    phone: "123 123 1234",
    updatedAt: "01/22/2024",
    status: "Pending Review",
  },
  {
    id: 2,
    name: "Jospan Franklin",
    email: "jospan@gmail.com",
    phone: "123 123 1234",
    updatedAt: "01/22/2024",
    status: "Pending Review",
  },
];

export const CHART_DATA_LINE = [
  { pv: 10 },
  { pv: 20 },
  { pv: 15 },
  { pv: 25 },
  { pv: 18 },
  { pv: 30 },
  { pv: 22 },
];

export const CHART_DATA_BAR = [
  { pv: 40 },
  { pv: 60 },
  { pv: 45 },
  { pv: 70 },
  { pv: 50 },
  { pv: 85 },
  { pv: 60 },
];

// ... existing constants like CARE_QUEUE_COLUMNS, DUMMY_DATA, etc.

export const PATIENT_PROFILE_TABS = [
  "Patient Info",
  "Health History",
  "Medication History",
  "Allergies",
  "Attachment",
  "Visit Note",
];

export const DUMMY_PATIENT_DATA = {
  firstName: "Alexis",
  lastName: "Jhon",
  email: "alexisjhon@gmail.com",
  dob: "09/23/2003",
  phone: "(876) 876 9876",
  address: "72 Caisson Trace, Spanish Fort, AL, 732846, USA",
  age: 32,
  height: "5'7\"",
  weight: 90,
  bmi: 24.4,
  birthGender: "Female",
  currentGender: "Female",
  race: "Asian",
  ethnicity: "South Asian",
  pronouns: "She/Her",
  orientation: "Straight",
  profileImage: "https://i.imgur.com/8K9mS9E.png",
};
