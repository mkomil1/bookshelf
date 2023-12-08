import { Alert, Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomTextField } from "../ui/CustomTextField";
import { fetchUserInfo, postUserInfo } from "../api";
import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { setItem } from "../helpers/persistance-storage";
import * as yup from "yup";
import { Formik } from "formik";
import md5 from "md5";
import { googleSvg, facebookSvg } from "../assets/iconsSvg";
import { LoadingButton } from "@mui/lab";
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
  const { setUser, setIsLogged, isDisable, setIsDisable } = useMainContext();
  const [pageType, setPageType] = useState("register");
  const [errorMsg, setErrorMsg] = useState("");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    setIsDisable(true);
    try {
      const {
        data: { data },
      } = await postUserInfo(values);
      onSubmitProps.resetForm();
      setErrorMsg("");
      setIsDisable(false);
      if (data) {
        setPageType("login");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      setIsDisable(false);
    }
  };

  useEffect(() => {
    setIsDisable(false);
  }, [errorMsg]);

  const login = async (values, onSubmitProps) => {
    const { key, secret } = values;
    try {
      setIsDisable(true);
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
      setIsDisable(false);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      setIsDisable(false);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Box sx={{ padding: "10px 30px" }}>
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
                <LoadingButton
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
                  startIcon={googleSvg}
                  loadingPosition="start"
                  loading={isDisable}
                >
                  Continue with Google
                </LoadingButton>
                <LoadingButton
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
                  startIcon={facebookSvg}
                  loadingPosition="start"
                  loading={isDisable}
                >
                  Continue with Google
                </LoadingButton>
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
            
              <Box sx={{ width: "100%" }}>
                  {errorMsg && (
                <Alert sx={{ paddingY: "3px", width: "100%", mb: "7px" }} severity="error">
                  {errorMsg.replace("key", "userName")}
                </Alert>
              )}
                <LoadingButton
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
                  loadingPosition="start"
                  loading={isDisable}
                >
                  <span>{isLogin ? "Sign in" : "Sign up"}</span>
                </LoadingButton>
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
                      setIsDisable(false);
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
    </Box>
  );
};

export default Registry;
