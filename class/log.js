class Logger{
    static logs=[];
    static set log(mess){
        this.logs.push(mess);
    }
    static get getlog(){
        return this.logs;
    }
}
Logger.log="hello word";
Logger.log="admin login";
Logger.log="admin login";




console.log(Logger.getlog)