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


  ///////////////////////////////
  //PAGINATION
  ///////////////////////////////

  //linksPerPage variable holds the number of links
  //per page desired
  var linksPerPage = 10;
  //totalStudents variable holds the total number
  //of students on the page
  var totalStudents = $('.student-list li').length;
  //call numberPageLinks function
  numberPageLinks(totalStudents);

  //creates numberPageLinks function
  function numberPageLinks(number) {
    //removes existing pagination buttons first
    $('.pagination ul').empty();

    if (number <= 10) {
      return;
    }

    //totalLinks variable holds the value of total
    //number of students divided by desired links
    //per page --> result is total number of
    //pagination links...
    //could make this a dropdown to allow user
    //to pick number of students to display per page
    var totalLinks = Math.ceil(number/linksPerPage);

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
  } //numberPageLinks()

  function initialState() {
    //hides all but the first 10 students
    //when the page loads
    $('.student-list li').css('display', 'none').slice(0, linksPerPage).css('display', 'block');

    //uses event.preventDefault function to make it
    //so the anchor links don't use their defaults
    //and attempt to go to a different page
    $('.pagination ul li a').on('click', function(e) {
      e.preventDefault();
    });

    //targets first li element & adds active class on
    //page load
    $('.pagination ul li:first-child a').addClass('active');

  } //initialState()
  initialState();

  //creates getClickedLink function
  function getClickedLink() {
    //on click of each li element in .pagination ul
    //do the following...
    $('.pagination ul').on('click', 'li', function() {
      //currentPage variable holds the currently
      //clicked li element's child's text, which
      //is the text of the a tag within the li element
      var currentPage = $(this).children().text();

      //add active class to child, or a tag, of li
      //element clicked on
      $(this).children().addClass('active');

      //remove active class from siblings a tags
      //of li element clicked
      $(this).siblings().children().removeClass('active');

      //calls getCorrectPage function & passes the
      //currentPage value into it
      getCorrectPage(currentPage);
    });
  } //getClickedLink()
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
  } //getCorrectPage()

  ///////////////////////////////
  //SEARCH
  ///////////////////////////////

  //
  //Add an event listener to the search button. When the user clicks on the button it should use the text in the search input to filter the results.
  //
  $('.student-search button').on('click', function() {
    var searchVal = $('.student-search input').val();

    if (searchVal.length === 0) {
      //call numberPageLinks function
      numberPageLinks(totalStudents);

      initialState();

      return;
    }

    getSearchResults(searchVal);
  });

  //
  //Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.
  //

  function getSearchResults(value) {
    $('.student-list li').each(function() {
      var text = $(this).text().toLowerCase();

      //var re = /pattern/flags;
      //taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters_to_verify_input
      // var regEx = /^[a-z]+join$/i;
      // if (regEx.test(value)) {
      //   console.log('true');
      // } else {
      //   console.log('false');
      // }

      if (text.indexOf(value) != -1) {
        $(this).css('display', 'block');
      } else {
        $(this).css('display', 'none');
      }
    });
    var filteredStudents = $('.student-list li:visible').length;
    console.log($('.student-list li:visible').length);
    //call numberPageLinks function
    numberPageLinks(filteredStudents);
    getClickedLink();

  } //getSearchResults()

  //
  //Search results should also be paginated. For example, if the search returns more than 10 results, those results should be paginated too.
  //
});
