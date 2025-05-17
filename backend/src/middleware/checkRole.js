
import User from "../models/user.model.js";

export const checkRole = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate("roles");
      
      const hasPermission = user.roles.some(role => 
        role.permissions.some(permission => 
          requiredPermissions.includes(permission)
        )
      );

      if (!hasPermission) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};