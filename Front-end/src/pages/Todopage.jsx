import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import Todos from "./Todos";
import axios from "axios";
import { taskEndPoint } from "../constant/api_end_points";
import { setTask } from "../redux/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
// import getAllTasks from "../Hooks/getAllTasks";


function Todopage() {
  
  const { task } = useSelector((store) => store.task);
  const dispatch = useDispatch();
  const getAllTasks = async () => {
    try {
      const res = await axios.get(`${taskEndPoint}/get`, {
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}` //  Send JWT token if needed
      }
      });
      
      if (res.data.success) {
        
        dispatch(setTask(res.data.tasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div className="h-screen w-full ">
      <Navbar />

      <div className="my-10">
        <div className="flex flex-col gap-4 ">
          {task?.length === 0 ? (
            <div className="text-2xl font-bold text-gray-800 flex flex-col items-center justify-center h-full">
              <p className="text-6xl text-[#361117] sm:block">
                You have no tasks yet!
              </p>
            </div>
          ) : (
            task.map((item) => {
              return (
                <Todos refreshTasks={getAllTasks} key={item._id} task={item} />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Todopage;
