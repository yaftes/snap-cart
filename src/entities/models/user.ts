export type User = {

    id? : string,
    name? :string,
    email? : string,
    passoword? : string,
    role? : 'admin' | 'user',
    token? : string,
    created_at: Date;
    updated_at: Date;

}
