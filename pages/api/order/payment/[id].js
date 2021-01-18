import connectDB from '../../../../utils/connectDB'
import Orders from '../../../../models/orderModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await paymentOrder(req, res)
            break;
    }
}

const paymentOrder = async(req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role === 'user'){
            const {id} = req.query
            const { paymentId } = req.body
    
            await Orders.findOneAndUpdate({_id: id}, {
                paid: true, dateOfPayment: new Date().toISOString(), paymentId,
                method: 'Paypal'
            })
    
            res.json({msg: 'Payment success!'})
        }
        
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}