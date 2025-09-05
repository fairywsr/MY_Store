import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

function Login() {
  const { setUserLogin, navigate, axios, fetchUser } = useContext(ShopContext);
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmithandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(
          `${state === "register" ? "Account Created" : "Login Successful"}`
        );
         navigate("/");
        await fetchUser();
        setUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      onClick={() => setUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmithandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border-gray-200 bg-white"
      >
        <h3 className="bold-28 mx-auto mb-3">
          <span className="text-secondary capitalize">User</span>
          <span className="capitalize p-2">
            {state === "login" ? "Login" : "Register"}
          </span>
        </h3>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Your Name..."
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
              required
            />
          </div>
        )}
        <div className="w-full">
          <p className="bold-14">Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email..."
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
            required
          />
        </div>
        <div className="w-full">
          <p className="bold-14">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Your Password..."
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-tertiary"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            {" "}
            Already have accont?
            <span
              onClick={() => setState("login")}
              className="text-secondary cursor-pointer m-1"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            {" "}
            Create An Account?
            <span
              onClick={() => setState("register")}
              className="text-secondary cursor-pointer m-1"
            >
              click here
            </span>
          </p>
        )}
        <button type="submit" className="btn-secondary w-full rounded !py-2.5">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
