import {
  MdBalance,
  MdEngineering,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FaPeopleGroup, FaCar } from "react-icons/fa6";
import { FaGavel } from "react-icons/fa";
import { IoCashSharp } from "react-icons/io5";
import { RiShieldUserFill } from "react-icons/ri";

const practiceAreas = [
  {
    id: "1",
    title: "Corporate, Commercial & Financial Service",
    services: [
      "Drafting, reviewing, and negotiating commercial Agreements including construction and real estate contracts, license & maintenance agreements for software products, supply & installation agreements for hardware & other products, service level agreements, outsourcing, manufacturing agreements, consultancy agreements, and supply, franchise, agency & distribution agreements per relevant laws (both local and international), business custom & usage as well as the needs of the Client.",
      "Negotiation and drafting of term sheets, memorandum of understanding, and agreements for share transfers, business or business asset sales, business hires, acquisitions, takeovers, mergers, and similar deals",
      "Setting up and forming a business, representative offices, branch offices, partnerships, and corporate entities; drafting or reviewing memorandum of Associations (statutes of incorporations) and joint venture agreements",
      "Consult, process, and/or handle investment licenses, work permits, and residence permit applications",
      "Furnishing opinions on various commercial aspects",
      "Provide company secretarial service",
      "Conducting due diligence exercises",
      "Applications of business and related licenses and permits",
      "Structuring and negotiating commercial transactions",
    ],
    icon: <FaGavel />,
  },
  {
    id: "2",
    title: "Construction, engineering & Real estate",
    services: [
      "Providing tailor-made legal services for construction and real estate projects starting from land acquisition, design, contract, construction, and handover phases",
      "Ensuring compliance with regulations, directives, standards, code of conduct, and advising during professional regulation and disciplinary proceedings",
      "Drafting, reviewing, and negotiating architectural services, construction, and real estate agreements",
      "Advising during claims and dispute resolutions including adjudication",
      "Advising and consulting during licensing, permit, and approvals",
    ],
    icon: <MdEngineering />,
  },
  {
    id: "3",
    title: "General Litigation & alternative dispute resolution",
    subtitle: "Includes representing Clients which includes amongst others",
    services: [
      "Handle legal disputes and advise clients on alternative dispute resolution mechanisms to resolve active disputes",
      "Litigation-before all Federal Courts including Arbitration Tribunals and the Cassation Chamber of the Federal Supreme Court of Ethiopia",
      "Tax tribunals",
    ],
    icon: <FaPeopleGroup />,
  },
  {
    id: "4",
    title: "Property and Transfer of rights",
    subtitle: "These include amongst others services",
    services: [
      "Drafting, reviewing, negotiating, registration or cancellation of lease, sale, mortgage, and pledge contracts",
      "Handle notarization of property transfer agreements",
      "Advise on property disposal and acquisition agreements",
      "Advise on and handle property rights protection actions",
      "Handle expropriation and compensation cases",
      "Property transfers",
    ],
    icon: <FaCar />,
  },
  {
    id: "5",
    title: "Procurement",
    subtitle: "To mention but a few of a wide range of services",
    services: [
      "Advise on tender legislations and RFP documents",
      "Advise on compliance of tender/bid terms & conditions",
      "Engage in drafting of RFP Documents and preparation of BID proposals",
      "Advise on joint venture agreements.",
    ],
    icon: <MdOutlineShoppingCart />,
  },
  {
    id: "6",
    title: "TAX & Custom Duty",
    services: [
      "Advise on legal aspects of taxation for client’s business and transactions including income tax, value-added tax, customs, excise duties, withholding taxes",
      "Advise on double taxation agreements",
      "Advise on and handle tax disputes and tax refund requests",
    ],
    icon: <IoCashSharp />,
  },
  {
    id: "7",
    title: "Labor & Social security issues",
    subtitle:
      "We provide legal services on the full range of matters and legal issues related to employment contracts including",
    services: [
      "Draft and review employment contracts, terms and conditions of employment, work rules, and code of conduct",
      "Advising on employee benefits, rights, and obligations as well as day-to-day employment matters",
      "Consult on reduction of workforces, terminations, suspension",
      "Engage during collective Agreement negotiation and representation before the labor relation board.",
      "Advise on employment issues during mergers & acquisitions, transfer of business",
      "Advise on employee’s pension and social security schemes legislations",
      "Advising during disciplinary and grievance proceedings",
      "Handling labor dispute",
    ],
    icon: <RiShieldUserFill />,
  },
  {
    id: "8",
    title: "Civil Society Organizations",
    services: [
      "Provide a comprehensive legal service for both foreign and local civil society organizations in the process of formation, registration, compliance and reporting and project execution.",
    ],
    icon: <RiShieldUserFill />,
  },
];

export default practiceAreas;
