// components/MyChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getAuthToken } from "../../api/Register/LoginApi";
import axios from "axios";

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type PatientDataType = {
  [key: string]: number;
};

type GenderDatType = {
  male: number;
  female: number;
};

type AppoinmentsDatType = {
  analysisNo: number | null; // analysisNo can be a number or null
  data: number[]; // data is an array of strings
  labels: string[]; // labels is an array of strings
};

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString;
  }

  // Format options for "DD MMM YYYY"
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const ReportScreen: React.FC = () => {
  const [treatmentsPerPatientData, setTreatmentsPerPatientData] =
    useState<PatientDataType[]>();
  const [treatmentsPerGenderData, setTreatmentsPerGenderData] =
    useState<GenderDatType>({ male: 0, female: 0 });
  const [appointmentsData, setAppointmentsData] = useState<AppoinmentsDatType>({
    analysisNo: null,
    data: [],
    labels: [],
  });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.error("No token found");
          return;
        }

        const treatmentsPerPatientResponse = await axios.get<PatientDataType[]>(
          "/api/analysis/treatments-per-patient",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const treatmentsPerGenderResponse = await axios.get<GenderDatType>(
          "/api/analysis/treatments-per-gender",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const appointmentsResponse = await axios.get<AppoinmentsDatType[]>(
          "/api/analysis/getAppointmentData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTreatmentsPerPatientData(treatmentsPerPatientResponse.data);
        setTreatmentsPerGenderData(treatmentsPerGenderResponse.data);
        setAppointmentsData(appointmentsResponse.data[0]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const filterAndSortAppointmentsData = () => {
    if (!appointmentsData.labels || !appointmentsData.data) {
      console.log("No appointments data available");
      return appointmentsData;
    }
    // Create an array of objects with date and data
    const combinedData = appointmentsData.labels
      .map((label, index) => {
        // Parse the date string manually
        const [_, month, day, time, __, year] = label.split(" ");
        const [hours, minutes] = time.split(":");
        const date = new Date(
          parseInt(year),
          getMonthNumber(month),
          parseInt(day),
          parseInt(hours),
          parseInt(minutes)
        );
        return {
          date: isNaN(date.getTime()) ? null : date,
          value: parseInt(appointmentsData.data[index]),
        };
      })
      .filter((item) => item.date !== null);

    // Filter the data based on start and end dates
    const filteredData = combinedData.filter(
      (item) =>
        (!startDate || item.date >= new Date(startDate)) &&
        (!endDate || item.date <= new Date(endDate))
    );

    // Sort the filtered data by date
    const sortedData = filteredData.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    // Separate the sorted data back into labels and data arrays
    const result = {
      ...appointmentsData,
      labels: sortedData.map((item) => item.date.toISOString()),
      data: sortedData.map((item) => item.value),
    };
    return result;
  };

  // Helper function to convert month name to month number
  const getMonthNumber = (monthName: string): number => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.indexOf(monthName);
  };

  const filteredAndSortedAppointmentsData = filterAndSortAppointmentsData();

  const treatmentsPerPatientChartConfig = {
    labels: Object.keys(treatmentsPerPatientData || {}),
    datasets: [
      {
        label: "Treatement Per Patient",
        data: Object.values(treatmentsPerPatientData || {}),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const treatmentsPerGenderChartConfig = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Treatement Per Gender",
        data: [
          treatmentsPerGenderData?.male || 0,
          treatmentsPerGenderData?.female || 0,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const appointmentsChartConfig = {
    labels:
      filteredAndSortedAppointmentsData?.labels?.map(formatDateString) || [],
    datasets: [
      {
        label: "Appointments",
        data: filteredAndSortedAppointmentsData?.data || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="Treatments Per Patient">
            <Line data={treatmentsPerPatientChartConfig} options={options} />
          </ChartCard>

          <ChartCard title="Treatments Per Gender">
            <Line data={treatmentsPerGenderChartConfig} options={options} />
          </ChartCard>

          <ChartCard title="Appointments Over Time" className="md:col-span-2">
            <div className="mb-4 flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Start Date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-gray-700"
                >
                  End Date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Reset
              </button>
            </div>
            <Line data={appointmentsChartConfig} options={options} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};

export default ReportScreen;
