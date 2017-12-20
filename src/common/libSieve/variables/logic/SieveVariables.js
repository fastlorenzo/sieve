/*
 * The contents of this file are licenced. You may obtain a copy of 
 * the license at https://github.com/thsmi/sieve/ or request it via 
 * email from the author.
 *
 * Do not remove or change this comment.
 * 
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 *      
 */

/* global window */

( function ( /*exports*/ ) {

  "use strict";
  /* global SieveGrammar */

  if ( !SieveGrammar )
    throw new Error( "Could not register Variables" );

  // set [MODIFIER] <name: string> <value: string>
  var _set = {
    node: "action/set",
    type: "action",

    requires: "variables",

    token: "set",

    properties: [{
      id: "tags",
      optional: true,

      elements: [{
        id: "modifier/10",
        type: "modifier/10"
      }, {
        id: "modifier/20",
        type: "modifier/20"
      }, {
        id: "modifier/30",
        type: "modifier/30"
      }, {
        id: "modifier/40",
        type: "modifier/40"
      }]
    }, {
      id: "parameters",

      elements: [{
        id: "name",
        type: "string",
        value: "\"variable\""
      }, {
        id: "value",
        type: "string",
        value: '""'
      }]
    }]

  };

  SieveGrammar.addAction( _set );

  //    Usage:  string [MATCH-TYPE] [COMPARATOR]
  //           <source: string-list> <key-list: string-list>  

  var _string = {
    node: "test/string",
    type: "test",

    requires: "variables",

    token: "string",

    properties: [{
      id: "tags",
      optional: true,

      elements: [{
        id: "match-type",
        type: "match-type"
      }, {
        id: "comparator",
        type: "comparator"
      }],
    }, {
      id: "parameters",

      elements: [{
        id: "sources",
        type: "stringlist"
      }, {
        id: "keys",
        type: "stringlist"
      }]
    }]
  };

  SieveGrammar.addTest( _string );


  var _lower = {
    node: "modifier/40/lower",
    type: "modifier/40/",

    requires: "variables",

    token: ":lower"
  };
  SieveGrammar.addTag( _lower );

  var _upper = {
    node: "modifier/40/upper",
    type: "modifier/40/",

    requires: "variables",

    token: ":upper"
  };
  SieveGrammar.addTag( _upper );

  var _modifier40 = {
    node: "modifier/40",
    type: "modifier/",

    items: ["modifier/40/"]
  };

  SieveGrammar.addGroup( _modifier40 );


  var _lowerfirst = {
    node: "modifier/30/lowerfirst",
    type: "modifier/30/",

    requires: "variables",

    token: ":lowerfirst"
  };
  SieveGrammar.addTag( _lowerfirst );

  var _upperfirst = {
    node: "modifier/30/upperfirst",
    type: "modifier/30/",

    requires: "variables",

    token: ":upperfirst"
  };
  SieveGrammar.addTag( _upperfirst );

  var _modifier30 = {
    node: "modifier/30",
    type: "modifier/",

    items: ["modifier/30/"]
  };

  SieveGrammar.addGroup( _modifier30 );

  var _quote = {
    node: "modifier/20/quotewildcard",
    type: "modifier/20/",

    requires: "variables",

    token: ":quotewildcard"
  };
  SieveGrammar.addTag( _quote );

  var _modifier20 = {
    node: "modifier/20",
    type: "modifier/",

    items: ["modifier/20/"]
  };
  SieveGrammar.addGroup( _modifier20 );


  var _length = {
    node: "modifier/10/length",
    type: "modifier/10/",

    requires: "variables",

    token: ":length"
  };
  SieveGrammar.addTag( _length );

  var _modifier10 = {
    node: "modifier/10",
    type: "modifier/",

    items: ["modifier/10/"]
  };
  SieveGrammar.addGroup( _modifier10 );

  var _modifier = {
    node: "modifier",
    type: "modifier",

    items: ["modifier/"]
  };
  SieveGrammar.addGroup( _modifier );


})( window );