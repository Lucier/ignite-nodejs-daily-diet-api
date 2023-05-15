export class InvalidUserAccessError extends Error {
  constructor() {
    super('User does not have access to this resource.')
  }
}
