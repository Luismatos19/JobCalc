const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');


module.exports = {
  async index(req, res) {
    const Jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
        progress: 0,
        done: 0,
        total: Jobs.length,
    }

    let jobTotalHours = 0

    const updateJobs = Jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      statusCount[status] +=1;

      if(status == 'progress'){
          jobTotalHours += Number (job["daily-hours"]);
      }

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });


    //quantidade de horas que eu quero trabalhar no dia menos quantidades de horas de jobs em progress
    const freeHours = profile["hours-per-day"] -  jobTotalHours;

    return res.render("index", { 
        jobs: updateJobs,
        profile: profile,
        statusCount: statusCount,
        freeHours: freeHours,
    });

  },
};
