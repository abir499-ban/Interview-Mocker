"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/db';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import QuestionSet from '../../../../../components/shared/QuestionSet'
import RecordAnwer from '../../../../../components/shared/RecordAnwer'
const Page = () => {
    const [interviewData, setInterviewData] = useState(null);
    const [qa, setqa] = useState([]);
    const [activequestionindex, setactivequestionindex] = useState(0)
    const { mockid } = useParams();

    useEffect(() => {
        fetchInterviewDetails();
    }, []);

    const fetchInterviewDetails = async () => {
        const data = await db.select().from(MockInterview).where(eq(MockInterview.mockId, mockid));
        //console.log(data[0]?.jsonmockResp); 
        setInterviewData(data[0]);
        setqa(data[0]?.jsonmockResp || []);
        console.log(qa)
    };

    return (
        <>
        
            <div  className='p-28 bg-gray-50'> 
                {qa.length > 0 ? (
                    <>
                    <QuestionSet qa={qa} activequestionindex={activequestionindex}/>
                    <RecordAnwer/>
                    </>
                ) : (
                    <div>No data</div>
                )}
            </div>
            

        </>
    );
};

export default Page;
