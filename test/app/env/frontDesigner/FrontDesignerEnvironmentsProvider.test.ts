import { container } from '@dews/dews-mobile-core';
import { expect } from '@open-wc/testing';
// eslint-disable-next-line max-len
import { FrontDesignerEnvironmentProvider } from '../../../../src/app/env/frontDesigner/FrontDesignerEnvironmentProvider.js';
import { DefaultGlobalEnvironmentVariables } from '../../../../src/app/env/GlobalEnvironmentVariables.js';

export const FrontDesignerEnvironmentsProviderTest = () => {
  describe('FrontDesignerEnvironmentProvider', () => {
    it('DI 컨테이너를 통한 기본 인스턴스 획득 및 값 획득 테스트', async () => {
      // arrange
      const provider = container.resolve<FrontDesignerEnvironmentProvider>(FrontDesignerEnvironmentProvider);

      // act
      await provider.configure();

      // assert
      expect(provider.env.global).to.deep.eq(DefaultGlobalEnvironmentVariables);
    });
  });
};
