import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Carrousel = () => {
    return (
        <Carousel showThumbs={false}>
            <div>
                <img alt='' src={"https://mdbcdn.b-cdn.net/img/new/slides/042.webp"} />
            </div>
            <div>
                <img alt='' src={"https://mdbcdn.b-cdn.net/img/new/slides/043.webp"} />
            </div>
        </Carousel>
    );
};

export default Carrousel;