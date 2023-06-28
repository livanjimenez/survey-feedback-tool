import { useContext, useState, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
  ChartBarIcon,
  FireIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardNavbar() {
  const { user, signOut } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchUserDisplayName = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().name);
        }
      };

      fetchUserDisplayName();
    }
  }, [user]);

  const navigation = [
    {
      name: "Surveys",
      href: "/dashboard",
      icon: RectangleStackIcon,
      current: true,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: ChartBarIcon,
      current: false,
    },
    {
      name: "Templates, Coming Soon!",
      href: "#",
      icon: FireIcon,
      current: false,
      disabled: true,
    },
  ];

  const userNavigation = [
    { name: "Settings", href: "#", icon: Cog6ToothIcon },
    { name: "Support", href: "#", icon: QuestionMarkCircleIcon },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleCreateSurvey = async () => {
    router.push("/create");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.disabled ? undefined : item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : item.disabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className="h-6 w-6 mr-2"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 items-center">
                    <div className="mr-4">
                      <button
                        className="rounded-md inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleCreateSurvey}
                      >
                        Create Survey
                      </button>
                    </div>
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                      >
                        <item.icon
                          className="h-6 w-6 mr-2"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                <Menu>
                  <Menu.Button className="flex items-center text-sm text-gray-300 ml-4">
                    Hi, {displayName || "Null"}
                  </Menu.Button>
                  <Menu.Items>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active && "bg-blue-500"
                          } block px-4 py-2 text-sm text-gray-700`}
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
