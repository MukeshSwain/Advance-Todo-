import React, { useState } from 'react'
import { Button } from './components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from './components/ui/popover';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { autEndPoint } from '../constant/api_end_points';
import axios from 'axios';
import { toast } from 'sonner';

import { setTask } from '../redux/slices/taskSlice';


function Navbar() {
 
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logOut = async () => {
    try {
      const res = await axios.get(`${autEndPoint}/logout`);
      if (res.data.success) {
        dispatch(logout());
        dispatch(setTask([]));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex  justify-between  border p-3 rounded-md bg-slate-200  ">
      <div className={"font-bold cursor-pointer text-2xl"}>
        <Link to="/todo">myTodo</Link>
      </div>
      <div className="flex gap-4">
        {user && (
          <Button
            variant={"link"}
            className={`cursor-pointer text-md font-semibold`}
          >
            <Link to={"/newtask"}>New Task</Link>
          </Button>
        )}
        <div>
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className={"cursor-pointer"}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-50">
                <div className="flex flex-col gap-2">
                  <Button variant={"link"} className="cursor-pointer">
                    View Profile
                  </Button>
                  <Button
                    onClick={logOut}
                    variant={"link"}
                    className="cursor-pointer"
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-2">
              <Button
                variant={"link"}
                className={`cursor-pointer text-md font-semibold`}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className={`cursor-pointer text-md font-semibold`}
                variant={"link"}
              >
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar
