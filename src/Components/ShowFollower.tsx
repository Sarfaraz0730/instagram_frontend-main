import { navigate, RouteComponentProps } from '@reach/router'
import { APButton, APColumn, APExpanded, APRow, APScrollView, APText, showErrorDialog } from 'ap-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Custom } from './Followings';

export default function ShowFollower(props: RouteComponentProps<{ _id: string }>) {
     const [userInfo, setUserInfo] = useState<any>()
     var token = localStorage.getItem("token");
     useEffect(() => {
          getFriendListDetails();
     }, [])
     const getFriendListDetails = async () => {
          try {
               const result = await axios.get("http://localhost:80/client/showMyFriendList", {
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


     var friendList = userInfo?.[0]?.myFriendList;
     const navigateToUserProfile = (_id: string) => {
          navigate(`/usersProfile/${_id}`)
     }

     return (

          <Custom title={'Friend List'} request={friendList} callParentcallbackNavigate={navigateToUserProfile} />


     )
}




