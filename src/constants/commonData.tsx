import type { TableColumn } from "react-data-table-component";
import { HiOutlineFlag, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import fileTextIcon from "../assets/icons/fileText.svg";
import userDoctorIcon from "../assets/icons/userDoctor.svg";
import userDoctorFillIcon from "../assets/icons/userDoctorFill.svg";

export interface PatientRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  updatedAt: string;
  status: string;
  state?: string; // For Care Queue table
}

export interface ActivityLog {
  date: string;
  time: string;
  action: string;
}

// Table 1 Columns: Care Queue
export const CARE_QUEUE_COLUMNS: TableColumn<PatientRecord>[] = [
  { name: "Full Name", selector: (row) => row.name, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Phone", selector: (row) => row.phone, sortable: true },
  { name: "Updated At", selector: (row) => row.updatedAt, sortable: true },
  {
    name: "State",
    selector: (row) => row.state || row.status,
    sortable: true,
  },
  {
    name: "Action",
    cell: (_row, rowIndex) => {
      const showAccept = rowIndex < 2; // First two rows show Accept
      const showReview = rowIndex >= 2; // Last two rows show Review

      return (
        <div className="flex gap-3">
          <button className="px-4 py-1.5 font-medium text-sm">Cancel</button>
          {showAccept && (
            <button className="bg-[#705295] text-white px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#5a3f7a] transition-colors">
              Accept
            </button>
          )}
          {showReview && (
            <button className="text-[#705295] bg-[#EBE5F1] border border-[#705295] px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#EBE5F1] transition-colors">
              Review
            </button>
          )}
        </div>
      );
    },
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
      <img
        src={fileTextIcon}
        alt="Document"
        className="cursor-pointer w-6 h-6"
      />
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
    state: "AL",
  },
  {
    id: 2,
    name: "Jospan Franklin",
    email: "jospan@gmail.com",
    phone: "123 123 1234",
    updatedAt: "01/22/2024",
    status: "Pending Review",
    state: "AL",
  },
  {
    id: 3,
    name: "Jospan Franklin",
    email: "jospan@gmail.com",
    phone: "123 123 1234",
    updatedAt: "01/22/2024",
    status: "Pending Review",
    state: "AL",
  },
  {
    id: 4,
    name: "Jospan Franklin",
    email: "jospan@gmail.com",
    phone: "123 123 1234",
    updatedAt: "01/22/2024",
    status: "Pending Review",
    state: "AL",
  },
];

// All Visits Data - Expanded dataset with varied statuses
export const ALL_VISITS_DATA: PatientRecord[] = (() => {
  const statuses = [
    "Completed",
    "AL",
    "AL",
    "Completed",
    "Completed",
    "Prescription Sent",
    "Completed",
    "Resend Prescription",
    "Canceled",
    "Completed",
  ];

  return Array(90)
    .fill(null)
    .map((_, index) => {
      const baseData = DUMMY_DATA[index % DUMMY_DATA.length];
      const statusIndex = index % statuses.length;
      const statusValue = statuses[statusIndex];

      return {
        ...baseData,
        id: index + 1,
        status: statusValue === "AL" ? "Pending Review" : statusValue,
        state: statusValue === "AL" ? "AL" : undefined,
      };
    });
})();

export const ADMIN_DASHBOARD_DATA = [
  {
    id: 1,
    name: "Jospan Franklin",
    email: "jospan@gmail.com",
    phone: "(987) 876 8768",
    provider: "----",
    status: "Waiting provider",
    updatedAt: "02/10/2026",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "s.jenkins@outlook.com",
    phone: "(415) 555 0123",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
    updatedAt: "02/12/2026",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "mchen88@gmail.com",
    phone: "(212) 555 9876",
    provider: "Dr. Marcus Thorne",
    status: "Scheduled",
    updatedAt: "02/14/2026",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "elena.r@healthmail.com",
    phone: "(305) 555 4433",
    provider: "----",
    status: "Waiting provider",
    updatedAt: "02/15/2026",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "dwilson@techcorp.com",
    phone: "(617) 555 2211",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
    updatedAt: "02/15/2026",
  },
  {
    id: 6,
    name: "Amanda Brooks",
    email: "abrooks@gmail.com",
    phone: "(512) 555 8899",
    provider: "Dr. Sarah Miller",
    status: "Completed",
    updatedAt: "02/16/2026",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "rtaylor@provider.net",
    phone: "(702) 555 7766",
    provider: "----",
    status: "Waiting provider",
    updatedAt: "02/17/2026",
  },
  {
    id: 8,
    name: "Lisa Thompson",
    email: "lisa.t@icloud.com",
    phone: "(206) 555 3344",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
    updatedAt: "02/18/2026",
  },
  {
    id: 9,
    name: "Kevin Adams",
    email: "kadams@gmail.com",
    phone: "(404) 555 5500",
    provider: "Dr. James Lee",
    status: "In Progress",
    updatedAt: "02/18/2026",
  },
  {
    id: 10,
    name: "Sophie Garcia",
    email: "s.garcia@gmail.com",
    phone: "(619) 555 1122",
    provider: "----",
    status: "Waiting provider",
    updatedAt: "02/19/2026",
  },
  {
    id: 11,
    name: "James Anderson",
    email: "j.anderson@yahoo.com",
    phone: "(312) 555 4455",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
    updatedAt: "02/19/2026",
  },
  {
    id: 12,
    name: "Rachel Moore",
    email: "rachel.m@webmail.com",
    phone: "(215) 555 6677",
    provider: "Dr. Robert Fox",
    status: "Completed",
    updatedAt: "02/20/2026",
  },
  {
    id: 13,
    name: "Brian White",
    email: "brian.white@gmail.com",
    phone: "(602) 555 8800",
    provider: "----",
    status: "Waiting provider",
    updatedAt: "02/20/2026",
  },
  {
    id: 14,
    name: "Michelle King",
    email: "m.king@outlook.com",
    phone: "(503) 555 9911",
    provider: "Dr. Alina Star",
    status: "Waiting Response",
    updatedAt: "02/20/2026",
  },
  {
    id: 15,
    name: "Jason Scott",
    email: "jason.scott@gmail.com",
    phone: "(415) 555 0099",
    provider: "Dr. Emily Blunt",
    status: "Scheduled",
    updatedAt: "02/20/2026",
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

export const GET_PATIENT_COLUMNS = (_navigate: (path: string) => void) => [
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
    cell: () => (
      <img
        src={fileTextIcon}
        alt="Document"
        className="cursor-pointer w-6 h-6"
      />
    ),
  },
];

// All Patients Columns - Updated structure
export const ALL_PATIENTS_COLUMNS: TableColumn<any>[] = [
  {
    name: "Full Name",
    selector: (row) => `${row.firstName} ${row.lastName}`,
    sortable: true,
  },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Phone", selector: (row) => row.phone, sortable: true },
  { name: "DOB", selector: (row) => row.dob, sortable: true },
  {
    name: "Release Patient",
    cell: (row) => {
      const text = row.releasePatient || "------";
      const displayText =
        text.length > 25 ? `${text.substring(0, 25)}...` : text;
      return <span className="text-gray-600">{displayText}</span>;
    },
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => {
      const statusColors: any = {
        Active: "text-[#3B82F6]",
        Inactive: "text-[#EF4444]",
      };
      return (
        <span
          className={`${statusColors[row.status] || "text-gray-600"} font-medium`}
        >
          {row.status}
        </span>
      );
    },
    sortable: true,
  },
  {
    name: "Action",
    cell: () => (
      <img
        src={fileTextIcon}
        alt="Document"
        className="cursor-pointer w-6 h-6"
      />
    ),
  },
];

// Flagged Patients Columns - Similar to All Patients but with Flagged status
export const FLAGGED_PATIENTS_COLUMNS: TableColumn<any>[] = [
  {
    name: "Full Name",
    selector: (row) => `${row.firstName} ${row.lastName}`,
    sortable: true,
  },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Phone", selector: (row) => row.phone, sortable: true },
  { name: "DOB", selector: (row) => row.dob, sortable: true },
  {
    name: "Release Patient",
    cell: (row) => {
      const text = row.releasePatient || "------";
      const displayText =
        text.length > 25 ? `${text.substring(0, 25)}...` : text;
      return <span className="text-gray-600">{displayText}</span>;
    },
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => {
      return <span className="text-[#F97316] font-medium">{row.status}</span>;
    },
    sortable: true,
  },
  {
    name: "Action",
    cell: () => (
      <img
        src={fileTextIcon}
        alt="Document"
        className="cursor-pointer w-6 h-6"
      />
    ),
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

// All Patients Data - Expanded dataset with Release Patient and Status fields
export const ALL_PATIENTS_DATA: any[] = (() => {
  const releasePatientOptions = [
    "Treatment completed.",
    "------",
    "------",
    "Treatment completed.",
    "------",
    "Patient requested discharge...",
    "------",
    "Treatment completed.",
    "------",
    "------",
  ];

  const statuses = [
    "Active",
    "Inactive",
    "Active",
    "Active",
    "Inactive",
    "Active",
    "Active",
    "Inactive",
    "Active",
    "Active",
  ];

  return Array(995)
    .fill(null)
    .map((_, index) => {
      const baseData = PATIENT_LIST_DATA[index % PATIENT_LIST_DATA.length];
      const releaseIndex = index % releasePatientOptions.length;
      const statusIndex = index % statuses.length;

      return {
        ...baseData,
        id: index + 1,
        releasePatient: releasePatientOptions[releaseIndex],
        status: statuses[statusIndex],
      };
    });
})();

// Flagged Patients Data - Expanded dataset with all patients having "Flagged" status
export const FLAGGED_PATIENTS_DATA: any[] = (() => {
  const releasePatientOptions = [
    "Treatment completed.",
    "------",
    "------",
    "Treatment completed.",
    "------",
    "Patient requested discharge...",
    "------",
    "Treatment completed.",
    "------",
    "------",
  ];

  return Array(90)
    .fill(null)
    .map((_, index) => {
      const baseData = PATIENT_LIST_DATA[index % PATIENT_LIST_DATA.length];
      const releaseIndex = index % releasePatientOptions.length;

      return {
        ...baseData,
        id: index + 1,
        releasePatient: releasePatientOptions[releaseIndex],
        status: "Flagged",
      };
    });
})();

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
export const FORM_LAYOUT_CLASS = "max-w-full lg:max-w-[650px] space-y-6";
export const BUTTON_GROUP_CLASS =
  "flex justify-end gap-4 mt-12 pt-4 border-t border-gray-50";

export const ADMIN_QUEUE_COLUMNS = [
  {
    name: "Full Name",
    selector: (row: any) => row.name,
    sortable: true,
    cell: (row: any) => (
      <span className="font-medium text-[#271100]">{row.name}</span>
    ),
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row: any) => row.phone,
  },
  {
    name: "Provider",
    selector: (row: any) => row.provider || "----",
    sortable: true,
    cell: (row: any) => (
      <span className="text-[#A3948C]">{row.provider || "----"}</span>
    ),
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
    cell: (row: any) => {
      // Logic for status colors from image_b88118.png
      const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
          case "waiting provider":
            return "text-[#F76D00]";
          case "waiting response":
            return "text-[#FFC107]";
          default:
            return "text-[#705295]";
        }
      };
      return (
        <span className={`font-semibold ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      );
    },
  },
  {
    name: "Action",
    button: true,
    cell: (_row: any) => (
      <div className="flex items-center gap-3">
        <button className="hover:opacity-80 transition-opacity">
          <img
            src={userDoctorIcon}
            alt="Doctor"
            className="w-6 h-6 object-contain"
          />
        </button>
        <button className="hover:opacity-80 transition-opacity">
          <img
            src={fileTextIcon}
            alt="Document"
            className="w-6 h-6 object-contain"
          />
        </button>
      </div>
    ),
  },
];
export const ADMIN_CONSULTATION_COLUMNS = [
  {
    name: "Full Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row: any) => row.phone,
  },
  {
    name: "Provider",
    selector: (row: any) => row.provider,
    sortable: true,
    cell: (row: any) => (
      <span className="text-[#A3948C]">{row.provider || "----"}</span>
    ),
  },
  {
    name: "Status",
    selector: (row: any) => row.status,
    sortable: true,
    cell: (row: any) => {
      const getStatusStyle = (status: string) => {
        switch (status) {
          case "Waiting provider":
            return "text-[#F76D00]";
          case "Provider Respond":
            return "text-[#00A3FF]";
          case "Completed":
            return "text-[#34C759]";
          case "Resend Prescription":
            return "text-[#A3948C]";
          case "Prescription Sent":
            return "text-[#D149D1]";
          case "Prescription Failed":
            return "text-[#FF3B30]";
          default:
            return "text-gray-500";
        }
      };
      return (
        <span className={`font-semibold ${getStatusStyle(row.status)}`}>
          {row.status}
        </span>
      );
    },
  },
  {
    name: "Action",
    button: true,
    cell: (row: any) => {
      const hasProvider = row.provider && row.provider !== "----";
      return (
        <div className="flex items-center gap-3">
          <button
            className={`${
              hasProvider
                ? "hover:opacity-80"
                : "cursor-not-allowed opacity-100"
            } transition-opacity`}
            disabled={!hasProvider}
          >
            <img
              src={hasProvider ? userDoctorFillIcon : userDoctorIcon}
              alt="Doctor"
              className="w-6 h-6 object-contain"
            />
          </button>
          <button className="hover:opacity-80 transition-opacity">
            <img
              src={fileTextIcon}
              alt="Document"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      );
    },
  },
];
import ActionMenu from "../components/ui/table/ActionMenu";

export const ADMIN_PATIENT_COLUMNS = (
  onEdit: (id: any) => void,
  onFlag: (id: any) => void,
  onStatusChange?: (id: any, newStatus: string) => void,
) => [
  {
    name: "First Name",
    selector: (row: any) => row.name.split(" ")[0],
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row: any) => row.name.split(" ")[1],
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row: any) => row.phone,
  },
  {
    name: "DOB",
    selector: (row: any) => row.updatedAt,
  },
  {
    name: "Status",
    cell: (row: any) => {
      // Use toggleStatus if available, otherwise default to Active
      const displayStatus = row.toggleStatus || "Active";
      const colors: any = {
        Active: "text-[#34C759]",
        Inactive: "text-[#FF3B30]",
        Flagged: "text-[#FFCC00]",
      };
      return (
        <span
          className={`font-semibold ${colors[displayStatus] || "text-[#34C759]"}`}
        >
          {displayStatus}
        </span>
      );
    },
  },
  {
    name: "Action",
    cell: (row: any) => {
      // Map current status to toggle state
      // For All Patients page, we use a separate toggleStatus or map from current status
      // Default: all current statuses show as "Active" (toggle on)
      const toggleStatus =
        row.toggleStatus ||
        (row.status &&
        [
          "Waiting provider",
          "Waiting Response",
          "Scheduled",
          "Completed",
          "In Progress",
        ].includes(row.status)
          ? "Active"
          : row.status === "Inactive"
            ? "Inactive"
            : row.status === "Flagged"
              ? "Flagged"
              : "Active");

      const getToggleColor = () => {
        switch (toggleStatus) {
          case "Active":
            return "bg-[#34C759]";
          case "Inactive":
            return "bg-[#FF3B30]";
          case "Flagged":
            return "bg-[#FFCC00]";
          default:
            return "bg-[#34C759]";
        }
      };

      const getTogglePosition = () => {
        switch (toggleStatus) {
          case "Active":
            return "translate-x-[16px]"; // Right position: from left-0.5 (2px) to 18px total = 16px translation
          case "Inactive":
            return "translate-x-0"; // Left position: stays at left-0.5 (2px)
          case "Flagged":
            return "translate-x-[8px]"; // Middle position: from 2px to ~10px = 8px translation
          default:
            return "translate-x-[16px]";
        }
      };

      const handleToggleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onStatusChange) {
          // Cycle through toggle states: Active -> Inactive -> Flagged -> Active
          const statusCycle = ["Active", "Inactive", "Flagged"];
          const currentIndex = statusCycle.indexOf(toggleStatus);
          const nextIndex = (currentIndex + 1) % statusCycle.length;
          onStatusChange(row.id, statusCycle[nextIndex]);
        }
      };

      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Functional Toggle */}
            <button
              onClick={handleToggleClick}
              className={`w-8 h-4 ${getToggleColor()} rounded-full relative cursor-pointer transition-colors focus:outline-none`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${getTogglePosition()}`}
              />
            </button>
            {/* Separator */}
            <span className="text-[#A3948C] mx-1">/</span>
            {/* Document Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle document click
              }}
            >
              <img
                src={fileTextIcon}
                alt="Document"
                className="w-6 h-6 cursor-pointer object-contain"
              />
            </button>
            {/* Separator */}
            <span className="text-[#A3948C] mx-1">/</span>
          </div>
          <ActionMenu
            items={[
              {
                label: "Edit",
                icon: <HiOutlinePencil size={18} />,
                onClick: () => onEdit(row.id),
              },
              {
                label: "Flag",
                icon: <HiOutlineFlag size={18} />,
                onClick: () => onFlag(row.id),
              },
            ]}
          />
        </div>
      );
    },
  },
];
import { LuPencil, LuPause, LuClipboardList } from "react-icons/lu";

export const ADMIN_PROVIDER_COLUMNS = (
  handleEdit: (id: any) => void,
  handleViewProfile: (id: any) => void,
  onStatusChange?: (id: any, newStatus: string) => void,
) => [
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
    cell: (row: any) => (
      <span
        className="cursor-pointer hover:text-[#705295] font-medium"
        onClick={() => handleViewProfile(row.id)}
      >
        {row.name}
      </span>
    ),
  },
  { name: "Email", selector: (row: any) => row.email, sortable: true },
  { name: "Phone", selector: (row: any) => row.phone },
  {
    name: "Education",
    selector: (row: any) => row.education || "MBBS, BDS", // Matches design
  },
  {
    name: "Patient Attended",
    selector: (row: any) => row.attended || "256", // Matches design
  },
  {
    name: "Status",
    cell: (row: any) => {
      // Use toggleStatus if available, otherwise default to Active
      const displayStatus = row.toggleStatus || "Active";
      const colors: any = {
        Active: "text-[#34C759]",
        Inactive: "text-[#FF3B30]",
        Flagged: "text-[#FFCC00]",
      };
      return (
        <span
          className={`font-semibold ${colors[displayStatus] || "text-[#34C759]"}`}
        >
          {displayStatus}
        </span>
      );
    },
  },
  {
    name: "Action",
    cell: (row: any) => {
      // Map current status to toggle state
      const toggleStatus = row.toggleStatus || "Active";

      const getToggleColor = () => {
        switch (toggleStatus) {
          case "Active":
            return "bg-[#34C759]";
          case "Inactive":
            return "bg-[#FF3B30]";
          case "Flagged":
            return "bg-[#FFCC00]";
          default:
            return "bg-[#34C759]";
        }
      };

      const getTogglePosition = () => {
        switch (toggleStatus) {
          case "Active":
            return "translate-x-[16px]"; // Right position
          case "Inactive":
            return "translate-x-0"; // Left position
          case "Flagged":
            return "translate-x-[8px]"; // Middle position
          default:
            return "translate-x-[16px]";
        }
      };

      const handleToggleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onStatusChange) {
          // Cycle through toggle states: Active -> Inactive -> Flagged -> Active
          const statusCycle = ["Active", "Inactive", "Flagged"];
          const currentIndex = statusCycle.indexOf(toggleStatus);
          const nextIndex = (currentIndex + 1) % statusCycle.length;
          onStatusChange(row.id, statusCycle[nextIndex]);
        }
      };

      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Functional Toggle */}
            <button
              onClick={handleToggleClick}
              className={`w-8 h-4 ${getToggleColor()} rounded-full relative cursor-pointer transition-colors focus:outline-none`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${getTogglePosition()}`}
              />
            </button>
            {/* Separator */}
            <span className="text-[#A3948C] mx-1">/</span>
            {/* Document Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewProfile(row.id);
              }}
            >
              <img
                src={fileTextIcon}
                alt="Document"
                className="w-6 h-6 cursor-pointer object-contain"
              />
            </button>
            {/* Separator */}
            <span className="text-[#A3948C] mx-1">/</span>
          </div>
          {/* Reusable ActionMenu with Provider actions */}
          <ActionMenu
            items={[
              {
                label: "Edit Details",
                icon: <LuPencil size={16} />,
                onClick: () => handleEdit(row.id),
              },
              {
                label: "Paused",
                icon: <LuPause size={16} />,
                onClick: () => console.log("Paused", row.id),
              },
              {
                label: "Visits",
                icon: <LuClipboardList size={16} />,
                onClick: () => handleViewProfile(row.id),
              },
            ]}
          />
        </div>
      );
    },
  },
];

export const PROVIDER_REQUESTS_COLUMNS = (
  handleViewRequest: (id: any) => void,
) => [
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  { name: "Email", selector: (row: any) => row.email, sortable: true },
  { name: "Phone", selector: (row: any) => row.phone },
  { name: "Education", selector: (row: any) => row.education || "MBBS, BDS" },
  { name: "Patient Attended", selector: (row: any) => row.attended || "256" },
  {
    name: "Status",
    cell: (row: any) => {
      // Logic for request-specific status colors
      const colors: any = {
        Pending: "text-[#F76D00]", // Orange for pending
        Decline: "text-[#FF3B30]", // Red for decline
      };
      return (
        <span
          className={`font-semibold ${colors[row.status] || "text-[#F76D00]"}`}
        >
          {row.status || "Pending"}
        </span>
      );
    },
  },
  {
    name: "Action",
    cell: (row: any) => (
      <div className="flex items-center justify-center">
        {/* Document Icon for viewing request details */}
        <img
          src={fileTextIcon}
          alt="Document"
          className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleViewRequest(row.id)}
        />
      </div>
    ),
  },
];
export const DUMMY_PRESCRIPTIONS = [
  {
    id: 1,
    dateTime: "24/01/2023 at 6:00 PM EST",
    patientName: "Jhon Smith",
    providerName: "Dr. Jhon Smith",
    pharmacyName: "ABC Pharmacy",
    status: "Prescription Sent",
  },
  {
    id: 2,
    dateTime: "24/01/2023 at 6:15 PM EST",
    patientName: "Sarah Jenkins",
    providerName: "Dr. Alina Star",
    pharmacyName: "HealthPlus Pharmacy",
    status: "Resend Prescription",
  },
  {
    id: 3,
    dateTime: "24/01/2023 at 6:30 PM EST",
    patientName: "Michael Ross",
    providerName: "Dr. Jhon Smith",
    pharmacyName: "ABC Pharmacy",
    status: "Prescription Failed",
  },
  {
    id: 4,
    dateTime: "25/01/2023 at 10:00 AM EST",
    patientName: "Emily Davis",
    providerName: "Dr. Alina Star",
    pharmacyName: "CVS Pharmacy",
    status: "Prescription Sent",
  },
  {
    id: 5,
    dateTime: "25/01/2023 at 11:20 AM EST",
    patientName: "David Wilson",
    providerName: "Dr. Robert Fox",
    pharmacyName: "Walgreens",
    status: "Prescription Sent",
  },
  {
    id: 6,
    dateTime: "25/01/2023 at 1:45 PM EST",
    patientName: "Jessica Brown",
    providerName: "Dr. Alina Star",
    pharmacyName: "ABC Pharmacy",
    status: "Prescription Failed",
  },
  {
    id: 7,
    dateTime: "26/01/2023 at 9:15 AM EST",
    patientName: "Kevin Parker",
    providerName: "Dr. Jhon Smith",
    pharmacyName: "HealthPlus Pharmacy",
    status: "Prescription Sent",
  },
  {
    id: 8,
    dateTime: "26/01/2023 at 12:00 PM EST",
    patientName: "Linda White",
    providerName: "Dr. Robert Fox",
    pharmacyName: "CVS Pharmacy",
    status: "Resend Prescription",
  },
  {
    id: 9,
    dateTime: "26/01/2023 at 3:30 PM EST",
    patientName: "Thomas Miller",
    providerName: "Dr. Alina Star",
    pharmacyName: "Walgreens",
    status: "Prescription Sent",
  },
  {
    id: 10,
    dateTime: "27/01/2023 at 10:45 AM EST",
    patientName: "Sophia Taylor",
    providerName: "Dr. Jhon Smith",
    pharmacyName: "ABC Pharmacy",
    status: "Prescription Sent",
  },
];
export const ALL_PRESCRIPTIONS_COLUMNS = (
  handleViewDetails: (id: any) => void,
) => [
  {
    name: "Date & Time",
    selector: (row: any) => row.dateTime,
    sortable: true,
  },
  { name: "Patient", selector: (row: any) => row.patientName, sortable: true },
  {
    name: "Provider",
    selector: (row: any) => row.providerName,
    sortable: true,
  },
  { name: "Pharmacy", selector: (row: any) => row.pharmacyName },
  {
    name: "Prescription Status",
    cell: (row: any) => {
      const colors: any = {
        "Prescription Sent": "text-[#34C759]",
        "Resend Prescription": "text-[#A3948C]",
        "Prescription Failed": "text-[#F76D00]",
      };
      return (
        <span
          className={`font-semibold ${colors[row.status] || "text-[#34C759]"}`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    name: "Actions",
    cell: (row: any) => (
      <div className="flex items-center justify-center">
        <img
          src={fileTextIcon}
          alt="Document"
          className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleViewDetails(row.id)}
        />
      </div>
    ),
  },
];
export const REFUND_REQUESTS_COLUMNS = (
  handleApprove: (id: any) => void,
  handleDecline: (id: any) => void,
) => [
  {
    name: "Patient",
    selector: (row: any) => row.patientName,
    sortable: true,
  },
  {
    name: "Date & Time",
    selector: (row: any) => row.dateTime,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => {
      const colors: any = {
        Pending: "text-[#F76D00]",
        Decline: "text-[#FF3B30]",
      };
      return (
        <span
          className={`font-semibold ${colors[row.status] || "text-[#F76D00]"}`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    name: "Actions",
    cell: (row: any) => (
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleDecline(row.id)}
          className="text-[#FF3B30] text-[14px] font-bold hover:underline"
        >
          Decline
        </button>
        <button
          onClick={() => handleApprove(row.id)}
          className="bg-[#EBE5F1] text-[#705295] px-4 py-1.5 rounded-lg font-bold text-[14px] hover:bg-[#d8cce4] transition-colors"
        >
          Approve
        </button>
      </div>
    ),
  },
];

export const DUMMY_REFUND_DATA = Array(10)
  .fill({
    patientName: "Jhon Smith",
    dateTime: "24/01/2023 at 6:00 PM EST",
    status: "Pending",
  })
  .map((item, index) => ({
    ...item,
    id: index + 1,
    status: index === 5 ? "Decline" : "Pending", // Match design where 6th item is Decline
  }));
export const COMPLIANCE_AUDIT_COLUMNS = [
  {
    name: "Date & Time",
    selector: (row: any) => row.dateTime,
    sortable: true,
    width: "300px",
  },
  {
    name: "Action Performed",
    selector: (row: any) => row.action,
    sortable: true,
  },
];

export const DUMMY_AUDIT_LOGS = [
  {
    id: 1,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Logging in to the platform",
  },
  {
    id: 2,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Send prescription",
  },
  {
    id: 3,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Send prescription",
  },
  {
    id: 4,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Send prescription",
  },
  {
    id: 5,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Send prescription",
  },
  {
    id: 6,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Send prescription",
  },
  {
    id: 7,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Send prescription",
  },
  {
    id: 8,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Send prescription",
  },
  {
    id: 9,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Add New Provider",
  },
  {
    id: 10,
    dateTime: "Jan 22, 2026 at 6:00 pm EST",
    action: "Update Patient Record",
  },
];

// Activity Logs Data for Provider
export const ACTIVITY_LOGS_DATA: ActivityLog[] = [
  {
    date: "Jan 22, 2026",
    time: "6:00 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "2:20 pm EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "1:10 pm EST", action: "Add New Provider" },
  {
    date: "Jan 21, 2026",
    time: "12:00 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 20, 2026",
    time: "11:30 am EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Send prescription" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Accept Visit" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Send prescription" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Send prescription" },
  { date: "Jan 18, 2026", time: "2:20 pm EST", action: "Send prescription" },
  { date: "Jan 22, 2026", time: "1:10 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Send prescription" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Send prescription" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Send prescription" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Review Visit" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Log in" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
  {
    date: "Jan 22, 2026",
    time: "1:10 pm EST",
    action: "Logging in to the platform",
  },
  { date: "Jan 21, 2026", time: "12:00 pm EST", action: "Send prescription" },
  { date: "Jan 20, 2026", time: "11:30 am EST", action: "Accept Visit" },
  { date: "Jan 19, 2026", time: "10:15 am EST", action: "Review Visit" },
  { date: "Jan 18, 2026", time: "9:00 am EST", action: "Log in" },
  { date: "Jan 22, 2026", time: "6:00 pm EST", action: "Send prescription" },
  { date: "Jan 21, 2026", time: "5:30 pm EST", action: "Accept Visit" },
  { date: "Jan 20, 2026", time: "4:15 pm EST", action: "Review Visit" },
  { date: "Jan 19, 2026", time: "3:45 pm EST", action: "Add New Provider" },
  {
    date: "Jan 18, 2026",
    time: "2:20 pm EST",
    action: "Update Patient Recode",
  },
];
