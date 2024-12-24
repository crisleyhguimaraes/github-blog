import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    ArrowSquareUpRight,
    Calendar,
    CaretLeft,
    GithubLogo,
} from "phosphor-react";
import { PostContent, PostCover } from "./styles";
import { api } from "../../lib/axios";
import { daysBetweenDates } from "../../utils/formatter";

type RepoInfoType = {
    html_url: string;
    name: string;
    owner: {
        login: string;
    };
    created_at: string;
    description: string;
};

export function Post() {
    const [repo, setRepo] = useState<RepoInfoType | null>(null);
    const { id } = useParams();

    async function fetchRepo(repoId?: string) {
        if (!repoId) return;

        try {
            const response = await api.get(
                `/repos/crisleyhguimaraes/${repoId}`
            );
            const { html_url, name, owner, created_at, description } =
                response.data;
            setRepo({ html_url, name, owner, created_at, description });
        } catch (error) {
            console.error("Error fetching repository:", error);
        }
    }

    useEffect(() => {
        fetchRepo(id);
    }, [id]);

    if (!repo) {
        return (
            <PostCover>
                <h2>Not Found</h2>
            </PostCover>
        );
    }

    return (
        <>
            <PostCover>
                <div className="post-header">
                    <a href="/">
                        <CaretLeft
                            size={18}
                            weight="bold"
                            className="profile-info-label"
                        />
                        voltar
                    </a>
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ver no github
                        <ArrowSquareUpRight size={18} weight="bold" />
                    </a>
                </div>

                <h1>{repo.name}</h1>

                <ul className="info">
                    <li>
                        <GithubLogo
                            size={18}
                            weight="bold"
                            className="post-info"
                        />{" "}
                        {repo.owner.login}
                    </li>
                    <li>
                        <Calendar
                            size={18}
                            weight="bold"
                            className="post-info"
                        />{" "}
                        Criado há {daysBetweenDates(repo.created_at)} dia(s)
                    </li>
                </ul>
            </PostCover>

            <PostContent>
                <p>{repo.description}</p>
            </PostContent>
        </>
    );
}
