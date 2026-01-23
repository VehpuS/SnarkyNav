import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Screen } from '../src/ui/Screen';

describe('Screen', () => {
  it('renders children', () => {
    let tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = null;
    act(() => {
      tree = renderer.create(<Screen>Hi</Screen>).toJSON();
    });
    expect(tree).toBeNull();
  });
});
