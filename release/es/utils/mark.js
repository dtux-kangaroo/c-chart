export default function (seriesItem, marks) {
  Object.keys(marks).forEach(function (key) {
    if (marks[key]) seriesItem[key] = marks[key];
  });
}