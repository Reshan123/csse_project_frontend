import React, { useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ChevronRightIcon,
  PlusIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import {
  BriefcaseMedical,
  ClipboardPlus,
  PersonStanding,
  ScaleIcon,
  SyringeIcon,
} from "lucide-react";
import Table from "../../components/Table";
import LoginDialogBox from "../../components/LoginDialogBox";
import Signup from "../../components/Signup";
import PatientRegister from "../../components/PatientRegister";
import QrReader from "../../components/QrReader";
import DoctorRegister from "../../components/DoctorRegister";
import { getUsers } from "../../api/Register/FetchUsersApi";
import { User } from "../../types/User";
import UsersTable, { DataType } from "./UsersTable";
import { getUserIdFromJwtCookie } from "../../util/jwtDecode";

const StaffHome = () => {
  const [username, setUsername] = React.useState("John Doe");
  const [role, setRole] = React.useState("staff");
  const [hospital, setHospital] = React.useState("General Hospital");
  const [patientCount, setPatientCount] = React.useState(0);
  const [appointmentCount, setAppointmentCount] = React.useState(0);
  const [treatmentCount, setTreatmentCount] = React.useState(0);
  const [patientAddOpen, setPatientAddOpen] = React.useState(false);
  const [doctorAddOpen, setDoctorAddOpen] = React.useState(false);
  const [users, setUsers] = React.useState<User[] | null>(null);
  const [loading, setLoading] = React.useState(false);

  console.log("Token", getUserIdFromJwtCookie());

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        if (!token) {
          console.error("No token found");
          return;
        }

        const users = await getUsers(token);
        setUsers(users);
        setLoading(false);
        return true;
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, [username]);

  const mapUserToDataType = (user: User): DataType => {
    return {
      id: user.id ?? "",
      username: user.username,
      email: user.email,
      link: user.link ?? "",
    };
  };
  const cards = [
    {
      name: "Medical Records",
      href: "/patient/account",
      icon: BriefcaseMedical,
      amount: "590",
    },
    {
      name: "Doctor Appointments",
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
                <Dialog
                  open={doctorAddOpen}
                  onClose={setDoctorAddOpen}
                  className="relative z-10"
                >
                  <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                  />

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                      >
                        <DoctorRegister />
                      </DialogPanel>
                    </div>
                  </div>
                </Dialog>
                <button
                  type="button"
                  onClick={() => setDoctorAddOpen(true)}
                  className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                  Add Doctor
                </button>
                <Dialog
                  open={patientAddOpen}
                  onClose={setPatientAddOpen}
                  className="relative z-10"
                >
                  <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                  />

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                      >
                        <PatientRegister />
                      </DialogPanel>
                    </div>
                  </div>
                </Dialog>
                <button
                  type="button"
                  onClick={() => setPatientAddOpen(true)}
                  className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* QR Scan */}
              <div className="overflow-hidden rounded-lg bg-white shadow p-2">
                <QrReader></QrReader>
              </div>
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="overflow-hidden rounded-lg bg-white shadow p-10"
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
          <div className="shadow sm:hidden p-4">
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 overflow-hidden sm:hidden bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              {users &&
                users.map((user) => (
                  <li key={user.id}>
                    <a
                      href={`/home/${user.id}`}
                      className="block bg-white px-4 py-4 hover:bg-gray-50"
                    >
                      <span className="flex items-center space-x-4">
                        <span className="flex flex-1 space-x-2 truncate">
                          <BanknotesIcon
                            aria-hidden="true"
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                          />
                          <span className="flex flex-col truncate text-sm text-gray-500">
                            <span className="truncate">{user.username}</span>
                            <span>
                              <span className="font-medium text-gray-900">
                                {user.email}
                              </span>{" "}
                            </span>
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
                  <UsersTable
                    data={(users ?? []).map(mapUserToDataType)}
                    loading={loading}
                  ></UsersTable>
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
