/*
 * Dead-simple paging
 *
 *
 *
 * Author: Bremen Braun
 */
;(function($) {
  'use strict';
  
  var prefix;
  var pageEvents;
  var selected;
  var content;

  function Pager($this, opts) {
    opts = $.extend({
      prefix: ''
    }, opts);
    prefix = opts.prefix;

    pageEvents = [];
    selected = 0;
    this.page(1);
  }

  /*
   * Set an event to be run when switching pages
   */
  Pager.prototype.onPage = function(fn) {
    pageEvents.push(fn);
  };

  /*
   * Switch to page `number`.
   * If the page exists, it will be switched to, will fire all onPage events,
   * and will return true. Otherwise, it will return false
   */
  Pager.prototype.page = function(number) {
    var page = getPage(number);
    if (!page.length) return false;

    selected = number;
    if (content) content.hide();
    content = page;
    content.show();
    for (var i = 0; i < pageEvents.length; i++) {
      var evt = pageEvents[i];
      evt(number, content);
    }

    return true;
  };

  /*
   * Switch to the next page, if posible
   */
  Pager.prototype.nextPage = function() {
    return this.page(parseInt(selected)+1);
  };

  /*
   * Switch to the previous page, if possible
   */
  Pager.prototype.prevPage = function() {
    return this.page(selected-1);
  };

  /*
   * Return the current page index
   */
  Pager.prototype.getPage = function() {
    return selected;
  };

  /*
   * Return whether or not a previous page exists
   */
  Pager.prototype.hasPrev = function() {
    return hasPage(selected-1);
  };

  /*
   * Return whether or not the next page exists
   */
  Pager.prototype.hasNext = function() {
    return hasPage(parseInt(selected)+1);
  };

  function getPage(number) {
    return $('#' + prefix + number);
  }

  function hasPage(number) {
    var selected = getPage(number);
    return !!selected.length;
  }

  $.fn.pager = function(opts) {
    return new Pager(this, opts);
  };
}(jQuery));
