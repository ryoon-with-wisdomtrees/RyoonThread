"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteThread } from "@/lib/actions/thread.actions";
import LangContext from "@/lib/context/LangContext";
import { useUser } from "@clerk/nextjs";
import { Flag, Loader2, MoreHorizontalIcon, Trash, UserX2 } from "lucide-react";
// import { useToast } from "../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState, useTransition } from "react";
// import { deleteThread } from "@/lib/actions";
interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  name: string;
  isComment?: boolean;
}

const UserThreadThreeDots = ({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
  name,
}: Props) => {
  const { user } = useUser();
  // const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const { langKr, setLangKr, translate }: any = useContext(LangContext);
  const intl = translate["UserThreadThreeDots"];

  const self = user?.id === authorId;
  useEffect(() => {
    if (deleted && !isPending) {
      //   toast({
      //     title: "Thread deleted",
      //   });
      setOpen(false);
      if (pathname.startsWith("/t")) {
        router.push("/");
      }
    }
  }, [deleted, isPending]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        {" "}
        <MoreHorizontalIcon className="text-neutral-800  dark:text-neutral-400  text-heading4-medium" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-none dark:bg-neutral-900"
      >
        {self ? (
          <DropdownMenuItem
            onClick={async () => {
              await deleteThread(JSON.parse(threadId), pathname);
              if (!parentId || !isComment) {
                router.push("/");
              }
              setDeleted(true);
            }}
            disabled={deleted}
            className=" !text-red-500 dark:bg-neutral-900"
          >
            {" "}
            {deleted ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash className="w-4 h-4 mr-2" />
            )}
            {intl.delete}
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                //   toast({
                //     title: name + " has been blocked",
                //   });
                setOpen(false);
              }}
              className="userDropDownSub  dark:bg-neutral-900"
            >
              <UserX2 className="w-4 h-4 mr-2" />
              {intl.block}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                //   toast({
                //     title: name + " has been reported",
                //   });
                setOpen(false);
              }}
              className="userDropDownSub2 !text-red-500 dark:bg-neutral-900"
            >
              {" "}
              <Flag className="w-4 h-4 mr-2" />
              {intl.report}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserThreadThreeDots;
