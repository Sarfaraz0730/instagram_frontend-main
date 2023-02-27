import { Badge } from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router'
import { APButton, APCard, APColumn, APExpanded, APImage, APRow, APScrollView, APSizedBox, APText, showErrorDialog } from 'ap-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function FeedPage(props: RouteComponentProps) {
     const [allFriendPost, setAllFriendPost] = useState<any>()
     const [singlePostData, setSinglePostData] = useState<any>()


     var token = localStorage.getItem("token");
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
               showErrorDialog("Friends Post Details not Found")
          }
     }
     var friendPost = allFriendPost?.[0]?.allMyFriendPost


     const navigatePostToCommentPage = (postId: string) => {
          navigate(`/commentPage/${postId}`)
     }

     const likeFriendPost = async (postId: any) => {
          try {
               const result = await axios.patch("http://localhost:80/client/like", {}, {
                    params: postId,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setSinglePostData(result.data)
          } catch (err) {
               console.log(err);
               showErrorDialog("Could not like")

          }
     }
     var authUserId = allFriendPost?.[0]?.allMyFriendPost?.[0]?.authUserId
     var isLiked: Boolean = singlePostData?.likes?.includes(authUserId)


     useEffect(() => {
          getAllFriendPostDetails()
     }, [isLiked])

     return (
          <APColumn mainAxisSize='max' crossAxisAlignment='stretch'  >

               <APText style={{
                    height: "100px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    fontSize: "20px",
                    fontWeight: 500,
                    textAlign: "center"
               }} >FeedPage</APText>
               <APExpanded>
                    <APScrollView>
                         <APColumn mainAxisAlignment='center' crossAxisAlignment='center' style={{
                              width: "30%",
                              marginLeft: "35%",
                              marginRight: "25%",
                              backgroundColor: "#fff",
                              boxShadow: "inset 1px 1px 0 #aaa, inset 0 -1px 0 #aaa;"
                         }}>



                              {
                                   friendPost && friendPost.length > 0
                                        ?

                                        friendPost?.map((e: any, index: any) => {
                                             return (
                                                  <APRow mainAxisAlignment='center' key={index} style={{ marginTop: "20px", height: "370px", border: "0.1px solid gray" }}>
                                                       <APColumn >
                                                            <APText style={{ fontSize: "20px", fontWeight: 600 }}>{e.friendName}</APText>
                                                            <APImage style={{ height: "250px", width: "100%" }} src={`http://localhost:80/static/${e.friendPostedImage.split("/").slice(-1)}`} />
                                                            <APSizedBox height='20px' />
                                                            <APRow mainAxisAlignment="spaceAround" >
                                                                 <Badge badgeContent={e.likes.length}>
                                                                      <button
                                                                           style={{
                                                                                height: "50px",
                                                                                width: "80px",
                                                                                border: "none",
                                                                           }}
                                                                           onClick={() => likeFriendPost(e.postId)}  > {e.likes.includes(e.authUserId) ? "Dislike" : "Like"} </button>
                                                                 </Badge>
                                                                 <button style={{
                                                                      height: "50px",
                                                                      width: "80px",
                                                                      border: "none"
                                                                 }} >   Comment</button>


                                                            </APRow>

                                                       </APColumn>
                                                  </APRow>
                                             )
                                        }) : "No Post Available"
                              }


                         </APColumn>
                    </APScrollView>
               </APExpanded>
          </APColumn>
     )
}


