import React, { useState } from "react";
import { CalendarIcon, Loader2, SquareCheckBig } from "lucide-react";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { Textarea } from "@/components/components/ui/textarea";
import { Popover, PopoverTrigger } from "@/components/components/ui/popover";
import { Button } from "@/components/components/ui/button";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import axios from "axios";
import { taskEndPoint } from "../constant/api_end_points";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

function NewTask() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",

    priority: "",
  });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const input = { ...todo, dueDate: date };
      const res = await axios.post(`${taskEndPoint}/add`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/todo");
      }
    } catch (error) {
      console.log("Error in handleSubmit ", error.message);
    } finally {
      setTodo({
        title: "",
        description: "",

        priority: "",
      });
      setLoading(false);
      setDate(new Date());
    }
  };
  return (
    <div>
      <Navbar/>
      <div
        className="w-full sm:w-[90%] md:w-[50%] lg:w-[40%] xl:w-[37%] mx-auto 
my-20  bg-gray-100 py-6 sm:py-8 md:py-9 px-6 sm:px-8 md:px-10 
rounded-2xl border border-gray-200 "
      >
        <div className="flex items-center justify-center">
          <SquareCheckBig size={60} color="green" />
          <h1 className="text-4xl font-bold ">MyTodo</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                id="title"
                className="border border-gray-800 bg-white rounded-md px-3 py-2"
                autoComplete="title"
                placeholder="Enter task title"
                aria-label="Task Title"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={todo.description}
                onChange={(e) =>
                  setTodo({ ...todo, description: e.target.value })
                }
                name="description"
                id="description"
                className="border border-gray-800 rounded-md bg-white px-3 py-2 h-20 resize-none"
                autoComplete="description"
                placeholder="Enter task description"
                aria-label="Task Description"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="flex flex-col gap-1.5">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={"w-auto border border-gray-800 rounded-md"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className=" border shadow bg-gray-400 rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-1.5 ">
              <Label>Priority</Label>
              <Select
                onValueChange={(e) => setTodo({ ...todo, priority: e })}
                className="border border-gray-800  "
              >
                <SelectTrigger className="w-auto bg-white border border-gray-500">
                  <SelectValue
                    className="text-gray-600 border "
                    placeholder="Select priority"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full  px-4 py-2 text-center cursor-pointer text-white font-medium rounded-md  "
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" />
              </span>
            ) : (
              "Add Task"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
