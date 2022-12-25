import React from 'react'
import { Button, TextField, FormControl, MenuItem, InputLabel, Select } from '@material-ui/core'
import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import axios from 'axios';
import { Formik } from 'formik'

const url = 'http://localhost:3001/api/v1/users';

export const createUser = (newUser) => {
    return axios.post(url, newUser);
}

function StudentForm() {
    const { mutateAsync } = useMutation(createUser);
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const initialValues = {
        first_name: "",
        last_name: "",
        email_address:"",
        password: "",
        publicMetadata: { role: "", class: "" }
    }

    return (
        <div className='form border border-2 rounded border-slate-300 p-3 max-h-80'>
            <h4 className='text-center pb-5 text-lg'>Create New Student</h4>
            <Formik
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(values);
                    if (values) {
                        setSubmitting(true);
                        mutateAsync(values, {
                            onSuccess: () => {
                                enqueueSnackbar('User Created', { variant: 'success', autoHideDuration: 2000 });
                                queryClient.invalidateQueries('users')
                            },
                            onError: () => {
                                enqueueSnackbar('Error Occured', { variant: 'error', autoHideDuration: 2000 })
                            },
                            onSettled: () => {
                                resetForm();
                                setSubmitting(false);
                            }
                        });
                    }
                }
                }
                initialValues={initialValues}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form style={{height:'100%'}} onSubmit={handleSubmit}>
                        <div className='flex gap-3'>
                            <TextField
                                fullWidth
                                id="first_name"
                                label="First Name"
                                variant="outlined"
                                size='small'
                                name='first_name'
                                value={values.first_name}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                variant="outlined"
                                size='small'
                                name='last_name'
                                value={values.last_name}
                                onChange={handleChange}

                            />
                        </div>
                        <div className='pt-3'>
                            <TextField
                                fullWidth
                                id="email_address"
                                label="Email"
                                variant="outlined"
                                size='small'
                                name='email_address'
                                value={values.email_address}
                                onChange={handleChange}

                            />
                        </div>
                        <div className='pt-3'>
                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                variant="outlined"
                                size='small'
                                name='password'
                                value={values.password}
                                onChange={handleChange}

                            />
                        </div>
                        <div className='pt-3 flex gap-3'>
                            <FormControl fullWidth size='small'>
                                {/* <InputLabel id="role-label">Role</InputLabel> */}
                                <TextField
                                    select
                                    // labelId="role-label"
                                    id="select-role"
                                    fullWidth
                                    label="Role"
                                    name='publicMetadata.role'
                                    value={values.publicMetadata.role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                                    <MenuItem value={"student"}>Student</MenuItem>
                                </TextField>
                            </FormControl>
                            <FormControl fullWidth size='small'>
                                {/* <InputLabel id="class-label">Class</InputLabel> */}
                                <TextField
                                    select
                                    // labelId="class-label"
                                    id="select-class"
                                    fullWidth
                                    label="Class"
                                    name='publicMetadata.class'
                                    value={values.publicMetadata.class}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"6th"}>6th</MenuItem>
                                    <MenuItem value={"7th"}>7th</MenuItem>
                                    <MenuItem value={"8th"}>8th</MenuItem>
                                </TextField>
                            </FormControl>
                        </div>
                        <div className='flex justify-end pt-3'>
                            <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>Submit</Button>
                        </div>
                    </form>
                )}
            </Formik >
        </div >
    )
}

export default StudentForm;