$(function() {
  'use strict';

  //define search variable to hold search html
  var search = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';

  //define pagination variable to hold pagination
  //button html
  var pagination = '<div class="pagination"><ul></ul></div>'

  //use jquery to append search bar to page-header class
  $('.page-header').append(search);

  //use jquery to append pagination buttons to
  //page class
  $('.page').append(pagination);

  //Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.
  function numberPageLinks() {
    var linksPerPage = 10;
    var totalStudents = $('.student-list li').length;
    var totalLinks = Math.floor(totalStudents/linksPerPage);

    var links = 0;
    var linkNumber = 1;

    while (links < totalLinks) {
      $('.pagination ul').append('<li><a href="#">' + linkNumber++ + '</a></li>');
      links++;
    }
  }
  numberPageLinks();

  //Hide all but the first 10 students when the page loads.

  //When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.


});
