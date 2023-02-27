import { RouteComponentProps } from '@reach/router'
import { APButton, APColumn, APExpanded, APForm, APFormFieldText, APFormSubmit, APImage, APRow, APScrollView, APText, showErrorDialog, useAPForm } from 'ap-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CommentPage(props: RouteComponentProps<{ postId: string }>) {
     const [postDetails, setPostDetails] = useState<any>()
     const [commentSuccess, setCommentSucces] = useState<any>()
     const [allTheComments, setAllTheComments] = useState<any>()

     var postId = props.postId
     const [form,] = useState({
          text: "",
          postId: props.postId
     })

     var control = useAPForm();
     var token = localStorage.getItem("token");

     useEffect(() => {
          getSinglePostForComment(postId)
          getCommentsOfTheUsers(postId)

     }, [commentSuccess,])
     const getSinglePostForComment = async (postId: any) => {
          try {
               const result = await axios.get("http://localhost:80/client/showSinglePostDetailsForComment", {
                    params: postId,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setPostDetails(result.data)
          } catch (err) {
               console.log(err);
               showErrorDialog("Post Details Data Not found")

          }
     }

     const comment = async (form: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/comment", {}, {
                    params: form,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setCommentSucces(result.data)
          } catch (err) {

               showErrorDialog("Comment Details not Found")
          }
     }


     const getCommentsOfTheUsers = async (postId: any) => {
          try {
               const result = await axios.get("http://localhost:80/client/getCommentsOnThePost", {
                    params: props.postId,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setAllTheComments(result)
               console.log("result", result);

          } catch (err) {
               showErrorDialog("Could not get all the comment of users")
          }
     }
     let allUsersComment = allTheComments?.data?.allCommentOnPerticularPost?.[0]?.AllComments


     useEffect(() => {

     }, [allUsersComment])

     var userWhoPostedDetails = allTheComments?.data?.userWhoPostedDetails
     return (
          <APColumn mainAxisSize='max' crossAxisAlignment='stretch' >
               <APText style={{
                    height: "100px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    fontSize: "20px",
                    fontWeight: 500,
                    textAlign: "center",

               }} > Comments </APText>

               <APExpanded>
                    <APScrollView>

                         <APRow style={{ height: "100%", }}>
                              <APColumn style={{ height: "100%", }}>
                                   <APImage style={{ height: "100%", width: "100%", borderRadius: "15px", padding: "10px" }} src={`http://localhost:80/static/${postDetails?.image.split("/").slice(-1)}`} />
                                   <APRow
                                        style={{
                                             height: "10%",
                                             padding: "20px",
                                             fontWeight: 500,
                                             fontSize: "20px"
                                        }} >
                                        Description:
                                        <APText style={{
                                             fontWeight: 450,
                                             fontSize: "15px",
                                             marginTop: "7px",
                                             marginLeft: "15px"
                                        }} >{postDetails?.description} </APText>

                                   </APRow>
                              </APColumn>
                              <APRow crossAxisAlignment='start' style={{
                                   height: "100%",

                                   backgroundColor: "#fff"
                              }}>
                                   <APColumn>
                                        <APRow crossAxisAlignment='start' style={{
                                             height: "60px",
                                             paddingLeft: "20px",
                                             fontSize: "20px",
                                             fontWeight: 500,
                                             border: "0.5px solid gray",

                                        }}>
                                             {/* this APROW is created for making cricle */}
                                             <APRow mainAxisAlignment='spaceAround' style={{ height: "40px", width: "40px", marginTop: "5px", borderRadius: "50%", backgroundColor: "gray", }}>
                                                  <APText style={{ marginLeft: "190px", fontSize: "18px" }}>  {userWhoPostedDetails?.fullName}</APText>
                                             </APRow>
                                        </APRow>



                                        <APColumn style={{ height: "460px", }}>

                                             {
                                                  allUsersComment &&
                                                  allUsersComment.map((e: any, index: any) => {
                                                       return (
                                                            <APRow style={{
                                                                 height: "50px",
                                                                 width: "100%",

                                                                 margin: "5px",
                                                                 paddingLeft: "20px",
                                                                 border: "0.1px solid gray"
                                                            }} key={index} >
                                                                 <div style={{
                                                                      height: "25px",
                                                                      width: "25px",
                                                                      borderRadius: "50%",
                                                                      backgroundColor: "gray",
                                                                      margin: "10px 10px 0px 0px",
                                                                      marginTop: "5px",
                                                                      marginLeft: "4px",


                                                                 }} onClick={() => console.log(e.fullName)}>
                                                                 </div>
                                                                 <APText style={{ fontSize: "16px", fontWeight: 500, }} > {e.fullName}</APText>

                                                                 <APText style={{ fontSize: "13px", fontWeight: 450, marginLeft: "15px" }} > {e.text} </APText>

                                                            </APRow>
                                                       )
                                                  })
                                             }
                                        </APColumn>
                                        <APColumn>

                                             <APForm control={control}>
                                                  <APFormFieldText
                                                       style={{
                                                            height: "15px",
                                                            width: "380px",
                                                            marginTop: "35px",
                                                            marginLeft: "30px"
                                                       }}
                                                       label='Comment....'

                                                       onChanged={(v) => form.text = v}
                                                       validator={(v) => {
                                                            if (v.length === 0) {
                                                                 return 'Comment Required';
                                                            }
                                                            return null;
                                                       }}
                                                  />
                                                  <APFormSubmit
                                                       style={{
                                                            height: "50px",
                                                            width: "80px",
                                                            padding: "10px",
                                                            marginTop: "32px",
                                                            marginLeft: "30px",
                                                       }}
                                                       onClick={async () => {
                                                            if (await control.validate()) {
                                                                 try {
                                                                      comment(form)

                                                                 } catch (error) {
                                                                      if (error instanceof Error)
                                                                           showErrorDialog(error.message);
                                                                 }
                                                            }
                                                       }}
                                                  >
                                                       comment
                                                  </APFormSubmit>
                                             </APForm>


                                        </APColumn>
                                   </APColumn>
                              </APRow>
                         </APRow>
                    </APScrollView>
               </APExpanded>

          </APColumn>
     )
}
