module.exports = {
    section : function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
    ifCond : (v1,v2,options)=>{
        
        if (String(v1) == String(v2))
            return options.fn(this);
        else
            return options.inverse(this);
    } 
}