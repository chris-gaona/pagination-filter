$(function() {
  'use strict';

  //define search variable to hold search html
  var search = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';

  //define pagination variable to hold pagination
  //button html
  var pagination = '<div class="pagination"><ul></ul></div>';

  //uses jquery to append search bar to
  //page-header class
  $('.page-header').append(search);

  //uses jquery to append pagination container to
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
  // var totalStudents = $('.student-list li').length;
  var allStudentsArray = $('.student-list li').toArray();
  var totalStudents = allStudentsArray.length;

  //calls numberPageLinks function & passes totalStudents
  //value into it
  numberPageLinks(totalStudents);

  //creates preventDefaultBehavior function
  function preventDefaultBehavior() {
    //uses event.preventDefault function to make it
    //so the anchor links don't use their defaults
    //and attempt to go to a different page
    $('.pagination ul li a').on('click', function(e) {
      e.preventDefault();
    });
  } //preventDefaultBehavior()

  //creates initialState function
  function initialState() {
    //removes existing content from unordered list &
    //appends allStudentsArray list items to it
    $('.student-list').empty().append(allStudentsArray);

    //hides all but the first 10 students
    //when the page loads
    $('.student-list li').css('display', 'none').slice(0, linksPerPage).css('display', 'block');

    //calls preventDefaultBehavior function
    preventDefaultBehavior();

    //targets first li element & adds active class on
    //page load
    $('.pagination ul li:first-child a').addClass('active');

    //adds slide-in animation class to all list items
    $('.student-list li').addClass('slide-in');

  } //initialState()
  initialState();

  //creates numberPageLinks function
  function numberPageLinks(number) {
    //removes existing pagination buttons first
    $('.pagination ul').empty();

    //if number value passed through is less than or
    //equal to 10 do the following...
    if (number <= 10) {
      //return, which stops anything after it from
      //running...there is no need for page buttons
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
    //in the while loop below...see below for more
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
      //every loop until while loop is false, 1 is
      //added to links variable until it is equal to
      //totalLinks
      links++;
    }
  } //numberPageLinks()

  //creates getClickedLink function
  function getClickedLink() {
    //on click of each li element in .pagination ul
    //do the following...
    $('.pagination ul').on('click', 'li', function() {
      //currentPage variable holds the currently
      //clicked li element child's text, which
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
    //get the element number where to start the slice...
    //multiply page -- the value passed in
    //when the function is called minus 1 -- by
    //linksPerPage which in our case is 10
    var startSlice = (page - 1) * linksPerPage;

    //get the element number where to end the slice...
    //simply add the startSlice value to the
    //linksPerPage value
    var endSlice = startSlice + linksPerPage;

    //hides all but the students between startSlice
    //& endSlice
    $('.student-list li').css('display', 'none').slice(startSlice, endSlice).css('display', 'block');
  } //getCorrectPage()

  ///////////////////////////////
  //SEARCH
  ///////////////////////////////

  //creates searchFun function
  function searchFun() {
    //searchVal variable holds the search input text value
    var searchVal = $('.student-search input').val().toLowerCase();

    //if searchVal is empty do the following...
    if (searchVal.length === 0) {
      //calls numberPageLinks function & passes in totalStudents
      //variable
      numberPageLinks(totalStudents);

      //calls initialState function
      initialState();

      //return, which stops anything after it from
      //running
      return;
    }

    //calls getSearchResults with searchVal passed in
    getSearchResults(searchVal);

  } //searchFun()

  //adds event listener to search input that listens for
  //user typing & does a live search
  $('.student-search input').on('keyup', function() {
    //calls searchFun function
    searchFun();
  });

  //adds event listener to search button that listens for
  //user clicks & adds a callback function
  $('.student-search button').on('click', function() {
    //calls searchFun function
    searchFun();
  });

  //
  //Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.
  //

  //creates getSearchResults function & passes in value
  function getSearchResults(value) {
    //filterStudentsArray variable holds empty array
    var filterStudentsArray = [];

    //jquery.each function iterates through the allStudentsArray
    $.each(allStudentsArray, function() {
      //text variable holds text of each li element & makes
      //it all lowercase
      var text = $(this).find('.student-details').text().toLowerCase();

      //var re = /pattern/flags;
      //taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters_to_verify_input
      // var regEx = /^[a-z]+join$/i;
      // if (regEx.test(value)) {
      //   console.log('true');
      // } else {
      //   console.log('false');
      // }

      //if value matches anything in text do the following...
      if (text.indexOf(value) != -1) {
        //current element in iteration that matches, change
        //css to display block
        $(this).css('display', 'block');
        //push each item that matches in iteration to
        //filterStudentsArray
        filterStudentsArray.push($(this));

      } else {
        //current element in iteration that does not match,
        //change css to display none
        $(this).css('display', 'none');
      } //if statement

    }); //.each ()

    //noResultsString variable holds the no results string
    var noResultsString = '<li class="no-results">Sorry, no results. Please try another search.</li>';

    //if there are no search results
    if (filterStudentsArray.length === 0) {
      //removes existing list items & appends noResultsString
      $('.student-list').empty().append(noResultsString);
      //removes existing pagination buttons
      $('.pagination ul').empty();
      //return, which stops anything after it from
      //running
      return;
    }

    //removes existing items from .student-list & appends
    //all items from filterStudentsArray
    $('.student-list').empty().append(filterStudentsArray);

    //calls numberPageLinks function & passes filterStudentsArray
    //count
    numberPageLinks(filterStudentsArray.length);

    //hides all but the first 10 students in search results
    $('.student-list li').css('display', 'none').slice(0, linksPerPage).css('display', 'block');

    //calls getClickedLink function
    getClickedLink();

    //calls preventDefaultBehavior function
    preventDefaultBehavior();

    //makes first pagination button for search results active
    $('.pagination ul li:first-child a').addClass('active');

  } //getSearchResults()

});
