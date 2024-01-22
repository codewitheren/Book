import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./book.css";

function Book() {
    const { id } = useParams();
    const [word, setWord] = useState('');
    const [prevWord, setPrevWord] = useState(' ');
    const [nextWord, setNextWord] = useState(' ');
    const [currentPart, setCurrentPart] = useState(-1);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [content, setContent] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const currentIndex = localStorage.getItem('currentIndex' + id);
        const currentPart = localStorage.getItem('currentPart' + id);
        setCurrentIndex(Number(currentIndex) || 0);
        setCurrentPart(Number(currentPart) || 0);
    }, []); 

    useEffect(() => {
        if (currentIndex >= 0)
            localStorage.setItem(('currentIndex' + id), String(currentIndex));
    }, [currentIndex]);

    useEffect(() => {
        const fetchData = async () => {
            const apiURL = `${import.meta.env.VITE_API_URL}/books/${id}/part/${currentPart}`;
            try {
                const response = await fetch(apiURL);
                const data = await response.json();
                
                if (data.content && data.content.length > 0) {
                    setContent(data.content);
                    setWord(data.content[currentIndex]);
                    setPrevWord(data.content[currentIndex - 1]);
                    setNextWord(data.content[currentIndex + 1]);
                } else {
                    setIsFinished(true);
                    setPrevWord('');
                    setNextWord('');
                    setContent([]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        if (currentPart >= 0){
            localStorage.setItem(('currentPart' + id), String(currentPart));
            fetchData();
        }

    }, [currentPart]);
    
    const getNextWord = async () => {
        if (currentIndex < content.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setWord(content[currentIndex + 1]);
            setPrevWord(content[currentIndex]);
            setNextWord(content[currentIndex + 2]);
        } else {
            setCurrentPart(currentPart + 1);
            setCurrentIndex(0);
        }
    };

    const getBackWord = async () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setWord(content[currentIndex - 1]);
            setPrevWord(content[currentIndex - 2]);
            setNextWord(content[currentIndex]);
        } else {
            if (currentPart > 0){
                setCurrentPart(currentPart - 1);
                setCurrentIndex(content.length - 1);
            }
        }
    };

    const restart = async () => {
        setCurrentPart(0);
        setCurrentIndex(0);
        setIsFinished(false);
    };

    return (
        <div className="book-content">
            <div className='words'>
                {
                    isFinished ?
                    <p className='finished'>{"Finished "}</p>
                    :
                    <div>
                        <span className='prev-word'>{prevWord}</span>
                        <p>
                            <span>{word.slice(0, Math.floor(word.length / 2))}</span>
                            <span className='highlight'>{word.charAt(Math.floor(word.length / 2))}</span>
                            <span>{word.slice(Math.floor(word.length / 2) + 1)}</span>
                        </p>
                        <span className='next-word'>{nextWord}</span>
                    </div>

                }
            </div>
            <div className='buttons'>
                {
                    isFinished ?
                    <>
                        <button onClick={restart}>Restart</button>
                        <Link to='/'>Home</Link>
                    </>
                    :
                    <>
                        <button onClick={getBackWord}>Previous</button>
                        <button onClick={getNextWord}>Next</button>
                    </>
                }
            </div>
        </div>  
    );
    
}

export default Book;