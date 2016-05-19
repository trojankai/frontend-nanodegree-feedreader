/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

         //tests to make sure allFeeds is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* test that loops through allFeeds and makes sure url
         * is defined and not empty
         */
        it('has a URL defined and not empty', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        //loops through allFeeds to ensure name is defined and not empty
        it('has a name defined and the name is not empty', function() {

            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function() {
        var body = $('body');
        var menuIcon = $('.menu-icon-link');

        it('should be hidden by default', function() {
          // menu-hidden is the class (on the body) that 'hides' the menu, and toggles a transform class with click of the menu-icon-link
          //tests that menu is hidden by default
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        //tests whether the visibility toggles on click
        it('should toggle visibility when clicked', function() {
        //menu is hidden by default, so the first click should remove menu hidden class
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            //clicking menuIcon again should hide the menu again
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();

        });

    });

    describe('Initial Entries', function() {

       /* test ensures at least one .entry in the .feed container after loadFeed completes
        * its work (asynchonously)*/
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('should have at least one entry element', function() {

            var numEntries = $('.feed .entry').length;
            expect(numEntries).toBeGreaterThan(0);
        });
    });

    describe("New Feed Selection", function () {
        //this test ensures that content changes when a new feed is loaded by the loadFeed function

        var initFeed;
        beforeEach(function(done){
          //loads the info from index 0
            loadFeed(0, function(){
                //innerHTML returned from info in index 0
                initFeed = document.querySelector('.feed').innerText;
                //loads different info based on index #, this case index 1
                loadFeed(1, done);
                //note the change in the page once the loadFeed function has processed this request
            });

        });

        it('info loaded by loadFeed function should change', function() {
          //innerHTML from loadFeed index 1
            var newFeed = document.querySelector('.feed').innerText;

            expect(newFeed).not.toBe(initFeed);
        });
    });
}());
