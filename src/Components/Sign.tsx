
import { navigate, RouteComponentProps } from '@reach/router'
import { APButton, APCenter, APColumn, APExpanded, APForm, APFormFieldText, APFormSubmit, APImage, APRow, APScrollView, APText, showErrorDialog, showSnackbar, sleep, useAPForm } from 'ap-components'
import axios from 'axios';
import React, { useState } from 'react'

export const SignUp = (props: RouteComponentProps) => {
     var control = useAPForm();
     const [form, setForm] = useState({
          username: "",
          fullName: "",
          password: "",
          email: "",
          phoneNumber: ""

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

     const register = async (form: any) => {
          try {
               await axios.post("http://localhost:80/client/signup", form)
               showSnackbar("You have siccessfully signed in")

          } catch (err) {
               console.log(err);
               showErrorDialog("User with this name exist")
               navigate("/")

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

                         <APScrollView style={{ marginTop: "50px" }}>
                              <APColumn style={{
                                   height: "620px",
                                   width: "500px",
                                   marginTop: "20px",
                                   backgroundColor: "#fff",
                                   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                              }}>

                                   <APImage style={{ height: "70px", }} src={'/img/instagramTitle.png'} />
                                   <APText style={{ fontWeight: "bold", color: "rgb(142,142,142)", fontSize: "17px", lineHeight: "20px" }}> Sign up to see photos and videos <br />
                                        from your friends.</APText>


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
                                                  label='Fullname'
                                                  onChanged={(v) => form.fullName = v}
                                                  validator={(v) => {
                                                       if (v.length === 0) {
                                                            return 'Fullname required';
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
                                                  label='Username'
                                                  onChanged={(v) => form.username = v}
                                                  validator={(v) => {
                                                       if (v.length === 0) {
                                                            return 'Username required';
                                                       }
                                                       return null;
                                                  }}
                                             />
                                             <APFormFieldText
                                                  obscureText
                                                  style={{
                                                       height: styleInput.height,
                                                       width: styleInput.width,
                                                       marginTop: styleInput.marginTop,
                                                       marginLeft: styleInput.marginLeft
                                                  }}
                                                  label='Password'

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
                                                       marginLeft: "40px"
                                                  }}
                                                  onClick={async () => {
                                                       if (await control.validate()) {
                                                            try {


                                                                 register(form)
                                                                 navigate("/login")
                                                            } catch (error) {
                                                                 if (error instanceof Error)
                                                                      showErrorDialog(error.message);
                                                            }
                                                       }
                                                  }}
                                             >
                                                  Sign Up
                                             </APFormSubmit>
                                             <APButton
                                                  style={{
                                                       height: styleButton.height,
                                                       width: styleButton.width,
                                                       padding: styleButton.padding,
                                                       marginLeft: "40px",
                                                       marginTop: "30px"
                                                  }}
                                                  onClick={() => navigate("/login")}

                                             >
                                                  Already have an Account ? Login
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
