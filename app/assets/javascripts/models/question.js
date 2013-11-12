PollForUs.Models.Question = Backbone.Model.extend({  
  urlRoot: "/questions",

  validate: function(attrs, options) {
    if(attrs.body.length < 1) {
      return "Question can't be blank!";
    }
    if(attrs.answers) {
      if(attrs.answers.length < 1) {
        return "A question must have at least one answer!";
      }
    }
  },
  parse: function(respAttrs, options) {
    respAttrs.answers = new PollForUs.Collections.Answers(respAttrs.answers, {parse: true});
    return respAttrs;
  },
  toJSON: function() {
    var data = _.extend({}, this.attributes);
    if(this.get("answers")) {
      data.answers_attributes = this.get("answers").toJSON();
    }
    delete data.answers;
    return data;
  },
})
