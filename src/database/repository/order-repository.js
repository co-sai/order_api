const { OrderModel } = require("../models");

// Work with Database
class OrderRepository{
    async CreateOrder(validatedInputs){
        try{
            const { name, phone, address, shippingFee, status, items } = validatedInputs;
            const order = new OrderModel({
                name, phone, address, shippingFee, status, items
            });
            await order.save();
            return order;
        }catch(err){
            throw err;
        }
    }
}
module.exports = OrderRepository;