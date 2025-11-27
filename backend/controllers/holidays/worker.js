// import { Worker } from "bullmq";
// import IORedis from "ioredis";
// import holidayFetch from "../hollidayFetch.js";
// import Event from "../../database/models/Event.js";

// const connection = new IORedis(process.env.REDIS_URL);

// new Worker("holiday-jobs", async job => {
//     const { userId, holidayCalendarId, year, locale } = job.data;

//     console.log("Importing holidays for", userId);

//     const holidays = await holidayFetch(locale, year);

//     for (const holiday of holidays) {
//         await Event.create({
//             calendar_id: holidayCalendarId,
//             title: holiday.name,
//             description: holiday.description || "",
//             participants: [userId],
//             start_time: new Date(holiday.date.iso),
//             end_time: new Date(holiday.date.iso),
//             is_all_day: true,
//             reminders: [15]
//         });
//     }

//     console.log("Holiday import completed for", userId);
// }, { connection });
