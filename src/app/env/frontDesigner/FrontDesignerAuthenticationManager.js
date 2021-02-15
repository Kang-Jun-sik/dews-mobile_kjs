import { __decorate } from "tslib";
import { singleton } from '@dews/dews-mobile-core';
let FrontDesignerAuthenticationManager = class FrontDesignerAuthenticationManager {
    get isAuthenticated() {
        return false;
    }
    get token() {
        return undefined;
    }
    async authenticate() {
        return Promise.resolve();
    }
};
FrontDesignerAuthenticationManager = __decorate([
    singleton()
], FrontDesignerAuthenticationManager);
export { FrontDesignerAuthenticationManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJvbnREZXNpZ25lckF1dGhlbnRpY2F0aW9uTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZyb250RGVzaWduZXJBdXRoZW50aWNhdGlvbk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUluRCxJQUFhLGtDQUFrQyxHQUEvQyxNQUFhLGtDQUFrQztJQUM3QyxJQUFJLGVBQWU7UUFDakIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FDRixDQUFBO0FBWlksa0NBQWtDO0lBRDlDLFNBQVMsRUFBRTtHQUNDLGtDQUFrQyxDQVk5QztTQVpZLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpbmdsZXRvbiB9IGZyb20gJ0BkZXdzL2Rld3MtbW9iaWxlLWNvcmUnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25NYW5hZ2VySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vYXV0aC9BdXRoZW50aWNhdGlvbk1hbmFnZXJJbnRlcmZhY2UuanMnO1xuXG5Ac2luZ2xldG9uKClcbmV4cG9ydCBjbGFzcyBGcm9udERlc2lnbmVyQXV0aGVudGljYXRpb25NYW5hZ2VyIGltcGxlbWVudHMgQXV0aGVudGljYXRpb25NYW5hZ2VySW50ZXJmYWNlIHtcbiAgZ2V0IGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgdG9rZW4oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgYXN5bmMgYXV0aGVudGljYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuIl19