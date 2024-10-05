"use client";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { WebcamIcon, ChevronRight} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Parse } from '../../../../utils/parseJSON'
import Link from 'next/link';

const page = () => {
    const [InterviewData, setInterviewData] = useState(null)
    const { mockid } = useParams();
    useEffect(() => {
        console.log(mockid)
        fetchInterviewDetails();
    }, [])

    const fetchInterviewDetails = async () => {
        const data = await db.select().from(MockInterview).
            where(eq(MockInterview.mockId, mockid));
        console.log(data);
        console.log(data[0].jsonmockResp)
        setInterviewData(data[0]);
    }
    return (
        <div>
            <div className='text-2xl text-black flex items-center justify-center font-bold font-mono'>
                Lets get started!!</div>
               
            
                <div className='flex flex-wrap flex-col gap-2 justify-center items-center'>
                    <ChevronRight size='200px' color="#ea4d4d" />
                    <div className='flex flex-wrap justify-center'><Link href={`/interview/${mockid}/start`} ><Button>Start Interview</Button></Link></div>
                </div>
        

            <div className='flex flex-wrap justify-center items-center flex-row p-16 gap-2'>
                {InterviewData ? (
                    <div class="flex flex-column justify-center gap-11 p-16 border rounded-lg">
                        <h1><strong>Job Description:    </strong>{InterviewData.jobDesc}</h1>
                        <h1><strong>Job Position:   </strong>{InterviewData.jobPosition}</h1>
                        <h1><strong>Job Experience (in years):  </strong>{InterviewData.jobExp}</h1>
                    </div>
                ) : (
                    <h1>No interview Data</h1>
                )
                }
            </div>

        </div>
    )
}

export default page