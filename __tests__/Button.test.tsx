import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button } from '../src/ui/Button';

describe('Button', () => {
  it('renders label', () => {
    let tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = null;
    act(() => {
      tree = renderer.create(<Button label="Press me" onPress={() => undefined} />).toJSON();
    });

    expect(tree).not.toBeNull();
    const root = Array.isArray(tree) ? tree[0] : tree;
    const labelNode = root?.children?.find(
      (child) => typeof child === 'object' && child?.type === 'Text'
    ) as renderer.ReactTestRendererJSON | undefined;
    expect(labelNode?.children).toContain('Press me');
  });
});
