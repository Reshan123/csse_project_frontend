import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loginUser } from "../api/Register/LoginApi";

const mock = new MockAdapter(axios);

describe("loginUser", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should return access token on successful login", async () => {
    const loginData = { username: "testUser", password: "testPassword" };
    const mockResponse = {
      success: true,
      message: "Login successful",
      accessToken: "fakeAccessToken",
    };

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
    mock
      .onPost("http://localhost:8000/api/auth/signin")
      .reply(400, mockErrorResponse);

    await expect(loginUser(loginData)).rejects.toThrow(
      "Invalid username or password"
    );
  });

  it("should throw a network error on network issues", async () => {
    const loginData = { username: "testUser", password: "testPassword" };

    mock.onPost("http://localhost:8000/api/auth/signin").networkError();

    await expect(loginUser(loginData)).rejects.toThrow("Network error");
  });
});
