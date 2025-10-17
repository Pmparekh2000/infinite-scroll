import React, { useEffect } from 'react'

const Post = ({imagesData, setPageNo}) => {

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((param) => {
            // Once we get the last item into the view
            if (param[0].isIntersecting) {
                // We need to stop observing it
                // Since now it won't be the last item anymore after more items are loaded
                intersectionObserver.unobserve(lastImage);
                setPageNo((prevPageNo) => prevPageNo + 1);
            }
        }, {
            threshold: 0.5
        });

        const lastImage = document.querySelector('.image-post:last-child');
        intersectionObserver.observe(lastImage);

        return () => {
            if (lastImage) {
                intersectionObserver.unobserve(lastImage);
            }
            intersectionObserver.disconnect();
        };

    }, [imagesData]);

  return (
    <div className='images-container'>
        {
            imagesData?.map((item, index) => {
                return (
                    <img
                        key={item?.id}
                        className='image-post'
                        src={item?.download_url}
                        alt={`image ${index}`}
                    />
                )
            })
        }
    </div>
  )
}

export default Post