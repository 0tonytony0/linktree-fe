import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials-header">
        <h1>
          Here's what our <span className="highlight">customer</span> has to say
        </h1>
        <p className="short-description">
          !!  Real experiences from our valued users. See how Spark is helping businesses and creators succeed.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <h3>{testimonial.review}</h3>
            <p>{testimonial.description}</p>
            <div className="testimonial-footer">
              <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
              <div>
            <h3>{testimonial.name}</h3>
                <p>{testimonial.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
