/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

   loginPage :function(req, res){
		   console.log('dff')
				res.view('loggingIn');
		},

	 signupPage:function(req,res){

		    res.view('signingUp')
	 },

	login:function(req, res) {
	    if (!req.body || !req.body.email || !req.body.password)

				return res.send({ message:"the parameter is missing", status: 400 });

	    User.login(req.body, function(err, userObj) {

	      if (!err && userObj){
            //console.log(userObj)
            console.log('inside login function and token generated is',userObj.token);

            console.log('user object',userObj);

            res.header('x-auth-token',userObj.token).view('welcome')
          //  res.redirect('views/welcome')
          } else {

             res.status(500).json(err)
          }


        // res.json(userObj);
	    });
	  },





	signup: function(req, res) {
	    let input = req.body;
	    if (input.email && input.password) {
	      User.signup(input, function(err,userCreated) {
	        if (!err && userCreated) {
            console.log(userCreated)
           // res.set({'token' : userCreated})
						// res.redirect('user/welcome')
            res.view('welcome')
          // res.header('x-auth-token',userCreated).view('welcome')
	        } else {
	          res.status(500).json(err);
	        }
	      });
	    } else {
	      res.status(400).json({ message: "Please fill input field" });
	    }
	  },




	 welcome: function(req,res){
		console.log('welcome to welcome page')
    res.view('welcome')
}

}
  // check if he is logged in or not
	 // then check if token matches
	      // if satisfies res.redirect(views
