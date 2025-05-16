import Group from "../models/group.model.js";


export const createGroup = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const creatorId = req.user._id;

    const group = new Group({
      name,
      description,
      createdBy: creatorId,
      members: [
        { user: creatorId, role: "admin" },
        ...members.map(member => ({ user: member }))
      ]
    });

    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMemberToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) return res.status(404).json({ error: "Group not found" });

    // Check if user is admin
    const isAdmin = group.members.some(
      member => member.user.toString() === req.user._id.toString() && member.role === "admin"
    );

    if (!isAdmin) return res.status(403).json({ error: "Unauthorized" });

    group.members.push({ user: userId });
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroupMessages = async (req, res) => {
  //   logic
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("messages");

    if (!group) return res.status(404).json({ error: "Group not found" });

    res.status(200).json(group.messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeMemberFromGroup = async (req, res) => {
  try {
    //  implementation 
    const { groupId, memberId } = req.params;
    //   remove member
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });
    // Check if user is admin
    
    const memberIndex = group.members.findIndex(
      member => member.user.toString() === memberId
    );
    if (memberIndex === -1) return res.status(404).json({ error: "Member not found" });
    // Remove member
    group.members.splice(memberIndex, 1);
    await group.save();
    

    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/* const isAdmin = group.members.some(
      member => member.user.toString() === req.user._id.toString() && member.role === "admin"
    );
    if (!isAdmin) return res.status(403).json({ error: "Unauthorized" });
    // Check if member exists */