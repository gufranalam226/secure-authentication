class apiErrorHandler extends Error{
    constructor(
        status,
        message = "Something went wrong", 
        errors = [], 
        stack = ''
    ){
        super(message);
        this.data = null,
        this.success = false,
        this.status = status,
        this.message = message,
        this.errors = errors
        if(stack){
            Error.captureStackTrace(this, this.constructor)
        }      
    }
}

export {apiErrorHandler}