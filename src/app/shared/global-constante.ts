export class GlobaleConstants {
    public static nameRegex:string = '[a-zA-Z ]{3,24}';
    public static contactNumberRegex = '[0]+[567]+[0-9]{8}';
    public static unAuthorized:string = 'you can not autorisated to accesse this page'
    public static emailRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static paswordRegex:string = "[a-zA-Z0-9_%-]{8,12}";
    public static generatError:string = "something went wrong ,please try again later";
    public static error:string = "error";
}