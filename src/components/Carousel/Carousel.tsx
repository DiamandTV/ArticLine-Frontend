import Carousel from 'react-multi-carousel';
import WithStyles from 'react-multi-carousel'
import { ImageModel } from '../../models/image';
import "react-multi-carousel/lib/styles.css";
interface CarouselProps{
    images:Array<ImageModel>
}

export function CarouselImages({images}:CarouselProps){

    return ( 
        <Carousel

            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={5000}
            centerMode={false}
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="h-[325px]"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
            desktop: {
                breakpoint: {
                max: 3000,
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
                items: 2,
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
                 <img className='w-full h-full rounded-xl' src={image.image!}/>
            ))}
        </Carousel>
    )
}