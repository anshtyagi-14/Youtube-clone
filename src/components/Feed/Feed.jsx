import React, { useEffect, useState } from 'react';
import './Feed.css'
import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.png"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import thumbnail5 from "../../assets/thumbnail5.png"
import thumbnail6 from "../../assets/thumbnail6.png"
import thumbnail7 from "../../assets/thumbnail7.png"
import thumbnail8 from "../../assets/thumbnail8.png"
import { Link } from 'react-router-dom';
import {API_KEY,value_converter} from '../../data'
import moment from 'moment';

const Feed = ({category}) => {
    const [data,setData]=useState([])
    const fetchdata=async()=>{
        const video_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(video_url).then(response=>response.json()).then(data=>setData(data.items))
    }
    useEffect(()=>{
        fetchdata();
    },[category])

    return (
        <div className='feed'>
        {Array.isArray(data) && data.length>0?data.map((item,idx)=>{
            return(
            <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={idx} className='card'>
                <img src={item.snippet.thumbnails.high.url}></img>
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p> {value_converter(item.statistics.viewCount)} Views &bull;{moment(item.snippet.publishedAt).fromNow()}</p>
            </Link>
            )
        }):(<p>Loading</p>)}
        </div> 
    );
};

export default Feed;