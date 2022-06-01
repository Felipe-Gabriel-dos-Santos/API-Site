import "dotenv/config";

const connectionString = `mongodb+srv://Teste1:${process.env.DB_PASS}@sitesorricluster.ieaxa.mongodb.net/SORRI_DB?retryWrites=true&w=majority`;

export default connectionString;
