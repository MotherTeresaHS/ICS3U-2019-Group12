// JavaScript File
		
async function getUser(email_address) {
    // get the user info from API Gate
    
    const api_url = 'https://f7e8vwgiv8.execute-api.us-east-1.amazonaws.com/prod/user-profile?user_email=' + email_address;
    const api_response = await fetch(api_url);
    const api_data = await(api_response).json();
    console.log(api_data);
    
    const json_profile = JSON.parse(api_data['body']);
    console.log(json_profile);
    const div_user_profile_email = document.getElementById('profile_email');
    const div_user_profile_username = document.getElementById('profile_username');
    const div_user_profile_marks = document.getElementById('profile_marks');
    div_user_profile_email.innerHTML = json_profile['Email'];
    div_user_profile_username.innerHTML = json_profile['username'];
    div_user_profile_marks.innerHTML = json_profile['marks'];
  }
  
function getUserAttributes() {
	var data = { 
		UserPoolId : _config.cognito.userPoolId,
    ClientId : _config.cognito.clientId
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
	var cognitoUser = userPool.getCurrentUser();

	if (cognitoUser != null) {
  	cognitoUser.getSession(function(err, session) {
      if (err) {
      	alert(err);
        return;
      }
      //console.log('session validity: ' + session.isValid());
      
      cognitoUser.getUserAttributes(function(err, result) {
				if (err) {
					console.log(err);
					return;
				}
				// user email address
				console.log(result[2].getValue());
				getUser(result[2].getValue()) 
			});

  	});
	} else {
		console.log("Already signed-out")
	}
}
