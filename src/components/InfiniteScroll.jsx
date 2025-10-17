import React, { useEffect, useState } from 'react'
import Post from './Post';
import useFetchData from '../hooks/useFetchData';
import { API_STATUS, IMAGES_API_LINK } from '../utils/constants';
import Shimmer from './Shimmer';

const InfiniteScroll = () => {
    const [imagesData, setImagesData] = useState([]);
    const [status, setStatus] = useState(API_STATUS.LOADING);
    const [pageNo, setPageNo] = useState(1);

    const data = useFetchData(IMAGES_API_LINK+`?page=${pageNo}&limit=3`, [pageNo], setStatus);

    useEffect(() => {
        if (data) {
            setImagesData((prevImagesData) => [...prevImagesData, ...data]);
        }
    }, [data]);

  return (
    <div className='posts-container'>
        {imagesData?.length > 0 && <Post imagesData={imagesData} setPageNo={setPageNo}/>}
        {status === API_STATUS.LOADING && <Shimmer />}
        {status === API_STATUS.FAILED && <>Some error occured while loading more data</>}
    </div>
  )
}

export default InfiniteScroll