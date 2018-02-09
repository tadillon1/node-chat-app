var expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');

  //should reject non-string
  describe('isRealString', () => {
    it('should reject non-string values', () => {
      var res = isRealString(98);  //number 98 is NOT a string and should fail
      expect(res).toBe(false);
    });

    //should reject string with only spaces
    it('should reject string with only spaces', () => {
      var res = isRealString('     ');
      expect(res).toBe(false);
    });

    // should allow string with non-spaces characters
    it('should allow non-space characters', () => {
      var res = isRealString('   Andrew   ');
      expect(res).toBe(true);
    });

  });
