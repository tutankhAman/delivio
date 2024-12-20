import React from 'react';
import './aboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Delivo</h1>
      <p className="about-description">
        Delivo is a project created by a group of enthusiastic students who are passionate about revolutionizing the food ordering experience. Our mission is to provide a seamless, user-friendly platform that connects customers with their favorite restaurants, making food delivery faster and more enjoyable.
      </p>
      <h2>Our Vision</h2>
      <p className="about-description">
        We envision a world where ordering food is as easy as a few clicks. Our goal is to enhance the online food ordering experience by integrating innovative features, ensuring high-quality service, and providing a diverse range of culinary options.
      </p>
      <h2>Meet the Team</h2>
      <div className="team-section">
        <div className="team-member">
          <h3>Aman Aziz</h3>
          <p>Lead Developer</p>
          <p>Aman is a tech enthusiast with a knack for project management. He ensures that everything runs smoothly.</p>
        </div>
        <div className="team-member">
          <h3>Koustubh Pande</h3>
          <p>Backend Manager</p>
          <p>Koustubh is a tech enthusiast with a knack for project management. He ensures that everything runs smoothly.</p>
        </div>
        <div className="team-member">
          <h3>Mukul Singhal</h3>
          <p>Database Manager</p>
          <p>Mukul is a tech enthusiast with a knack for project management. He ensures that everything runs smoothly.</p>
        </div>
        <div className="team-member">
          <h3>Tanay Kumar Dharmendra Shahi</h3>
          <p>Frontend Designer</p>
          <p>Tanay is a coding wizard who brings our ideas to life with her exceptional programming skills.</p>
        </div>
        <div className="team-member">
          <h3>Hemen Bhasin</h3>
          <p>Frontend Designer</p>
          <p>Hemen is the creative mind behind our user interface, ensuring that Delivo is not only functional but also visually appealing.</p>
        </div>
      </div>
      <h2>Join Us on Our Journey</h2>
      <p className="about-description">
        We invite you to join us on this exciting journey as we continue to innovate and improve the food ordering experience. Your feedback is invaluable to us, and we are always looking for ways to enhance our platform.
      </p>
    </div>
  );
}

export default AboutUs;
