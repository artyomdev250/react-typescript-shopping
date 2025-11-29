import { type FormEvent, useState } from "react";
import useSignIn from "../../hooks/auth/useSignIn";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn, loading, error } = useSignIn();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await signIn(email, password);
    };

    return (
        <form className="w-fit" onSubmit={handleSubmit}>
            <p className="font-bold text-[30px]">Welcome Back 👋</p>
            <p className="mt-7 mb-12 text-[19px] max-w-[410px] text-[#313957]">
                Today is a new day. It's your day. You shape it. Sign in to start
                managing your items!
            </p>

            <div className="flex flex-col gap-2 mb-6">
                <span className="font-medium">Email</span>
                <input
                    type="email"
                    className="input"
                    placeholder="Example@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mb-6">
                <span className="font-medium">Password</span>
                <input
                    type="password"
                    className="input"
                    placeholder="At least 8 characters"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="button" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
            </button>

            {error && (
                <p className="mt-4 text-sm text-red-500 max-w-[410px]">{error}</p>
            )}
        </form>
    );
}

export default SignInForm;
