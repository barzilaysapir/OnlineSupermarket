export class Product {
    public constructor(
        public id?: number,
        public name?: string,
        public amount?: number,
        public imageUrl?: string,
        public price?: number,
        public categoryName?: string,
        public categoryId?: number,
    ) { }
}
