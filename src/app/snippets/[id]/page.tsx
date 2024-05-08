import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';

interface SnippetShowpageProps {
    params: {
        id: string
    }
}

export default async function fetchSnippets(props: SnippetShowpageProps) {
    // await new Promise((r) => {
    //     setTimeout(r, 2000);
    // });
    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    });
    if (!snippet) {
        return notFound();
    }
    return (
        <div>
            <div className='flex m-4 justify-between items-center'>
                <h1 className='text-xl font-bold'>
                    {snippet.title}
                </h1>
                <div className='flex gap-2'>
                    <Link
                        href={`/snippets/${snippet.id}/edit`}>
                        <button className='border rounded p-2'>Edit</button>
                    </Link>
                    {/* <Link
                        href={`/snippets/${snippet.id}/delete`}> */}
                    <button className='border rounded p-2'>Delete</button>
                    {/* </Link> */}
                </div>
            </div>
            <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
                <code>{snippet.code}</code>
            </pre>
        </div>
    )
}