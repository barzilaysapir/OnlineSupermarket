export class OrderDetails {
    public constructor(
        public finalPrice?: number,
        public city?: string,
        public street?: string,
        public shippingDate?: Date,
        public orderDate?: Date,
        public creditCard?: number,
    ) { }
}