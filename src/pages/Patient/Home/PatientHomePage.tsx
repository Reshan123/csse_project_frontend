import React from 'react';
import { Calendar, ClipboardList, PhoneCall, User } from 'lucide-react';

const PatientHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-6 py-20 sm:py-28 lg:flex lg:items-center lg:justify-between">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold mb-4 sm:text-5xl lg:text-6xl leading-tight">Welcome to HealthCare</h1>
            <p className="text-xl mb-8 text-teal-100">Your health is our priority. Manage your care with ease.</p>
            <button className="bg-white text-teal-800 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-teal-100 transition duration-300">
              Get Started
            </button>
          </div>
          {/* <div className="mt-12 lg:mt-0 lg:w-5/12">
            <img src="https://img.freepik.com/free-photo/medical-nurse-attaching-oxymeter-senior-woman-patient_482257-6434.jpg?t=st=1729369806~exp=1729373406~hmac=d857cb4c7e9c44091ce79f8e26d794d0bc785ed6fedaf35b7bdffb7d8e0b7377&w=1060" alt="Doctor with patient" className="rounded-lg shadow-2xl object-cover w-full h-auto" />
          </div> */}
        </div>
      </header>

      {/* Quick Access Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Quick Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <QuickAccessCard icon={<Calendar className="w-10 h-10" />} title="Appointments" description="Schedule or view your appointments" />
            <QuickAccessCard icon={<ClipboardList className="w-10 h-10" />} title="Medical Records" description="Access your health history" />
            <QuickAccessCard icon={<PhoneCall className="w-10 h-10" />} title="Telemedicine" description="Connect with doctors online" />
            <QuickAccessCard icon={<User className="w-10 h-10" />} title="Profile" description="Update your personal information" />
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceCard 
              imageUrl="https://img.freepik.com/free-photo/general-practitioner-consulting-ill-little-girl-treatment-inside-clinic-pediatric-ward-expert-pediatrist-checking-sick-girl-health-condition-using-stethoscope-while-parents-sitting-besider-her_482257-49730.jpg?t=st=1729369949~exp=1729373549~hmac=5417119079389a0f5141632bc8510329749a6b62ad111c90901eff40f762b086&w=1060"
              title="Primary Care"
              description="Comprehensive health care for you and your family"
            />
            <ServiceCard 
              imageUrl="https://img.freepik.com/free-photo/masseur-taking-care-her-client_23-2149273918.jpg?t=st=1729369996~exp=1729373596~hmac=9e334abc5359cd08a85b370278519358d7ba01b79dc0ca9ed31e18206efee374&w=1060"
              title="Specialized Treatment"
              description="Expert care in various medical specialties"
            />
            <ServiceCard 
              imageUrl="https://img.freepik.com/free-photo/three-paramedics-taking-out-strecher-from-ambulance_657921-1469.jpg?t=st=1729370033~exp=1729373633~hmac=f7148ee5e8b3f42f2a56a90babe64c9cd0f5055ef16419deaa799351b683e3bc&w=1060"
              title="Emergency Services"
              description="24/7 emergency care when you need it most"
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-teal-800 text-white">
        <div className="container mx-auto px-6">
          <blockquote className="text-center max-w-3xl mx-auto">
            <p className="text-2xl italic mb-6">"HealthCare has transformed how I manage my health. The staff is incredibly caring and the online portal makes everything so convenient!"</p>
            <cite className="text-xl font-semibold block">- Sarah Johnson, Patient</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const QuickAccessCard = ({ icon, title, description }: QuickAccessCardProps) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200">
    <div className="text-teal-600 mb-6">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface ServiceCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const ServiceCard = ({ imageUrl, title, description }: ServiceCardProps) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
    <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default PatientHomePage;