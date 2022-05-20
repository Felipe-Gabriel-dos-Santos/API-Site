abstract class OperationError {
  public readonly message: string;
  private readonly _entityName: string;
  public readonly operationName: string;
  public readonly itHappened: Date = new Date();

  constructor(message: string, operationName: string, entityName: string) {
    this._entityName = entityName.toUpperCase();
    this.operationName = operationName.toUpperCase();
    this.message = message;
  }
}

export { OperationError };
