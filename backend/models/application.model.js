import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    companyName: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true
    },

    location: String,

    source: {
      type: String,
      enum: [
        "LinkedIn",
        "Naukri",
        "Indeed",
        "Internshala",
        "Company Website",
        "Other"
      ]
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "OA",
        "Interview",
        "Rejected",
        "Offer",
        "Ghosted"
      ],
      default: "Applied"
    },

    appliedDate: {
      type: Date,
      default: Date.now
    },

    salary: Number,



    jobUrl: String,

    notes: String,

    tags: [String],

    event: {
      title: {
        type: String,
      },

      scheduledAt: {
        type: Date,
      },

      location: {
        type: String,
      },

      completed: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true
  }
);

// module.exports =
//   mongoose.model(
//     "Application",
//     applicationSchema
//   );


const Application = mongoose.model("Application", applicationSchema);

export default Application;