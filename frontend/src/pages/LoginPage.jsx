import { useState } from "react";
// // import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      role: email === "admin@demo.com" ? "superadmin" : "user",
      permissions: {
        "Products List": ["View", "Edit"],
        "Order List": ["View"],
      },
    };
    login(userData);
    navigate(userData.role === "superadmin" ? "/dashboard" : "/comments");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* <div className="bg-black text-white p-4">This should have a black background</div> */}

      <div className="bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
            {/* <LockClosedIcon className="h-1 w-1 text-white" /> */}
          </div>
          <h2 className="text-2xl font-bold text-white">Login</h2>
          <p className="text-sm text-gray-400 mt-1">
            Superadmin or regular user access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            {/* <EnvelopeIcon className="h-1 w-1 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /> */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            {/* <LockClosedIcon className="h-1 w-1 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Sign In
          </button>

          <div className="text-center text-sm mt-2 text-blue-400 hover:underline cursor-pointer" onClick={() => navigate("/forgot-password")}>
  Forgot Password?
</div>

        </form>

        <div className="text-xs text-center text-gray-400 space-y-1">
          <p>
            <strong>Superadmin:</strong> <code>admin@demo.com</code>
          </p>
          <p>
            <strong>User:</strong> <code>user@demo.com</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
