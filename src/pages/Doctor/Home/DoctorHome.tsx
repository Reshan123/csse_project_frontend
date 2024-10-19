// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Fullcalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { EventClickArg } from "@fullcalendar/core";
// import { Modal } from "antd";

// // Define types for your context and event data
// type Doctor = {
//   availability: boolean;
//   username: string;
//   userToken: string;
// };

// type DoctorContextType = {
//   doctor: Doctor | null;
//   dispatch: React.Dispatch<any>; // You might want to define a more specific action type
// };

// type EventType = {
//   title: string;
//   start: string;
//   end: Date;
//   bookingId: string;
// };

// type EventDetailsType = {
//   pet_name: string;
//   pet_species: string;
//   pet_breed: string;
//   owner_name: string;
//   owner_contact: string;
//   start_time: string;
// };

// // Import your custom hook (you might need to create a .d.ts file for this)
// import { useDoctorContext } from "../../../../hooks/useDoctorContext";

// const LandingPage: React.FC = () => {
//   const [doctorAvailability, setDoctorAvailability] = useState<boolean>(false);
//   const { doctor, dispatch } = useDoctorContext() as DoctorContextType;

//   const [events, setEvents] = useState<EventType[]>([]);
//   const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//   const [eventDetails, setEventDetails] = useState<EventDetailsType | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (doctor) {
//       setDoctorAvailability(doctor.availability);
//     }

//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/bookings/getDoctorBookings/${doctor?.username}`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch events");
//         }

//         const eventData = await response.json();

//         const formattedEvents: EventType[] = eventData.map((event: any) => ({
//           title: `${event.pet_name} - ${event.pet_species}`,
//           start: event.start_time,
//           end: new Date(new Date(event.start_time).getTime() + 30 * 60000),
//           bookingId: event._id,
//         }));

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, [doctor]);

//   const changeAvailability = async () => {
//     const newAvailability = !doctorAvailability;
//     setDoctorAvailability(newAvailability);

//     const config = {
//       method: "PUT",
//       headers: {
//         authorization: `Bearer ${doctor?.userToken}`,
//       },
//     };

//     try {
//       const response = await fetch("http://localhost:4000/api/doctor/updateDoctorDetailsFromToken", config);
//       const json = await response.json();

//       if (!response.ok) {
//         throw Error(json.error);
//       }

//       dispatch({ type: "UPDATE AVAILABILITY", payload: newAvailability });
//     } catch (error) {
//       console.log((error as Error).message);
//     }
//   };

//   const handleEventClick = async (clickInfo: EventClickArg) => {
//     setSelectedEvent(clickInfo.event as unknown as EventType);

//     const bookingId = clickInfo.event.extendedProps.bookingId;

//     try {
//       const response = await fetch(`http://localhost:4000/api/bookings/getBooking/${bookingId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch event details");
//       }
//       const eventData = await response.json();
//       setEventDetails(eventData);
//       setIsModalVisible(true);
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//     }
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//   };

//   const logOutUser = () => {
//     localStorage.removeItem("doctor");
//     dispatch({ type: "LOGOUT" });
//     navigate("/doctor/login");
//   };

//   return (
//     <>
//       <div style={{
//         display: "flex",
//         justifyContent: "space-between",
//         margin: "50px 50px 0px 50px",
//       }}>
//         <div style={{
//           fontWeight: 600,
//           fontSize: "1.5rem",
//         }}>
//           Availability:{" "}
//           <button
//             style={{
//               padding: "10px 17px",
//               border: "1px solid #00000045",
//               borderRadius: "8px",
//             }}
//             onClick={changeAvailability}
//           >
//             {doctorAvailability ? "Available" : "Unavailable"}
//           </button>
//         </div>

//         <div style={{
//           fontWeight: 600,
//           fontSize: "1.5rem",
//         }}>
//           <button
//             style={{
//               padding: "10px 17px",
//               border: "1px solid #00000045",
//               borderRadius: "8px",
//             }}
//             onClick={logOutUser}
//           >
//             Log Out
//           </button>
//         </div>
//       </div>

//       <hr style={{
//         margin: "10px 50px 0px 50px",
//       }} />

//       <div className="calendar-container">
//         <Fullcalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView={"dayGridMonth"}
//           headerToolbar={{
//             start: "dayGridMonth,timeGridWeek,timeGridDay",
//             center: "title",
//             end: "today,prev,next",
//           }}
//           height={"90vh"}
//           events={events}
//           eventTimeFormat={{
//             hour: "numeric",
//             minute: "2-digit",
//             meridiem: true,
//           }}
//           eventClick={handleEventClick}
//         />
//       </div>

//       <Modal title="Booking Details" visible={isModalVisible} onCancel={handleModalCancel} footer={null} centered>
//         {selectedEvent && eventDetails && (
//           <div>
//             <p><strong>Pet Name:</strong> {eventDetails.pet_name}</p>
//             <p><strong>Pet Species:</strong> {eventDetails.pet_species}</p>
//             <p><strong>Pet Breed:</strong> {eventDetails.pet_breed}</p>
//             <p><strong>Owner Name:</strong> {eventDetails.owner_name}</p>
//             <p><strong>Owner Contact:</strong> {eventDetails.owner_contact}</p>
//             <p><strong>Booking Date & Time:</strong> {new Date(eventDetails.start_time).toLocaleString()}</p>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default LandingPage;