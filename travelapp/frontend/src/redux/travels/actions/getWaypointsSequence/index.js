import { add } from 'date-fns';
import { getWaypointsSequence } from './thunk';
import {
  getStartDateTime,
  extractStopsDuration,
  toLate,
  getNextDayEarlisetTime,
} from './helpers';

export const getWaypointsSequenceReducer = (builder) => {
  builder.addCase(getWaypointsSequence.pending, (state) => {
    state.getWaypointsSequence.isLoading = true;
    state.getWaypointsSequence.error = null;
  });

  // TODO refactor this action
  // TODO change date object to serializable values
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

      if (i === 0) {
        const endDate = add(startDate, { seconds: startStopDuration });

        schedule.push({
          name: fromWaypoint,
          start: startDate,
          end: endDate,
        });
        return;
      }

      const prevStopEndDate = schedule[schedule.length - 1].end;
      let nextStartDate = add(prevStopEndDate, { seconds: time });
      if (toLate(nextStartDate, endTime)) {
        nextStartDate = getNextDayEarlisetTime(prevStopEndDate, startTime);
      }
      const nextEndDate = add(nextStartDate, { seconds: startStopDuration });

      schedule.push({
        name: fromWaypoint,
        start: nextStartDate,
        end: nextEndDate,
      });

      if (i === interconnections.length - 1) {
        const { duration: endStopDuration } = stopsDuration.find(
          (stop) => stop.name === toWaypoint
        );
        const lastEndDate = add(nextEndDate, { seconds: endStopDuration });

        schedule.push({
          name: toWaypoint,
          start: nextEndDate,
          end: lastEndDate,
        });
      }
    });

    console.log(schedule);
    optimizedSequence.schedule = [...schedule];
    state.getWaypointsSequence.data = optimizedSequence;
  });

  builder.addCase(getWaypointsSequence.rejected, (state, action) => {
    state.getWaypointsSequence.isLoading = false;
    state.getWaypointsSequence.data = null;
    state.getWaypointsSequence.error = action.payload;
  });
};
