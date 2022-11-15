import React from 'react';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';
import InfoCard from '../../Components/InfoCard/InfoCard';

const InfoCards = () => {
    const infoData = [
        {
            id:1,
            img: clock,
            title:"Opening Hours",
            detail:"05:00 pm to 11:00 pm",
            bgClass: "bg-primary",
        },
        {
            id:2,
            img: marker,
            title:"Our Location",
            detail:"543, High Dream Palace, Dhaka 1206",
            bgClass: "bg-accent",
        },
        {
            id:3,
            img: phone ,
            title:"Contact Us",
            detail:"+880 1318214398",
            bgClass: "bg-primary",
        },
    ]
    return (
        <section className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5">
            {
                infoData.map(ic => <InfoCard key={ic.id} ic={ic}></InfoCard>)
            }
        </section>
    );
};

export default InfoCards;