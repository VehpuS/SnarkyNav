import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { ThemedText } from '../src/ui/ThemedText';

describe('ThemedText', () => {
  it('renders variants', () => {
    let h1: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = null;
    let body: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = null;
    let caption: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = null;

    act(() => {
      h1 = renderer.create(<ThemedText variant="h1">Hello</ThemedText>).toJSON();
      body = renderer.create(<ThemedText variant="body">Hello</ThemedText>).toJSON();
      caption = renderer.create(<ThemedText variant="caption">Hello</ThemedText>).toJSON();
    });

    expect(h1).not.toBeNull();
    expect(body).not.toBeNull();
    expect(caption).not.toBeNull();
  });
});
