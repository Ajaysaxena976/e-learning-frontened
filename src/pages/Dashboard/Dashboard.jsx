import React from 'react'
import "./Dashboard.css"
import { CourseData } from '../../Context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard';
const Dashboard = ({user}) => {
    const {myCourse}=CourseData();
    // console.log(myCourse);
    // console.log(user);
  return (
    <div className="student-dashboard">
        <h2>All Enrolled Courses</h2>
        <div className="dashboard-content">
            {
                myCourse && myCourse.length>0?(
                    myCourse.map((e)=> <CourseCard key={e._id} course={e}/>)
                ):(
                    <p>No courses enrolled</p>
                )
            }
        </div>
    </div>
  )
}

export default Dashboard