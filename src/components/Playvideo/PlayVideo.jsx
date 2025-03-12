import React, { useEffect, useState } from 'react';
import './PlayVideo.css'
import video1 from "../../assets/video.mp4"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg"
import {API_KEY,value_converter} from '../../data'
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
    const {videoId}=useParams()
    const [apiData,setApiData]=useState(null);
    const [channelData,setChannelData]=useState(null);
    const [commentData,setCommentData]=useState([]);

    const fetchVideoData=async()=>{
        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res=>res.json()).then(data=> setApiData(data.items[0]))
    }
    useEffect(()=>{
        fetchVideoData()
    },[videoId])

    const fetchChannelData=async()=>{
        const channelDetails_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?apiData.snippet.channelId:""}&key=${API_KEY}`
        await fetch(channelDetails_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))

        const commentData_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentData_url).then(res=>res.json()).then(data=>setCommentData(data.items))
    } 
    useEffect(()=>{
        fetchChannelData()
    },[apiData])



    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
            <div className='play-video-info'>
                <p> {apiData?value_converter(apiData.statistics.viewCount):""} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""} </p>
                <div>
                    <span><img src={like}></img>{apiData?value_converter(apiData.statistics.likeCount):""}</span>
                    <span><img src={dislike}></img></span>
                    <span><img src={share}></img>Share</span>
                    <span><img src={save}></img>Save</span>
                </div>
            </div>
            <hr></hr>
            <div className='publisher'>
                <img src={channelData?channelData.snippet.thumbnails.high.url:""}></img>
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:""}</p>
                    <span>{channelData?value_converter(channelData.statistics.subscriberCount):""} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='.vid-description'>
                <p>{apiData?apiData.snippet.description:""}</p>
                <hr />
                <h4>{apiData?value_converter(apiData.statistics.commentCount):""} Comments</h4>
                {commentData.map((item,idx)=>{
                    return(
                    <div className='comment' key={idx}>
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}></img> 
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span> {commentData?moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow():""}</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className='comment-action'>
                            <img src={like}></img>
                            <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                            <img src={dislike}></img>  
                        </div>
                    </div>
                </div>
                )})}
                
            </div>
        </div>

    );
};

export default PlayVideo;