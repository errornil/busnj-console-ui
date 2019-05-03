describe('Jest test', () => {
  it('should return identity', () => {
    const id = x => x;
    const data = 1;
    const result = 1;

    expect(id(data)).toEqual(result);
  });
});
