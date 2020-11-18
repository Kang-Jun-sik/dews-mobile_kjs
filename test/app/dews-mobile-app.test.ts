import { expect } from '@open-wc/testing';
import { DewsMobileApp } from '../../src/app/dews-mobile-app.js';

describe('앱 메인 추가 테스트', () => {
  let element: DewsMobileApp;

  beforeEach(async () => {
    await dews.app.start();
    element = (dews.app.main as unknown) as DewsMobileApp;
    // element = await fixture(html` <dews-mobile-app></dews-mobile-app> `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Main App');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('autoWired 를 이용한 프로퍼티 인젝션 테스트', () => {
    // assert
    expect(element.dependency).is.not.undefined;
    expect(element.dependency.key).to.equal('test value');
  });
});
