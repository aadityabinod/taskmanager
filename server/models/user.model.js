import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/19819005?v=4",
      },
      bio: {
        type: String,
        default: "I am a new user.",
      },

      role:{
        type: String,
        default: "user",
        enum: ["user", "admin", "creator"]
      },
      isVerified:{
        type: Boolean,
        default: false,
      }
}, {
    timestamps: true
});

UserSchema.pre("save", async function(next){
    if(!this.isModified(this.password)){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
}
)

const User = mongoose.model("User", UserSchema);
export default User;