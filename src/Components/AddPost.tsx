
import { navigate, RouteComponentProps } from '@reach/router'
import { APColumn, APExpanded, APForm, APFormFieldFile, APFormFieldText, APFormSubmit, APRow, APText, showErrorDialog, showSnackbar, useAPForm } from 'ap-components';
import axios from 'axios';
import React, { useState } from 'react'

export default function PostImages(props: RouteComponentProps) {

     var token = localStorage.getItem("token");
     const [data, setData] = useState<any>()
     const [form, setForm] = useState({
          file: "",
          description: "",
     })

     var control = useAPForm();

     const postFiles = async (form: any) => {
          try {
               const result = await axios.post("http://localhost:80/client/postImage", form, {
                    headers: {
                         Authorization: `Bearer ${token}`
                    }
               })
               setData(result.data)
               showSnackbar("Uploaded")
               navigate("/timeline")

          } catch (err) {

               showErrorDialog("upload Failed")
          }
     }

     return (
          <APColumn>

               <APText style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    fontSize: "20px",
                    fontWeight: 500,
                    textAlign: "center"
               }} >Upload Image</APText>
               <APForm control={control}  >

                    <APFormFieldFile
                         label={'Upload Image'}
                         onChanged={(v: any) => {
                              form.file = v;
                         }}
                         validator={(v) => {
                              if (!v) {
                                   return 'image required';
                              }
                              return null;
                         }}
                    />
                    <APFormFieldText
                         style={{
                              marginTop: "15px",
                              height: "15px",
                              width: "280px",
                              marginLeft: "10px",
                         }}
                         label='Description'
                         onChanged={(v) => form.description = v}
                         validator={(v) => {
                              if (v.length === 0) {
                                   return 'description required';
                              }
                              return null;
                         }}
                    />

                    <APFormSubmit
                         style={{
                              width: "80px",
                              marginLeft: "10px",
                              backgroundColor: "blue",
                              marginTop: "15px",
                              marginBottom: "30px"
                         }}
                         onClick={async () => {
                              if (await control.validate()) {
                                   try {
                                        let formField = new FormData()

                                        formField.append('file', form.file)
                                        formField.append('description', form.description)
                                        postFiles(formField)
                                   } catch (error) {
                                        if (error instanceof Error)
                                             showErrorDialog(error.message);
                                   }
                              }
                         }} >
                         upload
                    </APFormSubmit>
               </APForm>
          </APColumn >
     )
}
