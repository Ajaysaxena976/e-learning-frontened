import React, { useEffect, useState } from 'react'
import "./Lecture.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/Loading/Loading';
import toast from 'react-hot-toast';
const Lecture = ({user}) => {
    //for storing all lecture
    const [lectures,setLectures]=useState([]);
    //for current playing lecture
    const [lecture,setLecture]=useState([]);

    const [loading,setLoading]=useState(true);
    //during fetching the lecture we will be using it
    const [lecLoading,setLecLoading]=useState(false);
    //for add lecture form
    const [show,setShow]=useState(false);
    const params=useParams();

    //Form add lecture form
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [video,setVideo]=useState("");
    const [videoPreview,setVideoPreview]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);
    const navigate=useNavigate();
    
    if(user && user.role!=="admin" && !user.subscription.includes(params.id)){
        return navigate("/");
    }
    const changeVideoHandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload=()=>{
            setVideoPreview(reader.result);
            setVideo(file);
        }
    }
    const submitHandler=async(e)=>{
        setBtnLoading(true);
        e.preventDefault();
        //because we need to send the video also
        //So we need to instantiate the FormData class
        const myForm=new FormData();
        myForm.append("title",title);
        myForm.append("description",description);
        myForm.append("file",video);
        try{
            const {data}=await axios.post(`${server}/api/course/${params.id}`,myForm,{headers:{
                token:localStorage.getItem("token")
            }})
            toast.success(data.message);
            setBtnLoading(false);
            //hide the form
            setShow(false);
            setTitle("");
            setDescription("");
            setVideo("");
            setVideoPreview("");
        }
        catch(error){
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }
    const deleteHandler=async(id)=>{
        if(confirm("Are you sure you want to delete this lecture")){
            try{
                const {data}=await axios.delete(`${server}/api/lecture/${id}`,{headers:{
                    token:localStorage.getItem("token")
                }})
                toast.success(data.message);
                fetchLectures();
            }
            catch(error){
                toast.error(error.response.data.message);
            }
        }
    }
    //functin for fetching the lecture
    async function fetchLectures(){
        try{
            const {data}=await axios.get(`${server}/api/lectures/${params.id}`,{headers:{token:localStorage.getItem("token")}});
            setLectures(data.lectures);
            setLoading(false);
            fetchLectures();
        }
        catch(error){
            console.log("Error occured here");
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchLectures();
    },[]);
    async function fetchLecture(id){
        setLecLoading(true);
        try{
            const {data}=await axios.get(`${server}/api/lecture/${id}`,{headers:{token:localStorage.getItem("token")}});
            setLecture(data.lecture);
            setLecLoading(false);
            // console.log(data.lecture);
        }
        catch(error){
            console.log(error);
            setLecLoading(false);
        }
    }
    
  return (
    <>
        {
            loading?<Loading/>:<>
                <div className="lecture-page">
                    <div className="left">
                        {
                            lecLoading?<Loading/>:<>
                                {
                                    lecture.video?<>
                                        <video
                                             src={`${server}/${lecture.video}`}
                                            width={"100%"}
                                            controls
                                            controlsList='nodownload noremoteplayback'
                                            disablePictureInPicture
                                            disableRemotePlayback
                                            autoPlay
                                         ></video>
                                        <h1>{lecture.title}</h1>
                                        <h3>{lecture.description}</h3>

                                    </>:<h1>Please select the lecture</h1>
                                }
                            </>
                        }
                    </div>
                    <div className="right">
                        {
                            user && user.role==="admin" && (<button className='common-btn' onClick={()=>setShow(!show)}>
                                {show?"Close":"Add Lecture +"}
                            </button>)

                        }
                        {
                            show && (<div className="lecture-form">
                                <h2>Add lecture</h2>
                                <form onSubmit={submitHandler}>
                                    <label htmlFor="text">Title</label>
                                    <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} required />

                                    <label htmlFor="text">Description</label>
                                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required />

                                    
                                    <input type="File"  onChange={changeVideoHandler} placeholder='Upload video' required />
                                    {
                                        videoPreview &&    <video src={videoPreview} alt="" width={300} controls></video>
                                    }
                                    <button
                                    className='common-btn' disabled={btnLoading} type='submit'>
                                        {
                                            btnLoading?"Please Wait":"Add"
                                        }
                                    </button>
                                </form>
                            </div>
                        )}
                        {
                            lectures && lectures.length>0 ? lectures.map((e,i)=>(
                                <>
                                    <div onClick={()=>fetchLecture(e._id)} key={i} className={`lecture-number ${lecture._id === e._id && "active"}`}>
                                        {i+1}.{e.title}
                                    </div>
                                    {
                                        user && user.role==="admin" && <button
                                        onClick={()=>deleteHandler(e._id)}
                                            className='common-btn'
                                            style={{background:"red"}}
                                        >
                                            Delete 
                                        </button>
                                    }
                                </>
                            )) : <p>No lectures yet</p>
                        }
                    </div>
                </div>
            </>
        }
    </>
  )
}

export default Lecture