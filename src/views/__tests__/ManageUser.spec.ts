import { flushPromises, mount, shallowMount, VueWrapper } from '@vue/test-utils';
import ManageUser from '@/views/ManageUser.vue';
import store from '@/store';
import { ComponentPublicInstance, nextTick } from 'vue';
import { getters } from '@/store/authorization/getters';
import axios from 'axios';

const setup = async (id: string, value: string, wrapper: VueWrapper<ComponentPublicInstance>) => {
  const el = wrapper.find(id);
  await el.setValue(value);
  await el.trigger('blur');
};

const mockRouter = {
  push: jest.fn(),
};

describe('ManageUser', () => {
  let wrapper: any;
  beforeEach(async () => {
    wrapper = mount(ManageUser, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it('should exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set the value in the input firstname', async () => {
    const input = await wrapper.find('#firstName');
    await input.setValue('Alex');
    expect(input.element.value).toBe('Alex');
  });

  it('should set the value in the input middleName', async () => {
    const input = await wrapper.find('#middleName');
    await input.setValue('Alex');
    expect(input.element.value).toBe('Alex');
  });

  it('should set the value in the input lastname', async () => {
    const input = await wrapper.find('#lastname');
    await input.setValue('Alex');
    expect(input.element.value).toBe('Alex');
  });

  it('should fail the validation - firstName field [is required]', async () => {
    await setup('#firstName', '', wrapper);
    expect(wrapper.find('small#firstName-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - middleName field [is required]', async () => {
    await setup('#middleName', '', wrapper);
    expect(wrapper.find('small#middleName-help').text()).toBe("Це обов'язкове поле");
  });

  it('should fail the validation - lastname field [is required]', async () => {
    await setup('#lastname', '', wrapper);
    expect(wrapper.find('small#lastname-help').text()).toBe("Це обов'язкове поле");
  });

  it('should be cancel page ', async () => {
    await wrapper.find('#cancel-button').trigger('click');
    await nextTick();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/main');
  });

  it('should be open Main', async () => {
    await wrapper.find('#submit-btn').trigger('click');
    await nextTick();
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/main');
  });

  it('input firstName must contains name from store', async () => {
    const input = await wrapper.find('#firstName');
    expect(input.element.value).toEqual(store.state.authorizationStore.user.firstName);
  });

  it('input middleName must contains name from store', async () => {
    const input = await wrapper.find('#middleName');
    expect(input.element.value).toEqual(store.state.authorizationStore.user.firstName);
  });

  it('input lastname must contains name from store', async () => {
    const input = await wrapper.find('#lastname');
    expect(input.element.value).toEqual(store.state.authorizationStore.user.firstName);
  });

  it('getter must be like a state ', () => {
    const actual = getters.userData(store.state.authorizationStore);
    expect(actual).toBe(store.state.authorizationStore.user);
  });

  it('function onSubmit must be work', async () => {
    const spy = jest.spyOn(wrapper.vm, 'onSubmit');
    wrapper.vm.onSubmit();
    expect(spy).toBeCalled();
  });

  it('function deleteContact must be work', async () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteContact');
    wrapper.vm.deleteContact();
    expect(spy).toBeCalled();
  });

  it('function addContact must be work', async () => {
    const spy = jest.spyOn(wrapper.vm, 'addContact');
    wrapper.vm.addContact();
    expect(spy).toBeCalled();
  });
});
