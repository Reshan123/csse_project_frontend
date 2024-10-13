import React from "react";
import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { BriefcaseMedical, ClipboardPlus, PersonStanding, ScaleIcon, SyringeIcon } from "lucide-react";
import Table from "../../components/Table";

const StaffHome = () => {

  const [username, setUsername] = React.useState("John Doe");
  const [role, setRole] = React.useState("staff");
  const [hospital, setHospital] = React.useState("General Hospital");
  const [patientCount, setPatientCount] = React.useState(0);
  const [appointmentCount, setAppointmentCount] = React.useState(0);
  const [treatmentCount, setTreatmentCount] = React.useState(0);
  const cards = [
    {
      name: "Medical Records",
      href: "/patient/account",
      icon: BriefcaseMedical,
      amount: "590",
    },
    {
      name: "Doctor Appontments",
      href: "#",
      icon: ClipboardPlus,
      amount: "600",
    },
    {
      name: "Medical Treatments",
      href: "#",
      icon: SyringeIcon,
      amount: "1409",
    },
    // More items...
  ];
  const transactions = [
    {
      id: 1,
      name: "Payment to Molly Sanders",
      href: "#",
      amount: "$20,000",
      currency: "USD",
      status: "success",
      date: "July 11, 2020",
      datetime: "2020-07-11",
    },
    // More transactions...
  ];
  return (
    <main className="flex-1 pb-8">
      {/* Page header */}
      <div>
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                <div className="flex items-center">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                    className="hidden h-16 w-16 rounded-full sm:block"
                  />
                  <div>
                    <div className="flex items-center">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        className="h-16 w-16 rounded-full sm:hidden"
                      />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        Good morning, {username}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                        <BuildingOfficeIcon
                          aria-hidden="true"
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        />
                        {hospital}
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                        />
                        {role}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Add Medical Record
                </button>
                <a
                  href="/patient/home"
                  className="flex items-center text-black hover:text-green-600"
                >
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    Scan ID
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="overflow-hidden rounded-lg bg-white shadow"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-400"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.href}
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
            Recent activity
          </h2>

          {/* Activity list (smallest breakpoint only) */}
          <div className="shadow sm:hidden">
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
            >
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <a
                    href={transaction.href}
                    className="block bg-white px-4 py-4 hover:bg-gray-50"
                  >
                    <span className="flex items-center space-x-4">
                      <span className="flex flex-1 space-x-2 truncate">
                        <BanknotesIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                        />
                        <span className="flex flex-col truncate text-sm text-gray-500">
                          <span className="truncate">{transaction.name}</span>
                          <span>
                            <span className="font-medium text-gray-900">
                              {transaction.amount}
                            </span>{" "}
                            {transaction.currency}
                          </span>
                          <time dateTime={transaction.datetime}>
                            {transaction.date}
                          </time>
                        </span>
                      </span>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mt-2 flex flex-col">
                <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                  <Table></Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StaffHome;
