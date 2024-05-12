'use client';

interface ErrorPageProps {
    error: Error,
    reset: ()=> void; // reset the form
}

export default function ErrorPage({error}: ErrorPageProps) {
    return (
        <div>Error: {error.message}</div>
    )
}