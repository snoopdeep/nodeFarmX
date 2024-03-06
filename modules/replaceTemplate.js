module.exports=(obj,cardTemp)=>{
    let temp=cardTemp.replace(/{%PRODUCTNAME%}/g,obj.productName);
    temp=temp.replace(/{%IMAGE%}/g,obj.image);
    temp=temp.replace(/{%QUANTITY%}/g,obj.quantity);
    temp=temp.replace(/{%PRICE%}/g,obj.price);
    temp=temp.replace(/{%ID%}/g,obj.id);
    temp=temp.replace(/{%FROM%}/g,obj.from);
    temp=temp.replace(/{%NUTRIENTSNAME%}/g,obj.nutrients);
    temp=temp.replace(/{%DESCRIPTION%}/g,obj.description);
    if(!obj.organic)temp=temp.replace(/{%NOT-ORGANIC%}/g,'not-organic');
    
    return temp;
}