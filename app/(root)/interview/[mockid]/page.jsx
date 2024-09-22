"use client";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { WebcamIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';

const page = () => {
    const [InterviewData, setInterviewData] = useState()
    const [enablewebcam, setenablewebcam] = useState(false);
    const { mockid } = useParams();
    useEffect(() => {
        console.log(mockid)
        fetchInterviewDetails();
    }, [])

    const fetchInterviewDetails = async () => {
        const data = await db.select().from(MockInterview).
            where(eq(MockInterview.mockId, mockid));
        setInterviewData(data[0])
    }
    return (
        <div>
            <div className='text-2xl text-black flex items-center justify-center font-bold font-mono'>
                Lets get started!!</div>
            {enablewebcam ? (
                <Webcam
                    onUserMedia={() => { setenablewebcam(true) }}
                    onUserMediaError={() => { setenablewebcam(false) }}
                    style={{
                        height: 300,
                        width: 300
                    }} />
            ) : (
                <div className='flex flex-wrap flex-col gap-2 justify-center items-center'>
                    <WebcamIcon size={100} color="#d62e2e" strokeWidth={1.5} />
                    <Button onClick={() => setenablewebcam(true)}>Enable Webcam and Microphone</Button>
                </div>
            )}

        </div>
    )
}

export default page