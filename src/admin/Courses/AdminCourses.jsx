import React, { useState } from 'react'
import Layout from '../Utils/Layout'
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../Context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';
import "./AdminCourses.css"
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';
const AdminCourses = ({user}) => {
    const navigate=useNavigate();
    if(user && user.role!=="admin"){
        navigate("/");
    }
    const {courses,fetchCourses}=CourseData();

    // state and variables for new course form
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [createdBy,setCreatedBy]=useState("");
    // const [duration,setDuration]=useState("");
    const [image,setImage]=useState("");
    const [duration,setDuration]=useState("");
    const [imagePreview,setImagePreview]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);

    const categories=[
        "Web Development",
        "App Development",
        "Game Development",
        "Data Science",
        "Machine Learning",
        "Artificial Intelligence",
        "Data Analysis",
        "Cloud Computing",
        "Computer Science",
        "Mathematics",
        "Business & Finance",
        "Health & Wellness",
        "Arts & Humanities",
        "Science & Technology",
        "Language & Culture",
        "Engineering",
        "Social Sciences",
        "Education",
        "Blockchain Technology",
        "Quantum Computing",
        "Robotics Engineering",
        "Natural Language Processing",
        "Computer Vision",
        "Internet of Things",
        "DevOps",
        "Agile Methodologies",
        "Software Architecture",
        "Big Data Analytics",
        "Artificial General Intelligence",
        "Mern",
        "Python",
        "C++",
        "Blog Writing",
        "Backend Development",
        "Frontend Development",
        "React js",
        "React Native",
        "Angular",
        "Vue",
        "Node js",
        "Express js",
        "Mongodb",
        "Sql",
        "Mysql"
  ]
    const changeImageHandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload=()=>{
            setImagePreview(reader.result);
            setImage(file);
        }
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("title",title);
        formData.append("description",description);
        formData.append("category",category);
        formData.append("duration",price);
        formData.append("createdBy",createdBy);
        formData.append("file",image);
        formData.append("price",price);

        try{
            const {data}=await axios.post(`${server}/api/course/new`,formData,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            toast.success(data.message);
            setBtnLoading(false);
            await fetchCourses();
            setImage("");
            setTitle("");
            setDescription("");
            setCategory("");
            setImage("");
            setPrice("");
            setCreatedBy("");
            setDuration("");
            setImagePreview("");

        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }
  return (
    <Layout>
        <div className="admin-courses">
            <div className="left">
                <h1>All Courses</h1>
                <div className="dashboard-content">
                    {
                        courses && courses.length>0 ? courses.map((e)=>{
                            return <CourseCard key={e._id} course={e}/>
                        }):<p>No Courses yet</p>
                    }
                </div>
            </div>
            <div className="right">
                {/* we will display form to add the new course */}
                <div className="add-course">
                    <div className="course-form">
                        <h2>Add Course</h2>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="text">Title</label>
                            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>

                            <label htmlFor="text">Description</label>
                            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required/>

                            <label htmlFor="text">Price</label>
                            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} required/>

                            <label htmlFor="text">CreatedBy</label>
                            <input type="text" value={createdBy} onChange={(e)=>setCreatedBy(e.target.value)} required/>

                            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                                <option value={""}>Select category</option>
                                {
                                    categories.map((e)=>(
                                        <option value={e} key={e}>{e}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="text">Duration</label>
                            <input type="number" value={duration} onChange={(e)=>setDuration(e.target.value)} required/>

                            <input type="file" required onChange={changeImageHandler} />
                            {
                                imagePreview && <img src={imagePreview} alt="" width={300}/>
                            }
                            <button disabled={btnLoading} className='common-btn' type='submit'>
                                {btnLoading?"Please Wait":"Add"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCourses