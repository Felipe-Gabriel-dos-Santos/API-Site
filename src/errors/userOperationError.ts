import { OperationError } from "./operationError";

type operationName = "create" | "update" | "read" | "delete" | "list" | "login";

class userOperationError extends OperationError {
  constructor(message: string, operationName: operationName) {
    super(message, operationName, "User");
  }
}

export { userOperationError };
