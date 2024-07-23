// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

// above is the content before adding dotenv

module.exports = function(api){
api.cache(false);
return {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module:react-native-dotenv']
  ],
}
}