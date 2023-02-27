import { navigate, RouteComponentProps } from '@reach/router'
import { APButton, APColumn, APForm, APFormFieldText, APFormSubmit, APImage, APRow, APSizedBox, showErrorDialog, showSnackbar, useAPForm } from 'ap-components'
import axios from 'axios'
import React, { useState } from 'react'

export default function SearchFriend(props: RouteComponentProps) {
     var control = useAPForm();
     const [data, setData] = useState<any>()
     const [friendRequest, setFriendRequest] = useState<any>()
     const [active, setActive] = useState(false);

     const [form, setForm] = useState({
          username: "",
     })
     const handleChange = (e: any) => {
          const { name, value } = e.target;
          setForm({
               ...form,
               [name]: value,
          });
     }
     const token = localStorage.getItem("token");
     const handleSearch = async (form: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/searchFriend", {}, {
                    params: form,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },

               })
               setData(result.data)
               showSnackbar("Found")


          } catch (err) {
               showErrorDialog("User not found")
          }
     }

     const handleSendfriendRequest = async (form: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/sendFriendRequest", {}, {
                    params: form,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setFriendRequest(result)
               setActive(!active);
               showSnackbar("Request sent")
          } catch (err) {
               showErrorDialog("Friend request already sent")
          }
     }

     return (
          <div>
               <APRow crossAxisAlignment='center' style={{ height: "70px", border: "1px solid black", backgroundColor: "#fff" }}>
                    <APSizedBox width='100px' />
                    <div onClick={() => navigate("/timeline")} ><APImage style={{ height: "40px", marginLeft: "230px", }} src={"/img/instacolorlogo.jpeg"} /></div>
                    <APImage style={{ height: "30px", marginLeft: "20px", }} src={"/img/line.png"} />
                    <APImage style={{ height: "46px", width: "100px", marginLeft: "10px", }} src={"/img/instatext.png"} />
                    <APRow crossAxisAlignment='end'  >
                         <APForm control={control}>
                              <APFormFieldText
                                   style={{
                                        marginTop: "30px",
                                        height: "15px",
                                        width: "280px",
                                   }}
                                   label='Search Friend'
                                   onChanged={(v) => form.username = v}
                                   validator={(v) => {
                                        if (v.length === 0) {
                                             return 'Input required';
                                        }
                                        return null;
                                   }}
                              />
                              <APFormSubmit
                                   style={{
                                        width: "80px",
                                        marginLeft: "10px",
                                        backgroundColor: "blue",
                                        marginTop: "30px",
                                        marginBottom: "30px"
                                   }}
                                   onClick={async () => {
                                        if (await control.validate()) {
                                             try {
                                                  handleSearch(form)
                                             } catch (error) {
                                                  if (error instanceof Error)
                                                       showErrorDialog(error.message);
                                             }
                                        }
                                   }}

                              >
                                   Search
                              </APFormSubmit>
                         </APForm>
                    </APRow>
                    <APImage style={{ marginLeft: "100px", height: "30px" }} src={"/img/navIcon.png"} />
                    <APImage style={{ height: "30px", marginLeft: "20px" }} src={"/img/heart4.png"} />
                    <div onClick={() => navigate("/FriendRequest")} style={{ marginLeft: "20px" }}><APImage style={{ height: "30px" }} src={"/img/userIcon.jpeg"} /></div>
                    <APSizedBox width='100px' />
               </APRow>
               <APRow mainAxisAlignment='center' style={{
                    height: "80px",
                    backgroundColor: "#fff",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
               }}>
                    <div style={{
                         height: "50px",
                         width: "50px",
                         borderRadius: "50%",
                         backgroundColor: "gray",
                         margin: "20px",
                    }}></div>
                    {data?.username ? data?.username : "Search"}
                    <APFormSubmit
                         style={{

                              marginLeft: "10px",
                              backgroundColor: "blue",
                              margin: "30px",

                         }}
                         onClick={async () => {
                              if (await control.validate()) {
                                   try {
                                        handleSendfriendRequest(form)
                                   } catch (error) {
                                        if (error instanceof Error)
                                             showErrorDialog(error.message);
                                   }
                              }
                         }}

                    >
                         {active ? "pending" : "Send Friend request"}
                    </APFormSubmit>
               </APRow>
          </div >
     )
}
