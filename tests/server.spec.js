const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo un 200, lenght y array", async () => {
    const response = await request(server).get("/cafes").send();
    const cafes = response.body;
    const status = response.statusCode;
    expect(status).toBe(200); //veo si es 200
    expect(cafes).toBeInstanceOf(Array); //veo si la responde es un array
    //console.log(cafes)
    expect(cafes.length).toBeGreaterThan(0); //veo si trae más de 0 objetios
  });

  it("Obtener 404 al eliminar id que no existe", async () => {
    const jwt = "token";
    const idAEliminar = 7;
    const response = await request(server)
      .delete(`/cafes/${idAEliminar}`)
      .set("Authorization", jwt)
      .send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });

  it("Enviando un nuevo producto y obteniendo 201", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "Nuevo cafe" };
    const response = await request(server).post("/cafes").send(cafe);
    const status = response.statusCode;
    //console.log(response)
    expect(status).toBe(201);
  });

  it("Actualizando un cafe y enviando 400", async () => {
    
    const cafePut = {id: 1, nombre: "Cafe id existente" };
    //id 10 diferente al payload
    const response = await request(server).put("/cafes/10").send(cafePut);
    const status = response.statusCode;
    expect(status).toBe(400);

  });


});

afterAll(() => 
{server.close();
});