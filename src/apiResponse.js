class apiResponse{
    constructor(
        status,
        data,
        message = "Success"
    ){
        this.status = status,
        this.data = data,
        this.message = message
        this.success = status<400
    }

}

export {apiResponse}