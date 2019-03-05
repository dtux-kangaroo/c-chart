export default function (options, animation) {
  Object.keys(animation).forEach(function (key) {
    options[key] = animation[key];
  });
}