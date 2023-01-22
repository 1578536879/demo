const compose_handle_writting = (...args) => {
    return (params) => {
        let fn = args.pop()
        let data = params
        while(fn){
            data = fn(data);
            fn = args.pop()
        }
        return data
    }
}