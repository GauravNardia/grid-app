export declare const findUserById: (id: string) => Promise<{
    id: string;
    name: string;
    color: string;
    createdAt: Date;
    lastSeenAt: Date;
} | null>;
export declare const createUser: (name: string) => Promise<{
    id: string;
    name: string;
    color: string;
    createdAt: Date;
    lastSeenAt: Date;
} | undefined>;
export declare const getAllUsers: () => Promise<{
    id: string;
    name: string;
    color: string;
    createdAt: Date;
    lastSeenAt: Date;
}[]>;
//# sourceMappingURL=user.service.d.ts.map