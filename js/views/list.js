app.views.list = Backbone.View.extend({
	mode: null,
	events: {
		'click a[data-up]': 'priorityUp',
		'click a[data-down]': 'priorityDown',
		'click a[data-archive]': 'archive',
		'click input[data-status]': 'changeStatus'
	},
	initialize: function() {
		var handler = _.bind(this.render, this);
		this.model.bind('change', handler);
		this.model.bind('add', handler);
		this.model.bind('remove', handler);
	},
    render: function() {
    	var html = '<ul class="list">', 
    		self = this;
    	this.model.each(function(todo, index) {
    		if(self.mode === "archive" ? todo.get("archived") === true : todo.get("archived") === false) {
    			var template = _.template($("#tpl-list-item").html());
	    		html += template({ 
	    			title: todo.get("title"),
	    			index: index,
	    			archiveLink: self.mode === "archive" ? "unarchive" : "archive",
	    			done: todo.get("done") ? "yes" : "no",
	    			doneChecked: todo.get("done")  ? 'checked=="checked"' : ""
	    		});
    		}
    	});
    	html += '</ul>';
    	this.$el.html(html);
    	this.delegateEvents();
    	return this;
    },
    priorityUp: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
    	this.model.up(index);
    },
    priorityDown: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
    	this.model.down(index);
    },
    archive: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
    	this.model.archive(this.mode !== "archive", index);	
    },
    changeStatus: function(e) {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
    	this.model.changeStatus(e.target.checked, index);		
    },
	setMode: function(mode) {
		this.mode = mode;
		return this;
	}
});