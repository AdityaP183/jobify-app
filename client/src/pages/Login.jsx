import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import {
	Link,
	Form,
	redirect,
	useNavigation,
	useNavigate,
} from "react-router-dom";

export const registerAction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/auth/login", data);
		toast.success("Login successful");
		return redirect("/dashboard");
	} catch (error) {
		toast.error(error?.response?.data?.msg);
	}
};

const Login = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const navigate = useNavigate();

	const testUserLogin = async () => {
		const data = {
			email: "iambatman@gmail.com",
			password: "iambatman",
		};
		try {
			await customFetch.post("/auth/login", data);
			toast.success("Take a test drive");
			navigate("/dashboard");
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		}
	};
    
	return (
		<Wrapper>
			<Form method="post" className="form">
				<Logo />
				<h4>login</h4>
				<FormRow
					type="email"
					name="email"
					defaultValue="aditya18@gmail.com"
					labelText={"Email"}
				/>
				<FormRow
					type="password"
					name="password"
					defaultValue="aditya123"
					labelText={"Password"}
				/>
				<button
					type="submit"
					className="btn btn-block"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting" : "Submit"}
				</button>
				<button type="button" className="btn btn-block" onClick={testUserLogin}>
					Explore the App
				</button>
				<p>
					Not a member yet?
					<Link to={"/register"} className="member-btn">
						Register
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};

export default Login;
