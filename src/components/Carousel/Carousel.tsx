import Carousel from 'react-multi-carousel';
import { ImageModel } from '../../models/image';
import "react-multi-carousel/lib/styles.css";
import {v4 as uuid} from "uuid"
//import "../../App.css"
interface CarouselProps{
    height?:number,
    images:Array<ImageModel>
}

export function CarouselImages({height,images}:CarouselProps){

    return ( 
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={5000}
            centerMode={false}
            containerClass="container-with-dots h-full"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass={`h-[200px] md:h-[400px] lg:h-[350px] l itemClass`}
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
            desktop: {
                breakpoint: {
                max: 4000,
                min: 1024
                },
                items: 1,
                partialVisibilityGutter: 40
                },
                mobile: {
                breakpoint: {
                max: 464,
                min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
                },
                tablet: {
                breakpoint: {
                max: 1024,
                min: 464
                },
                items: 1,
                partialVisibilityGutter: 30
                }
            }}
            
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        
            
        >
            {images.map((image)=>(
                 <img key={uuid()} className='w-full h-full rounded-xl object-fill' src={image.image!}/>
            ))}
        </Carousel>
    )
}