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

export const MEDICATION_COLUMNS = [
  {
    name: "Med.Name /Strengt",
    selector: (row: any) => row.name,
    sortable: true,
    cell: (row: any) => (
      <span className="font-bold text-[#1A202C]">{row.name}</span>
    ),
  },
  { name: "Instructions", selector: (row: any) => row.instructions, grow: 2 },
  { name: "Status", selector: (row: any) => row.status, sortable: true },
  {
    name: "Last Updated",
    selector: (row: any) => row.lastUpdated,
    sortable: true,
  },
];

export const MEDICATION_DUMMY_DATA = [
  {
    id: 1,
    name: "Zoloft 20 MG Tablet",
    instructions:
      "Swallow tablets or capsules with a full glass of water daily in the morning.",
    status: "Currently Taking",
    lastUpdated: "01/22/2024",
  },
  {
    id: 2,
    name: "Metformin 500 MG",
    instructions:
      "Take one tablet twice daily with meals to reduce stomach upset.",
    status: "Currently Taking",
    lastUpdated: "12/15/2023",
  },
  {
    id: 3,
    name: "Lisinopril 10 MG",
    instructions: "Take one tablet by mouth once daily for blood pressure.",
    status: "Currently Taking",
    lastUpdated: "01/10/2024",
  },
  {
    id: 4,
    name: "Atorvastatin 20 MG",
    instructions: "Take one tablet daily in the evening.",
    status: "Discontinued",
    lastUpdated: "11/20/2023",
  },
  {
    id: 5,
    name: "Amoxicillin 500 MG",
    instructions: "Take one capsule every 8 hours for 7 days until finished.",
    status: "Completed",
    lastUpdated: "10/05/2023",
  },
  {
    id: 6,
    name: "Levothyroxine 50 MCG",
    instructions:
      "Take one tablet on an empty stomach 30-60 minutes before breakfast.",
    status: "Currently Taking",
    lastUpdated: "01/18/2024",
  },
  {
    id: 7,
    name: "Amlodipine 5 MG",
    instructions: "Take one tablet daily for hypertension.",
    status: "Currently Taking",
    lastUpdated: "02/01/2024",
  },
  {
    id: 8,
    name: "Gabapentin 300 MG",
    instructions:
      "Take one capsule three times a day as needed for nerve pain.",
    status: "Currently Taking",
    lastUpdated: "01/25/2024",
  },
  {
    id: 9,
    name: "Omeprazole 20 MG",
    instructions: "Take one capsule daily before a meal for acid reflux.",
    status: "On Hold",
    lastUpdated: "12/28/2023",
  },
  {
    id: 10,
    name: "Albuterol HFA Inhaler",
    instructions:
      "Inhale 2 puffs every 4 to 6 hours as needed for shortness of breath.",
    status: "Currently Taking",
    lastUpdated: "01/30/2024",
  },
  {
    id: 11,
    name: "Losartan 50 MG",
    instructions: "Take one tablet daily for heart health.",
    status: "Currently Taking",
    lastUpdated: "11/12/2023",
  },
  {
    id: 12,
    name: "Sertraline 50 MG",
    instructions: "Take one tablet daily at the same time each day.",
    status: "Currently Taking",
    lastUpdated: "01/05/2024",
  },
  {
    id: 13,
    name: "Ibuprofen 400 MG",
    instructions:
      "Take one tablet every 4 to 6 hours as needed for pain or fever.",
    status: "Currently Taking",
    lastUpdated: "02/05/2024",
  },
  {
    id: 14,
    name: "Vitamin D3 2000 IU",
    instructions: "Take one softgel daily with a meal containing fat.",
    status: "Currently Taking",
    lastUpdated: "01/15/2024",
  },
  {
    id: 15,
    name: "Warfarin 2 MG",
    instructions:
      "Take as directed by your physician; regular blood tests required.",
    status: "Currently Taking",
    lastUpdated: "01/20/2024",
  },
];
