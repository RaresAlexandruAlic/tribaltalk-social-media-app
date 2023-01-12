import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ errorMessage: error.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) { 
        res.status(404).json({ errorMessage: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);

        if(user){
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.picturePath = req.body.picturePath;
            user.description = req.body.description;
            user.location = req.body.location;
            user.occupation = req.body.occupation;
            user.save();
        } else {
            res.status(404).json({ errorMessage: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const addFriend = async (req, res) => {
    try {
        const { id, friends } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        
        if(user.friends.includes(friendId)){
            res.status(409).json({ errorMessage: `This friend already is included in the friends list of ${user.firstName} ${user.lastName}.` })
        } else {
            user.friends.push(friend);
            friend.friends.push(user);
        }

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const removeFriend = async (req, res) => {
    try {
        const { id, friends } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            res.status(404).json({ errorMessage: `Specified friend was not found in the friend list of ${user.firstName} ${user.lastName}.` })
        }

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const removeUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        user.remove();
        res.status(200).json({ success: "User has been removed successfully!" })
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
