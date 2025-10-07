import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const ref = useRef()
    const passwordRef = useRef()
    const showPass = () => {

    }

    const savePass = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            //if any such id exists in db , dlt it
            if (form.id){
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            }
            //add new / updated pass to db
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error : Cannot save', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePass = async (id) => {

        let c = confirm("Do you really want to delete password")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        }
        toast('Password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPass = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#eafbea_1px,transparent_1px),linear-gradient(to_bottom,#eafbea_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#dff7df,transparent)]"></div>
            </div>



            <div >
                <div className="p-4 w-[100%] mt-[20px] md:p-0 md:mycontainer py-2 flex flex-col items-center">
                    <h1 className='text-center text-4xl font-bold'>vault
                        <span className='text-green-400'>IO</span></h1>
                    <p className='text-center text-lg '>your own password manager</p>
                    <div className="flex flex-col gap-3">
                        <input value={form.site} onChange={handleChange} name='site' placeholder='Enter website URL' className='my-4 px-4 py-1 bg-white border border-green-700 rounded-full' type="text" />
                        <div className="flex flex-col md:flex-row gap-5">
                            <input value={form.username} onChange={handleChange} name='username' placeholder='Enter Username' className='bg-white border px-4 py-1 border-green-700 rounded-full ' type="text" />
                            <div className="relative gap-2">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' className='bg-white border px-4 py-1 border-green-700 rounded-full ' type="password" />
                                <span className="absolute right-[7px] bottom-[3px] " onClick={showPass}>
                                    <img ref={ref} className='w-7 cursor-pointer' alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={savePass} className='my-3 py-2 text-white  flex justify-center items-center w-fit px-4 rounded-full gap-2 ring-1 ring-white bg-green-700 hover:bg-green-500'>

                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#ffffff"
                        >
                        </lord-icon>
                        <div className='font-bold'>
                            Save Password
                        </div>
                    </button>

                    <div className="passwords w-[100%] px-2 md:px-[222px] mb-[60px]">
                        <h2 className='text-2xl text-center font-bold py-2'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div> no passwords to show</div>}
                        {passwordArray.length != 0 &&
                            <table className="table-auto border-collapse w-[100%] rounded-md overflow-hidden">
                                <thead className='bg-slate-700 text-white'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>User Name</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-slate-200'>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className=' py-2 text-center w-32'>
                                                <div className='flex justify-center items-center gap-5'>
                                                    <a href='{item.site}' target='_blank'>{item.site}</a>
                                                    <svg onClick={() => { copyText(item.site) }} className='hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 408 480"><path fill="#000000" d="M299 5v43H43v299H0V48q0-18 12.5-30.5T43 5h256zm64 86q17 0 29.5 12.5T405 133v299q0 18-12.5 30.5T363 475H128q-18 0-30.5-12.5T85 432V133q0-17 12.5-29.5T128 91h235zm0 341V133H128v299h235z" /></svg>
                                                </div>
                                            </td>
                                            <td className=' py-2 text-center w-32'>
                                                <div className='flex justify-center items-center gap-5'>
                                                    <span>{item.username}</span>
                                                    <svg onClick={() => { copyText(item.username) }} className='hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 408 480"><path fill="#000000" d="M299 5v43H43v299H0V48q0-18 12.5-30.5T43 5h256zm64 86q17 0 29.5 12.5T405 133v299q0 18-12.5 30.5T363 475H128q-18 0-30.5-12.5T85 432V133q0-17 12.5-29.5T128 91h235zm0 341V133H128v299h235z" /></svg>
                                                </div>
                                            </td>
                                            <td className=' py-2 text-center w-32'>
                                                <div className='flex justify-center items-center gap-5'>
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <svg onClick={() => { copyText(item.password) }} className='hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 408 480"><path fill="#000000" d="M299 5v43H43v299H0V48q0-18 12.5-30.5T43 5h256zm64 86q17 0 29.5 12.5T405 133v299q0 18-12.5 30.5T363 475H128q-18 0-30.5-12.5T85 432V133q0-17 12.5-29.5T128 91h235zm0 341V133H128v299h235z" /></svg>
                                                </div>
                                            </td>
                                            <td className=' py-2 text-center w-32'>
                                                <div className='flex gap-2 justify-center'>
                                                    <div className='hover:cursor-pointer' onClick={() => { editPass(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                    <div className='hover:cursor-pointer' onClick={() => { deletePass(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/xyfswyxf.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
