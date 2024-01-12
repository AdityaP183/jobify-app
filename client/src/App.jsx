import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
	AddJob,
	Admin,
	AllJobs,
	DashboardLayout,
	Error,
	HomeLayout,
	Landing,
	Login,
	Profile,
	Register,
	Stats,
	EditJob,
} from "./pages";
import { actionOnSubmit } from "./pages/Register";
import { registerAction } from "./pages/Login";
import { dataLoader } from "./pages/DashboardLayout";
import { addJobSubmitAction } from "./pages/AddJob";
import { allJobsLoader } from "./pages/AllJobs";
import { editJobAction, editJobLoader } from "./pages/EditJob";
import { deleteAction } from "./pages/DeleteJob";
import { loadStats } from "./pages/Admin";
import { updateAction } from "./pages/Profile";
import { statsLoader } from "./pages/Stats";

const checkDefaultTheme = () => {
	const isDarkTheme = localStorage.getItem("darkTheme") === "true";
	document.body.classList.toggle("dark-theme", isDarkTheme);
	return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "register",
				element: <Register />,
				action: actionOnSubmit,
			},
			{
				path: "login",
				element: <Login />,
				action: registerAction,
			},
			{
				path: "dashboard",
				element: (
					<DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />
				),
				loader: dataLoader,
				children: [
					{
						index: true,
						element: <AddJob />,
						action: addJobSubmitAction,
					},
					{ path: "stats", element: <Stats />, loader: statsLoader },
					{
						path: "all-jobs",
						element: <AllJobs />,
						loader: allJobsLoader,
					},

					{
						path: "profile",
						element: <Profile />,
						action: updateAction,
					},
					{
						path: "admin",
						element: <Admin />,
						loader: loadStats,
					},
					{
						path: "edit-job/:id",
						element: <EditJob />,
						loader: editJobLoader,
						action: editJobAction,
					},
					{
						path: "delete-job/:id",
						action: deleteAction,
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
