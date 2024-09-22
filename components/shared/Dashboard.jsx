"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { chatSession, display, sayHi } from '../../utils/Gemini.config'
import Image from 'next/image'
import { db } from '../../utils/db'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { MockInterview } from '../../utils/schema'

const Dashboard = () => {


    const [openDialog, setopenDialog] = useState(false);
    const [jobDescription, setjobDescription] = useState("");
    const [jobPosition, setjobPosition] = useState("");
    const [jobExperience, setjobExperience] = useState("");
    const [loading, setloading] = useState(false);
    const [JSONresp, setJSONresp] = useState([]);
    const { user } = useUser();
    const handlesubmit = async (event) => {
        setloading(true);
        event.preventDefault();

        const formData = {
            Exp: jobExperience,
            Desc: jobDescription,
            pos: jobPosition
        };
        console.table(formData);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Job Experience: ${jobExperience} years. Please generate 5 interview questions and answers based on it in JSON format.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJSONResponse = (result.response.text()).replace('```json', '').replace('```', '');
            setJSONresp(JSON.parse(MockJSONResponse));
            console.log(JSONresp);
            if (JSONresp) {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonmockResp: JSONresp,
                    jobPosition: jobPosition,
                    jobDesc: jobDescription,
                    jobExp: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy'),
                }).returning({ mockId: MockInterview.mockId });
                console.log("Inserted ID: ", resp);
            } else {
                console.log("Error in inserting in Database");
            }


        } catch (err) {
            console.log('Error in fetching or writing to database: ', err);
        } finally {
            setloading(false);
            setopenDialog(false);
        }
    };

    return (
        <>
            {!loading ? (<div>
                <div className='mx-20 my-35  '>
                    <div className='font-semibold text-xl'>Dashboard</div>
                    <p className='text-sm text-gray-400'>Start your dream Interview in just one click</p>
                    <div onClick={() => setopenDialog(true)} className='bg-gray-100 p-10 border rounded-lg h-28 max-w-64 flex items-center justify-center mx-20 my-11 hover: scale-105 hover: shadow-md cursor-pointer'>
                        <p className='font-extrabold font-mono text-lg text-center'>+ Add an Interview</p>
                    </div>
                </div>
                <Dialog open={openDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enter your details about the interview</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={handlesubmit}>
                                    <div className='my-5'>
                                        <label>Job Position</label>
                                        <Input required type="text" value={jobPosition} onChange={(e) => setjobPosition(e.target.value)} />
                                    </div>
                                    <div className='my-5'>
                                        <label>Job Description</label>
                                        <Input required type="text" value={jobDescription} onChange={(e) => setjobDescription(e.target.value)} />
                                    </div>
                                    <div className='my-5'>
                                        <label>Job Experience</label>
                                        <Input required type="number" value={jobExperience} onChange={(e) => setjobExperience(e.target.value)} />
                                    </div>
                                    <div className='flex flex-wrap flex-row justify-end gap-2'>
                                        <Button type="submit">Proceed</Button>
                                        <Button variant="ghost" onClick={() => setopenDialog(false)}>Close</Button>
                                    </div>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog></div>) : (
                <Image src={'/loader.svg'} height='120' width='120' alt='loader' />
            )}

        </>
    )
}

export default Dashboard