"use client";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { eq } from 'drizzle-orm';

const page = () => {
    const [InterviewData, setInterviewData] = useState()
    const {mockid} = useParams();
    useEffect(()=>{
        console.log(mockid)
        fetchInterviewDetails();
    }, [])
    
    const fetchInterviewDetails = async() =>{
        const data = await db.select().from(MockInterview).
        where(eq(MockInterview.mockId, mockid));
        setInterviewData(data[0])
    }
  return (
    <div>Interview Q/A</div>
  )
}

export default page