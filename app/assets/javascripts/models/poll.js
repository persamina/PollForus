PollForUs.Models.Poll = Backbone.Model.extend({
  urlRoot: "/polls",
  
  validate: function(attrs, options) {
    if(attrs.name.length < 1) {
      return "Poll title can't  be blank!";
    }
    if(attrs.questions) {
      if(attrs.questions.length < 1) {
        return "A poll must have at least one question!";
      }
    }
  },

  parse: function(respAttrs, options) {
    respAttrs.questions = new PollForUs.Collections.Questions(respAttrs.questions, {parse: true} );
    return respAttrs;
  },

  toJSON: function() {
    var data = _.extend({}, this.attributes);

    if(this.get("questions")) {
      data.questions_attributes = this.get("questions").toJSON();
    }
    delete data.questions;
    return data;
  },
});
