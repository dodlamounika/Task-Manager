// selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectAllTasks = state => state.tasks.tasks;

export const selectSortedTasks = createSelector(
  [selectAllTasks],
  (tasks) => {
    return [...tasks].sort((a, b) => {
        if (a["status"] === "pending") {
          return -1;
        } else if (b["status"] === "pending") {
          return 1;
        } else {
          return 0;
        }
      });
  }
);
export const selectSortedByDateTasks = createSelector(
    [selectAllTasks],
    (tasks) => {
      return [...tasks].sort((a, b) => {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        return dateB - dateA;
      });
    }
  );
