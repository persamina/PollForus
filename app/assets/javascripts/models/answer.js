PollForUs.Models.Answer = Backbone.Model.extend({  
  urlRoot: "/answers",

  validate: function(attrs, options) {
    if(attrs.body.length < 1) {
      return "Answer can't be blank!";
    }
  },

  toJSON: function() {
    var data = _.extend({}, this.attributes);
    delete data.answer_choices;
    return data;
  }
})
