export type User = {

    id? : string,
    name? :string,
    email? : string,
    avatarUrl? : string,
    role? : 'admin' | 'user',
    createdAt: Date;
    updatedAt: Date;

}
