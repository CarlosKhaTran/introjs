'use strict';

var assert = require('assert');
var introjs = require('..');

describe('context', function () {
  var ctx = new introjs.Context();

  it('eq', function () {
    assert.strictEqual(ctx.eq(3, 3), 1);
    assert.strictEqual(ctx.eq(3, 2), 0);
  });

  it('ne', function () {
    assert.strictEqual(ctx.ne(3, 3), 0);
    assert.strictEqual(ctx.ne(3, 2), 1);
  });

  it('le', function () {
    assert.strictEqual(ctx.le(3, 4), 1);
    assert.strictEqual(ctx.le(3, 3), 1);
    assert.strictEqual(ctx.le(3, 2), 0);
  });

  it('lt', function () {
    assert.strictEqual(ctx.lt(3, 4), 1);
    assert.strictEqual(ctx.lt(3, 3), 0);
    assert.strictEqual(ctx.lt(3, 2), 0);
  });

  it('ge', function () {
    assert.strictEqual(ctx.ge(3, 4), 0);
    assert.strictEqual(ctx.ge(3, 3), 1);
    assert.strictEqual(ctx.ge(3, 2), 1);
  });

  it('gt', function () {
    assert.strictEqual(ctx.gt(3, 4), 0);
    assert.strictEqual(ctx.gt(3, 3), 0);
    assert.strictEqual(ctx.gt(3, 2), 1);
  });

  it('add', function () {
    assert.strictEqual(ctx.add(5, 2), 7);
    assert.strictEqual(ctx.add(5, -2), 3);
    assert.strictEqual(ctx.add(-5, 2), -3);
    assert.strictEqual(ctx.add(-5, -2), -7);
    assert.throws(function () {
      ctx.add(2147483647, 1);
    }, RangeError);
    assert.throws(function () {
      ctx.add(-2147483648, -1);
    }, RangeError);
  });

  it('sub', function () {
    assert.strictEqual(ctx.sub(5, 2), 3);
    assert.strictEqual(ctx.sub(5, -2), 7);
    assert.strictEqual(ctx.sub(-5, 2), -7);
    assert.strictEqual(ctx.sub(-5, -2), -3);
    assert.throws(function () {
      ctx.sub(-2147483648, 1);
    }, RangeError);
    assert.throws(function () {
      ctx.sub(2147483647, -1);
    }, RangeError);
  });

  it('mul', function () {
    assert.strictEqual(ctx.mul(5, 2), 10);
    assert.strictEqual(ctx.mul(5, -2), -10);
    assert.strictEqual(ctx.mul(-5, 2), -10);
    assert.strictEqual(ctx.mul(-5, -2), 10);
    assert.throws(function () {
      ctx.mul(1073741824, 2);
    }, RangeError);
    assert.throws(function () {
      ctx.mul(-1073741825, 2);
    }, RangeError);
  });

  it('div', function () {
    assert.strictEqual(ctx.div(5, 2), 2);
    assert.strictEqual(ctx.div(5, -2), -2);
    assert.strictEqual(ctx.div(-5, 2), -2);
    assert.strictEqual(ctx.div(-5, -2), 2);
    assert.throws(function () {
      ctx.div(1, 0);
    }, RangeError);
    assert.throws(function () {
      ctx.div(-2147483648, -1);
    }, RangeError);
  });

  it('rem', function () {
    assert.strictEqual(ctx.rem(5, 2), 1);
    assert.strictEqual(ctx.rem(5, -2), 1);
    assert.strictEqual(ctx.rem(-5, 2), -1);
    assert.strictEqual(ctx.rem(-5, -2), -1);
    assert.throws(function () {
      ctx.rem(1, 0);
    }, RangeError);
  });

  it('neg', function () {
    assert.strictEqual(ctx.neg(5), -5);
    assert.strictEqual(ctx.neg(-5), 5);
    assert.throws(function () {
      ctx.neg(-2147483648);
    }, RangeError);
  });

  it('not', function () {
    assert.strictEqual(ctx.not(3), 0);
    assert.strictEqual(ctx.not(0), 1);
  });

  it('getAt', function () {
    var values = [1, 2];
    assert.strictEqual(ctx.getAt(values, 1), 2);
    assert.throws(function () {
      ctx.getAt(values, -1);
    }, RangeError);
    assert.throws(function () {
      ctx.getAt(values, 2);
    }, RangeError);
  });

  it('setAt', function () {
    var values = [1, 5];
    ctx.setAt(values, 1, 2);
    assert.deepStrictEqual(values, [1, 2])
    assert.throws(function () {
      ctx.setAt(values, -1, 2);
    }, RangeError);
    assert.throws(function () {
      ctx.setAt(values, 2, 2);
    }, RangeError);
  });

  it('addAt', function () {
    var values = [1, 5];
    ctx.addAt(values, 1, 3);
    assert.deepStrictEqual(values, [1, 8])
    assert.throws(function () {
      ctx.addAt(values, -1, 3);
    }, RangeError);
    assert.throws(function () {
      ctx.addAt(values, 2, 3);
    }, RangeError);
  });

  it('subAt', function () {
    var values = [1, 5];
    ctx.subAt(values, 1, 2);
    assert.deepStrictEqual(values, [1, 3])
    assert.throws(function () {
      ctx.subAt(values, -1, 3);
    }, RangeError);
    assert.throws(function () {
      ctx.subAt(values, 2, 3);
    }, RangeError);
  });

  it('mulAt', function () {
    var values = [1, 5];
    ctx.mulAt(values, 1, 2);
    assert.deepStrictEqual(values, [1, 10])
    assert.throws(function () {
      ctx.mulAt(values, -1, 3);
    }, RangeError);
    assert.throws(function () {
      ctx.mulAt(values, 2, 3);
    }, RangeError);
  });

  it('divAt', function () {
    var values = [1, 5];
    ctx.divAt(values, 1, 2);
    assert.deepStrictEqual(values, [1, 2])
    assert.throws(function () {
      ctx.divAt(values, -1, 3);
    }, RangeError);
    assert.throws(function () {
      ctx.divAt(values, 2, 3);
    }, RangeError);
  });

  it('remAt', function () {
    var values = [1, 5];
    ctx.remAt(values, 1, 2);
    assert.deepStrictEqual(values, [1, 1])
    assert.throws(function () {
      ctx.remAt(values, -1, 3);
    }, RangeError);
    assert.throws(function () {
      ctx.remAt(values, 2, 3);
    }, RangeError);
  });

  describe('range', function () {
    it('0 :< 4', function () {
      var it = ctx.range(0, 4, 1, false);
      assert.strictEqual(it(), 0);
      assert.strictEqual(it(), 1);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), 3);
      assert.strictEqual(it(), null);
    });

    it('0 :< 4 :% 2', function () {
      var it = ctx.range(0, 4, 2, false);
      assert.strictEqual(it(), 0);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), null);
    });

    it('0 :<= 4', function () {
      var it = ctx.range(0, 4, 1, true);
      assert.strictEqual(it(), 0);
      assert.strictEqual(it(), 1);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), 3);
      assert.strictEqual(it(), 4);
      assert.strictEqual(it(), null);
    });

    it('0 :<= 4 :% 2', function () {
      var it = ctx.range(0, 4, 2, true);
      assert.strictEqual(it(), 0);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), 4);
      assert.strictEqual(it(), null);
    });

    it('4 :> 0', function () {
      var it = ctx.range(4, 0, -1, false);
      assert.strictEqual(it(), 4);
      assert.strictEqual(it(), 3);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), 1);
      assert.strictEqual(it(), null);
    });

    it('4 :> 0 :% -2', function () {
      var it = ctx.range(4, 0, -2, false);
      assert.strictEqual(it(), 4);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), null);
    });

    it('4 :>= 0', function () {
      var it = ctx.range(4, 0, -1, true);
      assert.strictEqual(it(), 4);
      assert.strictEqual(it(), 3);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), 1);
      assert.strictEqual(it(), 0);
      assert.strictEqual(it(), null);
    });

    it('4 :>= 0 :% -2', function () {
      var it = ctx.range(4, 0, -2, true);
      assert.strictEqual(it(), 4);
      assert.strictEqual(it(), 2);
      assert.strictEqual(it(), 0);
      assert.strictEqual(it(), null);
    });

    it('0 :< 0', function () {
      var it = ctx.range(0, 0, 1, false);
      assert.strictEqual(it(), null);
    });

    it('0 :< 0 :% 0', function () {
      assert.throws(function () {
        ctx.range(0, 4, 0, false);
      }, RangeError);
    });
  });
});