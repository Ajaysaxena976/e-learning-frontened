import React, { useEffect } from 'react'
import "./CourseStudy.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../Context/CourseContext'
import toast from 'react-hot-toast'
import { server } from '../../main'
const CourseStudy = ({user}) => {
    const params=useParams();
    const {fetchCourse,course}=CourseData();
    useEffect(()=>{
        fetchCourse(params.id);
    },[])
    // console.log(params.id);
    // console.log(course);
    const navigate=useNavigate();
    if(user && user.role!=="admin" && !user.subscription.includes(params.id)){
        toast.error("You have not enrolled in this course");
        return navigate("/");
    }
  return (
    <>
        {course && <div className='course-study-page'>
                <img src={`${server}/${course.image}`} width={350} alt="" />
                <h2>{course.title}</h2>
                <h4>{course.description}</h4>
                <h5>By- {course.createdBy}</h5>
                <h5>Duration - {course.duration}</h5>
                <Link to={`/lectures/${course._id}`}><h2>Lectures</h2></Link>
            </div>
        }
    </>
  )
}

export default CourseStudy