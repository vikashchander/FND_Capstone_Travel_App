import fetch from "node-fetch";
import axios from "axios";
import { app } from "../server";
let server;

jest.mock("node-fetch");

beforeAll(() => {
  server = app.listen(3000, (err) => {
    if (err) throw err;
  });
});

afterAll((done) => {
  server.close(done);
});

describe("trips endpoint", () => {
  test("GET /trips", async () => {
    const res = await axios.get("http://localhost:3000/trips");

    expect(res.status).toBe(200);
  });

  test("POST /trips", async () => {
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            postalCodes: [{ lat: 1, long: 1 }],
          }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            daily: {
              data: [
                {
                  city_name: "Light showers expected",
                  temp: 8.33,
                  weather: {
                    code: "801",
                    description: "Few clouds",
                    icon: "c02n",
                  },
                },
              ],
            },
          }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => ({
            hits: [{ webformatURL: "http://example.com/image.jpg" }],
          }),
        })
      );

    const body = {
      stateValue: "Delhi",
      countryValue: "India",
    };

    const res = await axios.post("http://localhost:4000/trips", body);

    expect(res.data).toEqual({
      data: {
        stateValue: "Delhi",
        countryValue: "India",
        imageURL: "https://example.com/image.jpg",
        weatherInfo: {
          city_name: "Light showers expected",
          temp: 8.33,
          weather: {
            code: "801",
            description: "Few clouds",
            icon: "c02n",
          },
        },
      },
    });
  });
});
