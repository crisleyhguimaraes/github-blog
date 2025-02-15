import styled from "styled-components";

export const Profile = styled.div`
    display: flex;
    gap: 2rem;
    padding: 2rem 2.5rem;

    background-color: ${(props) => props.theme["base-profile"]};
    box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    .profile-content-header {
        display: flex;
        justify-content: space-between;
        margin: 1rem auto;

        a {
            text-decoration: none;
            line-height: 1.6;
            color: ${(props) => props.theme["base-title"]};

            &:hover {
                color: ${(props) => props.theme["blue"]};
            }
        }
    }

    img {
        width: 10rem;
        height: 10rem;
    }

    h1 {
        color: ${(props) => props.theme["base-title"]};
    }

    p {
        color: ${(props) => props.theme["base-text"]};
    }

    ul {
        margin-top: 1rem;
        display: flex;
        gap: 1.5rem;
    }

    li {
        list-style: none;
        color: ${(props) => props.theme["base-subtitle"]};
    }

    .profile-info-label {
        color: ${(props) => props.theme["base-label"]};
        vertical-align: middle;
    }
`;

export const Cards = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
`;
