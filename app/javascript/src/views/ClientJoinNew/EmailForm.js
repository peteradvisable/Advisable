import React from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Box, Input, Error } from "@advisable/donut";
import { object, string, ref } from "yup";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useCreateClientAccount, useUpdatePassword } from "./queries";

const validationSchema = object().shape({
  firstName: string().required("Please enter your first name"),
  lastName: string().required("Please enter your last name"),
  email: string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  password: string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Password does not match")
    .required("Please confirm your password"),
});

export default function EmailForm() {
  const [createClientAccount] = useCreateClientAccount();
  const [setPassword] = useUpdatePassword();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const createAccountResponse = await createClientAccount({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          rid: searchParams.get("rid"),
          utmCampaign: searchParams.get("utm_campaign"),
          utmSource: searchParams.get("utm_source"),
          utmMedium: searchParams.get("utm_medium"),
        },
      },
    });
    const setPasswordResponse = await setPassword({
      variables: {
        input: {
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        },
      },
    });

    if (createAccountResponse.errors || setPasswordResponse.errors) {
      setStatus("Something went wront. Please try again.");
      return;
    }

    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="1"
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ status }) => (
          <Form>
            <div className="flex flex-col sm:flex-row">
              <div className="mb-4 mr-0 sm:mr-2 w-full">
                <FormField
                  as={Input}
                  name="firstName"
                  size={["sm", "md"]}
                  placeholder="First name"
                />
              </div>
              <div className="mb-4 ml-0 sm:ml-2 w-full">
                <FormField
                  as={Input}
                  name="lastName"
                  size={["sm", "md"]}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="mb-4">
              <FormField
                as={Input}
                name="email"
                size={["sm", "md"]}
                placeholder="Email address"
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="mb-4 mr-0 sm:mr-2 w-full">
                <FormField
                  type="password"
                  name="password"
                  size={["sm", "md"]}
                  placeholder="Password"
                />
              </div>
              <div className="mb-4 ml-0 sm:ml-2 w-full">
                <FormField
                  type="password"
                  size={["sm", "md"]}
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <Error>{status}</Error>
            <SubmitButton size={["m", "l"]} variant="gradient" width="100%">
              Create Your Free Account
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
