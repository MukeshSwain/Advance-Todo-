import React, { useState } from 'react'
import { CalendarIcon, Loader2, OctagonAlert, Pencil,Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/components/ui/checkbox'
import { Label } from '@/components/components/ui/label';
import axios from 'axios';
import { taskEndPoint } from '../constant/api_end_points';
import { toast } from 'sonner';


import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select';
import { Calendar } from '@/components/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/components/ui/popover';
import { format } from 'date-fns';


function Todos({ task, refreshTasks }) {
  const [isChecked, setIsChecked] = useState(task.status === "completed");

  const navigate = useNavigate();

  const completeTask = async (taskId) => {
    try {
      const res = await axios.patch(
        `${taskEndPoint}/complete/${taskId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // Revert the checkbox state if the API call fails
      setIsChecked(!isChecked);
    }
  };

  const handleCheckboxChange = () => {
    // Optimistically update the checkbox state
    setIsChecked(!isChecked);
    completeTask(task._id);
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await axios.delete(`${taskEndPoint}/delete/${taskId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
       refreshTasks();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  const [todo, setTodo] = useState({
      title: "",
      description: "",
  
      priority: "",
    });
    const [date, setDate] = useState(task.dueDate || new Date());
  const [loading, setLoading] = useState(false);


  const handleUpdate = async (taskId) => { 
    setLoading(true)
    try {
      const input = { ...todo, dueDate: date };
      const res = await axios.put(`${taskEndPoint}/update/${taskId}`, input, {
        withCredentials: true,
      })

      if (res.data.success) { 
        refreshTasks();
        toast.success(res.data.message);
      }
      
      
    } catch (error) {
      toast.error(error.message);
      
    } finally {
      setTodo({
        title: "",
        description: "",
    
        priority: "",
      });
      setLoading(false)
      setDate(new Date());
    }

  }

  return (
    <div
      className={`w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto 
border py-3 px-5 sm:px-8 md:px-10 rounded-md shadow-md border-gray-400 
${isChecked ? "bg-green-200" : "bg-white"}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <Checkbox
            color="green"
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
            className={`border border-gray-400 h-5 w-5 cursor-pointer`}
          />
          <Label className="cursor-pointer text-md text-gray-700">
            {task.title}
          </Label>
        </div>
        <div className="flex items-center gap-10">
          <div className='flex items-center gap-2'>
            <OctagonAlert color="red" size={20} />
            {format(task.dueDate,"yyyy-MM-dd ")}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Pencil color="#4a4545" size={24} className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  Make changes to your task here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={todo.title}
                    placeholder={task?.title}
                    onChange={(e) =>
                      setTodo({ ...todo, title: e.target.value })
                    }
                    className="border border-gray-500 col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    value={todo.description}
                    onChange={(e) =>
                      setTodo({ ...todo, description: e.target.value })
                    }
                    id="description"
                    placeholder={task?.description}
                    className="border border-gray-500 col-span-3"
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={"w-auto border border-gray-800 rounded-md"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Pick a due date</span>
                        )}
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
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Priority</Label>
                  <Select
                    onValueChange={(e) => setTodo({ ...todo, priority: e })}
                    className="border border-gray-800  "
                  >
                    <SelectTrigger className="w-auto bg-white border border-gray-500">
                      <SelectValue
                        className="text-gray-600 border "
                        placeholder={task?.priority}
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
              <DialogFooter>
                <Button onClick={() => handleUpdate(task._id)}>
                  {loading ? (
                    <span className="flex gap-2">
                      <Loader2 className="animate-spin mr-2" />
                      please wait...
                    </span>
                  ) : (
                    <span>Save changes</span>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Trash2
            onClick={() => deleteTask(task._id)}
            color="#e93a3a"
            size={24}
            className="cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
}

export default Todos
