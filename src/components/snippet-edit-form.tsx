'use client';

import type { Snippet } from '@prisma/client';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import * as actions from '@/actions';

interface SnippetEditFormProps {
    snippet: Snippet;
}
// there are two ways to use the actions.editSnippet function
// 1. use the bind function (this uses a form action. you can use this without running javascript in the browser)
// 2. use an async function with transitionAction(so that the page doesn't render before data is updated)
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);
    const handleEditorChange = (value: string = "") => {
        setCode(value);
    }

    const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

    return (
        <div className='p-4'>
            <Editor
                height="40vh"
                theme='vs-dark'
                language='javascript'
                defaultValue={snippet.code}
                options={{ minimap: { enabled: false } }}
                onChange={handleEditorChange}
            />
            <form action={editSnippetAction}>
                <button className='p-2 border rounded'>Save</button>
            </form>
        </div>
    )
}