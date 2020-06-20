const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const md5 = require('md5');

exports.signup = (req, res, next) =>{
     
if(req.body.password.length < 5){
    res.status(500).json({ message : 'mdp pas bon'})
    return ;
}

    bcrypt.hash(req.body.password, 10)

    .then(hash => {

        const user = new User ({
            email: md5(req.body.email),
            password: hash
        })
        user.save()
        .then(() => {
            res.status(201).json({ message : 'utilisateur créé'})
        })
        .catch (error => {
        
            res.status(500).json({  error : 'utilisateur non trouvé' })
        })
      //})


        
    })
    .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) =>{
    User.findOne({ email: md5(req.body.email)})
    .then(user => {
        if (!user){
            return res.status(401).json({ errorMsg : 'utilisateur déjà existant'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.satuts(401).json({ errorMsg : 'mot de passe incorrect'});
            }
            res.status(200).json({
                userId : user._id,
                token: jwt.sign(
                    {userId: user._id},
                    'LE_GRAND_TOKEN',
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error}));
    })
    .catch(error  => res.status(500).json({ error }));

};