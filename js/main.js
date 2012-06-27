var Locaweb = {
	githubRepositories: function(response) {
		$("#repositories").append("<thead><tr><th>Project</th><th>Description</th></tr></thead>");
		for(var index in response.data) {
			var datum = response.data[index];
			$("#repositories").append("<tr><td class='txtLeft'>"+datum.name+"</td>"+"<td class='txtLeft'>"+datum.description+"</td></tr>");
		}
	},

	populateRepositories: function() {
        $.getJSON("https://api.github.com/orgs/locaweb/repos?callback=?", this.githubRepositories);
	}
}
