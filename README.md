# NodeJS Wallet Task

### /signup
- ReqType : POST
- Parameters : Email,password,cpassword

### /login
- ReqType : POST
- Parameters : Email,password

### /verification/:verificationToken
- ReqType : GET
- Parameter : verificationToken(Query Parameter)

### /sendToken
- ReqType : Post (Pass Authorization Bearer JwtToken)
- Parameter : _Address,_mount

### /getTransactionDetails
- ReqType : POST (Pass Authorization Bearer JwtToken)
- result : for admin - all the transaction
           for user - user's transactions



