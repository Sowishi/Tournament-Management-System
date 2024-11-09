import React from "react";
import { Card, Button } from "flowbite-react";
import DefaultLayout from "../layout/defaultLayout";

const AboutPage = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-8">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Welcome to Tournament Management System, a platform designed to
            enhance athletic events for the State Colleges and Universities
            Athletic Association (SCUAA) in the Bicol region.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600">
            Our mission is to empower the sports community within the Bicol
            region by providing an innovative, user-friendly, and reliable
            system for organizing and managing athletic events. We aim to
            promote sportsmanship, unity, and healthy competition across state
            colleges and universities.
          </p>
        </section>

        {/* What We Offer Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What We Offer
          </h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Comprehensive Event Management
              </h3>
              <p className="text-gray-600">
                From registration and team lineup submissions to match
                scheduling and results tracking, our system handles all aspects
                of tournament operations with precision.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Real-Time Updates
              </h3>
              <p className="text-gray-600">
                Stay informed with live tournament updates, event notifications,
                and match updates that keep participants and supporters
                connected to the action.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Data Management
              </h3>
              <p className="text-gray-600">
                Manage team and player data, historical event records, and
                analytics for better decision-making and event evaluation.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                User-Friendly Interface
              </h3>
              <p className="text-gray-600">
                Designed with simplicity in mind, our platform ensures that both
                tech-savvy and novice users can navigate and manage events
                effectively.
              </p>
            </Card>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Join Us in Creating Memorable Events
          </h2>
          <p className="text-lg text-gray-600">
            Be part of the change that brings efficiency, transparency, and
            excitement to SCUAA events. Discover how the Tournament Management
            System can transform athletic tournament experiences.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            For more details, don’t hesitate to contact us:
          </p>
          <ul className="text-gray-600 mt-4">
            <li>+63 91 86841062</li>
            <li>+63 (XXX) YYY ZZZZ</li>
            <li>+63 (XXX) YYY ZZZZ</li>
          </ul>
        </section>

        {/* Meet The Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Meet The Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Team Member */}
            <Card className="text-center">
              <img
                src="team-member-photo.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Team Member Name
              </h3>
              <p className="text-gray-600">Role</p>
              <Button href="https://facebook.com" color="blue" className="mt-4">
                Facebook Profile
              </Button>
            </Card>
            <Card className="text-center">
              <img
                src="team-member-photo.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Team Member Name
              </h3>
              <p className="text-gray-600">Role</p>
              <Button href="https://facebook.com" color="blue" className="mt-4">
                Facebook Profile
              </Button>
            </Card>
            <Card className="text-center">
              <img
                src="team-member-photo.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Team Member Name
              </h3>
              <p className="text-gray-600">Role</p>
              <Button href="https://facebook.com" color="blue" className="mt-4">
                Facebook Profile
              </Button>
            </Card>
            {/* Duplicate the above block for each team member */}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
