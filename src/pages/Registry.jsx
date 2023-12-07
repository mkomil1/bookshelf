import {
  Alert,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { CustomTextField } from "../ui/CustomTextField";
import { fetchUserInfo, postUserInfo } from "../api";
import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { setItem } from "../helpers/persistance-storage";
import * as yup from "yup";
import { Formik } from "formik";
import md5 from "md5";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  key: yup.string().required("required"),
  secret: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  key: yup.string().required("required"),
  secret: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  key: "",
  secret: "",
};

const initialValuesLogin = {
  key: "",
  secret: "",
};

const Registry = () => {
  const { setUser, setIsLogged } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [pageType, setPageType] = useState("register");
  const [errorMsg, setErrorMsg] = useState("");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    try {
      const {
        data: { data },
      } = await postUserInfo(values);
      onSubmitProps.resetForm();
      setErrorMsg("");
      if (data) {
        setPageType("login");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
    }
  };

  const login = async (values, onSubmitProps) => {
    const { key, secret } = values;
    try {
      const header = {
        Key: key,
        Sign: md5(`GET/myself${secret}`),
      };
      const {
        data: { data },
      } = await fetchUserInfo(header);
      setUser(data);
      setItem("key", data.key);
      setItem("primaryKey", data.secret);
      setIsLogged(Boolean(data.key));
      onSubmitProps.resetForm();
      setErrorMsg("");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              width: "432px",
              padding: { xs: "20px 18px ", xl: "48px 28px" },
              backgroundColor: "#FEFEFE",
              borderRadius: "12px",
              boxShadow: "0px 4px 32px 0px rgba(51, 51, 51, 0.04)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: "10px", xl: "36px" },
            }}
          >
            <Typography
              variant="h4"
              fontSize={"36px"}
              fontStyle={"normal"}
              fontWeight={700}
            >
              Sign up
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: { xs: "12px", xl: "16px" },
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  borderColor: "black",
                  color: "black",
                  padding: "10px 24px",
                  textTransform: "none",
                  lineHeight: "0",
                  fontSize: 16,
                }}
                variant="outlined"
                startIcon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginRight: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.16 12.1932C20.16 11.5905 20.1059 11.0109 20.0055 10.4546H12V13.7425H16.5745C16.3775 14.805 15.7786 15.7053 14.8784 16.308V18.4407H17.6254C19.2327 16.9609 20.16 14.7819 20.16 12.1932Z"
                      fill="#4285F4"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 20.5C14.295 20.5 16.2191 19.7389 17.6255 18.4407L14.8784 16.308C14.1173 16.818 13.1436 17.1193 12 17.1193C9.78612 17.1193 7.91226 15.6241 7.24384 13.615H4.40407V15.8173C5.80271 18.5953 8.67726 20.5 12 20.5Z"
                      fill="#34A853"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.24385 13.6151C7.07385 13.105 6.97726 12.5603 6.97726 12C6.97726 11.4398 7.07385 10.895 7.24385 10.385V8.18277H4.40407C3.82839 9.33027 3.49998 10.6285 3.49998 12C3.49998 13.3716 3.82839 14.6698 4.40407 15.8173L7.24385 13.6151Z"
                      fill="#FBBC05"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 6.88072C13.2479 6.88072 14.3684 7.30958 15.2493 8.15186L17.6873 5.7139C16.2152 4.3423 14.2911 3.50003 12 3.50003C8.67726 3.50003 5.80271 5.40481 4.40407 8.18277L7.24384 10.385C7.91225 8.37595 9.78612 6.88072 12 6.88072Z"
                      fill="#EA4335"
                    />
                  </svg>
                }
              >
                Continue with Google
              </Button>
              <Button
                sx={{
                  width: "100%",
                  borderColor: "black",
                  color: "black",
                  padding: "10px 24px",
                  textTransform: "none",
                  lineHeight: "0",
                  fontSize: 16,
                }}
                variant="outlined"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginRight: "10px" }}
                  >
                    <path
                      d="M10.5 20.9C6.25 20.15 3 16.45 3 12C3 7.05 7.05 3 12 3C16.95 3 21 7.05 21 12C21 16.45 17.75 20.15 13.5 20.9L13 20.5H11L10.5 20.9Z"
                      fill="url(#paint0_linear_7351_161)"
                    />
                    <path
                      d="M15.5 14.5L15.9 12H13.5V10.25C13.5 9.55 13.75 9 14.85 9H16V6.7C15.35 6.6 14.65 6.5 14 6.5C11.95 6.5 10.5 7.75 10.5 10V12H8.25V14.5H10.5V20.85C11 20.95 11.5 21 12 21C12.5 21 13 20.95 13.5 20.85V14.5H15.5Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_7351_161"
                        x1="12"
                        y1="20.377"
                        x2="12"
                        y2="3"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#0062E0" />
                        <stop offset="1" stopColor="#19AFFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                }
              >
                Continue with Google
              </Button>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Divider sx={{ width: "40%", backgroundColor: "black" }} />
              <Typography>OR</Typography>
              <Divider sx={{ width: "40%", backgroundColor: "black" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                gap: "16px",
              }}
            >
              {isRegister && (
                <>
                  <CustomTextField
                    label="Your name"
                    name="name"
                    size="medium"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <CustomTextField
                    label="Your Email"
                    name="email"
                    size="medium"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </>
              )}
              <CustomTextField
                label="Your username"
                name="key"
                size="medium"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.key}
                error={Boolean(touched.key) && Boolean(errors.key)}
                helperText={touched.key && errors.key}
              />
              <CustomTextField
                label="Your password"
                name="secret"
                type="password"
                size="medium"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.secret}
                error={Boolean(touched.secret) && Boolean(errors.secret)}
                helperText={touched.secret && errors.secret}
              />
            </Box>
            {errorMsg && (
              <Alert sx={{ paddingY: "3px", width: "100%" }} severity="error">
                {errorMsg.replace("key", "userName")}
              </Alert>
            )}
            <Box sx={{ width: "100%" }}>
              <Button
                sx={{
                  width: "100%",
                  borderColor: "black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  padding: "10px 24px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#6200EE",
                  },
                  fontSize: 16,
                  backgroundColor: "#6200EE",
                }}
                variant="contained"
                type="submit"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "12px",
                  gap: "4px",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 300,
                }}
              >
                <Typography
                  sx={{ fontSize: 16, fontWeight: 300, color: "#333333" }}
                >
                  {isLogin ? "Don't an account?" : "Already signed up?"}
                </Typography>
                <Link
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                    setErrorMsg("");
                  }}
                  style={{ color: "#6200EE" }}
                >
                  Go to sign {isLogin ? "up" : "in"}.
                </Link>
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Registry;
