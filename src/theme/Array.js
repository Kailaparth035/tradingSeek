import Images from "./Images";
import moment from "moment";

export const Queston_Array = [
  {
    _id: 0,
    question: "What are the details?",
    questionType: "textarea",
    pushedQuestion: "Description",
    isSkipAble: true,
    choices: [],
    createdAt: "2021-10-21T07:46:37.198Z",
    updatedAt: "2021-10-21T07:46:37.198Z",
  },
  {
    _id: 1,
    question: "Where do you need this done?",
    questionType: "radio",
    pushedQuestion: "Where",
    choices: [
      {
        option: "In Person",
        _id: 0,
        createdAt: "2021-10-21T07:46:37.193Z",
        updatedAt: "2021-10-21T07:46:37.193Z",
      },
      {
        option: "Online",
        _id: 1,
        createdAt: "2021-10-21T07:46:37.193Z",
        updatedAt: "2021-10-21T07:46:37.193Z",
      },
    ],
  },
  {
    _id: 2,
    question: "When do you need this done?",
    questionType: "radio",
    pushedQuestion: "When",
    choices: [
      {
        option: "As soon as possible",
        _id: 0,
        createdAt: "2021-10-21T07:46:37.193Z",
        updatedAt: "2021-10-21T07:46:37.193Z",
      },
      {
        option: "Any time that works",
        _id: 1,
        createdAt: "2021-10-21T07:46:37.193Z",
        updatedAt: "2021-10-21T07:46:37.193Z",
      },
      {
        option: "Specific date",
        _id: 2,
        createdAt: "2021-10-21T07:46:37.193Z",
        updatedAt: "2021-10-21T07:46:37.193Z",
        ans: [
          {
            questionType: "Date",
          },
        ],
      },
    ],
    createdAt: "2021-10-21T07:46:37.197Z",
    updatedAt: "2021-10-21T07:46:37.197Z",
  },
  {
    _id: 3,
    question: "What is your budget?",
    pushedQuestion: "Default Budget",
    questionType: "radio",
    choices: [
      {
        _id: 0,
        option: "Total",
        createdAt: "2021-10-21T07:46:37.197Z",
        updatedAt: "2021-10-21T07:46:37.197Z",
        ans: [
          {
            questionType: "Amount",
          },
        ],
      },
      {
        _id: 1,
        option: "Hourly Rate",
        createdAt: "2021-10-21T07:46:37.197Z",
        updatedAt: "2021-10-21T07:46:37.197Z",
        ans: [
          {
            questionType: "Amount",
          },
        ],
      },
      {
        _id: 2,
        option: "Not yet decided",
        createdAt: "2021-10-21T07:46:37.197Z",
        updatedAt: "2021-10-21T07:46:37.197Z",
      },
    ],
    createdAt: "2021-10-21T07:46:37.197Z",
    updatedAt: "2021-10-21T07:46:37.197Z",
  },
];

export const Registration_Array = [
  {
    _id: 101,
    question: "What is your email?",
    questionType: "email",
    pushedQuestion: "email",
    subQuestion: [],
  },
  {
    _id: 102,
    questionType: "registration",
    pushedQuestion: "Description",
    subQuestion: [],
    ans: [
      {
        _id: 0,
        option: "Enter your Name",
      },
      {
        _id: 1,
        option: "Enter your password",
      },
      {
        _id: 2,
        option: "Confirm your password",
      },
    ],
  },
  {
    _id: 103,
    question: "Enter your Password",
    questionType: "password",
    pushedQuestion: "password",
    subQuestion: [],
  },
  {
    _id: 104,
    question: "Enter your phone number",
    questionType: "mobile",
    pushedQuestion: "Description",
    subQuestion: [],
  },
];

export const FilterStatusData = [
  {
    id: 1,
    status: "I need more quotes",
  },
  {
    id: 2,
    status: "PENDING",
  },
  {
    id: 3,
    status: "CLOSE",
  },
];

export const closeJobReason = [
  {
    id: 1,
    status: "i'm not ready to hire a business right now",
  },
  {
    id: 2,
    status: "i'm going to do the job myself",
  },
  {
    id: 3,
    status: "I change my mind,not going to do the job at all",
  },
  {
    id: 4,
    status: "Something else",
  },
];

export const countries = [
  { name: "NZ", url: "tradingseek.co.nz" },
  { name: "IN", url: "tradingseek.in" },
  { name: "AU", url: "tradingseek.com.au" },
];

