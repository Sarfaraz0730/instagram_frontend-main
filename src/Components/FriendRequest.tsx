import { RouteComponentProps } from '@reach/router'
import { APButton, APColumn, APExpanded, APRow, APScrollView, APText, showErrorDialog } from 'ap-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Custom } from './Followings';

export default function FriendRequest(props: RouteComponentProps) {

     const [userInfo, setUserInfo] = useState<any>()
     const [acceptFriendRequest, setAcceptFriendRequest] = useState<any>()
     const [rejectFriendRequest, setRejectFriendRequest] = useState<any>()

     var token = localStorage.getItem("token");
     useEffect(() => {
          getfriendRequestDetails();
     }, [acceptFriendRequest, rejectFriendRequest])
     const getfriendRequestDetails = async () => {
          try {
               const result = await axios.get("http://localhost:80/client/friendRequestDetails", {
                    headers: {
                         'Authorization': `bearer ${token}`
                    }
               })
               setUserInfo(result.data)
          } catch (err) {
               console.log(err);
               showErrorDialog("There is no Friend Reqeust Details")
          }
     }

     const friendRequestArray = userInfo?.[0].friendRequestData

     const handleAcceptFriendRequest = async (_id: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/acceptFriend", {}, {
                    params: _id,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setAcceptFriendRequest(result)
          } catch (err) {
               console.log(err);
          }
     }

     const handleRejectFriendRequest = async (username: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/rejectFriend", {}, {
                    params: username,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setRejectFriendRequest(result)
          }
          catch (err) {

               showErrorDialog("Friend Request Did not get cancellled")

          }
     }

     return (
          <APColumn mainAxisSize='max' crossAxisAlignment='stretch' >
               <APText style={{
                    height: "100px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    fontSize: "20px",
                    fontWeight: 500,
                    textAlign: "center"
               }} > Friend Request</APText>
               <APExpanded>
                    <APScrollView  >
                         <APColumn mainAxisAlignment='center' crossAxisAlignment='center' style={{
                              height: "160px",
                              backgroundColor: "#fff",
                              marginTop: "10px"
                         }}>
                              {
                                   friendRequestArray && friendRequestArray.length > 0
                                        ?
                                        friendRequestArray.map((e: any, index: any) => {
                                             return (
                                                  <APRow mainAxisAlignment='center' style={{
                                                       height: "70px",
                                                       border: "0.1px solid gray",
                                                       marginTop: "10px",
                                                       padding: "5px"
                                                  }} key={index}>
                                                       {e.friendRequestDetailsFromFR_id.username}
                                                       <APButton style={{ marginLeft: "30px", marginRight: "30px" }} onClick={() => handleAcceptFriendRequest(e.friendRequestDetailsFromFR_id._id)}>Accept</APButton>
                                                       <APButton onClick={() => handleRejectFriendRequest(e.friendRequestDetailsFromFR_id.username)} >reject</APButton> </APRow>
                                             )
                                        }) : "You have no Friend Request"
                              }
                         </APColumn>
                    </APScrollView>
               </APExpanded>
          </APColumn>


     )
}
