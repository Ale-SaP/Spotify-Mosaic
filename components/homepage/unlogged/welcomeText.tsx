import LoginButton from "./loginButton";

export default function WelcomeText() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Please log in to Spotify.</p>
                    <LoginButton />
                </div>
            </div>
        </div>
    );
}