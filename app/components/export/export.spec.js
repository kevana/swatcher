'use strict';

describe('myApp.export module', function() {
  beforeEach(module('myApp.export'));

  describe('export service', function() {
    it('should accept a data URL for a sample product', inject(function(ExportService) {
      expect(ExportService.toDataUrl()).toEqual(undefined);
    }));
  });
});
