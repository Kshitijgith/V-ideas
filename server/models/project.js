const mongoose = require('mongoose');

// Project Schema
const projectSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    unique: true, // Ensuring each group has a unique ID
  },
  groupName: {
    type: String,
    required: true,
  },
  groupMembers: {
    type: [
      {
        name: { type: String, required: true }, // Each member has a name
        email: { type: String, required: true }, // Optionally, include email for each member
        isLeader: { type: Boolean, default: false }, // First member should have isLeader: true
      },
    ],
    validate: [arrayLimit, '{PATH} must have exactly 4 members'], // Validate 4 members
  },
  projectName: {
    type: String,
    required: true,
  },
  projectTechnologies: {
    type: [String], // Array of strings for the technologies used
    required: true,
  },
  guideName: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, // Initially false, guide will approve later
  },
});

// Validate that there are exactly 4 members
function arrayLimit(val) {
  return val.length === 4;
}

// Export the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
