function SignInForm() {
    return (
        <form className="w-fit">
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
                />
            </div>

            <div className="flex flex-col gap-2 mb-6">
                <span className="font-medium">Password</span>
                <input
                    type="password"
                    className="input"
                    placeholder="At least 8 characters"
                    required
                />
            </div>

            <button className="button" type="submit">
                Sign in
            </button>
        </form>
    );
}

export default SignInForm;
