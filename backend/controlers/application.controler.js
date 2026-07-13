import Application from "../models/application.model.js";

// Create Application
const createApplication = async (req, res) => {
  try {
    const {
      companyName,
      role,
      location,
      source,
      status,
      appliedDate,
      salary,
      jobUrl,
      notes,
      tags,
    } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({
        success: false,
        message: "Company name and role are required",
      });
    }

    const application = await Application.create({
      userId: req.user._id,
      companyName,
      role,
      location,
      source,
      status,
      appliedDate,
      salary,
      jobUrl,
      notes,
      tags,
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Application
const updateApplication = async (req, res) => {
  try {

    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Application
const deleteApplication = async (req, res) => {
  try {

    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Applications
const getApplications = async (req, res) => {
  try {

    const applications = await Application.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Application
const getApplicationById = async (req, res) => {
  try {

    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {

    const total = await Application.countDocuments({
      userId: req.user._id,
    });

    const applied = await Application.countDocuments({
      userId: req.user._id,
      status: "Applied",
    });

    const oa = await Application.countDocuments({
      userId: req.user._id,
      status: "OA",
    });

    const interview = await Application.countDocuments({
      userId: req.user._id,
      status: "Interview",
    });

    const rejected = await Application.countDocuments({
      userId: req.user._id,
      status: "Rejected",
    });

    const offer = await Application.countDocuments({
      userId: req.user._id,
      status: "Offer",
    });

    const ghosted = await Application.countDocuments({
      userId: req.user._id,
      status: "Ghosted",
    });

    const interviewRate =
      total > 0 ? ((interview / total) * 100).toFixed(1) : 0;

    const offerRate =
      total > 0 ? ((offer / total) * 100).toFixed(1) : 0;

    return res.status(200).json({
      success: true,
      stats: {
        total,
        applied,
        oa,
        interview,
        rejected,
        offer,
        ghosted,
        interviewRate,
        offerRate,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAnalytics = async (req, res) => {
  try {

    // -----------------------------
    // Status Distribution
    // -----------------------------
    const statusStats = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    // -----------------------------
    // Source Distribution
    // -----------------------------
    const sourceStats = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    // -----------------------------
    // Monthly Applications
    // -----------------------------
    const monthlyApplications = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$appliedDate" },
            month: { $month: "$appliedDate" },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // -----------------------------
    // Salary Statistics
    // -----------------------------
    const salaryStats = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
          salary: {
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: null,
          averageSalary: {
            $avg: "$salary",
          },
          highestSalary: {
            $max: "$salary",
          },
          lowestSalary: {
            $min: "$salary",
          },
        },
      },
    ]);

    // -----------------------------
    // Top Companies
    // -----------------------------
    const topCompanies = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$companyName",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    // -----------------------------
    // Top Locations
    // -----------------------------
    const topLocations = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
          location: {
            $ne: "",
          },
        },
      },
      {
        $group: {
          _id: "$location",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    // -----------------------------
    // Most Applied Role
    // -----------------------------
    const topRoles = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$role",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    // -----------------------------
    // Source Success
    // -----------------------------
    const sourceSuccess = await Application.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$source",

          applications: {
            $sum: 1,
          },

          interviews: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "Interview",
                  ],
                },
                1,
                0,
              ],
            },
          },

          offers: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "Offer",
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    // -----------------------------
    // Applications Older than 30 Days
    // -----------------------------
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(
      thirtyDaysAgo.getDate() - 30
    );

    const pendingApplications =
      await Application.countDocuments({
        userId: req.user._id,
        status: "Applied",
        appliedDate: {
          $lte: thirtyDaysAgo,
        },
      });

    // -----------------------------
    // This Month Applications
    // -----------------------------
    const startMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const endMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      1
    );

    const thisMonth =
      await Application.countDocuments({
        userId: req.user._id,
        appliedDate: {
          $gte: startMonth,
          $lt: endMonth,
        },
      });

    // -----------------------------
    // Last Month Applications
    // -----------------------------
    const lastStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    );

    const lastEnd = startMonth;

    const lastMonth =
      await Application.countDocuments({
        userId: req.user._id,
        appliedDate: {
          $gte: lastStart,
          $lt: lastEnd,
        },
      });

    // -----------------------------
    // Monthly Growth
    // -----------------------------
    const growth =
      lastMonth === 0
        ? 100
        : (
            ((thisMonth - lastMonth) /
              lastMonth) *
            100
          ).toFixed(1);

    return res.status(200).json({
      success: true,

      analytics: {

        // Charts
        statusStats,
        sourceStats,
        monthlyApplications,
        topCompanies,
        topLocations,
        topRoles,
        sourceSuccess,

        // Salary
        salaryStats:
          salaryStats.length > 0
            ? salaryStats[0]
            : {
                averageSalary: 0,
                highestSalary: 0,
                lowestSalary: 0,
              },

        // Insights
        insights: {

          thisMonthApplications:
            thisMonth,

          lastMonthApplications:
            lastMonth,

          monthlyGrowth:
            growth,

          pendingApplications,

          mostAppliedRole:
            topRoles.length > 0
              ? topRoles[0]
              : null,

          topLocation:
            topLocations.length > 0
              ? topLocations[0]
              : null,

          topCompany:
            topCompanies.length > 0
              ? topCompanies[0]
              : null,

          bestSource:
            sourceSuccess.length > 0
              ? sourceSuccess.sort(
                  (a, b) =>
                    b.offers - a.offers
                )[0]
              : null,
        },
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export {
  createApplication,
  updateApplication,
  deleteApplication,
  getApplications,
  getApplicationById,
  getDashboardStats,
  getAnalytics,
};