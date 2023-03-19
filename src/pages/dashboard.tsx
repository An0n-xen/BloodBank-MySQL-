import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  ChartBarIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import AddDonor from "./components/AddDonor";
import Dashboard from "./components/Dashboard";
import Records from "./components/Records";
import Settings from "./components/Settings";

export default function dashboard({ donors, Blood }) {
  const router = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [user, setuser] = useState<string | null>(null);
  const [colunm, setcolumn] = useState("");

  const renderComponentChange = () => {
    switch (colunm) {
      case "Dashboard":
        return <Dashboard />;
        break;

      case "Add Donor":
        return <AddDonor />;
        break;

      case "Records":
        return <Records ds={donors} Bl={Blood} />;
        break;

      default:
        return <Settings />;
        break;
    }
  };

  function HandleChange(thing: string) {
    if (thing == colunm) {
      return "selectedClass";
    } else {
      return "unselectedClass";
    }
  }

  const Dashoptions = [
    {
      name: "Dashboard",
      icon: <ChartBarIcon className="w-5 h-5 mr-3" />,
      selectedClass:
        "my-2 pl-[25%] bg-[#18b0c827]  flex item-center text-[#49c1d6] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
      unselectedClass:
        "my-2 pl-[25%]   flex item-center text-[#49c1d6]  hover:bg-[#18b0c827] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
    },
    {
      name: "Add Donor",
      icon: <UserPlusIcon className="w-5 h-5 mr-3" />,
      selectedClass:
        "my-2 pl-[25%] bg-[#18b0c827]   flex item-center text-[#49c1d6]   py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
      unselectedClass:
        "my-2 pl-[25%] flex item-center text-[#49c1d6]  hover:bg-[#18b0c827] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
    },
    {
      name: "Records",
      icon: <ClipboardDocumentListIcon className="w-5 h-5 mr-3" />,
      selectedClass:
        "my-2 pl-[25%] bg-[#18b0c827] flex item-center text-[#49c1d6] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
      unselectedClass:
        "my-2 pl-[25%]  flex item-center text-[#49c1d6]  hover:bg-[#18b0c827] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="w-5 h-5 mr-3" />,
      selectedClass:
        "my-2 pl-[25%] bg-[#18b0c827]  flex item-center text-[#49c1d6] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
      unselectedClass:
        "my-2 pl-[25%] flex item-center text-[#49c1d6]  hover:bg-[#18b0c827] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1 cursor-pointer",
    },
  ];

  const renderThemeChange = () => {
    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-7 h-7 absolute right-6 top-2 z-9999 "
          role="buttom"
          onClick={() => {
            setTheme("light");
          }}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-7 h-7 absolute right-6 top-2 z-9999 "
          role="buttom"
          onClick={() => {
            setTheme("dark");
          }}
        />
      );
    }
  };

  const renderColumns = () => {
    return Dashoptions.map((item, key: number) => {
      return (
        <div
          key={key}
          onClick={(e) => {
            setcolumn(item.name);
          }}
          className={item[HandleChange(item.name)]}
        >
          {item.icon}
          <ul key={key} className="font-medium font-Roboto">
            {item.name}
          </ul>
        </div>
      );
    });
  };

  useEffect(() => {
    // window.localStorage.getItem("auth") == "true"
    //   ? router.push("/dashboard")
    //   : router.push("/");

    setuser(window.localStorage.getItem("user"));
  }, []);
  return (
    <div className="transition ease-out duration-500">
      {renderThemeChange()}

      <div className="flex items-center justify-between">
        <div className="bg-[white] dark:bg-[#131313] dark:shadow-md dark:text-[#65baef] w-[20%] h-screen">
          <div className="flex  justify-center">
            <h1 className="font-black text-3xl text-center mt-10 dark:text-[white]">
              B
            </h1>
            <h1 className="font-black text-3xl text-[#49c1d6] dark:text-[#49c1d6] mt-10 ">
              bank
            </h1>
          </div>

          <div className="mt-16">
            {renderColumns()}
            <div className="absolute flex bottom-5 items-center ml-10 hover:bg-[#18b0c827] py-4 px-10 rounded-md hover:cursor-pointer">
              <div className="bg-[#524f4f] rounded-md w-16 h-16 mr-5"></div>
              <h1 className="font-mono font-black text-xl text-center text-[#514949] dark:text-[#f7f7f7]">
                {user}
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-[#e4e8fb] dark:bg-[#1a2335] w-[80%] h-screen pt-8 overflow-hidden">
          {renderComponentChange()}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const UrlEndpoint = "http://localhost:3000/api/getdata";

  const postData = {
    query: "SELECT * from Donors",
  };
  const response = await fetch(UrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const res = await response.json();

  const postData2 = {
    query: "SELECT * from bloodentry",
  };
  const response2 = await fetch(UrlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData2),
  });
  const res2 = await response2.json();

  return {
    props: { donors: res.data, Blood: res2.data },
  };
};
