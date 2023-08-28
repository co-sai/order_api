const OrderService = require("../service/order-service");

module.exports = async(app)=>{
    const service = new OrderService();

    app.get("/", async(req, res, next)=>{
        res.status(200).json({
            message : "Hello World."
        })
    })

    app.post("/orders/add", async(req, res, next)=>{
        try{
            const { name, phone, address, shippingFee, status, items } = req.body;
            const data = await service.CreateOrder({ name, phone, address, shippingFee, status, items });

            res.status(201).json({
                message : "Order has been created successfully.",
                data : data
            })
        }catch(err){
            next(err);
        }
    });
};
