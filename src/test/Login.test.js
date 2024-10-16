import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loginUser } from "../api/Register/LoginApi";

// Create a new instance of MockAdapter for mocking Axios requests
const mock = new MockAdapter(axios);

describe("loginUser", () => {
  afterEach(() => {
    // Reset any mocked Axios requests after each test
    mock.reset();
  });

  it("should return access token on successful login", async () => {
    const loginData = { username: "testUser", password: "testPassword" };
    const mockResponse = {
      success: true,
      message: "Login successful",
      accessToken: "fakeAccessToken",
    };

    // Mock the POST request to the API endpoint
    mock
      .onPost("http://localhost:8000/api/auth/signin")
      .reply(200, mockResponse);

    const response = await loginUser(loginData);

    // Assert the response
    expect(response).toEqual(mockResponse);
  });

  it("should throw an error on login failure", async () => {
    const loginData = { username: "testUser", password: "wrongPassword" };
    const mockErrorResponse = {
      success: false,
      message: "Invalid username or password",
    };

    // Mock the POST request to the API endpoint with an error response
    mock
      .onPost("http://localhost:8000/api/auth/signin")
      .reply(400, mockErrorResponse);

    await expect(loginUser(loginData)).rejects.toThrow(
      "Invalid username or password"
    );
  });

  it("should throw a network error on network issues", async () => {
    const loginData = { username: "testUser", password: "testPassword" };

    // Mock the POST request to the API endpoint to simulate a network error
    mock.onPost("http://localhost:8000/api/auth/signin").networkError();

    await expect(loginUser(loginData)).rejects.toThrow("Network error");
  });
});
