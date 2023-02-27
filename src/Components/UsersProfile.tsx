

import { navigate, RouteComponentProps } from '@reach/router'
import { APAsyncButton, APButton, APColumn, APExpanded, APImage, APRow, APScrollView, APSizedBox, APText, Deferred, launchDialog, showErrorDialog } from 'ap-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UsersProfile(props: RouteComponentProps<{ _id: string }>) {

     const userId = props._id
     const [data, setData] = useState<any>()
     const [allPost, setAllPost] = useState<any>()

     useEffect(() => {
          getUserDetailsOnProfilePage(userId)
          getAllThePostOnTimeLinePage(userId)

     }, [])

     var token = localStorage.getItem("token");
     const getUserDetailsOnProfilePage = async (_id: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/usersTime", {}, {
                    params: _id,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setData(result.data)
          } catch (err) {
               showErrorDialog("User Details Not Found")
          }
     }

     const getAllThePostOnTimeLinePage = async (userId: any) => {
          try {
               const result = await axios.get("http://localhost:80/client/showAllThePostOfTimelineUser", {
                    params: userId,

                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setAllPost(result)
          } catch (err) {
               console.log(err);
               showErrorDialog("Post not found")
          }
     }

     const postDetails = allPost?.data?.[0]?.allPost
     console.log("data", data);

     var follower;
     var following;
     if (data) {
          follower = data.follower.length
          if (data.following) {

               following = data?.following?.length
          }
     }
     const navigatePostToCommentPage = (postId: string) => {
          navigate(`/commentPage/${postId}`)
     }

     return (

          <APRow style={{ height: "100%" }}>
               {/* left side bar start  */}
               <APRow mainAxisSize='max' crossAxisAlignment='stretch' style={{
                    width: "30%",
                    backgroundColor: "#fff",
                    height: "100%",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
               }} >

                    <APColumn crossAxisAlignment='start' style={{ margin: "20px", height: "100%" }}>
                         <APText style={{
                              fontSize: "29px",
                              fontWeight: 600,
                              marginTop: "5%"
                         }}> <APImage style={{ height: "40px" }} src={'/img/instagramTitle.png'} /></APText>


                         <CustomTextForSidebar icon="/img/homeIcon.png" text={"Home"} endpoint={"/timeline"} />
                         <CustomTextForSidebar icon='/img/searchIcon.png' text={"Search"} endpoint={"/searchFriend"} />
                         <CustomTextForSidebar icon='/img/explore.png' text={"Explore"} endpoint={"/feedpage"} />
                         <CustomTextForSidebar icon='/img/messenger.png' text={"Messages"} endpoint={"/timeline"} />
                         <CustomTextForSidebar icon='/img/heart4.png' text={"Friend Request"} endpoint={"/FriendRequest"} />

                         <Profile text={"Profile"} />

                    </APColumn>
               </APRow>

               {/* left side bar end */}


               {/* main profile div start  */}
               <APRow mainAxisSize='max' crossAxisAlignment='stretch' style={{ height: "100%" }}>
                    <APExpanded>
                         <APScrollView>
                              <APColumn style={{
                                   width: "90%",
                                   height: "100%",
                                   marginLeft: "10%",
                                   backgroundColor: "#fff",


                              }} >
                                   <APRow style={{ height: "200px", marginTop: "5%", }}>


                                        <div style={{
                                             height: "120px",
                                             width: "120px",
                                             borderRadius: "50%",

                                             marginLeft: "20px",
                                             backgroundColor: "#eeeded"
                                        }}>

                                        </div>



                                        <APColumn>
                                             <APRow style={{
                                                  height: "50px",
                                                  paddingLeft: "30px",
                                                  width: "700px",
                                                  paddingRight: "20px"


                                             }}>
                                                  <APText style={{
                                                       fontSize: "15px", fontWeight: 400,
                                                       color: "#1c1e21"
                                                  }} > {data?.username}
                                                  </APText>
                                                  <APSizedBox width='170px' />
                                                  <APButton onClick={() => { }} >Following</APButton>
                                                  <APSizedBox width='210px' />

                                                  <APButton onClick={() => { }} >Message</APButton>
                                                  <APImage style={{ height: "30px", marginLeft: "20px" }} src={"/img/plusPeople.png"} />
                                             </APRow>











                                             <APRow style={{
                                                  height: "50px", paddingLeft: "30px",
                                                  width: "700px",
                                                  paddingRight: "20px"
                                             }}>

                                                  <APText style={{
                                                       fontSize: "15px",
                                                       fontWeight: 400,
                                                  }} >post</APText>
                                                  <APSizedBox width='215px' />

                                                  <APText onClick={() => navigate("/followers")} > {data?.follower?.length}  </APText>   <APText style={{ marginLeft: "10px" }} >follower</APText>


                                                  <APSizedBox width='200px' />
                                                  <APText onClick={() => navigate("/followings")} style={{
                                                       fontSize: "15px",
                                                       fontWeight: 400,
                                                  }} >  {following ?? 0}  </APText>   <APText style={{ marginLeft: "10px" }} >following</APText>
                                             </APRow>
                                             <APRow style={{
                                                  height: "50px",
                                                  paddingLeft: "30px",
                                                  fontSize: "15px",
                                                  fontWeight: 500,
                                                  width: "700px",
                                                  paddingRight: "20px"

                                             }}>
                                                  <APText>{data?.fullName ? data?.fullName : data?.username} </APText> <br />

                                             </APRow>
                                        </APColumn>
                                   </APRow>

                                   <APRow crossAxisAlignment='start'
                                        style={{ marginTop: "50px", display: "flex", flexWrap: "wrap", flexFlow: "row wrap", backgroundColor: "#fff" }}>
                                        {
                                             postDetails &&
                                             postDetails.map((e: any, index: any) => {
                                                  return (
                                                       <APColumn crossAxisAlignment='start' style={{
                                                            height: "250px",
                                                            width: "29%",
                                                            margin: "15px",

                                                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                                       }}>
                                                            <APImage style={{ height: "250px", width: "100%" }} src={`http://localhost:80/static/${e.image.split("/").slice(-1)}`} />
                                                            <APRow style={{ height: "50px", paddingLeft: "10px", fontSize: "16px", fontWeight: 500 }}>   <APRow mainAxisAlignment='center' onClick={() => navigatePostToCommentPage(e._id)} > View </APRow> </APRow>
                                                       </APColumn>
                                                  )
                                             })
                                        }
                                   </APRow>
                              </APColumn>
                         </APScrollView>
                    </APExpanded>
               </APRow>
               {/* main profile div end  */}

          </APRow>
          // <UserTimeline _id={props._id} />

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
