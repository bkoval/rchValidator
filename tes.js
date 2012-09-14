(function( $ ) {
		$.fn.htmlFormValidator = function( eventType, formHandler ) {
		//Validator's API
	//	var validator = (function() {
			//Validation engine
			debugger;
			function validate (e) {

				e.preventDefault();

				var formHandler = this; //self

				function validationTest(pattern, stringToBeTested){

					return (pattern.test(stringToBeTested) || !stringToBeTested) ? true : false;
				}

				//Banned Characters Dictionary	
				var banned =  {

					'email': {
					 	'pattern': /[^A-z, 0-9, \@, \.]/,
						'error': 'bad email'
					},

					'text': {
					 	'pattern': /[^A-z]/,
						'error': 'bad text'
					},
					
					'number': {
					 	'pattern': /[^0-9]/,
						'error': 'bad phone number'
					},

					'date': {
					 	'pattern': /[^0-9, \-]/,
						'error': 'bad date format'
					}

				};

				//Errors storage object
				var errors = {

				};

				errors.addError = function (formInstance, fieldRecognitionString){
					
					if(!this[formInstance.name]){
						
						this[formInstance.name] = {};
					}

					var formErrorsObject = this[formInstance.name];

					formErrorsObject[fieldRecognitionString] = {};

				};

				//variable that stores a specific type of field inside the loop
				var patternName;



				var temp = Array.prototype.slice.call( formHandler.elements );

				temp.forEach( function test ( obj ) {
			
						if(banned.hasOwnProperty(obj.type)){

							if(validationTest(banned[obj.type].pattern, obj.value)){
								errors.addError(formHandler, obj.type + '_' + obj.name + '_' + obj.id);
							}
						}	

				});

				if(!errors.hasOwnProperty(formHandler.name)){
					
					formHandler.submit();
				
				}
				
			}


			//Function that watches for sumit event and triggers validator
			function watch( eventType, formHandler ){
				debugger;
				formHandler.addEventListener( eventType, validate, false );
			}


			//return {
				//validate: validate,
				//watch: watch
			//};

			watch(eventType, formHandler);
			
	//	})(this);

		};

})( jQuery );


$( document ).ready(function() {

	$('document').htmlFormValidator("submit", document.forms[0]);
	$('document').htmlFormValidator("submit", document.forms[1]);

});