import React from "react";
import { AiFillStar } from "react-icons/ai";

const TestimonialCard = () => {
    const feedbacks = [
        { name: "John Doe", title: "Content Creator", text: "Spark completely took the pain out of sharing my content. It's so simple and effective!" },
        { name: "Jane Smith", title: "Artist", text: "I am so grateful for Spark's support. It's invaluable for my digital presence. Thank you!" },
        { name: "Robert Johnson", title: "Entrepreneur", text: "Having had several unsuccessful attempts before, I'm glad I found Spark. Truly recommended." },
        { name: "Emily Brown", title: "Social Media Manager", text: "Brilliant communication during the search and I am now very pleased to recommend Spark to others." }
    ];

    return (
        <section className="testimonials">
            <div className="testimonials-grid">
                {feedbacks.map((item, idx) => (
                    <div key={idx} className="testimonial-card">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(s => <AiFillStar key={s} />)}
                        </div>
                        <p>"{item.text}"</p>
                        <div className="testimonial-user">
                            <h4>{item.name}</h4>
                            <span>{item.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialCard;
