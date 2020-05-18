const  axios =require("axios");

describe('The page should be running', () => {
    test("GET /", async () => {
        const res= await axios.get('http://localhost:3000/');
        expect(res.status).toBe(200);
    });
});
