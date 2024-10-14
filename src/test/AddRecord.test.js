import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loginUser } from "../api/Register/LoginApi";
import MedicalRecordForm from "../pages/staff/AddMedicalRecord";

=
const mock = new MockAdapter(axios);

describe("User Authentication and Medical Record Submission", () => {
  let accessToken;

  afterEach(() => {
    // Reset any mocked Axios requests after each test
    mock.reset();
  });

  it("should log in and retrieve an access token, then submit a medical record", async () => {
    const loginData = { username: "testUser", password: "testPassword" };
    const mockLoginResponse = {
      success: true,
      message: "Login successful",
      accessToken: "fakeAccessToken",
    };

    // Mock the POST request to the API endpoint for login
    mock.onPost("http://localhost:8000/api/auth/signin").reply(200, mockLoginResponse);

    // Log in and get the access token
    const loginResponse = await loginUser(loginData);
    expect(loginResponse).toEqual(mockLoginResponse);
    accessToken = loginResponse.accessToken;

    // Check if the token is stored correctly
    expect(localStorage.getItem('accessToken')).toBe('fakeAccessToken');

    // Now, mock the API request for submitting a medical record
    mock.onPost("/api/medicalRecords/addRecord").reply((config) => {
      const { Authorization } = config.headers;
      if (Authorization === `Bearer ${accessToken}`) {
        return [200, { message: 'Medical record added successfully' }];
      }
      return [401, { message: 'Unauthorized' }];
    });

    // Simulate the MedicalRecordForm submission
    const { container } = render(<MedicalRecordForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Patient ID/i), {
      target: { value: 'P1' },
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2000-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText(/Emergency Contact Name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Emergency Contact Number/i), {
      target: { value: '0987654321' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit Medical Record/i }));

    // Check that the form submission was successful
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully: Medical record added successfully')).toBeInTheDocument();
    });
  });

  it("should throw an error on login failure", async () => {
    const loginData = { username: "testUser", password: "wrongPassword" };
    const mockErrorResponse = {
      success: false,
      message: "Invalid username or password",
    };

    // Mock the POST request to the API endpoint with an error response
    mock.onPost("http://localhost:8000/api/auth/signin").reply(400, mockErrorResponse);

    await expect(loginUser(loginData)).rejects.toThrow("Invalid username or password");
  });

  it("should throw a network error on network issues", async () => {
    const loginData = { username: "testUser", password: "testPassword" };

    // Mock the POST request to the API endpoint to simulate a network error
    mock.onPost("http://localhost:8000/api/auth/signin").networkError();

    await expect(loginUser(loginData)).rejects.toThrow("Network error");
  });

  it("should handle API failure during medical record submission", async () => {
    // Mock the POST request to return an error response
    mock.onPost("/api/medicalRecords/addRecord").reply(500, {
      message: 'Internal Server Error',
    });

    // Simulate the MedicalRecordForm submission
    render(<MedicalRecordForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Patient ID/i), {
      target: { value: 'P1' },
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2000-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText(/Emergency Contact Name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Emergency Contact Number/i), {
      target: { value: '0987654321' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit Medical Record/i }));

    // Check that the error message was logged
    await waitFor(() => {
      expect(screen.getByText('Error submitting form')).toBeInTheDocument();
    });
  });
});
