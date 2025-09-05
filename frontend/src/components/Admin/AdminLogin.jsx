import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";

function AdminLogin() {
  const { isAdmin, setIsAdmin, navigate, axios } = useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      if (data.success) {
        setIsAdmin(true);
        navigate("/admin");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  if (isAdmin) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-8 w-80 sm:w-[360px] rounded-2xl shadow-lg border border-gray-200 bg-white"
      >
        <h3 className="text-xl font-semibold text-center text-gray-800">
          <span className="text-secondary">Admin</span> Login
        </h3>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-tertiary focus:border-tertiary outline-none text-sm"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-tertiary focus:border-tertiary outline-none text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-secondary w-full rounded-lg py-2.5 mt-2 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
