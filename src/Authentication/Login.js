const ex = require("express");
const jwt = require("jsonwebtoken");
const router = ex.Router();

const secretKey = "secretKey";


router.post("/", (req, res) => {
    const user = {
        id: 1,
        username: "khushboo",
        email: "abc@test.com"
    }
    jwt.sign({ user }, secretKey, { expiresIn: '10s' }, (err, token) => {
        res.json({
            token
        })
    })
})

router.post("/profile", (req, res) => {
    let loginStatus = verifyToken(req, res);
    if (loginStatus) {
        res.status(200).send({
            "message": "Profile Accessed"
        })
    }
    res.status(400).send({
        "message": "Invalid Token"
    });
})

function verifyToken(req, res) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        jwt.verify(req.token, secretKey, (err, authData) => {
            if (err) {
                res.send({ result: "Invalid Token" })
            }
            if(authData!=null){
                flag=true;
            }
            })
            if(flag){
                return true;
            }
            return false;
    }
    else {
        res.send({
            result: 'Token is not valid'
        })
    }
}


module.exports.verifyToken = verifyToken;
module.exports.loginRoute = router;