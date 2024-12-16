import React from "react";
import { Card, Button } from "flowbite-react";
import DefaultLayout from "../layout/defaultLayout";
import jen from "../assets/jen.jpg";
import kurt from "../assets/kurt.jpeg";
import arvin from "../assets/arvin.jpg";

const AboutPage = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-8 py-20">
        {/* Header */}
        <section className="text-left mb-12">
          <h1 className="text-4xl text-center font-bold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600">
            A web-based Tournament Management System created to optimize event
            hosting, specifically designed for the State Colleges and
            Universities Athletic Association (SCUAA) in the Bicol region. This
            system offers features for efficient scheduling, real-time updates,
            and seamless management of team and player information. It supports
            multiple sports disciplines, enabling organizers to coordinate while
            enhancing the experience for participants and spectators. With its
            user-friendly interface and robust functionality, the system ensures
            smooth operations, promotes transparency, and elevates the quality
            of athletic events in the region.
          </p>
        </section>

        {/* FAQs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">FAQs</h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                What is the Tournament Management System?
              </h3>
              <p className="text-gray-600">
                The Tournament Management System (TMS) is a digital platform
                designed to streamline the organization and management of
                athletic events, specifically for SCUAA in the Bicol region. TMS
                handles event registration, scheduling, match results, player
                data, and more, offering real-time updates and insights.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                How can teams register for events?
              </h3>
              <p className="text-gray-600">
                The system registration is designed to be simple and
                user-friendly. Delegates can create accounts, log in to the
                platform, and fill out the required details. Once submitted,
                organizers can review and approve the registration to confirm
                participation in the event.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Does the system provide live updates?
              </h3>
              <p className="text-gray-600">
                Yes, TMS offers real-time updates on match schedules, and event
                notifications, ensuring participants stay informed throughout
                the tournament.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                What sports disciplines does the TMS support?
              </h3>
              <p className="text-gray-600">
                The Tournament Management System supports a wide range of sports
                disciplines, specially sports featured in SCUAA events, ensuring
                efficient management and coordination for each sport, from
                basketball and volleyball to athletics and swimming.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Can the TMS handle multiple tournaments simultaneously?{" "}
              </h3>
              <p className="text-gray-600">
                Yes, the TMS is designed to manage multiple tournaments at once,
                allowing organizers to oversee various events and schedules
                across different sports disciplines efficiently.
              </p>
            </Card>
          </div>
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

        {/* Meet The Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Meet The Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Member Cards */}
            <Card className="text-center">
              <img
                src={jen}
                alt="Jenelyn E. Macarilay"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Jenelyn E. Macarilay
              </h3>
            </Card>
            <Card className="text-center">
              <img
                src={arvin}
                alt="Arvin C. Abina"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Arvin C. Abina
              </h3>
            </Card>
            <Card className="text-center">
              <img
                src={kurt}
                alt="Kurt Jostine L. Concepcion"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Kurt Jostine L. Concepcion
              </h3>
            </Card>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
