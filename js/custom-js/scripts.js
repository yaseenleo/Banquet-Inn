
jQuery(document).ready(function() {
	
    /*

        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form input[type="email"], .login-form input[type="radio"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], input[type="email"], input[type="radio"]').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    });
    
    /*
        Registration form validation
    */
//     $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
//     	$(this).removeClass('input-error');
//     });
    
//     $('.registration-form').on('submit', function(e) {
    	
//     	$(this).find('input[type="text"]').each(function(){
//     		if( $(this).val() == "" ) {
//     			e.preventDefault();
//     			$(this).addClass('input-error');
//     		}
//     		else {
//     			$(this).removeClass('input-error');
//     		}
//     	});
    	
//     });
    
    
// });
