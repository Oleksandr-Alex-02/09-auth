
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

import NotesClient from "./Notes.client"

type Props = {
    params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    return {
        title: `Note: ${slug[0]}`,
        description: `Filter ${slug[0]}`,
        openGraph: {
            title: `Note: ${slug[0]}`,
            description: `Filter ${slug[0]}`,
            url: `https://notehub.com/notes/filter/${slug[0]}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Filter ${slug[0]}`,
                },],
        }
    }
}

export default async function Notes({ params }: Props) {
    const { slug } = await params;

    const qc: QueryClient = new QueryClient()
    const qp = {
        name: "notes",
        search: "",
        initPage: 1,
        perPage: 12,
        tag: slug[0] === "All" ? undefined : slug[0]
    };
    const { search, initPage, tag } = qp

    const categorys = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
    type category = typeof categorys[number];

    const rawTag = slug[0];
    const tagNote: category | undefined =
        rawTag === "All" ? undefined :
            categorys.includes(rawTag as category) ? rawTag as category :
                undefined;

    await qc.prefetchQuery({
        queryKey: ["notes", search, initPage, tag],
        queryFn: () => fetchNotes(search, initPage, tag),
    })

    console.log(slug[0])

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NotesClient category={tagNote} />
        </HydrationBoundary>
    )
}