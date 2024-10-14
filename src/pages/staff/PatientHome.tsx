import {
  // CheckIcon,
  // HandThumbUpIcon,
  PaperClipIcon,
  // UserIcon,
} from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { removeUser } from "../../api/Register/RemoveUserApi";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientDetails } from "../../api/User/PatientDetails";
import { User, UserResponse } from "../../types/User";
import { calculateAge } from "../../util/AgeCalculator";
import { Modal } from "antd";
import { createUser } from "../../api/Register/SignupApi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import { updateUser } from "../../api/Register/UpdateUserApi.js";
import AllergiesList from "../../components/AllergyList.js";
// const user = {
//   name: "Whitney Francis",
//   email: "whitney@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
// };
const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
// const eventTypes = {
//   applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
//   advanced: { icon: HandThumbUpIcon, bgColorClass: "bg-blue-500" },
//   completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
// };
// const timeline = [
//   {
//     id: 1,
//     type: eventTypes.applied,
//     content: "Applied to",
//     target: "Front End Developer",
//     date: "Sep 20",
//     datetime: "2020-09-20",
//   },
//   {
//     id: 2,
//     type: eventTypes.advanced,
//     content: "Advanced to phone screening by",
//     target: "Bethany Blake",
//     date: "Sep 22",
//     datetime: "2020-09-22",
//   },
//   {
//     id: 3,
//     type: eventTypes.completed,
//     content: "Completed phone screening with",
//     target: "Martha Gardner",
//     date: "Sep 28",
//     datetime: "2020-09-28",
//   },
//   {
//     id: 4,
//     type: eventTypes.advanced,
//     content: "Advanced to interview by",
//     target: "Bethany Blake",
//     date: "Sep 30",
//     datetime: "2020-09-30",
//   },
//   {
//     id: 5,
//     type: eventTypes.completed,
//     content: "Completed interview with",
//     target: "Katherine Snyder",
//     date: "Oct 4",
//     datetime: "2020-10-04",
//   },
// ];

// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(" ");
// }

