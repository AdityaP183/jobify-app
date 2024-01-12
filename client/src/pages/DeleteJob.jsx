import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

// export const deleteAction = async ({ params }) => {
// 	try {
// 		await customFetch.delete(`/jobs/${params.id}`);
// 		toast.success("Job deleted successfully");
// 	} catch (error) {
// 		toast.error(error?.response?.data?.msg);
// 	}
// 	return redirect("/dashboard/all-jobs");
// };

// import customFetch from "../utils/customFetch";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

// const DeleteJob = async ({ params }) => {
//   const history = useHistory();

//   try {
//     await customFetch.delete(`/jobs/${params.id}`);
//     toast.success("Job deleted successfully");
//     history.push("/dashboard/all-jobs");
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//   }
// };

// export default DeleteJob;

export const deleteAction = async ({ params }) => {
	try {
		await customFetch.delete(`/jobs/${params.id}`);
		toast.success("Job deleted successfully");
	} catch (error) {
		toast.error(error?.response?.data?.msg);
	}
	return redirect("/dashboard/all-jobs");
};

const DeleteJob = () => {
	return <div></div>;
};

export default DeleteJob;
