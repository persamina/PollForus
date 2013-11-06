PollForUs.Models.Poll = Backbone.Model.extend({
  urlRoot: "/polls",
  parse: function(respAttrs, options) {
    respAttrs.questions = new PollForUs.Collections.Questions(respAttrs.questions, {parse: true} );
    return respAttrs;
  },
});
