PollForUs.Models.Poll = Backbone.Model.extend({
  urlRoot: "/polls",
  parse: function(respAttrs, options) {
    respAttrs.questions = new PollForUs.Collections.Questions(respAttrs.questions, {parse: true} );
    return respAttrs;
  },

  toJSON: function() {
    var data = _.extend({}, this.attributes);
    data.questions_attributes = this.get("questions").toJSON();
    delete data.questions;
    return data;
  },
});
