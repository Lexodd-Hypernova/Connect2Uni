import React, { useEffect, useState } from "react";
import "./style.css";

const TestimonialCarousel = () => {
    const [id, setId] = useState(0);

    const testimonials = [
        [
            "https://i.imgur.com/mtzosUj.jpeg",
            "https://i.imgur.com/vWzJinP.png",
            "https://i.imgur.com/Zngpr1W.jpeg",
        ],
        [
            "Tanya Singh",
            "John Doe",
            "Mike Smith",
        ],
        [
            "Director of Digital Marketing",
            "Lead Front End Developer",
            "Author, Online Influencer",
        ],
        [
            "Your product has extremely helped us to learn more about our customers.",
            "Truly a unique and effective way of solving my problems. Wonderful!",
            "Been using it for the past month, a gamechanger for sure."
        ],
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const nextId = (id + 1) % testimonials[0].length;
            setId(nextId);
        }, 6000);

        return () => clearInterval(interval);
    }, [id]);

    return (
        <div className="app-container-testimonials">
            <h1>Testimonial Carousel</h1>
            <div className="testimonials">
                <div
                    className="profile-img"
                    style={{ backgroundImage: `url(${testimonials[0][id]})` }}
                ></div>
                <div className="container">
                    <div className="testimonial" style={{ transition: "0.3s" }}>
                        <h3 className="name">{testimonials[1][id]}</h3>
                        <p className="title">{testimonials[2][id]}</p>
                        <p className="quote">
                            &quot;<span>{testimonials[3][id]}</span>&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;