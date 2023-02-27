


import { navigate, RouteComponentProps } from '@reach/router'
import { APAsyncButton, APButton, APColumn, APExpanded, APImage, APRow, APScrollView, APSizedBox, APText, Deferred, launchDialog, showErrorDialog } from 'ap-components'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function UserTimeline(props: RouteComponentProps<{ _id: string, username?: string, followers: number, followings: number }>) {
     const [userInfo, setUserInfo] = useState<any>()
     const [image, setImages] = useState<any>()
     const [allFriendPost, setAllFriendPost] = useState<any>()
     const [deletePost, setDeletePost] = useState<any>()

     var token = localStorage.getItem("token");

     useEffect(() => {
          getUserProfile();
          getImagesAndDescription()
          getAllFriendPostDetails()
     }, [deletePost]);

     async function getUserProfile() {
          try {
               if (token == null) {
                    navigate('/login');
                    throw new Error("Unathourized Access")
               }
               var res = await axios.get("http://localhost:80/client/getUserInfo", {
                    headers: {
                         'Authorization': `bearer ${token}`
                    }
               })
               setUserInfo(res.data)
          } catch (error) {
               showErrorDialog("User Details not Found")
          }
     }

     const getImagesAndDescription = async () => {
          try {
               const result = await axios.get("http://localhost:80/client/allPostOfSingleUser", {
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setImages(result)
          } catch (err) {
               showErrorDialog(" Images and Description not Found")
          }
     }

     var follower;
     var following;
     if (userInfo) {
          follower = userInfo.follower.length
          if (userInfo.following) {

               following = userInfo?.following?.length
          }
     }
     let userOwnPost = image?.data?.[0]?.allPost



     const navigatePostToCommentPage = (postId: string) => {
          navigate(`/commentPage/${postId}`)
     }
     const navigatePostToEditPage = (postId: string) => {
          navigate(`/editPage/${postId}`)
     }

     const getAllFriendPostDetails = async () => {
          try {
               const result = await axios.get("http://localhost:80/client/getImageAndDescription", {
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setAllFriendPost(result.data)
          } catch (err) {
               console.log(err);
          }
     }

     const deletePostToEditPage = async (postId: any) => {
          console.log("postId", postId);

          try {
               const result = await axios.delete("http://localhost:80/client/deletePost", {
                    params: postId,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setDeletePost(result.data)
          } catch (err) {
               console.log(err);

          }
     }
     console.log("deletePost", deletePost);

     return (
          <APColumn mainAxisSize='max' crossAxisAlignment='stretch'>
               <APRow mainAxisSize='max'>
                    <APRow mainAxisAlignment='start' crossAxisAlignment='start' style={{
                         height: "1000px",
                         width: "400px",
                         backgroundColor: "#fff",

                         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }}>
                         <APColumn style={{ marginLeft: "40px", marginTop: "120px" }}>
                              <APColumn crossAxisAlignment='start'>
                                   <APText style={{
                                        fontSize: "29px",
                                        fontWeight: 600,

                                   }}> <APImage style={{ height: "40px", marginTop: "30%" }} src={'/img/instagramTitle.png'} /></APText>
                              </APColumn>

                              <CustomTextForSidebar icon="/img/homeIcon.png" text={"Home"} endpoint={"/timeline"} />
                              <CustomTextForSidebar icon='/img/searchIcon.png' text={"Search"} endpoint={"/searchFriend"} />
                              <CustomTextForSidebar icon='/img/explore.png' text={"Explore"} endpoint={"/feedpage"} />
                              <CustomTextForSidebar icon='/img/messenger.png' text={"Messages"} endpoint={"/timeline"} />
                              <CustomTextForSidebar icon='/img/heart4.png' text={"Friend Request"} endpoint={"/FriendRequest"} />
                              <Profile text={"Profile"} />
                              <APColumn mainAxisAlignment='end' crossAxisAlignment='stretch' style={{ height: "28%", margin: "190px 0px 0px 0px" }}>
                                   <CustomTextForSidebar icon='/img/hamburger.png' text={"More"} endpoint={"/timeline"} />
                              </APColumn>
                         </APColumn>
                    </APRow>
                    <APColumn mainAxisSize='max' crossAxisAlignment='stretch' style={{ border: "0.1px solid gray", marginLeft: "10%", marginRight: "10%", backgroundColor: "#fff" }}>
                         <APExpanded>
                              <APScrollView>
                                   <APRow crossAxisAlignment='start' style={{ height: "200px", marginTop: "30px" }}>
                                        <APColumn crossAxisAlignment='start' style={{ width: "20%", height: "50%", marginTop: "30px" }} >
                                             {/* below APROw is for creating circle */}
                                             <APRow style={{ height: "100px", marginLeft: "50px", width: "100px", borderRadius: "50%", backgroundColor: "gray" }}>
                                             </APRow>
                                        </APColumn>

                                        <APColumn crossAxisAlignment='start' style={{ width: "80%", height: "50%", }}>
                                             <APRow crossAxisAlignment='center' style={{ height: "76px", }}>
                                                  <APText style={{ fontSize: "15px", fontWeight: 400 }} >{userInfo?.username}</APText>
                                                  <APSizedBox width='220px' />
                                                  <APButton style={{ width: "150px", height: "50px" }} onClick={() => { }}>Edit Profile</APButton>
                                                  <APSizedBox width='150px' />
                                                  <APImage style={{ height: "35px", backgroundColor: "#fff" }} src={"/img/userIcon.jpeg"} />
                                             </APRow>

                                             <APRow crossAxisAlignment='center' style={{ height: "226px", }}>
                                                  <APText onClick={() => navigate("/post")} style={{ fontSize: "15px", fontWeight: 400, width: "100px" }}>posts +  </APText>
                                                  <APSizedBox width='180px' />
                                                  {follower ?? 0} <APText onClick={() => navigate("/followers")} style={{ marginLeft: "10px", fontSize: "15px", fontWeight: 400 }}>followers</APText>
                                                  <APSizedBox width='180px' />

                                                  {following ?? 0} <APText onClick={() => navigate("/followings")} style={{ marginLeft: "10px", fontSize: "15px", fontWeight: 400 }}>followings</APText>

                                             </APRow>
                                             <APRow crossAxisAlignment='center' style={{ height: "66px", }}>
                                                  <APText style={{ fontSize: "15px", fontWeight: "bold" }}>{userInfo?.fullName ? userInfo?.fullName : userInfo?.username}</APText>
                                                  <APSizedBox width='175px' />
                                                  <APText onClick={() => navigate("/searchFriend")} style={{ color: "black", fontSize: "15px", fontWeight: 400, }}>search friend </APText>
                                                  <APSizedBox width='175px' />

                                                  <APText onClick={() => navigate("/feedpage")} style={{ color: "black", fontSize: "15px", fontWeight: 400 }}>feedpage</APText>

                                             </APRow>
                                        </APColumn>
                                   </APRow>

                                   <APColumn crossAxisAlignment='start' style={{ height: "50%", display: "flex", flexWrap: "wrap", flexFlow: "row wrap", }}>
                                        {
                                             userOwnPost && userOwnPost.length > 0
                                                  ?

                                                  userOwnPost?.map((e: any, index: any) => {
                                                       return (
                                                            <div style={{
                                                                 height: "320px",
                                                                 width: "29%",
                                                                 margin: "15px",

                                                                 boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                                            }} key={index}>

                                                                 <APRow >  <APImage style={{ height: "250px", width: "100%", }} src={`http://localhost:80/static/${e.image.split("/").slice(-1)}`} />
                                                                 </APRow>
                                                                 <APRow mainAxisAlignment='center' style={{ paddingRight: "0px" }} >


                                                                      {/* edit  */}
                                                                      <APRow onClick={() => navigatePostToEditPage(e._id)} style={{ height: "30px", width: "100px", marginLeft: "10px", fontSize: "16px", fontWeight: 500 }} >
                                                                           Edit
                                                                      </APRow>
                                                                      <APRow onClick={() => navigatePostToCommentPage(e._id)} style={{ height: "40px", marginLeft: "10px", width: "100px", fontSize: "16px", fontWeight: 500 }} >Comment</APRow>
                                                                 </APRow>
                                                                 <APRow onClick={() => deletePostToEditPage(e._id)} style={{ height: "30px", width: "100px", marginLeft: "10px", fontSize: "16px", paddingLeft: "5px", fontWeight: 500 }} >
                                                                      Delete
                                                                 </APRow>
                                                            </div>
                                                       )
                                                  }) : <APRow mainAxisAlignment='center' >Share Your Feeling and Thought  </APRow>
                                        }
                                   </APColumn>
                              </APScrollView>
                         </APExpanded>
                    </APColumn>
               </APRow>
          </APColumn>
     )
}
function CustomTextForSidebar(props: { icon: string, text: String, endpoint: string }) {
     return (

          <APRow onClick={() => navigate(props.endpoint)} style={{ marginTop: "40px" }} >
               <APImage style={{ height: "25px" }} src={props.icon} />
               <APText style={{
                    marginLeft: "20px",
                    fontSize: "15px",
                    fontWeight: 400,

               }}>{props.text}
               </APText>
          </APRow>

     )
}
function Profile(props: { icon?: string, text: String }) {
     return (

          <APRow onClick={() => navigate("/timeline")} style={{ marginTop: "40px" }} >
               <div style={{ height: "27px", width: "30px", borderRadius: "50%", backgroundColor: "gray" }}></div>

               <APText style={{
                    marginLeft: "20px",
                    fontSize: "15px",
                    fontWeight: 400,

               }}>{props.text}
               </APText>
          </APRow>

     )
}