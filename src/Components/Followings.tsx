import { navigate, RouteComponentProps } from '@reach/router'
import { APColumn, APExpanded, APRow, APScrollView, APText, showErrorDialog } from 'ap-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react'



export default function Followings(props: RouteComponentProps<{ _id: string }>) {
     const [userInfo, setUserInfo] = useState<any>()
     var token = localStorage.getItem("token");
     useEffect(() => {
          getfollowingListDetails();
     }, [])

     const getfollowingListDetails = async () => {
          try {
               const result = await axios.get("http://localhost:80/client/showUserToWhomIFollow", {
                    headers: {
                         'Authorization': `bearer ${token}`
                    }
               })
               setUserInfo(result.data)
          } catch (err) {
               console.log(err);
               showErrorDialog("You have Zero Friend Right Now")

          }
     }
     console.log("userInfo", userInfo);

     const navigateToUserProfile = (_id: string) => {
          navigate(`/usersProfile/${_id}`)
     }

     var followingList = userInfo?.[0]?.myFollowing;

     return (
          // <APColumn mainAxisSize='max' crossAxisAlignment='stretch'  >


          //      <APText style={{
          //           height: "100px",
          //           border: "1px solid black",
          //           backgroundColor: "#fff",
          //           fontSize: "20px",
          //           fontWeight: 500,
          //           textAlign: "center"
          //      }} >My following List </APText>
          //      <APExpanded>
          //           <APScrollView>

          //                {
          //                     followingList && followingList.length > 0
          //                          ?

          //                          followingList?.map((e: any, index: any) => {
          //                               return (
          //                                    <APRow mainAxisAlignment='center' style={{ border: "1px solid black", height: "100px" }} key={index}>
          //                                         <button style={{ height: "50px", width: "150px" }} onClick={() => navigateToUserProfile(e[0]._id)}  > {e[0].username}</button>
          //                                    </APRow>
          //                               )
          //                          }) : "You have Zero Followings right  now"
          //                }

          //           </APScrollView>
          //      </APExpanded>
          // </APColumn>
          <Custom title={'My Following List'} request={followingList} callParentcallbackNavigate={navigateToUserProfile} />
     )
}

export function Custom({ title, request, callParentcallbackNavigate }: { title: string, request: any[], callParentcallbackNavigate?: any }) {
     function callParentcallback(id: any) {
          callParentcallbackNavigate(id)
     }
     return (
          <APColumn mainAxisSize='max' crossAxisAlignment='stretch'  >


               <APText style={{
                    height: "100px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    fontSize: "20px",
                    fontWeight: 500,
                    textAlign: "center"
               }} >{title} </APText>
               <APExpanded>
                    <APScrollView>

                         {
                              request && request.length > 0
                                   ?

                                   request?.map((e: any, index: any) => {
                                        return (
                                             <APRow mainAxisAlignment='center' style={{ border: "1px solid black", height: "100px" }} key={index}>
                                                  <button style={{ height: "50px", width: "150px" }} onClick={() => callParentcallback(e[0]._id)}  > {e[0].username}</button>
                                             </APRow>
                                        )
                                   }) : "You have Zero Followings right  now"
                         }

                    </APScrollView>
               </APExpanded>
          </APColumn>
     )

}






















// import { navigate, RouteComponentProps } from '@reach/router'
// import { APColumn, APExpanded, APRow, APScrollView, APText, showErrorDialog } from 'ap-components';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import ShowFollower from './ShowFollower';

// export default function Followings(props: RouteComponentProps<{ _id: string }>) {
//      const [userInfo, setUserInfo] = useState<any>()
//      var token = localStorage.getItem("token");
//      useEffect(() => {
//           getfollowingListDetails();
//      }, [])

//      const getfollowingListDetails = async () => {
//           try {
//                const result = await axios.get("http://localhost:80/client/showUserToWhomIFollow", {
//                     headers: {
//                          'Authorization': `bearer ${token}`
//                     }
//                })
//                setUserInfo(result.data)
//           } catch (err) {
//                console.log(err);
//                showErrorDialog("You have Zero Friend Right Now")

//           }
//      }
//      const navigateToUserProfile = (_id: string) => {
//           navigate(`/usersProfile/${_id}`)
//      }

//      var followingList = userInfo?.[0]?.myFollowing;

//      return (
//           <APColumn mainAxisSize='max' crossAxisAlignment='stretch'  >


//                <APText style={{
//                     height: "100px",
//                     border: "1px solid black",
//                     backgroundColor: "#fff",
//                     fontSize: "20px",
//                     fontWeight: 500,
//                     textAlign: "center"
//                }} >My following List </APText>
//                <APExpanded>
//                     <APScrollView>




//                          {
//                               followingList && followingList.length > 0
//                                    ?

//                                    followingList?.map((e: any, index: any) => {
//                                         return (
//                                              <APRow mainAxisAlignment='center' style={{ border: "1px solid black", height: "100px" }} key={index}>
//                                                   <button style={{ height: "50px", width: "150px" }} onClick={() => navigateToUserProfile(e[0]._id)}  > {e[0].username}</button>
//                                              </APRow>
//                                         )
//                                    }) : "You have Zero Followings right  now"
//                          }

//                     </APScrollView>
//                </APExpanded>
//           </APColumn>
//      )
// }
