require("dotenv/config");
const supertest = require("supertest");

const connectionUrl = `http://${process.env.IP_ADDRESS}:${process.env.PORT}/graphql`;

const tests = supertest(connectionUrl);

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function res(query) {
  return await tests
    .post("/graphql")
    .send({ query: query })
    .set("Accept", "application/json");
}

describe("product", () => {
  it("should get products", async () => {
    const GET_PRODUCTS_QUERY = `
    query {
        getProducts {
          id
          name
          price
          description
          imagesUrl
          category
        }
      }
`;
    const response = await res(GET_PRODUCTS_QUERY);

    expect(response.status).toBe(200);
    expect(response.body.data.getProducts).toBeTruthy();
    expect(response.body.data.getProducts.length).toBeGreaterThan(0);
  });

  it("should get product by id", async () => {
    const GET_PRODUCT_QUERY = `
    query {
        getProduct(id: "627105b166bd98dfcf4401be") {
          id
          name
          price
          description
          imagesUrl
          category
        }
      }
`;
    const response = await res(GET_PRODUCT_QUERY);

    expect(response.status).toBe(200);
    expect(response.body.data.getProduct).toBeTruthy();
  });

  it("should a create product & delete", async () => {
    const name = get_random([
      "product1",
      "product2",
      "product3",
      "product4",
      "product5",
    ]);
    const price = Math.floor(Math.random() * 100);
    const description = get_random([
      "description1",
      "description2",
      "description3",
      "description4",
      "description5",
    ]);
    const stock = Math.floor(Math.random() * 100);

    const CREATE_PRODUCT_QUERY = `
    mutation {
      createProduct(
        productCreateFields: {
          name: "${name}",
          price: ${price},
          imagesUrl: ["teste", "teste"]
          stock: ${stock},
          description: "${description}",
          searchTags: ["Teste", "Teste"]
          category: "Teste"
        }
      ) {
        id
        name
        price
        description
        stock
        createdAt
      }
    }
    `;

    const createProductResponse = await res(CREATE_PRODUCT_QUERY);

    const { id } = createProductResponse.body.data.createProduct;

    expect(createProductResponse.status).toBe(200);
    expect(createProductResponse.body.data.createProduct).toBeTruthy();
    expect(id).toBeTruthy();

    expect(createProductResponse.body.data.createProduct.name).toBe(name);
    expect(createProductResponse.body.data.createProduct.price).toBe(price);
    expect(createProductResponse.body.data.createProduct.description).toBe(
      description
    );
    expect(createProductResponse.body.data.createProduct.stock).toBe(stock);

    const DELETE_PRODUCT_QUERY = `
    mutation {
      deleteProduct(id: "${id}") {
        success
      }
    }
    `;

    const deleteProductResponse = await res(DELETE_PRODUCT_QUERY);

    expect(deleteProductResponse.status).toBe(200);
    expect(deleteProductResponse.body.data.deleteProduct).toBeTruthy();
    expect(deleteProductResponse.body.data.deleteProduct.success).toBe(true);
  });

  it("should update product", async () => {
    const name = "Teste";
    const UPDATE_PRODUCT_QUERY = `
    mutation {
      updateProduct(
        id: "6273299593b50eb0339dcf76"
        productUpdatableFields: { name: "${name}" }
      ) {
        name
      }
    }`;

    const response = await res(UPDATE_PRODUCT_QUERY);

    expect(response.status).toBe(200);
    expect(response.body.data.updateProduct.name).toBe(name);
  });
});
