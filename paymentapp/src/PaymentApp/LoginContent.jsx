import { useState } from "react";

const LoginContent = ({ handleLogin }) => {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (email === 'admin@gmail.com' && password === '123') {
            handleLogin();
        } else {
            setError('Invalid credentials. Hint: super / password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 transform transition duration-500 border border-gray-200">
                <div className="flex justify-center mb-6">
                    <span className="text-5xl">💳</span>
                </div>
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
                    Login
                </h2>
                <p className="text-center text-gray-500 mb-8 text-sm">
                    Securely sign in to continue.
                </p>

                {error && (
                    <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-xl font-medium" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="jane@doe.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 mt-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform active:scale-[0.99]"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginContent