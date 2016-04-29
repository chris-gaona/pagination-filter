(function() {
  'use strict';

  var search = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';

  var pagination = '<div class="pagination"><ul><li><a class="active" href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">4</a></li><li><a href="#">5</a></li></ul></div>'

  $('.page-header').append(search);

  $('.page').append(pagination);
})();
