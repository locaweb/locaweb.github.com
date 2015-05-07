var locaweb_ops = locaweb_ops || {}

locaweb_ops.repos = (function() {
  'use strict';

  function init() {
    get_repos();
  }

  function get_repos() {
    var repos = [],
        template;
    $.get('https://api.github.com/orgs/locaweb/repos', function(data) {

      $.each(data, function(key, val) {
        repos.push({'pushed_at': val.pushed_at, 'name': val.name, 'forks': val.forks, 'watchers': val.watchers, 'page': val.html_url, 'language': val.language, 'description': val.description});
      });

      repos.sort(function(obj1, obj2) {
        var a = new Date(obj1.pushed_at),
            b = new Date(obj2.pushed_at);
        return +b - a;
      });

      for (var i = 0; i < 9; i++) {
        template = '<li>';
        template += '<a target="_blank" href="' + repos[i].page + '"><h3>' + repos[i].name + '</h3>';
        template += '<span>' + repos[i].language + '</span>';
        template += '<span class="os-icons os-stars">' + repos[i].forks + '</span>';
        template += '<span class="os-icons os-forks">' + repos[i].watchers + '</span>';
        template += '<p>' + repos[i].description + '</p>';
        template += '<date class="timeago" title="' + repos[i].pushed_at + '"></date></a>';
        template += '</li>';
        $('#repos').append(template);
      };
  
      $("date.timeago").timeago();
      $("#os-stats-projects").text(repos.length)

      var totalForks = 0;
      var totalWatchers = 0;
      for (var i = 0; i < data.length; i++) {
        totalForks += data[i].forks;
        totalWatchers += data[i].watchers;
      }
      $("#os-forks-total").text(totalForks);
      $("#os-watchers-total").text(totalWatchers);

    });
  }

  return {
    init: init
  }

}())

$(document).ready(function() {
  locaweb_ops.repos.init();
})
