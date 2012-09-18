(function( $ ) {

		var methods = {

			init: function( formHandler ){
				
				this.formHandler = formHandler;

				var inputList; // will be an array of inputs to check in the form

				this.errors = { //object that is used as errors storage

					addError: function ( formInstance, fieldRecognitionString ){ //mechanism that adds errors from specific forms
						
						if( !this[formInstance.name] ){
							
							this[formInstance.name] = {};
						}

						var formErrorsObject = this[formInstance.name];

						formErrorsObject[fieldRecognitionString] = {};

					}

				};

				this.banned =  { //Dictionary of banned chars for each type (including ready-to-display error msgs).

					'email': {
					 	'pattern': /[^A-z, 0-9, \@, \.]/,
						'error': 'Your email address contains forbidden characters!'
					},

					'text': {
					 	'pattern': /[^A-z]/,
						'error': 'Your text contains characters that are not only letters!'
					},
					
					'number': {
					 	'pattern': /[^0-9]/,
						'error': 'Your phone number contains forbidden characters!'
					},

					'date': {
					 	'pattern': /[^0-9, \-]/,
						'error': 'Your date is in bad format!'
					}

				};
			},

			validationTest: function ( pattern, stringToBeTested ){ //detects whether the phrase contains banned chars or not

				return ( pattern.test( stringToBeTested ) || !stringToBeTested ) ? true : false;
			},

			validationLoop: function ( index, obj ){ //this will iterate on all input fields in form and check if it's valid using validationTest
		
				if( this.banned.hasOwnProperty( obj.type ) ){

					if( methods.validationTest( this.banned[obj.type].pattern, obj.value ) ){

						methods.errors.addError( this.formHandler, obj.type + '_' + obj.name + '_' + obj.id );

					}
				}

			},

			validate: function ( e, formHandler ) { //main piece of validator - the actual validation starts here
			
				e.preventDefault(); //prevents from submitting till the validation completes

				debugger;

				if ( formHandler.children( 'fieldset' ).length ){ //if there is fieldset
					
					this.inputList = formHandler.children( 'fieldset' ).children( 'input' ); //collects the array of inputs in the form

				}

				else{ //if there isn't one

					this.inputList = formHandler.children( 'input' );

				}
				
				$.each(this.inputList, function( index, obj ){ methods.validationLoop( index, obj ); });

				debugger;

				if( !this.errors.hasOwnProperty( formHandler.name ) ){
					
					formHandler.submit();
				
				}
				
			},

			watch: function ( eventType, formHandler ){ //function that produces detector watching for event 'clicking on submit button'			
			
				$.each( formHandler.children( 'input' ), function( index, input ){
					
					if( input.type == 'submit' ){
						
						$( input ).on( 'click', function (){methods.validate( event, formHandler )} );

					}

				});

			}

		}

		$.fn.RCHhtmlFormValidator = function( method, eventType ) {

			var formHandler = this; //jquery oject that 'keeps' the form
			methods.init(formHandler);
			methods.watch( eventType, formHandler ); //here watching starts

			    // Method calling logic
		    /*if ( methods[method] ) {
		      	return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } 
		    else if ( typeof method === 'object' || ! method ) {
		      		return methods.init.apply( this, arguments );
		    	} 

		   		else {
		      		$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		    	}
		    }*/

		};

})( jQuery );


$( document ).ready(function() {

	$( '#details' ).RCHhtmlFormValidator( 'submit' );
	$( '#details2' ).RCHhtmlFormValidator( 'submit' );

});