export const SortBy = [
  {
    id: 1,
    name: "Latest",
    check: true,
  },
  {
    id: 2,
    name: "Credits (Lowest first)",
  },
  {
    id: 3,
    name: "Credits (Highest first)",
  },
];

export const verified = [
  {
    id: 1,
    name: "Verified Email",
  },
  {
    id: 2,
    name: "Verified Phone",
  },
  {
    id: 3,
    name: "Verified Both",
  },
];

export const CreditRange = [
  {
    id: 1,
    name: "$50 and Below",
  },
  {
    id: 2,
    name: "$50-$100",
  },
  {
    id: 3,
    name: "$100-$200",
  },
  {
    id: 4,
    name: "$200-$300",
  },
  {
    id: 5,
    name: "$300-$400",
  },
  {
    id: 6,
    name: "$400-$500",
  },
  {
    id: 7,
    name: "$500 and Above",
  },
];

// My Job filter Check Box

export const UnRead = [
  {
    _id: 1,
    name: "Unread (1)",
  },
];
export const ActionBuyersHasTaken = [
  {
    _id: 1,
    name: "Buyers has taken an action (610)",
  },
];

export const SubOptionForbuyers = [
  {
    _id: 1,
    name: "Buyers has requested a quote (362)",
  },
  {
    _id: 2,
    name: "Buyers has expressed an interest (321)",
  },
  {
    _id: 3,
    name: "Buyers has send message (202)",
  },
  {
    _id: 4,
    name: "Buyers has request a callback (30)",
  },
];

export const Actionnottaken = [
  {
    _id: 1,
    name: "Taken no action (820)",
  },
  {
    _id: 2,
    name: "Called (8)",
  },
  {
    _id: 3,
    name: "All call progress updates (8)",
  },
  {
    _id: 4,
    name: "Sent SMS (2)",
  },
  {
    _id: 5,
    name: "Made notes (25)",
  },
];

export const PurchaseDate = [
  {
    _id: 1,
    name: "Any time",
  },
  {
    _id: 2,
    name: "Today(8)",
  },
  {
    _id: 3,
    name: "Yesterday (4)",
  },
  {
    _id: 4,
    name: "Less then 3 day ago (13)",
  },
  {
    _id: 5,
    name: "Less then 7 day ago (25)",
  },
  {
    _id: 6,
    name: "Within the last 2 week (43)",
  },
  {
    id: 7,
    name: "Within the last month (66)",
  },
  {
    _id: 8,
    name: "Within the last 6 month (493)",
  },
  {
    _id: 9,
    name: "Within the last year (1160)",
  },
  {
    _id: 10,
    name: "Over a year ago (650)",
  },
];

export const menuItemdata = [
  {
    _id: 0,
    menuName: "Business Details",
  },
  {
    _id: 1,
    menuName: "Credentials",
  },
  {
    _id: 2,
    menuName: "Portfolio",
  },
  {
    _id: 3,
    menuName: "FAQ's",
  },
  {
    _id: 4,
    menuName: "Analytics",
  },
];

export const analytic_date_range = [
  {
    _id: 0,
    date: "Last month",
  },
  {
    _id: 1,
    date: "Last fortnight",
  },
];

export const chart_type = [
  {
    _id: 0,
    chartName: "Directory Impressions",
  },
  {
    _id: 1,
    chartName: "Profile Views",
  },
  {
    _id: 2,
    chartName: "Contact Views",
  },
];

export const notification_option = [
  {
    _id: 1,
    title: "New Messages",
    sms: false,
    email: false,
    app: false,
  },
  {
    _id: 2,
    title: "New Quotes",
    sms: false,
    email: false,
    app: false,
  },
  {
    _id: 3,
    title: "All Accounts",
    sms: false,
    email: false,
    app: false,
  },
  {
    _id: 4,
    title: "Newsletters & special offers",
    sms: false,
    email: false,
    app: false,
  },
];

export const quote_Activity = [
  {
    date: "Date",
    description: "Description",
    purchase: "Purchase",
    used: "Used",
  },
  {
    date: "2022-11-12T08:07:15.906Z",
    description: "Purchased 500 credits",
    purchase: "500",
    used: "24",
  },
  {
    date: "2022-11-12T08:07:15.906Z",
    description: "Purchased 500 credits",
    purchase: "500",
    used: "24",
  },
  {
    date: "2022-11-12T08:07:15.906Z",
    description: "Purchased 500 credits",
    purchase: "500",
    used: "24",
  },
  {
    date: "2022-11-12T08:07:15.906Z",
    description: "Purchased 500 credits",
    purchase: "500",
    used: "24",
  },
];

