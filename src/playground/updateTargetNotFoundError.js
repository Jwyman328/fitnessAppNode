module.exports = /// tsting area playground 
class UpdateTargetNotFoundError {
  constructor(message) {
   // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
   // This clips the constructor invocation from the stack trace.
  }
}