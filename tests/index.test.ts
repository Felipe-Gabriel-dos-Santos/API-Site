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

describe("products", () => {
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

describe("users", () => {
  it("should get users", async () => {
    const GET_USERS_QUERY = `
    query {
        getUsers {
          id
          name
          email
          createdAt
        }
      }
`;
    const response = await res(GET_USERS_QUERY);

    expect(response.status).toBe(200);
    expect(response.body.data.getUsers).toBeTruthy();
    expect(response.body.data.getUsers.length).toBeGreaterThan(0);
  });

  it("should get user by id", async () => {
    const GET_USER_QUERY = `
    query {
        getUser(id: "62757f7289ecd38951e6c93f") {
          id
          name
          email
          createdAt
        }
      }
`;
    const response = await res(GET_USER_QUERY);

    expect(response.status).toBe(200);
    expect(response.body.data.getUser).toBeTruthy();
  });

  it("should get user by id error", async () => {
    const GET_USER_QUERY = `
    query {
        getUser(id: "'") {
          id
          name
          email
          createdAt
        }
      }
`;
    const response = await res(GET_USER_QUERY);

    expect(response.status).toBe(200);
    expect(response.body.data.getUser).toBe(null);
    expect(response.body.errors[0].message).toBe("Error: invalid document id");
  });

  it("should update user", async () => {
    const name = "Teste";

    const UPDATE_USER_QUERY = `
    mutation {
      updateUser(
        id: "62757f7289ecd38951e6c93f"
        userUpdatableFields: { name: "${name}" }
      ) {
        name
      }
    }`;

    const response = await res(UPDATE_USER_QUERY);

    expect(response.status).toBe(200);
    expect(response.body.data.updateUser.name).toBe(name);
  });
});

describe("authentication", () => {
  it("create account & login & delete user", async () => {
    const name = "Teste";
    const email = "12342020@gmail.com";
    const password = "12345678";

    const CREATE_ACCOUNT_QUERY = `
    mutation {
      createAccount(
        name: "${name}"
        email: "${email}"
        password: "${password}"
      ) {
        id
        name
        email
        avatarUrl
        token
        createdAt
        updatedAt
      }
    }
`;

    const createAccountResponse = await res(CREATE_ACCOUNT_QUERY);
    const { id } = createAccountResponse.body.data.createAccount;

    expect(createAccountResponse.status).toBe(200);
    expect(createAccountResponse.body.data.createAccount).toBeTruthy();
    expect(id).toBeTruthy();
    expect(createAccountResponse.body.data.createAccount.name).toBe(name);
    expect(createAccountResponse.body.data.createAccount.email).toBe(email);

    const LOGIN_QUERY = `
    mutation {
      loginEmailPassword(email: "${email}", password: "${password}") {
        name
        token
        email
        avatarUrl
        createdAt
      }
    }
    `;

    const loginResponse = await res(LOGIN_QUERY);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.data.loginEmailPassword).toBeTruthy();
    expect(loginResponse.body.data.loginEmailPassword.name).toBe(name);
    expect(loginResponse.body.data.loginEmailPassword.email).toBe(email);
    expect(loginResponse.body.data.loginEmailPassword.token).toBeTruthy();

    const DELETE_USER_QUERY = `
    mutation {
      deleteUser(id: "${id}") {
        success
      }
    }
    `;

    const deleteUserResponse = await res(DELETE_USER_QUERY);

    expect(deleteUserResponse.status).toBe(200);
    expect(deleteUserResponse.body.data.deleteUser.success).toBe(true);
  });

  it("should create account error", async () => {
    const name = "Teste";
    const email = "vdoss2011@gmail.com";
    const password = "12345678";

    const CREATE_ACCOUNT_QUERY = `
    mutation {
      createAccount(
        name: "${name}"
        email: "${email}"
        password: "${password}"
      ) {
        id
        name
        email
        avatarUrl
        token
        createdAt
        updatedAt
      }
    }
`;

    const createAccountResponse = await res(CREATE_ACCOUNT_QUERY);

    expect(createAccountResponse.status).toBe(200);
    expect(createAccountResponse.body.errors).toBeTruthy();
    expect(createAccountResponse.body.errors[0].message).toBe(
      "Error: User already exists"
    );
    expect(createAccountResponse.body.data).toBe(null);
  });

  it("should login error", async () => {
    const email = "1234";
    const password = "12345678";

    const LOGIN_QUERY = `
    mutation {
      loginEmailPassword(email: "${email}", password: "${password}") {
        name
        token
        email
        avatarUrl
        createdAt
      }
    }
    `;

    const loginResponse = await res(LOGIN_QUERY);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.errors).toBeTruthy();
    expect(loginResponse.body.errors[0].message).toBe(
      "Error: User not found or password is incorrect"
    );
    expect(loginResponse.body.data).toBe(null);
  });
});
