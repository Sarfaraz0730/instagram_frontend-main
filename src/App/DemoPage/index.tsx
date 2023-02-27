import { Button } from '@material-ui/core'
import { RouteComponentProps, Router } from '@reach/router'
import { useAPForm, APScrollView, APColumn, APSizedBox, APText, APCard, APRow, APGrid, sleep, APStack, APAlign, APCenter, APForm, APFormFieldText, showSnackbar, showErrorDialog, APTable, APVirtualList, APAsyncButton, NArray, APExpanded } from 'ap-components'
import React, { useState } from 'react'
import CommentPage from '../../Components/CommentPage'
import EditPost from '../../Components/EditPost'
import FeedPage from '../../Components/FeedPage'
import Followings from '../../Components/Followings'
import FriendRequest from '../../Components/FriendRequest'
import { Login } from '../../Components/Login'
import PostImages from '../../Components/AddPost'
import SearchFriend from '../../Components/SearchFriend'
import ShowFollower from '../../Components/ShowFollower'
import { SignUp } from '../../Components/Sign'
import UsersProfile from '../../Components/UsersProfile'
import UserTimeline from '../../Components/UserTimeline'
import TestFriend from '../../Components/TestFriend'


export default function DemoPage(props: RouteComponentProps) {

    return (

        <APColumn mainAxisSize='max' crossAxisAlignment='stretch'>
            <APExpanded>
                <Router>

                    <SignUp path="/" />
                    <Login path="/login" />
                    <UserTimeline path="/timeline/" />
                    <SearchFriend path="/searchFriend" />
                    <FriendRequest path="/FriendRequest" />
                    <FeedPage path="/feedpage" />
                    <ShowFollower path="/followers" />
                    <Followings path="/followings" />
                    <UsersProfile path="/usersProfile/:_id" />
                    <PostImages path='/post' />
                    <CommentPage path="/commentPage/:postId" />
                    <EditPost path="editPage/:postId" />
                    <TestFriend path="/testfriend/:_id" />


                </Router>
            </APExpanded>
        </APColumn>
    )
}
