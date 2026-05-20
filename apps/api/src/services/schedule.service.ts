import * as ScheduleModel from '../models/schedule.model';

export const getEvents = async (userId: string, date: string, view: string) => {
  return await ScheduleModel.getEvents(userId, date, view);
};

export const getUpcomingEvents = async (userId: string, limit: number = 20) => {
  return await ScheduleModel.getUpcomingEvents(userId, limit);
};

export const exportIcs = async (userId: string) => {
  const events = await ScheduleModel.getEvents(userId, '', 'all');
  
  let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SOLS//NONSGML v1.0//EN\n';
  
  for (const event of events) {
    const dateStr = event.date.replace(/-/g, '');
    const startTimeStr = event.startTime.replace(/:/g, '') + '00';
    const endTimeStr = event.endTime.replace(/:/g, '') + '00';
    
    icsContent += 'BEGIN:VEVENT\n';
    icsContent += `SUMMARY:${event.title}\n`;
    icsContent += `DTSTART:${dateStr}T${startTimeStr}Z\n`;
    icsContent += `DTEND:${dateStr}T${endTimeStr}Z\n`;
    icsContent += `DESCRIPTION:${event.description || ''}\n`;
    icsContent += `LOCATION:${event.location || ''}\n`;
    icsContent += 'END:VEVENT\n';
  }
  
  icsContent += 'END:VCALENDAR';
  return icsContent;
};
