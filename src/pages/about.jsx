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
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Welcome to Tournament Management System, a platform designed to
            enhance athletic events for the State Colleges and Universities
            Athletic Association (SCUAA) in the Bicol region.
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
                Teams can register through the platform by submitting their
                details, including team lineups, coach information, and
                preferred events. The system also supports online payment for
                registration fees.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Does the system provide live updates?
              </h3>
              <p className="text-gray-600">
                Yes, TMS offers real-time updates on match schedules, scores,
                and event notifications, ensuring participants and spectators
                stay informed throughout the tournament.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Can I access historical data and analytics?
              </h3>
              <p className="text-gray-600">
                Absolutely! The system maintains a comprehensive database of
                past events, player statistics, and performance analytics to
                help in decision-making and future event planning.
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

        {/* Contact Us Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            For more details, don’t hesitate to contact us:
          </p>
          <ul className="text-gray-600 mt-4">
            <li>+639186841062</li>
            <li>+639297586496 </li>
            <li>+63 (XXX) YYY ZZZZ</li>
          </ul>
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
