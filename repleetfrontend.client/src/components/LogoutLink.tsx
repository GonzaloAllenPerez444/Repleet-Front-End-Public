
import { useNavigate } from "react-router-dom";

function LogoutLink(props: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;


    const handleSubmit = (e: React.FormEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        fetch(`${apiUrl}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""

        })
            .then((data) => {
                if (data.ok) {

                    navigate("/signin");
                }
                else {
                    //Don't do anything if logout was unsuccessful
                }


            })
            .catch((error) => {
                console.error(error);
            })

    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}

export default LogoutLink;