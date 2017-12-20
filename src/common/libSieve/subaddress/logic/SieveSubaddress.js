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


( function (/*exports*/ ) {

  "use strict";

  /* global SieveGrammar */

  if ( !SieveGrammar )
    throw new Error( "Could not register AddressParts" );

  var userpart = {
    node: "address-part/user",
    type: "address-part/",

    requires: "subaddress",

    token: ":user"
  };

  SieveGrammar.addTag( userpart );


  var detailpart = {
    node: "address-part/detail",
    type: "address-part/",

    requires: "subaddress",

    token: ":detail"
  };

  SieveGrammar.addTag( detailpart );

})( window );


//   :user "+" :detail "@" :domain
// \----:local-part----/
