import { add } from 'date-fns';
import { parseDate } from 'utils';
import { getWaypointsSequence } from './thunk';
import {
  getStartDateTime,
  extractStopsDuration,
  toLate,
  getNextDayEarlisetTime,
  dateFormat,
} from './helpers';

export const getWaypointsSequenceReducer = (builder) => {
  builder.addCase(getWaypointsSequence.pending, (state) => {
    state.getWaypointsSequence.isLoading = true;
    state.getWaypointsSequence.error = null;
  });

  builder.addCase(getWaypointsSequence.fulfilled, (state, action) => {
    state.getWaypointsSequence.isLoading = false;

    const { interconnections, timeRange, ...rest } = action.payload;
    const [startTime, endTime] = timeRange;

    const startDate = getStartDateTime(
      state.current.data.start_date,
      startTime
    );
    const stopsDuration = extractStopsDuration(state.getTravelStops.data);

    const optimizedSequence = { ...rest };
    const schedule = [];

    interconnections.forEach((conn, i) => {
      const { toWaypoint, fromWaypoint, time } = conn;
      const { duration: startStopDuration } = stopsDuration.find(
        (stop) => stop.name === fromWaypoint
      );

      let nextStartDate =
        i !== 0
          ? parseDate(schedule[schedule.length - 1].end, dateFormat)
          : startDate;
      if (toLate(nextStartDate, endTime) && i !== 0) {
        nextStartDate = getNextDayEarlisetTime(nextStartDate, startTime);
      }

      const nextEndDate = add(nextStartDate, {
        seconds: startStopDuration + time,
      });

      schedule.push({
        name: fromWaypoint,
        start: parseDate(nextStartDate, dateFormat),
        end: parseDate(nextEndDate, dateFormat),
      });

      if (i === interconnections.length - 1) {
        const { duration: endStopDuration } = stopsDuration.find(
          (stop) => stop.name === toWaypoint
        );
        const lastEndDate = add(nextEndDate, { seconds: endStopDuration });

        schedule.push({
          name: toWaypoint,
          start: parseDate(nextEndDate, dateFormat),
          end: parseDate(lastEndDate, dateFormat),
        });
      }
    });

    optimizedSequence.schedule = [...schedule];
    state.getWaypointsSequence.data = optimizedSequence;
  });

  builder.addCase(getWaypointsSequence.rejected, (state, action) => {
    state.getWaypointsSequence.isLoading = false;
    state.getWaypointsSequence.data = null;
    state.getWaypointsSequence.error = action.payload;
  });
};
