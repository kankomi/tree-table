'use strict';

/**
 * Converts JSON-Data in 'tree form' into a flat array
 * that can be used in a table.
 *
 * @param {Array} values The values.
 * @param {{id: Number}} parent The parent object or null.
 *
 * @returns {Array} The table data arrray.
 */
function processData(values, parent) {
  var ret = [];
  var depth = 0;

  if (parent !== null) {
    depth = parent.depth + 1;
  }

  if (values.constructor !== Array) {
    throw 'data needs to be an array';
  }

  if (values.length === 0) {
    return [];
  }

  for (var item of values) {
    var obj = {};
    ret.push(obj);
    obj.depth = depth;
    obj.hasChildren = false;
    obj.hidden = obj.depth > 1; // only show root and first level
    obj.expanded = obj.depth < 1;
    obj.parent = parent ? parent.id : null;

    for (var key in item) {
      var val = item[key];

      if (val.constructor !== Array) {
        obj[key] = val;
      } else {
        var x = processData(val, obj);
        if (x.length > 0) {
          obj.hasChildren = true;
          ret = ret.concat(x);
        }
      }
    }
  }

  return ret;
}

export { processData };
