import React from 'react';
import queto from '../../assets/icons/quote.svg'
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'
import TestimonialCard from '../../Components/TestimonialCard/TestimonialCard';

const Testimonial = () => {
    const testimonialData = [
        {
            id:1,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            image: people1,
            name: 'Winson Herry',
            location: 'California'
        },
        {
            id:2,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            image: people2,
            name: 'Winson Herry',
            location: 'California'
        },
        {
            id:3,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            image: people3,
            name: 'Winson Herry',
            location: 'California'
        }
    ]
    return (
        <section className='mt-[84px] mx-5'>
            <div className='flex justify-between '>
                <div>
                    <p className='text-xl font-bold text-secondary'>Testimonial</p>
                    <h2 className='text-3xl'>What Our Patients Says</h2>
                </div>
                <div>
                    <img src={queto} alt="" className='md:w-[192px] md:h-[156px] w-[98px] h-[70px] ' />
                </div>
                
            </div>
            <div className='grid mx-auto gap-6 justify-center  grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    testimonialData.map(td => <TestimonialCard
                        key={td.id}
                        td={td}
                    ></TestimonialCard>)
                }
            </div>
        </section>
    );
};

export default Testimonial;