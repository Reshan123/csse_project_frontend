import React, { useState } from "react";
import { MedicalRecord } from "../../types/MedicalRecord";
import { useMedicalRecords } from "../../hooks/useMedicalRecordsHook";
import toast, { Toaster } from "react-hot-toast";

interface MedicalFormProps {
  userId?: string;
}

const MedicalRecordForm: React.FC<MedicalFormProps> = ({userId}) => {
  const { addMedicalRecord, data } = useMedicalRecords();

  const [formData, setFormData] = useState<MedicalRecord>({
    userId: userId ?? null,
    patientId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
    allergies: [],
    ongoingMedications: [],
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const [errors, setErrors] = useState<Partial<MedicalRecord>>({});

  const generatePatientId = (dateOfBirth: string) => {
    const birthDatePart = dateOfBirth.replace(/-/g, "");
    const yearPart = birthDatePart.slice(2, 4);
    const monthDayPart = birthDatePart.slice(4, 8);
    const randomPart = Math.floor(10 + Math.random() * 90).toString();
    const patientID = `P${yearPart}${monthDayPart}${randomPart}`;
    const existingID = data.find((item) => item.patientId === patientID);
    if (existingID) {
      return generatePatientId(dateOfBirth);
    }
    return patientID;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      const patientId = generatePatientId(value);
      setFormData({ ...formData, patientId, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: "allergies" | "ongoingMedications"
  ) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, [field]: values });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<MedicalRecord> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.emergencyContactName.trim())
      newErrors.emergencyContactName = "Emergency contact name is required";
    if (!formData.emergencyContactNumber.trim())
      newErrors.emergencyContactNumber = "Emergency contact number is required";

    const phoneRegex = /^\d{10}$/;
    if (formData.contactNumber && !phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber =
        "Invalid contact number format (should be 10 digits)";
    }
    if (
      formData.emergencyContactNumber &&
      !phoneRegex.test(formData.emergencyContactNumber)
    ) {
      newErrors.emergencyContactNumber =
        "Invalid emergency contact number format (should be 10 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    const formattedDateOfBirth = formData.dateOfBirth.split("T")[0];

    const dataToSubmit = {
      ...formData,
      dateOfBirth: formattedDateOfBirth,
    };

    if (addMedicalRecord) {
      try {
        await addMedicalRecord(dataToSubmit);
        toast.success("Medical record submitted successfully!");
        // Optionally, reset the form here
        // setFormData({ ... }); // Reset to initial state
      } catch (error) {
        toast.error("Failed to submit medical record. Please try again.");
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto mt-8 p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Medical Record Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="patientId"
              className="block text-sm font-medium text-gray-700"
            >
              Patient ID
            </label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              readOnly
              value={formData.patientId}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.firstName ? "border-red-500" : ""}`}
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.lastName ? "border-red-500" : ""}`}
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.dateOfBirth ? "border-red-500" : ""}`}
              required
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.gender ? "border-red-500" : ""}`}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.contactNumber ? "border-red-500" : ""}`}
              required
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.contactNumber}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.address ? "border-red-500" : ""}`}
            required
          ></textarea>
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="allergies"
            className="block text-sm font-medium text-gray-700"
          >
            Allergies (comma-separated)
          </label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "allergies")}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div className="mt-4">
          <label
            htmlFor="ongoingMedications"
            className="block text-sm font-medium text-gray-700"
          >
            Ongoing Medications (comma-separated)
          </label>
          <textarea
            id="ongoingMedications"
            name="ongoingMedications"
            value={formData.ongoingMedications.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "ongoingMedications")}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="emergencyContactName"
              className="block text-sm font-medium text-gray-700"
            >
              Emergency Contact Name
            </label>
            <input
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.emergencyContactName ? "border-red-500" : ""}`}
              required
            />
            {errors.emergencyContactName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.emergencyContactName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="emergencyContactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Emergency Contact Number
            </label>
            <input
              type="tel"
              id="emergencyContactNumber"
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.emergencyContactNumber ? "border-red-500" : ""}`}
              required
            />
            {errors.emergencyContactNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.emergencyContactNumber}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Medical Record
          </button>
        </div>
      </form>
    </>
  );
};

export default MedicalRecordForm;
