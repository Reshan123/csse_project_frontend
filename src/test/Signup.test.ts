// src/api/UserApi.test.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { User } from "../types/User";
import { createUser } from "../api/Register/SignupApi";


const mock = new MockAdapter(axios);

describe("createUser", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should create a user and return user data", async () => {
    const user: User = {
      username: "johnDoe",
      email: "john.doe@example.com",
      password: "securepassword",
      role: ["user"],
    };

    mock.onPost("http://localhost:8000/api/auth/signup").reply(201, {
      success: true,
      data: { ...user, id: "12345" },
    });

    const response = await createUser(user);

    expect(response).toEqual({
      success: true,
      data: { ...user, id: "12345" },
    });
  });

  it("should throw an error when the API fails", async () => {
    const user: User = {
      username: "janeDoe",
      email: "jane.doe@example.com",
      password: "securepassword",
      role: ["user"],
    };

    mock.onPost("http://localhost:8000/api/auth/signup").reply(500, {
      success: false,
      message: "Internal Server Error",
    });

    await expect(createUser(user)).rejects.toThrow("Request failed with status code 500");
  });
});
