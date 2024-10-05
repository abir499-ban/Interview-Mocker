"use client"
import { Volume1 } from 'lucide-react'
import React,{useState} from 'react'
import {Button} from '../ui/button'

const QuestionSet = ({ qa,activequestionindex }) => {
    const textTospeach = (text)=>{
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }else{
            console.log('Sorry your browser doesnot support text to speach')
        }
    }
    const [currentactiveindex, setcurrentactiveindex] = useState(activequestionindex)
    return (
        <>
            <div className='p-5 border rounded-lg'>
                <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {qa.length>0 && qa.map((key, index) => (
                        <p key={index} className={`p-4 bg-secondary rounded-full text-xm font-bold cursor-pointer ${currentactiveindex == index && 'bg-red-600 text-white'}`}  onClick={()=>setcurrentactiveindex(index)}>
                            #Question {index+1}
                        </p>
                    ))}
                </div>
                <div className='m-16 font-sans text-xl text-black'>
                    {qa[currentactiveindex].question} 
                </div>
                <Button variant='ghost' onClick={()=>textTospeach(qa[currentactiveindex].question)} ><Volume1 /></Button>
            </div>
        </>
    )
}

export default QuestionSet