// components/Layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  PlusCircleIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  CogIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserIdFromJwtCookie } from "../util/jwtDecode";
import { getPatientDetails } from "../api/User/PatientDetails";
import { UserResponse } from "../types/User";
import { useUserRole } from "../hooks/useUserRoleHook";

const initialNavigation = [
  { name: "Home", href: "/patient/home/", icon: HomeIcon, current: false },
  { name: "Appointments", href: "/patient/appointment/", icon: ClockIcon, current: false },
  { name: "Payments", href: "#", icon: UserGroupIcon, current: false },
  { name: "Feedback", href: "#", icon: DocumentChartBarIcon, current: false },
];

const secondaryNavigation = [
  { name: "Settings", href: "#", icon: CogIcon },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function PatientSideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(initialNavigation);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = getUserIdFromJwtCookie()?.sub;
  const id = getUserIdFromJwtCookie()?.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponse>();
  const { setRole } = useUserRole();

  useEffect(() => {
    // id == undefined && setUserId(id);
    const fetchUser = async (userId: string) => {
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

        const user = await getPatientDetails(userId, token);
        setUser(user);
        setLoading(false);
        return true;
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  React.useEffect(() => {
    setNavigation(prevNav =>
      prevNav.map(item => ({
        ...item,
        current: item.href === location.pathname
      }))
    );
  }, [location]);

  const handleNavigation = (item: { name: string; href: string; icon: React.ComponentType; current: boolean }) => {
    navigate(item.href);
    setSidebarOpen(false);
  };

  const renderNavItems = (items: { name: string; href: string; icon: React.ComponentType; current: boolean }[]) => items.map((item) => (
    <a
      key={item.name}
      onClick={() => handleNavigation(item)}
      className={classNames(
        item.current
          ? "bg-teal-800 text-white"
          : "text-teal-100 hover:bg-teal-600 hover:text-white",
        "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 cursor-pointer"
      )}
    >
      <item.icon
        aria-hidden="true"
      />
      {item.name}
    </a>
  ));

  return (
    <>
      <div className="min-h-full">
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs flex-1 transform flex-col bg-teal-700 pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute right-0 top-0 -mr-12 pt-2 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex flex-col flex-shrink-0 items-center justify-center px-4">
                <img
                  alt="Easywire logo"
                  src="../src/assets/logo.png"
                  className="h-8 w-auto"
                />
                <h1 className="text-teal-200 font-bold">
                  Hospital Managment System
                </h1>
              </div>
              <nav
                aria-label="Sidebar"
                className="mt-5 h-full flex-shrink-0 divide-y divide-teal-800 overflow-y-auto"
              >
                <div className="space-y-1 px-2">
                  {renderNavItems(navigation)}
                </div>
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-teal-800 text-white"
                          : "text-teal-100 hover:bg-teal-600 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="mr-4 h-6 w-6 flex-shrink-0 text-teal-200"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="space-y-1 px-2">
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white"
                      >
                        <item.icon
                          aria-hidden="true"
                          className="mr-4 h-6 w-6 text-cyan-200"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </DialogPanel>
            <div aria-hidden="true" className="w-14 flex-shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto bg-teal-700 pb-4 pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                alt="Easywire logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=cyan&shade=300"
                className="h-8 w-auto"
              />
            </div>
            <nav
              aria-label="Sidebar"
              className="mt-5 flex flex-1 flex-col divide-y divide-teal-800 overflow-y-auto"
            >
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-teal-800 text-white"
                        : "text-teal-100 hover:bg-teal-600 hover:text-white",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="space-y-1 px-2">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-teal-100 hover:bg-teal-600 hover:text-white"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="mr-4 h-6 w-6 text-teal-200"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 lg:mt-3">
              <div className="flex flex-1">
                <form action="#" method="GET" className="flex w-full md:ml-0">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                    >
                      <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      type="search"
                      placeholder="Search "
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <span className="absolute -inset-1.5 lg:hidden" />
                      {user?.link ? (
                        <img
                          alt=""
                          src={user.link}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <img
                          alt=""
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>
                        {userName}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {/* <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Settings
                      </a>
                    </MenuItem> */}
                    <MenuItem>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          document.cookie.split(";").forEach(function (c) {
                            document.cookie = c
                              .replace(/^ +/, "")
                              .replace(
                                /=.*/,
                                "=;expires=" +
                                new Date().toUTCString() +
                                ";path=/"
                              );
                          });
                          navigate("/login");
                          setRole("");
                        }}
                      >
                        Logout
                      </div>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
