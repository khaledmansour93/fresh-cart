import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const [accountExistError, setAccountExistError] = useState(null);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name cannot be more than 25 characters"),

    email: string().required("Email is required").email("Email is invalid"),

    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),

    rePassword: string()
      .required("Confirm password is required")
      .oneOf(
        [ref("password")],
        "Password and confirm password should be the same"
      ),

    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "Sorry, We Accept Egyptian Phone Numbers Only"),
  });

  async function sendDataToRegister(values) {
    const loadingToastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setAccountExistError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,

    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i>Register Now
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="name">
          <input
            type="text"
            className="form-control w-full"
            placeholder="Type your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />

          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.name}</p>
          )}
        </div>

        <div className="email">
          <input
            type="email"
            className="form-control w-full"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />

          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
          )}

          {accountExistError && (
            <p className="text-red-500 mt-1 text-sm">*{accountExistError}</p>
          )}
        </div>

        <div className="password">
          <input
            type="password"
            className="form-control w-full"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />

          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 mt-1 text-sm">
              *{formik.errors.password}
            </p>
          )}
        </div>

        <div className="rePassword">
          <input
            type="password"
            className="form-control w-full"
            placeholder="Confirm password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />

          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 mt-1 text-sm">
              *{formik.errors.rePassword}
            </p>
          )}
        </div>

        <div className="phone">
          <input
            type="tel"
            className="form-control w-full"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />

          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn w-full bg-primary-700 hover:bg-primary-800 text-white"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
