import React, { useState } from "react";
import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { autEndPoint } from "../constant/api_end_points";
import Navbar from "@/components/Navbar";
function Signup() {
  const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
 const dispatch = useDispatch();

const [input, setInput] = useState({
  name: "",
  email: "",
  password: "",
})
  
  

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (!input.name || !input.email || !input.password) {
        toast.error("Please fill all the fields")
        return
      }
      const res = await axios.post(`${autEndPoint}/register`, input)
      if (res.data.success) {
       toast.success(res.data.message)
       navigate('/login')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  

  
  return (
    <div>
      <Navbar />
      <div
        className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto 
py-3 px-5  md:px-10    my-20 
fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-40"
      >
        <p className=" text-gray-600 text-center py-2">
          Create your free account and start organizing your tasks effortlessly!
        </p>

        <form
          onSubmit={signupHandler}
          className=" w-[400px] mx-auto border-gray-800 border p-10 rounded-xl"
        >
          <h1 className="text-3xl text-center font-semibold mb-1">Signup</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                id="name"
                className="border-gray-800"
                autoComplete="name"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                email="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                id="email"
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
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                id="password"
                autoComplete="password"
                placeholder="********"
                className="border-gray-800 "
              />
            </div>
            <Button type="submit" className={`cursor-pointer`}>
              {loading ? (
                <span className="flex gap-2">
                  <Loader2 className="animate-spin" />
                  please wait...
                </span>
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
          <Link to={"/login"}>
            <p className="text-sm text-blue-600 underline mt-1 cursor-pointer">
              Already have an account?<span className="">Login</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
