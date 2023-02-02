/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs TagInput React(PC) vitest,finalProject`
 * If you need to modify this file, contact PMC first please.
 */
import React from 'react';
import { fireEvent, vi, render, mockDelay, simulateInputChange, simulateInputEnter } from '@test/utils';
import { TagInput } from '..';
import { getTagInputValueMount, getTagInputDefaultMount } from './mount';

describe('TagInput Component', () => {
  const mockFn = vi.spyOn(HTMLSpanElement.prototype, 'getBoundingClientRect');
  mockFn.mockImplementation(() => ({ width: 20, x: 5, clientX: 5 }));

  it('props.clearable: empty TagInput does not need clearIcon', async () => {
    const { container } = render(<TagInput clearable={true}></TagInput>);
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    expect(container.querySelector('.t-tag-input__suffix-clear')).toBeFalsy();
  });
  it('props.clearable: show clearIcon on mouse enter', async () => {
    const { container } = getTagInputValueMount(TagInput, { clearable: true });
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    expect(container.querySelector('.t-tag-input__suffix-clear')).toBeTruthy();
  });
  it('props.clearable: clear all tags on click clearIcon', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const { container } = getTagInputValueMount(
      TagInput,
      { clearable: true },
      { onClear: onClearFn1, onChange: onChangeFn1 },
    );
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    fireEvent.click(container.querySelector('.t-tag-input__suffix-clear'));
    expect(onClearFn1).toHaveBeenCalled(1);
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled(1);
    expect(onChangeFn1.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn1.mock.calls[0][1].trigger).toBe('clear');
    expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
  });
  it('props.clearable: disabled TagInput can not show clear icon', async () => {
    const { container } = getTagInputValueMount(TagInput, { disabled: true, clearable: true });
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    expect(container.querySelector('.t-input__suffix-clear')).toBeFalsy();
  });
  it('props.clearable: readonly TagInput can not show clear icon', async () => {
    const { container } = getTagInputValueMount(TagInput, { readonly: true, clearable: true });
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    expect(container.querySelector('.t-input__suffix-clear')).toBeFalsy();
  });

  it('props.collapsedItems works fine', () => {
    const { container } = getTagInputValueMount(TagInput, {
      collapsedItems: <span className="custom-node">TNode</span>,
      minCollapsedNum: 3,
    });
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = render(<TagInput></TagInput>);
    const container1 = wrapper1.container.querySelector('.t-input');
    expect(container1.querySelector(`.${'t-is-disabled'}`)).toBeFalsy();
    // disabled = true
    const wrapper2 = render(<TagInput disabled={true}></TagInput>);
    const container2 = wrapper2.container.querySelector('.t-input');
    expect(container2).toHaveClass('t-is-disabled');
    // disabled = false
    const wrapper3 = render(<TagInput disabled={false}></TagInput>);
    const container3 = wrapper3.container.querySelector('.t-input');
    expect(container3.querySelector(`.${'t-is-disabled'}`)).toBeFalsy();
  });

  it('props.disabled: disabled TagInput does not need clearIcon', async () => {
    const { container } = getTagInputValueMount(TagInput, { disabled: true });
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    expect(container.querySelector('.t-tag-input__suffix-clear')).toBeFalsy();
  });
  it('props.disabled: disabled TagInput can not trigger focus event', () => {
    const onFocusFn = vi.fn();
    const { container } = render(<TagInput disabled={true} onFocus={onFocusFn}></TagInput>);
    fireEvent.click(container.querySelector('.t-input'));
    expect(onFocusFn).not.toHaveBeenCalled();
  });

  const excessTagsDisplayTypeClassNameList = [{ 't-tag-input--break-line': false }, 't-tag-input--break-line'];
  ['scroll', 'break-line'].forEach((item, index) => {
    it(`props.excessTagsDisplayType is equal to ${item}`, () => {
      const { container } = getTagInputValueMount(TagInput, { excessTagsDisplayType: item });
      if (typeof excessTagsDisplayTypeClassNameList[index] === 'string') {
        expect(container.firstChild).toHaveClass(excessTagsDisplayTypeClassNameList[index]);
      } else if (typeof excessTagsDisplayTypeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(excessTagsDisplayTypeClassNameList[index])[0];
        expect(container.querySelector(`.${classNameKey}`)).toBeFalsy();
      }
    });
  });

  it(`props.inputProps is equal to {size: 'small'}`, () => {
    const { container } = render(<TagInput inputProps={{ size: 'small' }}></TagInput>);
    const domWrapper = container.querySelector('.t-input');
    expect(domWrapper).toHaveClass('t-size-s');
  });

  it(`props.inputValue is equal to input value text`, () => {
    const { container } = render(<TagInput inputValue="input value text"></TagInput>);
    const domWrapper = container.querySelector('input');
    expect(domWrapper.value).toBe('input value text');
  });

  it('props.label works fine', () => {
    const { container } = render(<TagInput label={<span className="custom-node">TNode</span>}></TagInput>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  it('props.max: could type only three tags', () => {
    const { container } = getTagInputDefaultMount(TagInput, { max: 1 });
    fireEvent.focus(container.querySelector('input'));
    const inputDom1 = container.querySelector('input');
    simulateInputChange(inputDom1, 'Tag3');
    const inputDom2 = container.querySelector('input');
    simulateInputEnter(inputDom2);
    expect(container.querySelectorAll('.t-tag').length).toBe(1);
    const inputDom3 = container.querySelector('input');
    simulateInputChange(inputDom3, 'Tag5');
    const inputDom4 = container.querySelector('input');
    simulateInputEnter(inputDom4);
    expect(container.querySelectorAll('.t-tag').length).toBe(1);
  });

  it('props.minCollapsedNum is equal 3', () => {
    const { container } = getTagInputValueMount(TagInput, { minCollapsedNum: 3 });
    expect(container.querySelectorAll('.t-tag').length).toBe(4);
  });

  it('props.placeholder works fine', () => {
    const wrapper = render(<TagInput placeholder="This is TagInput placeholder"></TagInput>);
    const container = wrapper.container.querySelector('input');
    expect(container.getAttribute('placeholder')).toBe('This is TagInput placeholder');
  });

  it('props.readonly works fine', () => {
    // readonly default value is false
    const wrapper1 = render(<TagInput></TagInput>);
    const container1 = wrapper1.container.querySelector('.t-input');
    expect(container1.querySelector(`.${'t-is-readonly'}`)).toBeFalsy();
    // readonly = true
    const wrapper2 = render(<TagInput readonly={true}></TagInput>);
    const container2 = wrapper2.container.querySelector('.t-input');
    expect(container2).toHaveClass('t-is-readonly');
    // readonly = false
    const wrapper3 = render(<TagInput readonly={false}></TagInput>);
    const container3 = wrapper3.container.querySelector('.t-input');
    expect(container3.querySelector(`.${'t-is-readonly'}`)).toBeFalsy();
  });

  it('props.readonly: readonly TagInput does not need clearIcon', async () => {
    const on0Fn = vi.fn();
    const { container } = getTagInputValueMount(TagInput, { readonly: true }, { on0: on0Fn });
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
  });
  it('props.readonly: readonly TagInput can not trigger focus event', () => {
    const onFocusFn = vi.fn();
    const { container } = render(<TagInput readonly={true} onFocus={onFocusFn}></TagInput>);
    fireEvent.click(container.querySelector('.t-input'));
    expect(onFocusFn).not.toHaveBeenCalled();
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = render(<TagInput size={item}></TagInput>);
      const container = wrapper.container.querySelector('.t-input');
      if (typeof sizeClassNameList[index] === 'string') {
        expect(container).toHaveClass(sizeClassNameList[index]);
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(container.querySelector(`.${classNameKey}`)).toBeFalsy();
      }
    });
  });

  const statusClassNameList = [{ 't-is-default': false }, 't-is-success', 't-is-warning', 't-is-error'];
  ['default', 'success', 'warning', 'error'].forEach((item, index) => {
    it(`props.status is equal to ${item}`, () => {
      const wrapper = render(<TagInput status={item}></TagInput>);
      const container = wrapper.container.querySelector('.t-input');
      if (typeof statusClassNameList[index] === 'string') {
        expect(container).toHaveClass(statusClassNameList[index]);
      } else if (typeof statusClassNameList[index] === 'object') {
        const classNameKey = Object.keys(statusClassNameList[index])[0];
        expect(container.querySelector(`.${classNameKey}`)).toBeFalsy();
      }
    });
  });

  it('props.suffix works fine', () => {
    const { container } = render(<TagInput suffix={<span className="custom-node">TNode</span>}></TagInput>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  it('props.suffixIcon works fine', () => {
    const { container } = render(<TagInput suffixIcon={<span className="custom-node">TNode</span>}></TagInput>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  it('props.tag works fine', () => {
    const { container } = getTagInputValueMount(TagInput, { tag: <span className="custom-node">TNode</span> });
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  it('props.tag is a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount(TagInput, { tag: fn });
    expect(fn).toHaveBeenCalled(1);
    expect(fn.mock.calls[0][0].value).toBe('tdesign-vue');
  });

  it('props.tagProps is equal { theme: warning }', () => {
    const { container } = getTagInputValueMount(TagInput, { tagProps: { theme: 'warning' }, multiple: true });
    expect(container.querySelectorAll('.t-tag--warning').length).toBe(5);
  });

  it('props.tips is equal this is a tip', () => {
    const { container } = render(<TagInput tips="this is a tip"></TagInput>);
    expect(container.querySelectorAll('.t-input__tips').length).toBe(1);
  });

  it('props.value: controlled value test: only props can change count of tags', () => {
    const { container } = getTagInputDefaultMount(TagInput, { value: [] });
    fireEvent.focus(container.querySelector('input'));
    const inputDom1 = container.querySelector('input');
    simulateInputChange(inputDom1, 'Tag1');
    const inputDom2 = container.querySelector('input');
    simulateInputEnter(inputDom2);
    expect(container.querySelector('.t-tag')).toBeFalsy();
  });
  it('props.value: uncontrolled value test: count of tags can be changed inner TagInput', () => {
    const { container } = getTagInputDefaultMount(TagInput);
    fireEvent.focus(container.querySelector('input'));
    const inputDom1 = container.querySelector('input');
    simulateInputChange(inputDom1, 'Tag2');
    const inputDom2 = container.querySelector('input');
    simulateInputEnter(inputDom2);
    expect(container.querySelectorAll('.t-tag').length).toBe(1);
  });

  it('props.valueDisplay works fine', () => {
    const { container } = getTagInputValueMount(TagInput, { valueDisplay: <span className="custom-node">TNode</span> });
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  it('props.valueDisplay is a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount(TagInput, { valueDisplay: fn });
    expect(fn).toHaveBeenCalled(1);
    expect(fn.mock.calls[0][0].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
  });

  it('events.blur: trigger blur event and clear inputValue on blur', () => {
    const onBlurFn2 = vi.fn();
    const onInputChangeFn2 = vi.fn();
    const { container } = render(<TagInput onBlur={onBlurFn2} onInputChange={onInputChangeFn2}></TagInput>);
    fireEvent.focus(container.querySelector('input'));
    const inputDom1 = container.querySelector('input');
    simulateInputChange(inputDom1, 'tag1');
    fireEvent.blur(container.querySelector('input'));
    const attrDom2 = document.querySelector('input');
    expect(attrDom2.value).toBe('');
    expect(onBlurFn2).toHaveBeenCalled(1);
    expect(onBlurFn2.mock.calls[0][0]).toEqual([]);
    expect(onBlurFn2.mock.calls[0][1].e.type).toBe('blur');
    expect(onBlurFn2.mock.calls[0][1].inputValue).toBe('');
    expect(onInputChangeFn2).toHaveBeenCalled(1);
    expect(onInputChangeFn2.mock.calls[1][0]).toBe('');
    expect(onInputChangeFn2.mock.calls[1][1].e.type).toBe('blur');
    expect(onInputChangeFn2.mock.calls[1][1].trigger).toBe('blur');
  });

  it('events.clear: click clear icon, then clear all tags', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const { container } = getTagInputValueMount(
      TagInput,
      { clearable: true },
      { onClear: onClearFn1, onChange: onChangeFn1 },
    );
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    fireEvent.click(container.querySelector('.t-tag-input__suffix-clear'));
    expect(onClearFn1).toHaveBeenCalled(1);
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled(1);
    expect(onChangeFn1.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn1.mock.calls[0][1].trigger).toBe('clear');
  });

  it('events.click works fine', () => {
    const fn = vi.fn();
    const { container } = render(<TagInput onClick={fn}></TagInput>);
    fireEvent.click(container.querySelector('.t-input'));
    expect(fn).toHaveBeenCalled(1);
    expect(fn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.enter works fine', () => {
    const onEnterFn = vi.fn();
    const { container } = getTagInputDefaultMount(TagInput, { value: ['tag'] }, { onEnter: onEnterFn });
    const inputDom = container.querySelector('input');
    simulateInputEnter(inputDom);
    expect(onEnterFn).toHaveBeenCalled(1);
    expect(onEnterFn.mock.calls[0][0]).toEqual(['tag']);
    expect(onEnterFn.mock.calls[0][1].e.type).toBe('keydown');
    expect(onEnterFn.mock.calls[0][1].inputValue).toBe('');
  });
  it('events.enter works fine', () => {
    const { container } = render(<TagInput></TagInput>);
    fireEvent.focus(container.querySelector('input'));
    const inputDom1 = container.querySelector('input');
    simulateInputChange(inputDom1, 'Tag');
    const inputDom2 = container.querySelector('input');
    simulateInputEnter(inputDom2);
    expect(container.querySelectorAll('.t-tag').length).toBe(1);
  });

  it('events.focus works fine', () => {
    const onFocusFn = vi.fn();
    const { container } = getTagInputDefaultMount(TagInput, {}, { onFocus: onFocusFn });
    fireEvent.focus(container.querySelector('input'));
    expect(onFocusFn).toHaveBeenCalled(1);
    expect(onFocusFn.mock.calls[0][0]).toEqual([]);
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    expect(onFocusFn.mock.calls[0][1].inputValue).toBe('');
  });
  it('events.focus: expect focus not change inputValue', () => {
    const onFocusFn = vi.fn();
    const { container } = getTagInputDefaultMount(TagInput, { inputValue: 'tag' }, { onFocus: onFocusFn });
    fireEvent.focus(container.querySelector('input'));
    expect(onFocusFn).toHaveBeenCalled(1);
    expect(onFocusFn.mock.calls[0][0]).toEqual([]);
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    expect(onFocusFn.mock.calls[0][1].inputValue).toBe('tag');
  });

  it('events.mouseenter works fine', async () => {
    const onMouseenterFn = vi.fn();
    const { container } = render(<TagInput onMouseenter={onMouseenterFn}></TagInput>);
    fireEvent.mouseEnter(container.querySelector('.t-input'));
    await mockDelay();
    expect(onMouseenterFn).toHaveBeenCalled(1);
    expect(onMouseenterFn.mock.calls[0][0].e.type).toBe('mouseenter');
  });

  it('events.mouseleave works fine', async () => {
    const onMouseleaveFn = vi.fn();
    const { container } = render(<TagInput onMouseleave={onMouseleaveFn}></TagInput>);
    fireEvent.mouseLeave(container.querySelector('.t-input'));
    await mockDelay();
    expect(onMouseleaveFn).toHaveBeenCalled(1);
    expect(onMouseleaveFn.mock.calls[0][0].e.type).toBe('mouseleave');
  });

  it('events.paste works fine', () => {
    const onPasteFn = vi.fn();
    const { container } = render(<TagInput onPaste={onPasteFn}></TagInput>);
    fireEvent.paste(container.querySelector('input'));
    expect(onPasteFn).toHaveBeenCalled(1);
    expect(onPasteFn.mock.calls[0][0].e.type).toBe('paste');
  });

  it('events.remove: remove last tag on keydown Backspace', () => {
    const onRemoveFn = vi.fn();
    const { container } = getTagInputValueMount(TagInput, {}, { onRemove: onRemoveFn });
    fireEvent.keyDown(container.querySelector('input'), { key: 'Backspace', code: 'Backspace', charCode: 8 });
    expect(onRemoveFn).toHaveBeenCalled(1);
    expect(onRemoveFn.mock.calls[0][0].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
    ]);
    expect(onRemoveFn.mock.calls[0][0].index).toBe(4);
    expect(onRemoveFn.mock.calls[0][0].trigger).toBe('backspace');
    expect(onRemoveFn.mock.calls[0][0].item).toBe('tdesign-mobile-react');
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('keydown');
  });
  it('events.remove: remove any tag on click tag close icon', () => {
    const onRemoveFn = vi.fn();
    const { container } = getTagInputValueMount(TagInput, {}, { onRemove: onRemoveFn });
    fireEvent.click(container.querySelector('.t-tag__icon-close'));
    expect(onRemoveFn).toHaveBeenCalled(1);
    expect(onRemoveFn.mock.calls[0][0].value).toEqual([
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].trigger).toBe('tag-remove');
    expect(onRemoveFn.mock.calls[0][0].item).toBe('tdesign-vue');
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.drag: dragSort', () => {
    const defaultValue = ['Vue', 'React', 'Angular'];
    const onDragSort = vi.fn(() => {
      // 模拟顺序交换
      const tagBox = document.querySelectorAll('.t-input__prefix').item(0);
      const vueTag = document.querySelectorAll('.t-tag').item(0);
      const reactTag = document.querySelectorAll('.t-tag').item(1);
      const cloneReact = reactTag.cloneNode(true);
      tagBox.insertBefore(cloneReact, vueTag);
      tagBox.removeChild(reactTag);
    });
    const { container } = getTagInputValueMount(TagInput, { dragSort: true, value: defaultValue }, { onDragSort });

    fireEvent.dragStart(container.querySelectorAll('.t-tag').item(1), {
      dataTransfer: {
        currentIndex: 1,
        targetIndex: 0,
      },
    });

    fireEvent.dragOver(container.querySelectorAll('.t-tag').item(0), {
      dataTransfer: {
        currentIndex: 1,
        targetIndex: 0,
      },
    });
    expect(onDragSort).toHaveBeenCalled(1);
    expect(onDragSort.mock.calls[0][0].target).toEqual('Vue');
    expect(container.querySelectorAll('.t-tag').item(0).firstChild.title).toEqual('React');
  });
});
