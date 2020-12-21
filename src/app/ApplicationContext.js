var _version, _systemType, _started, _main;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { container } from '@dews/dews-mobile-core';
import { SystemType } from './SystemTypeEnum.js';
import { dependencySymbols } from './dependencySymbols.js';
// noinspection JSMethodCanBeStatic
class ApplicationContext {
    constructor() {
        _version.set(this, '__VERSION__');
        _systemType.set(this, void 0);
        _started.set(this, false);
        _main.set(this, undefined);
        __classPrivateFieldSet(this, _systemType, this.getCurrentAppType());
    }
    get version() {
        return __classPrivateFieldGet(this, _version);
    }
    get systemType() {
        return __classPrivateFieldGet(this, _systemType);
    }
    get main() {
        return __classPrivateFieldGet(this, _main);
    }
    async start(target) {
        if (!__classPrivateFieldGet(this, _started)) {
            // 인증 프로세스 수행
            const systemEnv = await this.registerConditionalDependencies();
            if (systemEnv.auth.isAuthenticated) {
                try {
                    await systemEnv.auth.authenticate();
                    const { DewsMobileApp } = await import('./dews-mobile-app.js');
                    __classPrivateFieldSet(this, _main, new DewsMobileApp());
                    target = target !== null && target !== void 0 ? target : document.body;
                    target.prepend(__classPrivateFieldGet(this, _main));
                    await __classPrivateFieldGet(this, _main).updateComplete;
                    Object.freeze(__classPrivateFieldGet(this, _main));
                }
                catch (err) {
                    // 인증 실패
                }
            }
            __classPrivateFieldSet(this, _started, true);
        }
    }
    getCurrentAppType() {
        // if (false) {
        //   // Mobile-app 호출 : 앱에서 제공하는 전용 function 이 있는지 여부로 판단
        //   return AppType.MobileApp;
        // }
        if (location.search) {
            // Front-designer 호출 : querystring 에 token 매개변수가 제공됨
            const params = new URLSearchParams(location.search);
            if (params.has('token')) {
                return SystemType.FrontDesigner;
            }
        }
        return SystemType.Standalone;
    }
    async registerConditionalDependencies() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let systemEnv;
        switch (__classPrivateFieldGet(this, _systemType)) {
            case SystemType.MobileApp:
                systemEnv = (await import('./env/mobileApp/MobileAppEnvironmentsProvider.js')).MobileAppEnvironmentsProvider;
                break;
            case SystemType.FrontDesigner:
                systemEnv = (await import('./env/frontDesigner/FrontDesignerEnvironmentProvider.js'))
                    .FrontDesignerEnvironmentProvider;
                break;
            default:
                systemEnv = (await import('./env/standalone/StandaloneEnvironmentsProvider.js')).StandaloneEnvironmentsProvider;
                break;
        }
        const instance = container.resolve(systemEnv);
        await instance.configure();
        container.registerInstance(dependencySymbols.SystemEnvironmentsProvider, instance);
        return instance;
    }
}
_version = new WeakMap(), _systemType = new WeakMap(), _started = new WeakMap(), _main = new WeakMap();
const app = new ApplicationContext();
export { app };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25Db250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwbGljYXRpb25Db250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQW1CM0QsbUNBQW1DO0FBQ25DLE1BQU0sa0JBQWtCO0lBTXRCO1FBTEEsbUJBQW9CLGFBQWEsRUFBQztRQUNsQyw4QkFBaUM7UUFDakMsbUJBQVcsS0FBSyxFQUFDO1FBQ2pCLGdCQUE4QyxTQUFTLEVBQUM7UUFHdEQsdUJBQUEsSUFBSSxlQUFlLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCw4Q0FBcUI7SUFDdkIsQ0FBQztJQUNELElBQUksVUFBVTtRQUNaLGlEQUF3QjtJQUMxQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sMkNBQWtCO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQXlDO1FBQ25ELElBQUksdUNBQWMsRUFBRTtZQUNsQixhQUFhO1lBQ2IsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztZQUMvRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNsQyxJQUFJO29CQUNGLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFFcEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQy9ELHVCQUFBLElBQUksU0FBUyxJQUFJLGFBQWEsRUFBRSxFQUFDO29CQUVqQyxNQUFNLEdBQUcsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUssUUFBUSxDQUFDLElBQXdCLENBQUM7b0JBQ3RELE1BQU8sQ0FBQyxPQUFPLENBQUUsbUNBQThCLENBQUMsQ0FBQztvQkFFakQsTUFBUSxtQ0FBcUMsQ0FBQyxjQUFjLENBQUM7b0JBQzdELE1BQU0sQ0FBQyxNQUFNLHFDQUFZLENBQUM7aUJBQzNCO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLFFBQVE7aUJBQ1Q7YUFDRjtZQUVELHVCQUFBLElBQUksWUFBWSxJQUFJLEVBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLGVBQWU7UUFDZix5REFBeUQ7UUFDekQsOEJBQThCO1FBQzlCLElBQUk7UUFDSixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsb0RBQW9EO1lBQ3BELE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sVUFBVSxDQUFDLGFBQWEsQ0FBQzthQUNqQztTQUNGO1FBRUQsT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFTyxLQUFLLENBQUMsK0JBQStCO1FBQzNDLDhEQUE4RDtRQUM5RCxJQUFJLFNBQStELENBQUM7UUFFcEUsbURBQTBCO1lBQ3hCLEtBQUssVUFBVSxDQUFDLFNBQVM7Z0JBQ3ZCLFNBQVMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLGtEQUFrRCxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQztnQkFDN0csTUFBTTtZQUNSLEtBQUssVUFBVSxDQUFDLGFBQWE7Z0JBQzNCLFNBQVMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLHlEQUF5RCxDQUFDLENBQUM7cUJBQ2xGLGdDQUFnQyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1I7Z0JBQ0UsU0FBUyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsb0RBQW9ELENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDO2dCQUNoSCxNQUFNO1NBQ1Q7UUFDRCxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUE2QixTQUFTLENBQUMsQ0FBQztRQUMxRSxNQUFNLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQixTQUFTLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsMEJBQTBCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFbkYsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGOztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnQGRld3MvZGV3cy1tb2JpbGUtY29yZSc7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1haW5JbnRlcmZhY2UgfSBmcm9tICcuL0FwcGxpY2F0aW9uTWFpbkludGVyZmFjZS5qcyc7XG5pbXBvcnQgeyBTeXN0ZW1FbnZpcm9ubWVudHNQcm92aWRlciB9IGZyb20gJy4vZW52L1N5c3RlbUVudmlyb25tZW50c1Byb3ZpZGVyLmpzJztcbmltcG9ydCB7IFN5c3RlbVR5cGUgfSBmcm9tICcuL1N5c3RlbVR5cGVFbnVtLmpzJztcbmltcG9ydCB7IGRlcGVuZGVuY3lTeW1ib2xzIH0gZnJvbSAnLi9kZXBlbmRlbmN5U3ltYm9scy5qcyc7XG5cbi8qKiDsi6TtlbzrkJjripQgREVXUy9VSSBNb2JpbGUg7Ja07ZSM66as7LyA7J207IWY7J2YIOy7qO2FjeyKpO2KuCDqsJ3ssrTsnoXri4jri6QuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aW9uQ29udGV4dEludGVyZmFjZSB7XG4gIC8qKiBERVdTL1VJIE1vYmlsZSDrn7Dtg4DsnoTsnZgg67KE7KCE7J2EIOqwgOyguOyYteuLiOuLpC4gKi9cbiAgdmVyc2lvbjogc3RyaW5nO1xuXG4gIC8qKiDslrTtlIzrpqzsvIDsnbTshZjsnZgg7Iuk7ZaJIO2YleyLneydhCDqsIDsoLjsmLXri4jri6QuICovXG4gIHN5c3RlbVR5cGU6IFN5c3RlbVR5cGU7XG5cbiAgLyoqIOyWtO2UjOumrOy8gOydtOyFmOydhCDsi6Ttlontlanri4jri6QuXG4gICAqIEBwYXJhbSBjb250YWluZXIg7Ja07ZSM66as7LyA7J207IWY7J20IO2YuOyKpO2MheuQoCDsmpTshozsnoXri4jri6QuXG4gICAqL1xuICBzdGFydChjb250YWluZXI/OiBIVE1MRGl2RWxlbWVudCB8IEhUTUxCb2R5RWxlbWVudCk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqIOyWtO2UjOumrOy8gOydtOyFmCDrqZTsnbgg7J247Iqk7YS07Iqk7J6F64uI64ukLiAqL1xuICBtYWluOiBBcHBsaWNhdGlvbk1haW5JbnRlcmZhY2UgfCB1bmRlZmluZWQ7XG59XG5cbi8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG5jbGFzcyBBcHBsaWNhdGlvbkNvbnRleHQgaW1wbGVtZW50cyBBcHBsaWNhdGlvbkNvbnRleHRJbnRlcmZhY2Uge1xuICByZWFkb25seSAjdmVyc2lvbiA9ICdfX1ZFUlNJT05fXyc7XG4gIHJlYWRvbmx5ICNzeXN0ZW1UeXBlOiBTeXN0ZW1UeXBlO1xuICAjc3RhcnRlZCA9IGZhbHNlO1xuICAjbWFpbjogQXBwbGljYXRpb25NYWluSW50ZXJmYWNlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI3N5c3RlbVR5cGUgPSB0aGlzLmdldEN1cnJlbnRBcHBUeXBlKCk7XG4gIH1cblxuICBnZXQgdmVyc2lvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLiN2ZXJzaW9uO1xuICB9XG4gIGdldCBzeXN0ZW1UeXBlKCk6IFN5c3RlbVR5cGUge1xuICAgIHJldHVybiB0aGlzLiNzeXN0ZW1UeXBlO1xuICB9XG5cbiAgZ2V0IG1haW4oKTogQXBwbGljYXRpb25NYWluSW50ZXJmYWNlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy4jbWFpbjtcbiAgfVxuXG4gIGFzeW5jIHN0YXJ0KHRhcmdldD86IEhUTUxEaXZFbGVtZW50IHwgSFRNTEJvZHlFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLiNzdGFydGVkKSB7XG4gICAgICAvLyDsnbjspp0g7ZSE66Gc7IS47IqkIOyImO2WiVxuICAgICAgY29uc3Qgc3lzdGVtRW52ID0gYXdhaXQgdGhpcy5yZWdpc3RlckNvbmRpdGlvbmFsRGVwZW5kZW5jaWVzKCk7XG4gICAgICBpZiAoc3lzdGVtRW52LmF1dGguaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgc3lzdGVtRW52LmF1dGguYXV0aGVudGljYXRlKCk7XG5cbiAgICAgICAgICBjb25zdCB7IERld3NNb2JpbGVBcHAgfSA9IGF3YWl0IGltcG9ydCgnLi9kZXdzLW1vYmlsZS1hcHAuanMnKTtcbiAgICAgICAgICB0aGlzLiNtYWluID0gbmV3IERld3NNb2JpbGVBcHAoKTtcblxuICAgICAgICAgIHRhcmdldCA9IHRhcmdldCA/PyAoZG9jdW1lbnQuYm9keSBhcyBIVE1MQm9keUVsZW1lbnQpO1xuICAgICAgICAgIHRhcmdldCEucHJlcGVuZCgodGhpcy4jbWFpbiBhcyB1bmtub3duKSBhcyBOb2RlKTtcblxuICAgICAgICAgIGF3YWl0ICgodGhpcy4jbWFpbiBhcyB1bmtub3duKSBhcyBMaXRFbGVtZW50KS51cGRhdGVDb21wbGV0ZTtcbiAgICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMuI21haW4pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAvLyDsnbjspp0g7Iuk7YyoXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy4jc3RhcnRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50QXBwVHlwZSgpOiBTeXN0ZW1UeXBlIHtcbiAgICAvLyBpZiAoZmFsc2UpIHtcbiAgICAvLyAgIC8vIE1vYmlsZS1hcHAg7Zi47LacIDog7JWx7JeQ7IScIOygnOqzte2VmOuKlCDsoITsmqkgZnVuY3Rpb24g7J20IOyeiOuKlOyngCDsl6zrtoDroZwg7YyQ64uoXG4gICAgLy8gICByZXR1cm4gQXBwVHlwZS5Nb2JpbGVBcHA7XG4gICAgLy8gfVxuICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgIC8vIEZyb250LWRlc2lnbmVyIO2YuOy2nCA6IHF1ZXJ5c3RyaW5nIOyXkCB0b2tlbiDrp6TqsJzrs4DsiJjqsIAg7KCc6rO165CoXG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICBpZiAocGFyYW1zLmhhcygndG9rZW4nKSkge1xuICAgICAgICByZXR1cm4gU3lzdGVtVHlwZS5Gcm9udERlc2lnbmVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBTeXN0ZW1UeXBlLlN0YW5kYWxvbmU7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlZ2lzdGVyQ29uZGl0aW9uYWxEZXBlbmRlbmNpZXMoKTogUHJvbWlzZTxTeXN0ZW1FbnZpcm9ubWVudHNQcm92aWRlcj4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgbGV0IHN5c3RlbUVudjogeyBuZXcgKC4uLmFyZ3M6IGFueVtdKTogU3lzdGVtRW52aXJvbm1lbnRzUHJvdmlkZXIgfTtcblxuICAgIHN3aXRjaCAodGhpcy4jc3lzdGVtVHlwZSkge1xuICAgICAgY2FzZSBTeXN0ZW1UeXBlLk1vYmlsZUFwcDpcbiAgICAgICAgc3lzdGVtRW52ID0gKGF3YWl0IGltcG9ydCgnLi9lbnYvbW9iaWxlQXBwL01vYmlsZUFwcEVudmlyb25tZW50c1Byb3ZpZGVyLmpzJykpLk1vYmlsZUFwcEVudmlyb25tZW50c1Byb3ZpZGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3lzdGVtVHlwZS5Gcm9udERlc2lnbmVyOlxuICAgICAgICBzeXN0ZW1FbnYgPSAoYXdhaXQgaW1wb3J0KCcuL2Vudi9mcm9udERlc2lnbmVyL0Zyb250RGVzaWduZXJFbnZpcm9ubWVudFByb3ZpZGVyLmpzJykpXG4gICAgICAgICAgLkZyb250RGVzaWduZXJFbnZpcm9ubWVudFByb3ZpZGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN5c3RlbUVudiA9IChhd2FpdCBpbXBvcnQoJy4vZW52L3N0YW5kYWxvbmUvU3RhbmRhbG9uZUVudmlyb25tZW50c1Byb3ZpZGVyLmpzJykpLlN0YW5kYWxvbmVFbnZpcm9ubWVudHNQcm92aWRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gY29udGFpbmVyLnJlc29sdmU8U3lzdGVtRW52aXJvbm1lbnRzUHJvdmlkZXI+KHN5c3RlbUVudik7XG4gICAgYXdhaXQgaW5zdGFuY2UuY29uZmlndXJlKCk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVySW5zdGFuY2UoZGVwZW5kZW5jeVN5bWJvbHMuU3lzdGVtRW52aXJvbm1lbnRzUHJvdmlkZXIsIGluc3RhbmNlKTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxufVxuXG5jb25zdCBhcHAgPSBuZXcgQXBwbGljYXRpb25Db250ZXh0KCk7XG5cbmV4cG9ydCB7IGFwcCB9O1xuIl19