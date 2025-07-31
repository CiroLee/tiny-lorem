import Helper from '@src/lorem/helper';
const helper = new Helper();

describe('helper', () => {
  test('elements, throw error', () => {
    expect(() => {
      helper.elements({ a: 1 } as unknown as Array<any>);
    }).toThrow();
  });
  test('elements num = 1', () => {
    const array = [1, 2, 3];
    const result = helper.elements(array);
    expect(array.includes(result)).toBeTruthy();
  });
  test('helper, num > 1', () => {
    const array = [1, 2, 3];
    const result = helper.elements(array, 2);
    result.forEach((item) => {
      expect(array.includes(item)).toBeTruthy();
    });
  });
  test('elements, num > array length', () => {
    const array = [1, 2, 3];
    const result = [...new Set(helper.elements(array, 6))];
    expect(result.length).toBeLessThanOrEqual(array.length);
  });
  test('boolean', () => {
    const result = helper.boolean();
    expect(typeof result).toBe('boolean');
  });
  test('falsy', () => {
    const result = helper.falsy();
    expect(result).toBeFalsy();
  });

  describe('weightElements', () => {
    test('should return single element with weight when num = 1', () => {
      const array = ['a', 'b', 'c'];
      const weightParams = [
        { weight: 0.8, value: 'a' },
        { weight: 0.1, value: 'b' },
        { weight: 0.1, value: 'c' }
      ];
      
      const result = helper.weightElements(array, weightParams);
      expect(array).toContain(result);
    });

    test('should return multiple elements with weights when num > 1', () => {
      const array = ['a', 'b', 'c'];
      const weightParams = [
        { weight: 0.5, value: 'a' },
        { weight: 0.3, value: 'b' },
        { weight: 0.2, value: 'c' }
      ];
      
      const result = helper.weightElements(array, weightParams, 5);
      expect(result).toHaveLength(5);
      result.forEach(item => {
        expect(array).toContain(item);
      });
    });

    test('should throw error when weight is negative', () => {
      const array = ['a', 'b'];
      const weightParams = [
        { weight: -0.1, value: 'a' },
        { weight: 0.5, value: 'b' }
      ];
      
      expect(() => {
        helper.weightElements(array, weightParams);
      }).toThrow('Weight must be between 0 and 1');
    });

    test('should throw error when weight is greater than 1', () => {
      const array = ['a', 'b'];
      const weightParams = [
        { weight: 1.5, value: 'a' },
        { weight: 0.5, value: 'b' }
      ];
      
      expect(() => {
        helper.weightElements(array, weightParams);
      }).toThrow('Weight must be between 0 and 1');
    });

    test('should throw error when specified value is not in array', () => {
      const array = ['a', 'b', 'c'];
      const weightParams = [
        { weight: 0.5, value: 'a' },
        { weight: 0.3, value: 'x' }, // 'x' is not in array
        { weight: 0.2, value: 'c' }
      ];
      
      expect(() => {
        helper.weightElements(array, weightParams);
      }).toThrow('Specified value is not in the array');
    });

    test('should handle zero weights correctly', () => {
      const array = ['a', 'b', 'c'];
      const weightParams = [
        { weight: 0, value: 'a' },
        { weight: 0, value: 'b' },
        { weight: 1, value: 'c' }
      ];
      
      const result = helper.weightElements(array, weightParams, 10);
      expect(result).toHaveLength(10);
      result.forEach(item => expect(item).toBe('c'));
    });

    test('should handle empty weight params', () => {
      const array = ['a', 'b', 'c'];
      const weightParams: Array<{ weight: number; value: string }> = [];
      
      const result = helper.weightElements(array, weightParams, 3);
      expect(result).toHaveLength(3);
      result.forEach(item => {
        expect(array).toContain(item);
      });
    });

    test('should handle all weights summing to less than 1', () => {
      const array = ['a', 'b', 'c', 'd'];
      const weightParams = [
        { weight: 0.2, value: 'a' },
        { weight: 0.3, value: 'b' }
      ];
      
      const result = helper.weightElements(array, weightParams, 5);
      expect(result).toHaveLength(5);
      result.forEach(item => {
        expect(array).toContain(item);
      });
    });

    test('should handle single element array', () => {
      const array = ['only'];
      const weightParams = [
        { weight: 1, value: 'only' }
      ];
      
      const result = helper.weightElements(array, weightParams, 3);
      expect(result).toHaveLength(3);
      result.forEach(item => expect(item).toBe('only'));
    });

    test('should handle edge case with num greater than array length', () => {
      const array = ['a', 'b'];
      const weightParams = [
        { weight: 0.5, value: 'a' },
        { weight: 0.5, value: 'b' }
      ];
      
      const result = helper.weightElements(array, weightParams, 10);
      expect(result).toHaveLength(10);
      result.forEach(item => {
        expect(['a', 'b']).toContain(item);
      });
    });

    test('should handle all elements covered by weight params (coverage for otherElements.length === 0)', () => {
      const array = ['a', 'b', 'c'];
      const weightParams = [
        { weight: 0.4, value: 'a' },
        { weight: 0.3, value: 'b' },
        { weight: 0.3, value: 'c' }
      ];
      
      const result = helper.weightElements(array, weightParams, 5);
      expect(result).toHaveLength(5);
      result.forEach(item => {
        expect(array).toContain(item);
      });
    });

    test('should handle when random exceeds cumulative weights and all elements are weighted', () => {
      const array = ['a', 'b'];
      const weightParams = [
        { weight: 0.1, value: 'a' },
        { weight: 0.1, value: 'b' }
      ];
      
      // Mock Math.random to always return 0.5 (greater than 0.1+0.1=0.2)
      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.5);
      
      try {
        const result = helper.weightElements(array, weightParams, 1);
        expect(['a', 'b']).toContain(result);
      } finally {
        Math.random = originalRandom;
      }
    });

    test('should handle single element array with full coverage', () => {
      const array = ['only'];
      const weightParams = [
        { weight: 1, value: 'only' }
      ];
      
      const result = helper.weightElements(array, weightParams);
      expect(result).toBe('only');
    });
  });
});
