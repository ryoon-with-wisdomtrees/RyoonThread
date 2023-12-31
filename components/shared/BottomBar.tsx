"use client"; // useRouter는 온리 client side에 적용됨으로 해당 사항 적시해줘야 함.
// 이것은 client side rendered component라는 표기임.
//
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GroupIcon, Heart, Home, Search } from "lucide-react";
import CustomCreateThreadModal from "../modal/CustomCreateThreadModal";
import { useContext } from "react";
import LangContext from "@/lib/context/LangContext";
interface Props {
  userId: string;
  krRes: boolean;
  userInfoForPassing: {
    id: string;
    bio: string;
    image: string;
    name: string;
    username: string;
  };
}

const BottomBar = ({
  userId,
  userInfoForPassing,
}: {
  userId: any;
  userInfoForPassing: any;
}) => {
  const pathname = usePathname();
  const { langKr, setLangKr, translate }: any = useContext(LangContext);
  const intl = translate.BottomBar;

  return (
    <section
      className={`sticky  bottom-0 z-10 w-full 
      rounded-t-3xl p-4 
      
       xs:px-7 flex flex-col 
       justify-center 
       items-center
       bg-white
       dark:forDarkBg dark:backdrop-blur-lg
       `}
    >
      <div className="bottombar_container">
        <Link
          href={"/"}
          className={`bottombar_link ${
            pathname === "/" && "bottom_click"
          } bottom_action`}
        >
          <Home
            className={`w-6 h-6 ${
              pathname === "/"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
        <Link
          href={"/search"}
          className={`bottombar_link ${
            pathname === "/search" && "bottom_click"
          } bottom_action`}
        >
          <Search
            className={`w-6 h-6 ${
              pathname === "/search"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
        <Link
          href={"/activity"}
          className={`bottombar_link ${
            pathname === "/activity" && "bottom_click"
          } bottom_action`}
        >
          <Heart
            className={`w-6 h-6 ${
              pathname === "/activity"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
        {/* 
      기존 페이지연결 스레드 작성 페이지
        <Link
          href={"/create-thread"}
          className={`bottombar_link ${
            pathname === "/communities" && "bottom_click"
          } bottom_action`}
        >
          <Edit
            className={`w-6 h-6 ${
              pathname === "/create-thread"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link> */}
        <div
          className={`
            bottombar_link 
          bottom_action
          `}
        >
          <CustomCreateThreadModal
            userId={userId}
            userInfoForPassing={userInfoForPassing}
          />
        </div>
        <Link
          href={"/communities"}
          className={`bottombar_link ${
            pathname === "/communities" && "bottom_click"
          } bottom_action`}
        >
          <GroupIcon
            className={`w-6 h-6 ${
              pathname === "/communities"
                ? "text-neutral-600 dark:text-white"
                : "text-neutral-300 dark:text-neutral-600"
            }`}
          />
        </Link>
      </div>
      <footer className="footer">
        <ul>
          <li>
            <span>© 2023</span>
          </li>
          <li>
            <span>{intl.terms}</span>
          </li>
          <li>
            <span>{intl.privacy_policy}</span>
          </li>
          <li>
            <span>{intl.cookie}</span>
          </li>
        </ul>
      </footer>
    </section>
  );
};

export default BottomBar;
