import {
    ArrowSquareUpRight,
    GithubLogo,
    InstagramLogo,
    Users,
} from "phosphor-react";
import { Cards, Profile } from "./styles";

import { Card } from "../../components/Card";
import { useContext, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { FormSearch } from "../../components/FormSearch";
import { BlogContext } from "../../contexts/BlogContext";

async function fetchProfile() {
    const response = await api.get("/users/crisleyhguimaraes");
    return response.data;
}

export function Home() {
    const [dataProfile, setDataProfile] = useState<any>({});
    const { content } = useContext(BlogContext);

    useEffect(() => {
        fetchProfile().then((data) => {
            setDataProfile(data);
        });
    }, [fetchProfile]);

    return (
        <>
            <Profile>
                <img src={dataProfile.avatar_url} />
                <div className="profile-content">
                    <div className="profile-content-header">
                        <h1>{dataProfile.name}</h1>
                        <a href={dataProfile.url}>
                            github{" "}
                            <ArrowSquareUpRight size={18} weight="bold" />{" "}
                        </a>
                    </div>
                    <p>
                        Um projeto que consome todos os repositórios de um
                        usuário ou organização no GitHub, transformando-os em
                        posts dinâmicos para um blog. Ideal para compartilhar
                        projetos, documentações e atualizações de forma prática
                        e automatizada. 🚀
                    </p>
                    <ul className="info">
                        <li>
                            <GithubLogo
                                size={18}
                                weight="bold"
                                className="profile-info-label"
                            />{" "}
                            {dataProfile.login}
                        </li>
                        <li>
                            <InstagramLogo
                                size={18}
                                weight="bold"
                                className="profile-info-label"
                            />{" "}
                            @crisleyhguimaraes
                        </li>
                        <li>
                            <Users
                                size={18}
                                weight="bold"
                                className="profile-info-label"
                            />{" "}
                            {dataProfile.followers} seguidores
                        </li>
                    </ul>
                </div>
            </Profile>

            <FormSearch />

            <Cards>
                <>
                    {content.map((post) => {
                        return <Card key={post.id} cardContent={post} />;
                    })}
                </>
            </Cards>
        </>
    );
}
