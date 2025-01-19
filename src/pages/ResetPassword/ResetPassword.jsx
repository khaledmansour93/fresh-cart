import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ResetPassword() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function sendDataToResetPassword(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };

      let { data } = await axios.request(options);
      console.log(data);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    newPassword: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },

    validationSchema,

    onSubmit: sendDataToResetPassword,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i>Reset Password
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}

        <input
          type="email"
          className="form-control w-full"
          placeholder="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <input
          type="password"
          className="form-control w-full"
          placeholder="New Password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <button
          type="submit"
          className="btn w-full bg-primary-700 hover:bg-primary-800 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
}
