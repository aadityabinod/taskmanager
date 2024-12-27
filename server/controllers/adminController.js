import User from "../models/user.model.js";

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: "User not found"});   
    
        }
        res.status(200).json({message: "User deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}