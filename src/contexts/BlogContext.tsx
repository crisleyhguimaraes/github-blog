import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

type PostType = {
    url: string;
    number: number;
    title: string;
    id: number;
    created_at: string;
    body: string;
};

type BlogContextType = {
    content: PostType[];
    fetchIssues: (query?: string) => Promise<void>;
};

type BlogContextProviderProps = {
    children: ReactNode;
};

export const BlogContext = createContext<BlogContextType>(
    {} as BlogContextType
);

export function BlogContextProvider({ children }: BlogContextProviderProps) {
    const [content, setContent] = useState<PostType[]>([]);

    async function fetchIssues(query: string = "") {
        try {
            const encodedQuery = encodeURIComponent(query);
            const response = await api.get(
                `/search/issues?q=${encodedQuery}%20repo:crisleyhguimaraes/github-blog`
            );

            const data = response.data.items.map((issue: any): PostType => {
                const {
                    html_url: url,
                    number,
                    title,
                    id,
                    created_at,
                    body,
                } = issue;
                return { url, number, title, id, created_at, body };
            });

            setContent(data);
        } catch (error) {
            console.error("Failed to fetch issues:", error);
        }
    }

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <BlogContext.Provider value={{ content, fetchIssues }}>
            {children}
        </BlogContext.Provider>
    );
}
