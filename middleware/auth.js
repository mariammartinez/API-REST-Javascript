const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];
  
        const decodedToken = jwt.verify(token, 'LE_GRAND_TOKEN');
        const userId = decodedToken.userId;
        
        if (req.body.userId && req.body.userId !== userId){
            throw 'user ID non valable !';
        }else {
            next();
        }

    }
    catch(error) {
       
        res.status(401).json({
            error: error | 'requete non authentifiée'
    });
    }
    

}; 