import React from 'react';
import bg from '../../assets/images/appointment.png'
import Button from '../../Components/Button/Button';

const ContactForm = () => {
    const handleMama = e =>{
        e.preventDefault();
        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;
        console.log(name, email, message);
    }
    return (
        <section
        className='mt-[150px] text-center py-[65px]' 
        style={{background: `url(${bg})`}}>
            <div>
                <p className='text-secondary text-xl font-semibold'>Contact Us</p>
                <h2 className='text-3xl text-white'>Stay connected with us</h2>
            </div>
            <form onSubmit={handleMama} className='mt-8 w-[450px] mx-auto '>
                <div>
                    <input type="text" name='name' placeholder="Type here" className="input w-full mb-5" />
                </div>
                <div>
                    <input type="text" name='email' placeholder="Type here" className="input w-full mb-5 " />
                </div>
                <div>
                    <textarea name='message' className="textarea w-full h-48" placeholder="Bio"></textarea>
                </div>
                <div className='mt-8'>
                    <Button type='submit'>{'Submit'}</Button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;