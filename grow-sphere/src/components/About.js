import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const AboutComponent = () => {
    return (
        <div className="container">
            <Card className="shadow">
                <Card.Body>
                    <Card.Title className="text-center mb-4"><h2>Welcome to GrowSphere!</h2></Card.Title>
                    <hr />
                    <Card.Text>
                        <h2>Who We Are</h2>
                        <p>
                            At GrowSphere, we believe in nurturing growth, fostering community, and empowering individuals through our innovative platform. We are a dynamic team dedicated to providing tools and resources that enhance productivity, learning, and personal development.
                        </p>

                        <h2>What We Do</h2>
                        <p>
                            GrowSphere is your go-to hub for connecting with like-minded individuals, sharing insights, and accessing a wide range of resources tailored to your interests and professional needs. Whether you're looking to expand your knowledge, explore new opportunities, or simply get inspired, our community and platform are here to support you every step of the way.
                        </p>

                        <h2>Our Mission</h2>
                        <p>
                            Our mission is simple yet ambitious: to create an environment that cultivates personal and professional growth. We strive to make GrowSphere a space where everyone—regardless of their background or career stage—can come to learn, share, and grow.
                        </p>

                        <h2>Why Join Us?</h2>
                        <ul>
                            <li><strong>Community:</strong> Connect with peers, mentors, and industry leaders who are eager to share their experiences and help guide your growth journey.</li>
                            <li><strong>Resources:</strong> From tutorials and workshops to insightful articles and forums, access a wealth of information that can propel you forward.</li>
                            <li><strong>Support:</strong> At GrowSphere, you’re never alone. Our community is here to offer support, advice, and encouragement as you pursue your goals.</li>
                        </ul>

                        <h2>Get Involved</h2>
                        <p>
                            Ready to dive in? Join us today and start making the most of everything GrowSphere has to offer. Sign up for an account, explore our resources, and become part of a community that’s all about helping you reach your fullest potential.
                        </p>

                        <p>We can't wait to welcome you and see how you grow with us!</p>
                    </Card.Text>
                    {/* Sign up button and login note */}
                    <div className="text-center">
                        <Link to="/register" className="btn btn-secondary">Sign Up Now</Link>
                        <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>
                            Already signed up? <Link to="/login" className="text-success">Log in</Link>
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AboutComponent;
