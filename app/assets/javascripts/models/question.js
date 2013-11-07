PollForUs.Models.Question = Backbone.Model.extend({  
  parse: function(respAttrs, options) {
    respAttrs.answers = new PollForUs.Collections.Answers(respAttrs.answers);
    return respAttrs;
  },
  toJSON: function() {
    var data = _.extend({}, this.attributes);
    data.answers_attributes = this.get("answers").toJSON();
    delete data.answers;
    return data;
  },
})
