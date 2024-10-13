import {getNumberOfWords} from './wc.js';
import * as t from 'node:test';
import assert from 'node:assert';

t.test('test1', () => {
  const res = getNumberOfWords('test\n\rtest');
  assert.strictEqual(res, 2);
})

t.test('test2', () => {
  const res = getNumberOfWords('\n\r  test');
  assert.strictEqual(res, 1);
})

t.test('test3', () => {
  const res = getNumberOfWords('test test\ntest')
  assert.strictEqual(res, 3)
})

t.test('test4', () => {
  const res = getNumberOfWords('test\rtest\ntest !')
  assert.strictEqual(res, 4)
})

t.test('test5', () => {
  const res = getNumberOfWords('Hello-world !')
  assert.strictEqual(res, 4)
})



