(function( $ ) {
		$.fn.htmlFormValidator = function( eventType ) {

			var formHandler = this; //jquery oject that 'keeps' the form

			function validate (e) { //main piece of validator - the actual validation starts here

				//DECLARATIONS & DEFINITIONS

				var errors = {}; //object that is used as errors storage

				var inputList; // will be an array of inputs to check in the form

				errors.addError = function ( formInstance, fieldRecognitionString ){ //mechanism that adds errors from specific forms
					
					if( !this[formInstance.name] ){
						
						this[formInstance.name] = {};
					}

					var formErrorsObject = this[formInstance.name];

					formErrorsObject[fieldRecognitionString] = {};

				};

				var banned =  { //Dictionary of banned chars for each type (including ready-to-display error msgs)

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

				function validationTest( pattern, stringToBeTested ){ //detects whether the phrase contains banned chars or not

					return ( pattern.test(stringToBeTested ) || !stringToBeTested ) ? true : false;
				}

				function validationLoop( index, obj ){ //this will iterate on all input fields in form and check if it's valid using validationTest
			
						if( banned.hasOwnProperty( obj.type ) ){

							if( validationTest( banned[obj.type].pattern, obj.value ) ){

								errors.addError( formHandler, obj.type + '_' + obj.name + '_' + obj.id );

							}
						}

				};

				//ACTUAL START OF VALIDATION PROCESS
				
				e.preventDefault(); //prevents from submitting till the validation completes

				if ( formHandler.children( 'fieldset' ).length ){ //if there is fieldset
					
					inputList = formHandler.children( 'fieldset' ).children( 'input' ); //collects the array of inputs in the form

				}

				else{ //if there isn't one

					inputList = formHandler.children( 'input' );

				}
				
				$.each(inputList, function( index, obj ){ validationLoop( index, obj ); });

				if(!errors.hasOwnProperty( formHandler.name )){
					
					formHandler.submit();
				
				}
				
			}

			function watch( eventType ){ //function that produces detector watching for event 'clicking on submit button'			
				
				$.each( formHandler.children( 'input' ), function( index, input ){
					
					if( input.type == 'submit' ){
						
						$( input ).on( 'click', validate );

					}

				});

			}

			watch( eventType, formHandler ); //here watching starts

		};

})( jQuery );


$( document ).ready(function() {

	$( '#details' ).htmlFormValidator( 'submit' );
	$( '#details2' ).htmlFormValidator( 'submit' );

});