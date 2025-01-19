import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function VerifyCode() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function sendDataToVerifyCode(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      console.log(data);

      if (data.status === "Success") {
        navigate("/resetpassword");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }

  const validationSchema = object({
    resetCode: string().required("Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    validationSchema,

    onSubmit: sendDataToVerifyCode,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i>Verify Code
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        <input
          type="text"
          className="form-control w-full"
          placeholder="Code"
          name="resetCode"
          value={formik.values.resetCode}
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
