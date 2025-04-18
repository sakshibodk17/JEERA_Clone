module.exports = function userMiddleware(schema) {
    if (!schema || typeof schema.pre !== "function") {
      throw new Error("Invalid schema passed to middleware");
    }
  
    schema.pre("save", function (next) {
      this.updatedAt = Date.now();
      next();
    });
  };
  