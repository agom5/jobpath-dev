import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [200, 'Company name cannot exceed 200 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [200, 'Position cannot exceed 200 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['applied', 'interviewing', 'rejected', 'offered'],
        message: '{VALUE} is not a valid status',
      },
      required: [true, 'Status is required'],
      index: true,
    },
    applicationDate: {
      type: Date,
      required: [true, 'Application date is required'],
      index: true,
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    salary: {
      type: String,
      trim: true,
      maxlength: [100, 'Salary cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.user;
        return ret;
      },
    },
  }
);

jobSchema.index({ user: 1, createdAt: -1 });
jobSchema.index({ user: 1, status: 1 });
jobSchema.index({ user: 1, company: 1 });
jobSchema.index({ user: 1, applicationDate: -1 });

jobSchema.path('applicationDate').validate(function (value) {
  return value <= new Date();
}, 'Application date cannot be in the future');

jobSchema.statics.getJobStats = async function (userId) {
  const stats = await this.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const result = {
    total: 0,
    applied: 0,
    interviewing: 0,
    offered: 0,
    rejected: 0,
  };

  stats.forEach((stat) => {
    result[stat._id] = stat.count;
    result.total += stat.count;
  });

  return result;
};

export default mongoose.model('Job', jobSchema);
