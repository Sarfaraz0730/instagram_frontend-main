import { RouteComponentProps } from '@reach/router'
import { APColumn, APForm, APFormFieldText, APFormSubmit, APImage, APRow, APText, showErrorDialog, showSnackbar, useAPForm } from 'ap-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function EditPost(props: RouteComponentProps<{ postId: string }>) {
     const [postDetails, setPostDetails] = useState<any>()
     const [postEdit, setPostEdit] = useState<any>()
     const [form,] = useState({
          description: "",
          postId: props.postId
     })

     var control = useAPForm();

     var token = localStorage.getItem("token");
     const postId = props.postId;

     useEffect(() => {
          getSinglePostDetails(postId)
          EditDescription(form)
     }, [postEdit,])

     const getSinglePostDetails = async (postId: any) => {
          try {
               var result = await axios.get("http://localhost:80/client/showSinglePostDetailsForComment", {
                    params: postId,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               })
               setPostDetails(result.data)


          } catch (err) {
               console.log(err);
               showErrorDialog("Single Post Details not Found")


          }
     }


     const EditDescription = async (form: any) => {
          try {
               const result = await axios.patch("http://localhost:80/client/updatePostDescription", {}, {
                    params: form,
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },

               })
               setPostEdit(result.data)
               showSnackbar("Your Post has been edited")
          } catch (err) {
               console.log(err);


          }

     }

     return (

          <APColumn style={{ height: "600px", border: "1px solid black" }} >
               <APImage style={{ height: "400px", padding: "10px", width: "30%" }} src={`http://localhost:80/static/${postDetails?.image.split("/").slice(-1)}`} />
               <APText style={{ fontSize: "14px", fontWeight: 450, marginLeft: "20px", textOverflow: "ellipsis" }}>Description: {postDetails?.description} </APText>
               <APForm control={control}>
                    <APFormFieldText
                         style={{
                              height: "15px",
                              width: "250px",

                              marginLeft: "15px",
                              marginBottom: "20px",

                         }}
                         label='Edit Description'

                         onChanged={(v) => form.description = v}
                         validator={(v) => {
                              if (v.length === 0) {
                                   return 'Input required';
                              }
                              return null;
                         }}
                    />
                    <APFormSubmit
                         style={{
                              height: "50px",
                              width: "80px",
                              padding: "10px",

                              marginLeft: "30px",


                         }}
                         onClick={async () => {
                              if (await control.validate()) {
                                   try {


                                        EditDescription(form)

                                   } catch (error) {
                                        if (error instanceof Error)
                                             showErrorDialog(error.message);
                                   }
                              }
                         }}
                    >
                         edit
                    </APFormSubmit>
               </APForm>
          </APColumn>



     )
}
