
import { navigate, RouteComponentProps } from '@reach/router'
import { APButton, APCenter, APColumn, APExpanded, APForm, APFormFieldText, APFormSubmit, APImage, APRow, APScrollView, APText, showErrorDialog, showSnackbar, sleep, useAPForm } from 'ap-components';
import axios from 'axios';
import React, { useState } from 'react'

export const Login = (props: RouteComponentProps) => {
     var control = useAPForm();
     const [form, setForm] = useState({

          email: "",
          password: "",


     })
     const styleInput: any = {
          height: "15px",
          width: "380px",
          marginTop: "50px",
          marginLeft: "40px"
     }
     const styleButton = {
          height: "50px",
          width: "380px",
          padding: "10px",
     }

     const loginAuth = async (form: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/login", form)
               localStorage.setItem("token", result.data.token);
               if (result.data.token) {
                    showSnackbar("Login Successful")
                    navigate("/timeline")
               }
          } catch (err) {
               console.log(err);
               showErrorDialog("Invalid email and password")
               navigate("/login")

          }
     }

     const handleChange = (e: any) => {
          const { name, value } = e.target;
          setForm({
               ...form,
               [name]: value,
          });
     }


     return (
          <APColumn mainAxisSize='max' crossAxisAlignment='stretch'>
               <APExpanded>
                    <APCenter>
                         <APScrollView style={{ marginTop: "10px" }}>
                              {/* box shadow  */}
                              <APColumn style={{
                                   height: "450px",
                                   width: "550px",
                                   marginTop: "20px",
                                   backgroundColor: "#fff",
                                   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                              }}>
                                   <APImage style={{ height: "70px" }} src={'/img/instagramTitle.png'} />
                                   <APForm control={control}>
                                        <APColumn crossAxisAlignment="stretch">

                                             <APFormFieldText
                                                  style={{
                                                       height: styleInput.height,
                                                       width: styleInput.width,
                                                       marginTop: styleInput.marginTop,
                                                       marginLeft: styleInput.marginLeft
                                                  }}
                                                  label='Email address'

                                                  onChanged={(v) => form.email = v}
                                                  validator={(v) => {
                                                       if (v.length === 0) {
                                                            return 'Email required';
                                                       }
                                                       return null;
                                                  }}
                                             />
                                             <APFormFieldText
                                                  style={{
                                                       height: styleInput.height,
                                                       width: styleInput.width,
                                                       marginTop: styleInput.marginTop,
                                                       marginLeft: styleInput.marginLeft
                                                  }}
                                                  label='Password'
                                                  obscureText

                                                  onChanged={(v) => form.password = v}
                                                  validator={(v) => {
                                                       if (v.length === 0) {
                                                            return 'Password required';
                                                       }
                                                       return null;
                                                  }}
                                             />
                                             <APFormSubmit
                                                  style={{
                                                       height: styleButton.height,
                                                       width: styleButton.width,
                                                       padding: styleButton.padding,
                                                       marginTop: "50px",
                                                       marginLeft: "30px"
                                                  }}
                                                  onClick={async () => {
                                                       if (await control.validate()) {
                                                            try {


                                                                 loginAuth(form)

                                                            } catch (error) {
                                                                 if (error instanceof Error)
                                                                      showErrorDialog(error.message);
                                                            }
                                                       }
                                                  }}
                                             >
                                                  Login
                                             </APFormSubmit>

                                             <APButton
                                                  style={{
                                                       height: styleButton.height,
                                                       width: styleButton.width,
                                                       padding: styleButton.padding,
                                                       marginTop: "30px",
                                                       marginLeft: "30px"
                                                  }}
                                                  onClick={async () => {
                                                       navigate("/")
                                                  }}
                                             >
                                                  Don't have an account ? Signup
                                             </APButton>
                                        </APColumn>
                                   </APForm>
                              </APColumn>
                         </APScrollView>

                    </APCenter>
               </APExpanded>

          </APColumn>

     )
}
