import { useState } from 'react';

const ScheduleForm = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [doctor, setDoctor] = useState('');
    const [reason, setReason] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log({ date, time, doctor, reason });
    };
  
    return (
      <div className="bg-green-100 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Schedule New Appointment</h2>
        <div className="flex">
          <div className="w-1/3">
            <img src="/api/placeholder/200/300" alt="Doctor cartoon" className="w-full" />
          </div>
          <form onSubmit={handleSubmit} className="w-2/3 pl-6">
            <div className="mb-4">
              <label htmlFor="date" className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block mb-1 font-medium">Time</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="doctor" className="block mb-1 font-medium">Doctor</label>
              <select
                id="doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">select</option>
                <option value="dr-smith">Dr. Smith</option>
                <option value="dr-johnson">Dr. Johnson</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="reason" className="block mb-1 font-medium">Reason to visit</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter the reason"
                rows={3}
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Submit
              </button>
              <button type="button" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ScheduleForm;