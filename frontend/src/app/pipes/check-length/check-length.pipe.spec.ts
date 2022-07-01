import { CheckLengthPipe } from './check-length.pipe';

describe('CheckLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
