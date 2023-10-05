"use client";

import { Edit } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createThread } from "@/lib/actions/thread.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { useOrganization } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
const CustomCreateThreadModal = ({
  userId,
  krRes,
  userInfo,
}: {
  userId: string;
  krRes: boolean;
  userInfo: {
    id: string;
    username: string;
    name: string;
    image: string;
    bio: string;
  };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);
  const intl = useTranslations("CustomCreateThreadModal");
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log("ORG_ID: ", organization?.id);
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };
  // dialog 참조 ref
  const dialogRef = useRef<HTMLDialogElement>(null);

  // modal 오픈 함수
  const showModal = () => {
    setIsOpen(true);
    dialogRef.current?.showModal(); // 모달창 노출. show() 호출하면 다이얼로그 노출
  };

  // Modal 닫기 함수
  const closeModal = () => {
    setIsOpen(false);
    dialogRef.current?.close(); // 모달창 닫기
  };

  useEffect(() => {
    // 모달창 외부영역 클릭시, 모달창 닫기 구현
    if (dialogRef.current) {
      const dialogElement = dialogRef.current as HTMLDialogElement;

      dialogElement.addEventListener("click", (event) => {
        const dialogArea = dialogElement.getBoundingClientRect();
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          closeModal();
        }
      });
    }

    // 컴포넌트가 마운트될 때 또는 divRef가 변경될 때 위치를 얻습니다.
    const getDivYPosition = () => {
      if (dialogRef.current) {
        const rect = dialogRef.current.getBoundingClientRect();
        const yPosition = rect.top + window.scrollY;
        console.log("Div의 Y 위치:", yPosition);
      }
    };

    getDivYPosition();

    // 스크롤 이벤트가 발생할 때마다 위치를 업데이트합니다.
    window.addEventListener("scroll", getDivYPosition);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", getDivYPosition);
    };
  }, []);

  //   const yWichi = dialogRef.current.getBoundingClientRect().top;
  return (
    <div>
      <button
        onClick={showModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <Edit
          className={`w-[22px] h-[22px] text-neutral-300 dark:text-neutral-600`}
        />
      </button>

      {/* dialog 엘리먼트 - 모달창 영역  */}

      <dialog
        ref={dialogRef}
        className={`dialog ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } dark:bg-neutral-900`}
      >
        <div className={`dialog-thread text-light-1`}>
          <p>{intl("new_thread")}</p>
        </div>
        <div className="space-x-2 flex font-light">
          <div className="flex flex-col items-center justify-start">
            <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
              <Image
                src={userInfo.image}
                height={32}
                width={32}
                className=""
                alt={userInfo.name + "'s profile image"}
              />
            </div>
            <div className="w-0.5 grow mt-2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="w-full">
            <div className="font-semibold text-left dark:text-light-1">
              {userInfo.username}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-4 "
              >
                <FormField
                  control={form.control}
                  name="thread"
                  render={({ field }) => (
                    <FormItem className="mt-2 flex flex-col  w-full gap-1">
                      {/* <FormLabel className="text-base-semibold dark:text-light-2">
                  Content
                </FormLabel> */}
                      <FormControl className="no-focus border dark:border-dark-4 dark:bg-dark-3 dark:text-light-1">
                        <Textarea
                          className="mt-1 mini-scrollbar text-base/relaxed resize-none h-16 bg-transparent w-full placeholder:text-neutral-300 dark:placeholder:text-neutral-600 pb-1 outline-none focus:border-b dark:border-b-neutral-700"
                          placeholder={intl("placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className=" bg-neutral-400   dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {krRes ? "게시" : "Post Thread"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CustomCreateThreadModal;
