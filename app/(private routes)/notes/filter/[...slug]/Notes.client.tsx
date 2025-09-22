
"use client"

import css from "./page.module.css";
import Link from "next/link";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
    category: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | undefined;
}

export default function NotesClient({ category }: NotesClientProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value);
        setPage(1);
    }, 1000);

    const { data, isLoading, error } = useQuery({
        queryKey: ['notes', category, searchQuery, page],
        queryFn: () => fetchNotes(searchQuery, page, category),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });

    const totalPages = data?.totalPages ?? 1;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>

                <SearchBox
                    text={inputValue}
                    onChange={(value) => {
                        setInputValue(value);
                        debouncedSetSearchQuery(value);
                    }}
                />
                {data?.notes && <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />}

                <Link href="/notes/action/create">
                    <button className={css.button}>Create</button>
                </Link>
            </header>

            {isLoading && <>Loading notes...</>}
            {error && <>Error occurred</>}

            {data?.notes && <NoteList notes={data.notes} />}

            {data?.notes?.length === 0 && <p className={css.message}>No notes found</p>}
        </div>
    );
}