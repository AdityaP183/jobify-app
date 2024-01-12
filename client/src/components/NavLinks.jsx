import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import Links from "../utils/Links";

const NavLinks = ({ isBigSidebar }) => {
	const { toggleSidebar, user } = useDashboardContext();
	return (
		<div className="nav-links">
			{Links.map((l) => {
				const { text, path, icon } = l;
				const { role } = user;
				if (path === "admin" && role !== "admin") return;
				return (
					<NavLink
						to={path}
						key={text}
						className={"nav-link"}
						onClick={isBigSidebar ? null : toggleSidebar}
						end
					>
						<span className="icon">{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};

export default NavLinks;
