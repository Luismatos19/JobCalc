 module.exports = {
    remainingDays(job) {
        // calculando  os dias restantes
        const remainingDay = (job["total-hours"] / job["daily-hours"]).toFixed(); //calcula a quantidade de dias do trabalho
        const createdDate = new Date(job.created_at); // data q o job foi criado
        const dueDay = createdDate.getDate() + Number(remainingDay); //
        const dueDateInMs = createdDate.setDate(dueDay); //  data de validade em ms
        const timeDiffInMs = dueDateInMs - Date.now();  //dias restantes em ms

        const dayInMs = 1000 * 60 * 60 * 24;
        const dayDiff = (timeDiffInMs / dayInMs).toFixed();

        return dayDiff;
    },


    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}