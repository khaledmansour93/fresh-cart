import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  async function sendDataToForgetPassword(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      console.log(data);

      setMsg(data.message);

      if (data.statusMsg === "success") {
        setTimeout(() => {
          navigate("/verifycode");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,

    onSubmit: sendDataToForgetPassword,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i>Forget Password
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        {msg && <p className="text-green-500 mt-1 text-sm">{msg}</p>}

        <input
          type="email"
          className="form-control w-full"
          placeholder="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.errors.email && formik.touched.email && (
          <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
        )}

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
