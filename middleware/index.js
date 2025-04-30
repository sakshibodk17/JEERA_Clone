const bcrypt =require("bcrypt");
module.exports = function userMiddleware(schema) {
    if (!schema || typeof schema.pre !== "function") {
      throw new Error("Invalid schema passed to middleware");
    }
  
    schema.pre("save", function (next) {
      this.updatedAt = Date.now();
      next();
    });
    schema.pre("save", async function (next) {
      if(!this.isModified("password")) 
        return next();

      try{
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt);
        next();
      } catch (err){
        next(err);
      }
    });
  };
  