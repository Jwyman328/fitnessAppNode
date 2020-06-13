module.exports = function checkIsNullResponse(queryResults, errorToThrowOnError){
    if (!queryResults){
       return errorToThrowOnError
    }else{
        return false
    }
}