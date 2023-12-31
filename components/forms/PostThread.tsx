"use client";

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
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
// interface Props {
//   user: {
//     id: string;
//     objectId: string;
//     username: string;
//     name: string;
//     bio: string;
//     image: string;
//   };
//   btnTitle: string;
//   krRes: boolean;
// }

interface Props {
  userId: string;
  krRes: boolean;
}

const PostThread = ({ userId, krRes }: Props) => {
  // console.log(`유저아이디: ${userId}`);
  const userId2 = JSON.stringify(userId).replace(/\"/gi, "");
  console.log(userId2.replace(/\\/g, ""));
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId2,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log("ORG_ID: ", organization?.id);
    await createThread({
      text: values.thread,
      author: userId2,
      communityId: organization ? organization.id : null,
      path: pathname,
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 "
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="mt-10 flex flex-col  w-full gap-1">
              {/* <FormLabel className="text-base-semibold dark:text-light-2">
                Content
              </FormLabel> */}
              <FormControl className="no-focus border dark:border-dark-4 dark:bg-dark-3 dark:text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-neutral-600">
          {krRes ? "게시" : "Post Thread"}
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
