import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../../api/Register/LoginApi";
import emailjs from "emailjs-com";

interface ScheduledReport {
  id: string;
  email: string;
  frequency: string;
  nextSendDate: string;
  emailSent: boolean;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ReportScheduler: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(
    []
  );
  const [editingReport, setEditingReport] = useState<ScheduledReport | null>(
    null
  );
  const [deletingReportId, setDeletingReportId] = useState<string | null>(null);

  useEffect(() => {
    fetchScheduledReports();
  }, []);

  const fetchScheduledReports = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get<ScheduledReport[]>(
        "/api/scheduled-reports",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setScheduledReports(response.data);
      checkAndSendEmails(response.data);
    } catch (error) {
      console.error("Error fetching scheduled reports:", error);
    }
  };

  const sendEmail = async (
    from_name: string,
    to_name: string,
    email_to: string,
    subject: string,
    message: string
  ) => {
    try {
      await emailjs.send(
        "service_82qwbjo",
        "template_5l4ao1s",
        { from_name, to_name, email_to, subject, message },
        "XLk013RzBjrrLFE2J"
      );
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const checkAndSendEmails = async (reports: ScheduledReport[]) => {
    const token = getAuthToken();
    const today = new Date();
    const updatedReports = [...reports];
    let hasChanges = false;

    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      const nextSendDate = new Date(report.nextSendDate);

      if (
        !report.emailSent &&
        nextSendDate.getDate() === today.getDate() &&
        nextSendDate.getMonth() === today.getMonth() &&
        nextSendDate.getFullYear() === today.getFullYear()
      ) {
        try {
          // Send email using emailjs
          await sendEmail(
            "Hospital Admin",
            "",
            report.email,
            `Here's your ${report.frequency} report reminder.`,
            `Please login to your account to view your report.`
          );

          // Update emailSent status
          const response = await axios.put(
            `/api/scheduled-reports/emailSent/${report.id}`,
            { emailSent: true },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(`Email sent for report ${report.id}`);

          // Update the local state
          updatedReports[i] = {
            ...report,
            emailSent: true,
            nextSendDate: response.data.nextSendDate,
          };
          hasChanges = true;
        } catch (error) {
          console.error(`Error sending email for report ${report.id}:`, error);
        }
      }
    }

    // Update the state with the new reports only if changes were made
    if (hasChanges) {
      setScheduledReports(updatedReports);
    }
  };

  const handleScheduleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (editingReport) {
        await axios.put(
          `/api/scheduled-reports/${editingReport.id}`,
          { email, frequency },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "/api/scheduled-reports",
          { email, frequency },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setIsModalOpen(false);
      setEditingReport(null);
      setEmail("");
      setFrequency("weekly");
      fetchScheduledReports();
    } catch (error) {
      console.error("Error scheduling/updating report:", error);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    setDeletingReportId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingReportId) {
      try {
        const token = getAuthToken();
        await axios.delete(`/api/scheduled-reports/${deletingReportId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchScheduledReports();
      } catch (error) {
        console.error("Error deleting scheduled report:", error);
      }
    }
    setIsDeleteModalOpen(false);
    setDeletingReportId(null);
  };

  const handleEditSchedule = (report: ScheduledReport) => {
    setEditingReport(report);
    setEmail(report.email);
    setFrequency(report.frequency);
    setIsModalOpen(true);
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingReport(null);
          setEmail("");
          setFrequency("weekly");
          setIsModalOpen(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Schedule New Report
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {editingReport
                ? "Update Scheduled Report"
                : "Schedule New Report"}
            </h3>
            <form onSubmit={handleScheduleReport}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="frequency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Frequency
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingReport(null);
                  }}
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  {editingReport ? "Update" : "Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="mb-4">
              Are you sure you want to delete this scheduled report?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Scheduled Reports
        </h3>
        <div className="overflow-x-auto">
          {scheduledReports.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Frequency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Next Send Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email Sent
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scheduledReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {capitalizeFirstLetter(report.frequency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.nextSendDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.emailSent ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <button
                        onClick={() => handleEditSchedule(report)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        aria-label="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(report.id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No scheduled reports available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportScheduler;
