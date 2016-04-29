$(function() {
  'use strict';

  //define variables


  //define search variable to hold search html
  var search = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';

  //define pagination variable to hold pagination
  //button html
  var pagination = '<div class="pagination"><ul></ul></div>'

  //uses jquery to append search bar to
  //page-header class
  $('.page-header').append(search);

  //uses jquery to append pagination buttons to
  //page class
  $('.page').append(pagination);

  //linksPerPage variable holds the number of links
  //per page desired
  var linksPerPage = 10;
  //totalStudents variable holds the total number
  //of students on the page
  var totalStudents = $('.student-list li').length;

  //creates numberPageLinks function
  function numberPageLinks() {
    //totalLinks variable holds the value of total
    //number of students divided by desired links
    //per page --> result is total number of
    //pagination links...
    //could make this a dropdown to allow user
    //to pick number of students to display per page
    var totalLinks = Math.ceil(totalStudents/linksPerPage);

    //links variable holds initial number to utilize
    //in the while loop below...see below for details
    var links = 0;
    //linkNumber variable holds the intial number (1)
    //to inject into the html using jquery
    var linkNumber = 1;

    //while links (initially 0 defined above) is less than totalLinks do the following...
    //totalLinks in this case is 10 but could be
    //some other value
    while (links < totalLinks) {
      //Uses jquery to append the dynamic html
      //linkNumber was defined above & starts at 1
      //and then every loop through gets 1 added
      $('.pagination ul').append('<li><a href="#">' + linkNumber++ + '</a></li>');
      //every loop until while loop is false...1 is
      //added to links variable until it is equal to
      //totalLinks
      links++;
    }
  }
  //call numberPageLinks function
  numberPageLinks();

  //hides all but the first 10 students
  //when the page loads
  $('.student-list li').css('display', 'none').slice(0, linksPerPage).css('display', 'block');

  //uses event.preventDefault function to make it
  //so the anchor links don't use their defaults
  //and attempt to go to a different page
  $('.pagination ul li a').on('click', function(e) {
    e.preventDefault();
  });

  //creates getClickedLink function
  function getClickedLink() {
    //on click of each li element in .pagination ul
    //do the following...
    $('.pagination ul').on('click', 'li', function() {
      //currentPage variable holds the currently
      //clicked li element's child's text, which
      //is the text of the a tag within the li element
      var currentPage = $(this).children().text();

      //calls getCorrectPage function & passes the
      //currentPage value into it
      getCorrectPage(currentPage);
    });
  }
  //calls the getClickedLink function
  getClickedLink();

  //creates getCorrectPage function
  function getCorrectPage(page) {
    //get the element number where to start the slice
    //multiply the page, which is the value passed in
    //when the function is called minus 1, by //linksPerPage which in our case is 10
    var startSlice = (page - 1) * linksPerPage;
    //get the element number where to end the slice
    //simply add the startSlice value to the
    //linksPerPage value, which is 10
    var endSlice = startSlice + linksPerPage;

    //hides all but the students between startSlice
    //& endSlice
    $('.student-list li').css('display', 'none').slice(startSlice, endSlice).css('display', 'block');
  }

});
