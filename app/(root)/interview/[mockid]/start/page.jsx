"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/db';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';

const Page = () => {
    const [interviewData, setInterviewData] = useState(null);
    const [qa, setQa] = useState([]); 
    const { mockid } = useParams();

    useEffect(() => {
        fetchInterviewDetails();
    }, []);

    const fetchInterviewDetails = async () => {
        const data = await db.select().from(MockInterview).where(eq(MockInterview.mockId, mockid));
        console.log(data[0]?.jsonmockResp); 
        setInterviewData(data[0]);
        setQa(data[0]?.jsonmockResp || []); 
    };

    return (
        <>
        {/* <div className='p-28 bg-gray-50'> 
            {qa.length > 0 ? ( 
                qa.map((QA, index) => ( 
                    <p key={index} className='text-2xl line-clamp-5'>
                        {index+1}  <strong>{QA.question}</strong>: {QA.answer}
                    </p>
                    
                ))
            ) : (
                <p>No data</p>
            )}
            </div> */}

            
        </>
    );
};

export default Page;
