"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrganizationSwitcher, useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import logDark from "../../public/assets/dark-logo.svg";
import logoWhite from "../../public/assets/light-logo.svg";

import { AlignRight, LogOut, MonitorDot, MoonStar, Sun } from "lucide-react";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import BackButton from "./BackButton";
//
import LangContext from "@/lib/context/LangContext";
const TopBar = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [tdmModalOpen, setTdmModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { langKr, setLangKr, translate }: any = useContext(LangContext);

  const intl = translate["TopDropDownMenu"];
  // console.log("intl========", intl);
  function onSelectLangChange(value: string) {
    if (value === "kr") {
      setLangKr(true);
    } else {
      setLangKr(false);
    }

    // const nextLocale = event.target.value;
    // startTransition(() => {
    //   // router.replace(pathname, { locale: value });
    //   router.replace(pathname);
    // });
  }

  // useEffect(() => {
  //   if (theme === "" || theme === undefined || theme === null) {
  //     setTheme("dark");
  //   }
  // }, []);

  return (
    <nav
      className="fixed top-0 z-30  
    w-full items-center 
     px-6 py-3 flex flex-row
      bg-white dark:topbarBg"
    >
      <BackButton />
      <Link
        href="/"
        className="flex flex-row items-center justify-center flex-1  gap-2"
      >
        {/* <div className="flex items-center justify-center w-full "> */}
        <div className="h-8 w-8 ">
          {theme === "dark" ? (
            <Image src={logoWhite} alt="Threads logo" />
          ) : (
            <Image src={logDark} alt="Threads logo" />
          )}
        </div>
        {/* </div> */}
        <p
          className={`text-heading3-bold max-xs:hidden ml-0 
            dark:text-light-1 text-black
          }`}
        >
          Threads
        </p>
        <p className="m-0 horizontal text-x-small-semibold dark:text-neutral-400 text-neutral-600 ">
          {intl.clone}
        </p>
      </Link>
      <div className="flex flex-1 flex-row justify-end  items-center ">
        <div className="flex items-center  mr-8 ">
          <OrganizationSwitcher
            // organizationProfileMode={"navigation"}
            hidePersonal={false}
            appearance={{
              // baseTheme: dark,
              elements: {
                organizationSwitcherTrigger:
                  "py-2 px-4 text-black dark:text-light-1",
                // avatarImage:
              },
            }}
          />
        </div>
        <div
          className={`flex flex-row toggleDarkmode dark:text-white text-black
          }`}
        >
          {/* <TopDropDownMenu /> */}

          <DropdownMenu open={tdmModalOpen} onOpenChange={setTdmModalOpen}>
            <DropdownMenuTrigger
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setTdmModalOpen((prev) => !prev);
              }}
            >
              <AlignRight />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="topDropDown dark:bg-neutral-700"
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="DropdownMenuItem dark:bg-neutral-700">
                  {intl.theme.title}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    className=" dark:bg-neutral-700"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("light")}
                    >
                      {intl.theme.light} <Sun width={14} height={14} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("dark")}
                    >
                      {intl.theme.dark} <MoonStar width={14} height={14} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => setTheme("system")}
                    >
                      {intl.theme.system}
                      <MonitorDot width={14} height={14} />
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="DropdownMenuItem dark:bg-neutral-700">
                  {intl.languages.title}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    className=" dark:bg-neutral-700"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => onSelectLangChange("kr")}
                    >
                      {intl.languages.kor}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="DropdownMenuItem"
                      onClick={() => onSelectLangChange("en")}
                    >
                      {intl.languages.eng}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="topDropDownSub">
                {intl.information}
              </DropdownMenuItem>
              <DropdownMenuItem className="topDropDownSub">
                {intl.bug_report}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="topDropDownSub2"
                onClick={() => signOut()}
              >
                <div className=""> {intl.logout}</div>
                <LogOut width={14} height={14} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
