export class SuccessfulLoginServerResponse {
    public constructor(
        public token?: string,
        public userType?: string,
        public userDetails?: { id: number, firstName: string },
    ) { }

}