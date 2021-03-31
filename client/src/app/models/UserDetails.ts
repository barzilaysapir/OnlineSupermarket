export class UserDetails {
    public constructor(
        public id?: number,
        public email?: string,
        public password?: string,
        public confirmPassword?: string,
        public firstName?: string,
        public lastName?: string,
        public city?: string,
        public street?: string,
    ) { }

}