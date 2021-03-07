const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);
// let nock = require('nock');

// Supertest end points.

describe("Testing endpoints", () => {
  expectedOutput = [
    {
      fullUrl: "https://www.youtube.com/",
      shorturl: "1",
      createdAt: "2021-03-06 16:00:29",
      clicks: 0,
    },
    {
      fullUrl: "https://github.com/",
      shorturl: "2",
      createdAt: "2021-03-07 00:02:29",
      clicks: 0,
    },
    {
      fullUrl: "https://reddit.com/",
      shorturl: "3",
      createdAt: "2021-03-07 00:02:29",
      clicks: 0,
    },
    {
      fullUrl: "https://facebook.com/",
      shorturl: "4",
      createdAt: "2021-03-07 00:02:29",
      clicks: 0,
    },
    {
      fullUrl: "https://faszfasfsebook.com/",
      shorturl: "5",
      createdAt: "2021-03-07 00:02:29",
      clicks: 0,
    },
  ];

  // it("Testing accessing to youtube, id = 1", async () => {
  //   const response = await request.get("/" + expectedOutput[0].shorturl);
  //   console.log(response.status);
  //   expect(response.status).toBe(303);
  // });

  it("Testing stats.", async () => {
    const response = await request.get("/api/stats");
    console.log(response.status);
    expect(response.status).toBe(500);
  });

  it("Testing accessing to youtube, id = 1", async () => {
    const response = await request.get("/" + expectedOutput[0].shorturl);
    console.log(response.status);
    expect(response.status).toBe(303);
  });

  it("Testing accessing to github, id = 2", async () => {
    const response = await request.get("/" + expectedOutput[1].shorturl);
    expect(response.status).toBe(303);
  });

  it("Testing accessing to reddit, id = 3", async () => {
    const response = await request.get("/" + expectedOutput[2].shorturl);
    expect(response.status).toBe(303);
  });

  it("Testing accessing to facebook, id = 4", async () => {
    const response = await request.get("/" + expectedOutput[3].shorturl);
    console.log(response.status);
    expect(response.status).toBe(303);
  });
});
