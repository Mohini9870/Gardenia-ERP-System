import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLogin } from "../../actions/user";
import { getUserDetails } from "../../reducers/user";
import LoginForm from "./LoginForm";

const LoginPage = () => {
	const dispatch = useDispatch();

	const user = useSelector(getUserDetails);

	const handleSubmit = formData => {
		dispatch(userLogin(formData));
	};

	if (user?.isLoggedIn && user?.token) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div
			style={{
				display: "flex",
				flex: 1,
				height: "60vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Card>
				<div className="d-flex flex-row">
					<div>
						<img
							style={{ height: 500, width: 600 }}
							src="/images/loginBg.jpg"
							alt="hi"
						></img>
					</div>
					<div className="p-3">
						<img
							src="/images/gcLogo.png"
							alt="hi"
							style={{ height: "60px", marginTop: "60px" }}
						></img>
						<LoginForm onSubmit={handleSubmit} />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default LoginPage;
