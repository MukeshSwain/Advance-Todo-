import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { autEndPoint } from "../constant/api_end_points";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!input.email || !input.password) {
        toast.error("Please fill all the fields");
        return;
      }
      const res = await axios.post(`${autEndPoint}/login`, input, {
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` // ✅ Send JWT token if needed
      }
      });

      if (res.data.success) {
        console.log(res);
        dispatch(setUser(res));
        navigate("/todo");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setInput({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div>
      <Navbar />
      <div
        className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto 
py-3 px-5 sm:px-8 md:px-10 my-6 sm:my-10 md:my-16 lg:my-20 
fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-40"
      >
        <p className=" text-gray-600 text-center my-3">
          Welcome back! Log in to stay on top of your tasks.
        </p>

        <form
          onSubmit={submitHandler}
          className=" w-[400px] mx-auto border-gray-800 border p-10 rounded-xl"
        >
          <h1 className="text-3xl text-center font-semibold mb-1">Login</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                email="email"
                id="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                autoComplete="email"
                placeholder="rjxkI@example.com"
                className="border-gray-800"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                password="password"
                id="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                autoComplete="password"
                placeholder="********"
                className="border-gray-800 "
              />
            </div>
            <Button type="submit" className={`cursor-pointer`}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> loading
                </span>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </div>
          <Link to={"/signup"}>
            <p className="text-sm text-blue-600 underline mt-1 cursor-pointer">
              Don't have an account? <span className="">Signup</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
