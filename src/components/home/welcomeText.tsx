import LoginButton from "./loginButton";
import login_link from "../../spotify/login_link"

export default function WelcomeText() {
    const loginLink = login_link();

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Please log in to Spotify.</p>
                    <LoginButton link={loginLink}/>
                </div>
            </div>
        </div>
    );
}