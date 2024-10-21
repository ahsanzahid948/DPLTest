namespace ServerApp.ViewModels
{
    public class Response<T>
    { 
        public Response(T data)
        {
            Status = "Success";
            Data = data;
        }
        public Response()
        {
            Status = "Success";
        }
        public string Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }

}
