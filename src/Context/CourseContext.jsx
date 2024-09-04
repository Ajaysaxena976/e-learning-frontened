import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";
const CourseContext=createContext();

export const CourseContextProvider=({children})=>{
    const [courses,setCourses]=useState([]);
    const [course,setCourse]=useState([]);
    const [myCourse,setMyCourse]=useState([]);
    async function fetchCourses(){
        try{
            const {data}=await axios.get(`${server}/api/course/all`);
            // console.log(data.courses);
            setCourses(data.courses);
        }
        catch(error){
            console.log(error);
        }
    }
    
    async function fetchCourse(id){
        try{
            const {data}=await axios.get(`${server}/api/course/${id}`);
            setCourse(data.course);
        }
        catch(error){
            // toast.error(error.response.data.message);
            console.log(error);
        }
    }
    async function fetchMyCourse(){
        try{
            const {data}=await axios.get(`${server}/api/myCourses`,{headers:{
                token:localStorage.getItem("token")
            }});
            setMyCourse(data.courses);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchCourses();
        fetchMyCourse();
    },[])
    return <CourseContext.Provider value={{
        courses,
        course,
        fetchCourse,
        fetchCourses,
        fetchMyCourse,
        myCourse
        }}>
        {children}
    </CourseContext.Provider>
}
export const CourseData=()=>useContext(CourseContext);