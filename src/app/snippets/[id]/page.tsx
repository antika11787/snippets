import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetShowpageProps {
  params: {
    id: string;
  };
}

export default async function fetchSnippets(props: SnippetShowpageProps) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });
  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link href={`/snippets/${snippet.id}/edit`}>
            <button className="border rounded p-2">Edit</button>
          </Link>
          <form action={deleteSnippetAction}>
            <button className="border rounded p-2">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  // fetch all the snippets
  // the fetched ids will represent the ids in [id]
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    // next expects to get the ids in strings
    return { id: snippet.id.toString() };
  });
}