export const quoted_activity_details = [
  {
    Title: "Description",
    answer: "Purchased 500 credits",
  },
  {
    Title: "Transaction type",
    answer: "Purchased",
  },
  {
    Title: "Purchased credits",
    answer: "100",
  },
  {
    Title: "Bonus credits",
    answer: "500",
  },

  {
    Title: "Total credits",
    answer: "600",
  },
  {
    Title: "Purchased on",
    answer: "Nov 12th, 2022",
  },
  {
    Title: "Credits expiry",
    answer: "Feb 10th, 2023",
  },
];

export const complain_reason = [
  {
    _id: 1,
    title: "Fake profile",
  },
  {
    _id: 2,
    title: "Spam",
  },
  {
    _id: 1,
    title: "Poor service Quality",
  },
  {
    _id: 2,
    title: "Not showing up after payment",
  },
];

// lead filter

export const sort_by_credit = [
  {
    _id: 10,
    name: "Latest",
    check: true,
  },
  {
    _id: 20,
    name: "Credit (Lowest first)",
    check: false,
  },

  {
    _id: 30,
    name: "Credit (Highest first)",
    check: false,
  },
];

export const verified_proof = [
  {
    _id: 10,
    name: "Verified Email",
  },
  {
    _id: 20,
    name: "Verified Phone",
  },
  {
    _id: 30,
    name: "Verified Both",
  },
];

export const credit_range_lead = [
  {
    _id: 1,
    name: "$50 and Below",
    range: "0-50",
  },
  {
    _id: 2,
    name: "$50-$100",
    range: "50-100",
  },
  {
    _id: 3,
    name: "$100-$200",
    range: "100-200",
  },
  {
    _id: 4,
    name: "$200-$300",
    range: "200-300",
  },
  {
    _id: 5,
    name: "$300-$400",
    range: "300-400",
  },
  {
    _id: 6,
    name: "$400-$500",
    range: "400-500",
  },
  {
    _id: 7,
    name: "$500 and Above",
    range: "500-above",
  },
];

export const payment_method = [
  {
    _id: 1,
    name: "American Express",
    image: Images.AmericanExpress,
    check: false,
  },
  {
    _id: 2,
    name: "Cash",
    image: Images.Cash,
    check: false,
  },
  {
    _id: 3,
    name: "Cheque",
    image: Images.BankCheck,
    check: false,
  },
  {
    _id: 4,
    name: "Direct Deposit/ Bank Transfer",
    image: Images.BankTransfer,
    check: false,
  },
  {
    _id: 5,
    name: "Mastercard",
    image: Images.MasterCard,
    check: false,
  },
  {
    _id: 6,
    name: "PayPal",
    image: Images.Paypal,
    check: false,
  },
  {
    _id: 7,
    name: "Visa",
    image: Images.Visacard,
    check: false,
  },
];

// console.log("moment().format() :::", moment().format());

export const opening_hours = [
  {
    day: "Monday",
    opening: "2022-12-23T03:30:11.713Z",
    closing: "2022-12-23T11:30:11.713Z",
    isClosed: false,
  },
  {
    day: "Tuesday",
    opening: "2022-12-23T03:30:11.713Z",
    closing: "2022-12-23T11:30:11.713Z",
    isClosed: false,
  },
  {
    day: "Wednesday",
    opening: "2022-12-23T03:30:11.713Z",
    closing: "2022-12-23T11:30:11.713Z",
    isClosed: false,
  },
  {
    day: "Thursday",
    opening: "2022-12-23T03:30:11.713Z",
    closing: "2022-12-23T11:30:11.713Z",
    isClosed: false,
  },
  {
    day: "Friday",
    opening: "2022-12-23T03:30:11.713Z",
    closing: "2022-12-23T11:30:11.713Z",
    isClosed: false,
  },
  {
    day: "Saturday",
    opening: "2022-12-23T03:30:11.713Z",
    closing: "2022-12-23T11:30:11.713Z",
    isClosed: false,
  },
  {
    day: "Sunday",
    opening: "2022-12-23T03:30:11.713Z",
    closing: "2022-12-23T11:30:11.713Z",
    isClosed: false,
  },
];
