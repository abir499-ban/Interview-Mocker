"use client";
import useSpeechToText from 'react-hook-speech-to-text';
import React, { useState } from 'react'
import Webcam from 'react-webcam';
import { WebcamIcon, ChevronRight, Mic } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button'
const RecordAnwer = () => {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const [webcam, setwebcam] = useState(false);
    const [mircophone, setmircophone] = useState(false);
    const [useranswer, setuseranswer] = useState("")

    const saveTranscript=()=>{
            const convertedData = results.map((result)=> result.transcript).join(' ')
            console.log(convertedData);
            setuseranswer(convertedData)
    }
    return (
        <>
            <div className='flex  flex-row justify-center items-center'>
                <div className='flex flex-wrap flex-row justify-center items-center m-12'>
                    {webcam ? (
                        <Webcam
                            onUserMedia={() => { setwebcam(true) }}
                            onUserMediaError={() => { setwebcam(false) }}
                            style={{
                                height: 300,
                                width: 300
                            }} />
                    ) : (
                        <div>
                            <WebcamIcon color="#ea4d4d" size='250px' />
                            <Button onClick={() => setwebcam(true)}>Enable Webcam</Button>
                        </div>
                    )}
                </div >
                <div className='flex flex-wrap flex-row justify-center items-center m-12'>
                    <div><Mic color="#ea4d4d" size='250px'/></div>
                    <div>Recording : {isRecording.toString()}</div>
                    <Button variant='outline' onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                    <ul>
                        {results.map((result) => (
                            <li key={result.timestamp}>{result.transcript}</li>
                        ))}
                        {interimResult && <li>{interimResult}</li>}
                    </ul>
                </div>
                <div className='flex flex-wrap flex-row justify-center items-center m-12'>
                    {isRecording && <Button onClick={()=>saveTranscript()}>Save Transcript</Button>}
                </div></div>
        </>
    )
}

export default RecordAnwer