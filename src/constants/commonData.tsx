import type { TableColumn } from "react-data-table-component";
import {
  HiOutlineDocumentText,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";
import fileTextIcon from "../assets/icons/fileText.svg";
import userDoctorFillIcon from "../assets/icons/userDoctorFill.svg";

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
export const ALLERGIES_COLUMNS = [
  { name: "Reactant", selector: (row: any) => row.reactant, sortable: true },
  { name: "Symptoms", selector: (row: any) => row.symptoms },
  { name: "Severity", selector: (row: any) => row.severity, sortable: true },
  { name: "Reaction Type", selector: (row: any) => row.type },
  { name: "On Set Date", selector: (row: any) => row.date, sortable: true },
];

export const ALLERGIES_DUMMY_DATA = Array(5)
  .fill({
    reactant: "Ecallantide",
    symptoms: "Rash",
    severity: "High",
    type: "Allergy",
    date: "01/22/2024",
  })
  .map((item, index) => ({ ...item, id: index + 1 }));

export const ATTACHMENTS_DATA = [
  {
    date: "Dec 21, 2025",
    files: [
      {
        id: 1,
        name: "lab_results_v1.jpeg",
        url: "https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        id: 2,
        name: "prescription_scan.jpeg",
        url: "https://images.pexels.com/photos/3652103/pexels-photo-3652103.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        id: 3,
        name: "xray_report.jpeg",
        url: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
  {
    date: "Jan 21, 2026",
    files: [
      {
        id: 4,
        name: "blood_test_results.jpeg",
        url: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        id: 5,
        name: "clinical_notes.jpeg",
        url: "https://images.pexels.com/photos/5910956/pexels-photo-5910956.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
  },
];

export const PRESCRIPTION_COLUMNS = [
  {
    name: "Name/Strength/Form",
    selector: (row: any) => row.name,
    sortable: true,
  },
  { name: "Instructions", selector: (row: any) => row.instructions, grow: 2 },
  { name: "RXStatus", selector: (row: any) => row.status },
  { name: "Qty", selector: (row: any) => row.qty, width: "80px" },
  {
    name: "Actions",
    cell: () => (
      <div className="flex gap-4">
        <button className="text-gray-400 hover:text-blue-500">
          <HiOutlinePencil size={18} />
        </button>
        <button className="text-orange-500 hover:text-red-700">
          <HiOutlineTrash size={18} />
        </button>
      </div>
    ),
    width: "100px",
  },
];

export const PRESCRIPTION_DUMMY_DATA = [
  {
    id: 1,
    name: "Zoloft 50 MG Tablet",
    instructions: "Take 1 cap orally once a day",
    status: "Entered",
    qty: 30,
  },
  {
    id: 2,
    name: "Zoloft 50 MG Tablet",
    instructions: "Take 1 cap orally once a day",
    status: "Entered",
    qty: 90,
  },
  {
    id: 3,
    name: "Zoloft 50 MG Tablet",
    instructions: "Take 1 cap orally once a day",
    status: "Entered",
    qty: 60,
  },
  {
    id: 4,
    name: "Zoloft 50 MG Tablet",
    instructions: "Take 1 cap orally once a day",
    status: "Entered",
    qty: 60,
  },
];
export const PHARMACY_COLUMNS = [
  {
    name: "Pharmacy",
    selector: (row: any) => row.name,
    sortable: true,
    grow: 2,
  },
  { name: "City", selector: (row: any) => row.city },
  { name: "State", selector: (row: any) => row.state, width: "80px" },
  { name: "Street Address", selector: (row: any) => row.address, grow: 2 },
  { name: "Zip Code", selector: (row: any) => row.zip },
  { name: "Phone#", selector: (row: any) => row.phone },
  { name: "Fax #", selector: (row: any) => row.fax },
  {
    name: "Change",
    cell: () => (
      <button className="bg-[#705295] text-white px-4 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#5e447e]">
        Select
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const PHARMACY_DUMMY_DATA = [
  {
    id: 1,
    name: "QS/1 PA TEST PHARMACY",
    city: "MOORES",
    state: "SC",
    address: "110 SOUTH MAIN STREET",
    zip: "29303",
    phone: "(877) 290-1812",
    fax: "(877) 290-1812",
  },
  {
    id: 2,
    name: "Nob Hill Pharmacy #605",
    city: "West Sacramento",
    state: "CA",
    address: "501 West Capital Avenue",
    zip: "45685",
    phone: "(877) 290-1812",
    fax: "(877) 290-1812",
  },
  // Add more rows to match image_1e1520.png
];

export const GET_PATIENT_COLUMNS = (navigate: (path: string) => void) => [
  {
    name: "First Name",
    selector: (row: any) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row: any) => row.lastName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    grow: 1.5,
  },
  {
    name: "Phone",
    selector: (row: any) => row.phone,
  },
  {
    name: "DOB",
    selector: (row: any) => row.dob,
  },
  {
    name: "Action",
    cell: (row: any) => (
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Adding a query parameter to hide the Visit Note tab
          navigate(`/provider/dashboard/patient/${row.id}?hideVisitNote=true`);
        }}
        className="text-[#705295] hover:opacity-80 transition-opacity"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      </button>
    ),
    width: "80px",
    center: true,
  },
];

export const PATIENT_DUMMY_DATA = [
  {
    id: 1,
    firstName: "Jospan",
    lastName: "Franklin",
    email: "Jospan@gmail.com",
    phone: "123 123 1234",
    dob: "08/23/2002",
  },
  {
    id: 2,
    firstName: "Jospan",
    lastName: "Franklin",
    email: "Jospan@gmail.com",
    phone: "123 123 1234",
    dob: "08/23/2002",
  },
];
export const PATIENT_LIST_DATA = [
  {
    id: 1,
    firstName: "Jospan",
    lastName: "Franklin",
    email: "jospan@gmail.com",
    phone: "123 123 1234",
    dob: "08/23/2002",
  },
  {
    id: 2,
    firstName: "Alina",
    lastName: "Star",
    email: "alina@gmail.com",
    phone: "123 123 1234",
    dob: "11/24/1995",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    phone: "123 123 1234",
    dob: "01/12/1988",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah@gmail.com",
    phone: "123 123 1234",
    dob: "05/05/1990",
  },
  {
    id: 5,
    firstName: "Robert",
    lastName: "Brown",
    email: "robert@gmail.com",
    phone: "123 123 1234",
    dob: "12/10/1985",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@gmail.com",
    phone: "123 123 1234",
    dob: "03/22/1992",
  },
  {
    id: 7,
    firstName: "Michael",
    lastName: "Wilson",
    email: "michael@gmail.com",
    phone: "123 123 1234",
    dob: "07/14/1982",
  },
  {
    id: 8,
    firstName: "Jessica",
    lastName: "Taylor",
    email: "jessica@gmail.com",
    phone: "123 123 1234",
    dob: "09/30/1994",
  },
  {
    id: 9,
    firstName: "David",
    lastName: "Anderson",
    email: "david@gmail.com",
    phone: "123 123 1234",
    dob: "11/05/1979",
  },
  {
    id: 10,
    firstName: "Ashley",
    lastName: "Thomas",
    email: "ashley@gmail.com",
    phone: "123 123 1234",
    dob: "02/18/1991",
  },
  {
    id: 11,
    firstName: "James",
    lastName: "Jackson",
    email: "james@gmail.com",
    phone: "123 123 1234",
    dob: "06/25/1984",
  },
  {
    id: 12,
    firstName: "Linda",
    lastName: "White",
    email: "linda@gmail.com",
    phone: "123 123 1234",
    dob: "10/08/1987",
  },
  {
    id: 13,
    firstName: "Chris",
    lastName: "Harris",
    email: "chris@gmail.com",
    phone: "123 123 1234",
    dob: "04/12/1993",
  },
  {
    id: 14,
    firstName: "Karen",
    lastName: "Martin",
    email: "karen@gmail.com",
    phone: "123 123 1234",
    dob: "08/19/1981",
  },
  {
    id: 15,
    firstName: "Matthew",
    lastName: "Thompson",
    email: "matthew@gmail.com",
    phone: "123 123 1234",
    dob: "01/30/1996",
  },
];
export const NOTIFICATION_DATA = [
  {
    date: "14 Jun, 2023.",
    items: [
      {
        id: 1,
        text: "A new lab report has been uploaded for patient Jospan Franklin regarding the Sinus infection consultation.",
      },
      {
        id: 2,
        text: "Prescription for Flu (Influenza) has been successfully sent to the requested pharmacy for Dr. Alina's review.",
      },
      {
        id: 3,
        text: "New message received from John Doe: 'The medication seems to be working well, thank you doctor.'",
      },
      {
        id: 4,
        text: "Reminder: You have 3 pending consultation notes that need to be finalized by the end of today.",
      },
    ],
  },
  {
    date: "10 Jun, 2023.",
    items: [
      {
        id: 5,
        text: "Patient Jospan Franklin has requested a follow-up appointment for their persistent cough symptoms.",
      },
      {
        id: 6,
        text: "Urgent: Prescription Failed for Sarah Connor due to an insurance authorization issue at the pharmacy.",
      },
      {
        id: 7,
        text: "System Update: The patient portal will be undergoing maintenance tonight from 12:00 AM to 02:00 AM.",
      },
      {
        id: 8,
        text: "New attachment: A JPEG image 'myReport.jpeg' has been added to the health history of patient Robert Brown.",
      },
    ],
  },
];

// Admin Dashboard - Queue Requests
export interface QueueRequestRecord {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  provider: string;
  status: string;
}

export const PROVIDER_COLUMNS = [
  {
    name: "Provider Name",
    selector: (row: any) => row.name,
    sortable: true,
    grow: 2,
  },
  { name: "Specialty", selector: (row: any) => row.specialty },
  { name: "Email", selector: (row: any) => row.email, grow: 1.5 },
  { name: "Phone", selector: (row: any) => row.phone },
  {
    name: "Assign",
    cell: () => (
      <button className="bg-[#705295] text-white px-4 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#5e447e]">
        Select
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export interface ProviderData {
  id: number;
  name: string;
  specialty: string;
  email?: string;
  phone?: string;
}

export const PROVIDER_DUMMY_DATA: ProviderData[] = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Orthopedic surgeon",
  },
  {
    id: 2,
    name: "Dr. Devid Doe",
    specialty: "Orthopedic surgeon",
  },
  {
    id: 3,
    name: "Dr. Khuram Doe",
    specialty: "Orthopedic surgeon",
  },
  {
    id: 4,
    name: "Dr. Alina Satr",
    specialty: "Orthopedic surgeon",
  },
  {
    id: 5,
    name: "Dr. Alisba Anais",
    specialty: "Orthopedic surgeon",
  },
];

export const GET_QUEUE_REQUESTS_COLUMNS = (
  onProviderClick?: (row: QueueRequestRecord) => void,
): TableColumn<QueueRequestRecord>[] => [
  { name: "Full Name", selector: (row) => row.fullName, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Phone", selector: (row) => row.phone, sortable: true },
  { name: "Provider", selector: (row) => row.provider, sortable: true },
  {
    name: "Status",
    cell: (row) => {
      const statusColors: any = {
        "Waiting provider": "text-[#F97316]",
        "Waiting Response": "text-[#FBBF24]",
      };
      return (
        <span
          className={`${statusColors[row.status] || "text-gray-600"} font-medium`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    name: "Action",
    cell: (row: QueueRequestRecord) => (
      <div className="flex gap-3 items-center">
        <img
          src={userDoctorFillIcon}
          alt="User Doctor"
          className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            if (onProviderClick) {
              onProviderClick(row);
            }
          }}
        />
        <img
          src={fileTextIcon}
          alt="File Text"
          className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    ),
  },
];

export const QUEUE_REQUESTS_DATA: QueueRequestRecord[] = [
  {
    id: 1,
    fullName: "Jospan Franklin",
    email: "Jospan@gmail.com",
    phone: "(987) 876 8768",
    provider: "----",
    status: "Waiting provider",
  },
  {
    id: 2,
    fullName: "Jospan Franklin",
    email: "Jospan@gmail.com",
    phone: "(987) 876 8768",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
  },
  {
    id: 3,
    fullName: "Jospan Franklin",
    email: "Jospan@gmail.com",
    phone: "(987) 876 8768",
    provider: "----",
    status: "Waiting provider",
  },
  {
    id: 4,
    fullName: "Jospan Franklin",
    email: "Jospan@gmail.com",
    phone: "(987) 876 8768",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
  },
  {
    id: 5,
    fullName: "Jospan Franklin",
    email: "Jospan@gmail.com",
    phone: "(987) 876 8768",
    provider: "----",
    status: "Waiting provider",
  },
  {
    id: 6,
    fullName: "Jospan Franklin",
    email: "Jospan@gmail.com",
    phone: "(987) 876 8768",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
  },
];
