PollForUs.Collections.Polls = Backbone.Collection.extend({
  model: PollForUs.Models.Poll,
  url: "/polls",

  // parse: function(respAttrs, options) {
    //debugger
    //var parsedPolls = [];
    //respAttrs.forEach(function(poll) {
     // parsedPolls.push(new PollForUs.Models.Poll(poll));
    //})
    //return parsedPolls;
  //},


});
