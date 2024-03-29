import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

export default function SearchContainer() {
	const { searchValues } = useAllJobsContext();
	const { search, jobStatus, JobType, sort } = searchValues;
	const submit = useSubmit();
	return (
		<Wrapper>
			<Form className="form">
				<h5 className="form-title">search form</h5>
				<div className="form-center">
					<FormRow
						type="search"
						name="search"
						labelText="Search"
						defaultValue={search}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
					/>
					<FormRowSelect
						labelTest="job status"
						name="jobStatus"
						list={["all", ...Object.values(JOB_STATUS)]}
						defaultValue={jobStatus}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
					/>
					<FormRowSelect
						labelTest="job type"
						name="jobType"
						list={["all", ...Object.values(JOB_TYPE)]}
						defaultValue={JobType}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
					/>
					<FormRowSelect
						name="sort"
						defaultValue={sort}
						list={[...Object.values(JOB_SORT_BY)]}
						onChange={(e) => {
							submit(e.currentTarget.form);
						}}
					/>
					<Link
						to="/dashboard/all-jobs"
						className="btn form-btn delete-btn"
					>
						Reset Search Values
					</Link>
				</div>
			</Form>
		</Wrapper>
	);
}
