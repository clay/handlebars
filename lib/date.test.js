'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { parse, format, isValid, isSameDay, subDays, differenceInMinutes, distanceStrict } = require('./date');

// Expected values are built from local-time parts, so they hold in every time zone. lib/date.js is checked against
// date-fns 1.30.1 (which it replaces) separately, over a few hundred thousand dates, formats and time zones.

describe('lib/date', function () {
  describe('parse', function () {
    it('reads an ISO date without a time as local midnight, not UTC', function () {
      assert.equal(+parse('2017-01-13'), +new Date(2017, 0, 13));
      assert.equal(+parse('20170113'), +new Date(2017, 0, 13));
    });

    it('reads an ISO date and time without a zone as local time', function () {
      assert.equal(+parse('2017-01-13T18:22:16'), +new Date(2017, 0, 13, 18, 22, 16));
      assert.equal(+parse('2017-01-13 18:22'), +new Date(2017, 0, 13, 18, 22));
      assert.equal(+parse('2017-01-13T18:22:16.123'), +new Date(2017, 0, 13, 18, 22, 16, 123));
    });

    it('honours a zone when there is one', function () {
      assert.equal(+parse('2017-01-13T18:22:16Z'), Date.UTC(2017, 0, 13, 18, 22, 16));
      assert.equal(+parse('2017-01-13T18:22:16+05:30'), Date.UTC(2017, 0, 13, 12, 52, 16));
      assert.equal(+parse('2017-01-13T18:22:16-0500'), Date.UTC(2017, 0, 13, 23, 22, 16));
    });

    it('reads partial, ordinal and week dates', function () {
      assert.equal(+parse('2017'), +new Date(2017, 0, 1));
      assert.equal(+parse('2017-06'), +new Date(2017, 5, 1));
      assert.equal(+parse('2017-013'), +new Date(2017, 0, 13));
      assert.equal(+parse('2017-W02-5'), +new Date(2017, 0, 13));
    });

    it('copies a Date and reads a timestamp', function () {
      const date = new Date(2020, 2, 4, 15, 5, 9);

      assert.notEqual(parse(date), date);
      assert.equal(+parse(date), +date);
      assert.equal(+parse(1500000000000), 1500000000000);
    });

    it('leaves strings that are not ISO 8601 to the Date constructor', function () {
      assert.equal(+parse('Fri, 13 Jan 2017 18:22:16 GMT'), Date.UTC(2017, 0, 13, 18, 22, 16));
      assert.equal(+parse('January 5, 2017 10:30 PM'), +new Date(2017, 0, 5, 22, 30));
    });

    it('gives an Invalid Date for what it can not read', function () {
      assert.equal(isValid(parse('not a date')), false);
      assert.equal(isValid(parse(undefined)), false);
      assert.equal(isValid(parse('2017-13-45')), true); // ISO shaped, so read as the date it overflows to, like date-fns did
    });
  });

  describe('format', function () {
    const date = new Date(2020, 2, 4, 15, 5, 9, 45); // Wednesday, March 4th 2020, 3:05:09.045 PM

    it('prints every token', function () {
      const expected = {
        M: '3', MM: '03', MMM: 'Mar', MMMM: 'March', Mo: '3rd', Q: '1', Qo: '1st',
        D: '4', DD: '04', Do: '4th', DDD: '64', DDDD: '064', DDDo: '64th',
        d: '3', do: '3rd', dd: 'We', ddd: 'Wed', dddd: 'Wednesday', E: '3',
        W: '10', WW: '10', Wo: '10th', YY: '20', YYYY: '2020', GG: '20', GGGG: '2020',
        H: '15', HH: '15', h: '3', hh: '03', m: '5', mm: '05', s: '9', ss: '09',
        S: '0', SS: '04', SSS: '045', A: 'PM', a: 'pm', aa: 'p.m.',
        X: String(Math.floor(date.getTime() / 1000)), x: String(date.getTime())
      };

      Object.keys(expected).forEach((token) => {
        assert.equal(format(date, token), expected[token], token);
      });
    });

    it('prints the time zone offset', function () {
      assert.match(format(date, 'Z'), /^[+-]\d\d:\d\d$/);
      assert.equal(format(date, 'ZZ'), format(date, 'Z').replace(':', ''));
    });

    it('prints the ISO week and week-numbering year at the edges of a year', function () {
      assert.equal(format(new Date(2021, 0, 3), 'GGGG-[W]WW-E'), '2020-W53-7');
      assert.equal(format(new Date(2018, 11, 31), 'GGGG-[W]WW-E'), '2019-W01-1');
      assert.equal(format(new Date(2016, 0, 1), 'GGGG-[W]WW'), '2015-W53');
    });

    it('prints 12 hours around midnight and noon', function () {
      assert.equal(format(new Date(2020, 0, 1, 0, 30), 'h:mm a'), '12:30 am');
      assert.equal(format(new Date(2020, 0, 1, 12, 30), 'h:mm A'), '12:30 PM');
      assert.equal(format(new Date(2020, 0, 1, 13, 5), 'hh:mm aa'), '01:05 p.m.');
    });

    it('prints [bracketed] text and \\-escaped characters as they are', function () {
      assert.equal(format(date, 'M/D/YYYY [at] h:mm a'), '3/4/2020 at 3:05 pm');
      assert.equal(format(date, '[Today is] dddd'), 'Today is Wednesday');
      assert.equal(format(date, '\\YYYY YYYY'), 'YYYY 2020');
      assert.equal(format(date, 'ok!'), 'ok!'); // o, k and ! are not tokens
    });

    it('pads years to four digits', function () {
      const early = new Date(2000, 0, 1, 12);

      early.setFullYear(7); // new Date(7, ...) would mean 1907
      assert.equal(format(early, 'YYYY YY'), '0007 07');
    });

    it('prints an ISO 8601 date and time when there is no format', function () {
      assert.match(format(date), /^2020-03-04T15:05:09\.045[+-]\d\d:\d\d$/);
      assert.match(format(date, ''), /^2020-03-04T15:05:09\.045[+-]\d\d:\d\d$/);
    });

    it('accepts anything parse accepts', function () {
      assert.equal(format('2020-03-04', 'M/D/YYYY'), '3/4/2020');
      assert.equal(format(date.getTime(), 'M/D/YYYY h:mm a'), '3/4/2020 3:05 pm');
    });

    it('prints "Invalid Date" for what is not a date', function () {
      assert.equal(format('nonsense', 'YYYY'), 'Invalid Date');
      assert.equal(format(undefined, 'YYYY'), 'Invalid Date');
    });
  });

  describe('comparing dates', function () {
    const noon = new Date(2020, 5, 15, 12, 0, 0);

    it('differenceInMinutes counts whole minutes, towards zero', function () {
      assert.equal(differenceInMinutes(new Date(+noon + 59999), noon), 0);
      // (a difference between -1 and 0 minutes is -0, as in date-fns, hence the + 0)
      assert.equal(differenceInMinutes(new Date(+noon + 60000), noon), 1);
      assert.equal(differenceInMinutes(new Date(+noon - 60001), noon), -1);
      assert.equal(differenceInMinutes(new Date(+noon - 59999), noon) + 0, 0);
    });

    it('isSameDay compares calendar days in local time', function () {
      assert.equal(isSameDay(new Date(2020, 5, 15, 0, 0), new Date(2020, 5, 15, 23, 59)), true);
      assert.equal(isSameDay(new Date(2020, 5, 15, 23, 59), new Date(2020, 5, 16, 0, 0)), false);
    });

    it('subDays moves back by calendar days, across months', function () {
      assert.equal(+subDays(new Date(2020, 2, 1, 9, 30), 1), +new Date(2020, 1, 29, 9, 30));
    });

    it('distanceStrict gives whole seconds and minutes, whichever date comes first', function () {
      assert.equal(distanceStrict(noon, new Date(+noon - 45000), 's'), 45);
      assert.equal(distanceStrict(noon, new Date(+noon + 45000), 's'), 45);
      assert.equal(distanceStrict(noon, new Date(+noon - 5 * 60000 - 59000), 'm'), 5);
      assert.equal(distanceStrict(noon, new Date(+noon - 1500), 's'), 1);
    });
  });
});
