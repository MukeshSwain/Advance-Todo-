// import { toast } from "sonner";
// import { taskEndPoint } from "../constant/api_end_points";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { setTask } from "../redux/slices/taskSlice";

// export const getTasks = async () => {
//     const dispatch = useDispatch(); 
//   try {
//     const res = await axios.get(`${taskEndPoint}/get`, {
//       withCredentials: true,
//     });
//     if (res.data.success) {
//       dispatch(setTask(res.data.tasks));
//     }
//   } catch (error) {
//     toast.error(error.message);
//   }
// };
