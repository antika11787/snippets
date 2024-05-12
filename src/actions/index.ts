"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// dont put a redirect function in try-catch block cz the catch will assume this to be an error and not redirect the user to that page

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // check the user input and make sure they are valid
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Please enter a title longer than 3 characters",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Please enter a valid code which is longer than 10 characters",
      };
    }

    // create a new record in the db
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong..",
      };
    }
  }
  revalidatePath("/");
  // redirect the user to home page
  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
}