export default function PatientHome() {
  const { id } = useParams();
  const [userId, setUserId] = useState(id);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  // const [medicalRecordAvailable, setMedicalRecordAvailable] = useState(true);
  const [user, setUser] = useState<UserResponse>();
  console.log(id);

  const navigate = useNavigate();
  useEffect(() => {
    // id == undefined && setUserId(id);
    const fetchUser = async (userId: string) => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        if (!token) {
          console.error("No token found");
          return;
        }

        const user = await getPatientDetails(userId, token);
        setUser(user);
        return true;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const handleRemove = async (employeeId: string) => {
    try {
      // Call the async function to remove the user
      await removeUser(employeeId);

      alert("User removed successfully");
      navigate(`/`);
    } catch (error) {
      console.error("Error removing user:", error);
      alert("Failed to remove user. Please try again.");
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        {userId ? (
          <main className="py-10">
            {/* Page header */}
            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      alt=""
                      src={user?.link}
                      className="h-16 w-16 rounded-full"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full shadow-inner"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.username}
                  </h1>
                  <p className="text-sm font-medium text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <button
                  type="button"
                  onClick={() => handleRemove(userId)}
                  className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 hover:bg-gray-50"
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  onClick={() => {
                    setUpdateModalOpen(true);
                  }}
                >
                  Update
                </button>
              </div>
            </div>

            {user?.medicalrecord ? (
              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                  {/* Description list*/}
                  <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h2
                          id="applicant-information-title"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Medical Record
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Patient's medical details and information.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-2 lg:sm:grid-cols-2">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Patient ID
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {user?.medicalrecord?.patientId}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Age
                            </dt>
                            {user && (
                              <dd className="mt-1 text-sm text-gray-900">
                                {
                                  calculateAge(user?.medicalrecord?.dateOfBirth)
                                    .years
                                }{" "}
                                years ,{" "}
                                {
                                  calculateAge(user?.medicalrecord?.dateOfBirth)
                                    .months
                                }{" "}
                                months.
                              </dd>
                            )}
                          </div>

                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-red-500">
                              Emergency Contact Name
                            </dt>
                            <dd className="mt-1 text-sm text-red-900 font-semibold">
                              {user?.medicalrecord?.emergencyContactName}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-red-500">
                              Emergency Contact Number
                            </dt>
                            <dd className="mt-1 text-sm text-red-900 font-semibold">
                              {user?.medicalrecord?.emergencyContactNumber}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {user?.medicalrecord?.address}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Phone
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {user?.medicalrecord?.contactNumber}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dd className="mt-1 text-sm text-gray-900">
                            <AllergiesList list={user?.medicalrecord?.allergies} />
                            </dd>
                          </div>

                        </dl>
                      </div>
                    </div>
                  </section>
                </div>

                <section
                  aria-labelledby="timeline-title"
                  className="lg:col-span-4 lg:col-start-3"
                >
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2
                      id="timeline-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Appointments
                    </h2>

                    {/* Activity Feed */}
                    {/* <div className="mt-6 flow-root">
                      <ul role="list" className="-mb-8">
                        {timeline.map((item, itemIdx) => (
                          <li key={item.id}>
                            <div className="relative pb-8">
                              {itemIdx !== timeline.length - 1 ? (
                                <span
                                  aria-hidden="true"
                                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      item.type.bgColorClass,
                                      "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                                    )}
                                  >
                                    <item.type.icon
                                      aria-hidden="true"
                                      className="h-5 w-5 text-white"
                                    />
                                  </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {item.content}{" "}
                                      <a
                                        href="#"
                                        className="font-medium text-gray-900"
                                      >
                                        {item.target}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                    <time dateTime={item.datetime}>
                                      {item.date}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div> */}

                    <div className="mt-6 flex flex-col justify-stretch">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Add Appointment
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-400"
                  >
                    <path
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    No medical record found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a new medical record to get started.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <PlusIcon
                        aria-hidden="true"
                        className="-ml-0.5 mr-1.5 h-5 w-5"
                      />
                      Add medical record
                    </button>
                  </div>
                </div>
              </main>
            )}
          </main>
        ) : (
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">404</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                User not found
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Sorry, we couldn’t find the user details you’re looking for.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </a>
                <a href="#" className="text-sm font-semibold text-gray-900">
                  Contact support <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </main>
        )}
      </div>
      {user && (
        <UpdateProfileModal
          open={updateModalOpen}
          data={user}
          onCancel={() => setUpdateModalOpen(false)}
        />
      )}
    </>
  );
}

const UpdateProfileModal: React.FC<{
  open: boolean;
  onCancel: () => void;
  data: UserResponse;
}> = ({ open, onCancel, data }) => {
  const [formData, setFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: [],
    link: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [userId, setUserId] = useState(data.id);

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username,
        email: data.email,
        password: "testpassoworderror",
        role: ["user"],
        link: data.link,
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      let updatedFormData = { ...formData };

      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);

        updatedFormData = {
          ...updatedFormData,
          link: downloadURL,
        };
      }

      if (userId) {
        await updateUser(updatedFormData, userId);
        setSuccess(true);
        setError(null);
      } else {
        setError("User ID is missing.");
      }
    } catch (err) {
      setError("Failed to update user. Please try again.");
      setSuccess(false);
    }
  };
  return (
    <>
      <Modal
        open={open}
        closable
        destroyOnClose
        onOk={handleSubmit}
        onCancel={onCancel}
      >
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Update Your Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile Picture
                  </label>
                  <div className="mt-2">
                    <input
                      id="passwprofilePicord"
                      name="profilePic"
                      type="file"
                      required
                      onChange={handleImageChange}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Role
                  </label>
                  <div className="mt-2">
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role[0] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, role: [e.target.value] })
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      <option value="admin">Staff</option>
                      <option value="mod">Doctor</option>
                      <option value="user">Patient</option>
                    </select>
                  </div>
                </div> */}

                {error && <div className="text-red-500">{error}</div>}
                {success && (
                  <div className="text-green-500">
                    User successfully created!
                  </div>
                )}

                {/* <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
