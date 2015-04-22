var locaweb_ops = locaweb_ops || {}

locaweb_ops.devs = (function() {
  'use strict';

  var users = [];

  function init() {
    getLogin();
    buildUsers();
  }

  function getLogin() {
    $.get('https://api.github.com/orgs/locaweb/members', function(data) {
      $.map(data, function(val, key) {
        getUserDetails(val.login);
      });
    });
  }

  function getUserDetails(login) {
    $.get('https://api.github.com/users/'+login, function(data) {
      users.push({'username': data.login, 'name': data.name, 'blog': data.blog, 'avatar': data.avatar_url, 'profile': data.html_url, 'followers': data.followers, 'following': data.following, 'public_repos': data.public_repos});
    });
  }

  function getUsers() {
    return users;
  }

  function buildUsers() {
    var templates, users;
    $(document).ajaxStop(function() {
      for( var i = 0; i < 12; i ++) {
        users = locaweb_ops.devs.getUsers()[i];
        templates  = '<li>';
        templates += '<a href="' + users.profile + '">';
        templates += '<img src="' + users.avatar + '?v=3&s=460">';
        templates += '<strong>' + users.name + '</strong>';
        templates += '<span>@' + users.username + '</span>';
        templates += '</a>';
        if(users.blog){
          templates += '<a href="' + users.blog + '" class="os-social"> blog </a>';
        }
        templates += '</li>';
        $('#users').append(templates);
      }
      contributorsTotal();
    });
  }

  function contributorsTotal() {
    $('#os-stats-developers').text(users.length);
  }

  return {
    init: init,
    getUsers: getUsers
  }

}())

$(document).ready(function() {
  locaweb_ops.devs.init();
})
