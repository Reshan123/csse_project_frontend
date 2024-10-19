// components/MyChart.js
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
  const standardizedDateString = dateString.replace(/ IST/, " UTC");
  const date = new Date(standardizedDateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString); // Log the invalid date
    return dateString; // Return the original string if parsing fails
  }

  // Format options for "DD MMM YYYY"
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options); // Adjust locale as necessary
};

const ReportScreen = () => {
  const [treatmentsPerPatientData, setTreatmentsPerPatientData] =
    useState<PatientDataType[]>();
  const [treatmentsPerGenderData, setTreatmentsPerGenderData] =
    useState<GenderDatType>({ male: 0, female: 0 });
  const [appointmentsData, setAppointmentsData] = useState<AppoinmentsDatType>({
    analysisNo: null, // Default value for analysisNo
    data: [], // Start with an empty array
    labels: [], // Start with an empty array
  });

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
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Data for the chart
  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       label: "Sales",
  //       data: [30, 45, 60, 70, 90, 110],
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderWidth: 2,
  //       fill: true,
  //       tension: 0.4,
  //     },
  //   ],
  // };

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
        ], // Extract data from state
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
      appointmentsData?.labels?.length > 0
        ? appointmentsData?.labels.map(formatDateString)
        : [], // Use state labels
    datasets: [
      {
        label: "Appointments",
        data: appointmentsData?.data?.length > 0 ? appointmentsData?.data : [], // Use state data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  console.log(treatmentsPerPatientData);
  console.log(treatmentsPerGenderData);
  console.log(appointmentsData);

  return (
    <div>
      {/* <Line data={data} options={options} /> */}
      <Line data={treatmentsPerPatientChartConfig} options={options} />
      <Line data={treatmentsPerGenderChartConfig} options={options} />
      <Line data={appointmentsChartConfig} options={options} />
    </div>
  );
};

export default ReportScreen;
