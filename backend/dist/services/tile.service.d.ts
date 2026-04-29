import WebSocket from "ws";
export declare const claimTile: (tileId: number, userId: string) => Promise<{
    id: string;
    x: number;
    y: number;
    ownerId: string | null;
    claimedAt: Date | null;
    updatedAt: Date;
} | null>;
export declare const saveClaimEvent: (userId: string, tileId: string, message: string) => Promise<void>;
export declare const loadInitialData: (ws: WebSocket) => Promise<void>;
//# sourceMappingURL=tile.service.d.ts.map