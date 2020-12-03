import { container } from '@dews/dews-mobile-core';
import { expect } from '@open-wc/testing';
import { DefaultGlobalEnvironmentVariables } from '../../../../src/app/env/GlobalEnvironmentVariables.js';
import { MobileAppEnvironmentsProvider } from '../../../../src/app/env/mobileApp/MobileAppEnvironmentsProvider.js';

export const MobileAppEnvironmentsProviderTest = () => {
  describe('MobileAppEnvironmentsProvider', () => {
    it('DI 컨테이너를 통한 기본 인스턴스 획득 및 값 획득 테스트', async () => {
      // arrange
      const provider = container.resolve<MobileAppEnvironmentsProvider>(MobileAppEnvironmentsProvider);

      // act
      await provider.configure();

      // assert
      expect(provider.env.global).to.deep.eq(DefaultGlobalEnvironmentVariables);
    });
  });
};
