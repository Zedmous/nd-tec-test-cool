const { Schema,model}=require('mongoose')
const DestinationSchema=Schema({
    name: {
        type:String,
        required:[true,'The name is required'],
        unique:true
    },
    description: {
        type:String,
        required:[false,'The description is required']
    },
    attactions:{
        type:String
    },
    activities: {
        type:String
        
    },
    services:{
        type:String,
        required:true,
    },
    rating:{
        one:Number,
        two:Number,
        three:Number,
        four:Number,
        five:Number
    },
    img: {
        type:[String]
    },
    status:{
        type:Boolean,
        default:true,
    }
});
DestinationSchema.methods.toJSON=function(){
    const { __v,_id,...destination}=this.toObject();
    destination.uid=_id
    return destination
}
module.exports=model('Destination',DestinationSchema)