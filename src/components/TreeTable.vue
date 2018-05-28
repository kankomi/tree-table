<template>
    <div>
        <h1>TreeTable Component</h1>
        <v-data-table :items="tableItems">
            <template slot="items" slot-scope="props">
                <td v-bind:class="{ hidden: props.item.hidden }">
                    <span v-bind:style="{'padding-left': (props.item.depth * 20) + 'px'}">
                    </span>
                    <span v-if="props.item.hasChildren">
                        <v-icon class="clickable" v-if="!props.item.expanded" @click="expandChildren($event, props.item)">chevron_right</v-icon>
                        <v-icon class="clickable" v-if="props.item.expanded" @click="collapseChildren($event, props.item)">expand_more</v-icon>
                    </span>
                    <span v-else style="padding-left: 24px"></span>
                    {{props.item.id}}
                </td>
                <td v-bind:class="{ hidden: props.item.hidden }">
                    {{props.item.title}}
                </td>
                <td v-bind:class="{ hidden: props.item.hidden }">
                    {{props.item.depth}}
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
  props: ['data', 'header'],
  mounted() {
    this.tableItems = this.processData(this.data, null);
  },
  data() {
    return {
      tableItems: [],
      collapseChildren(e, parent) {
        for (var item of this.tableItems) {
          if (item.parent === parent.id) {
            item.hidden = true;
          }
        }

        parent.expanded = false;
      },
      expandChildren(e, parent) {
        for (var item of this.tableItems) {
          if (item.parent === parent.id) {
            item.hidden = false;
          }
        }

        parent.expanded = true;
      },
      processData: function(values, parent) {
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
          obj.hidden = obj.depth > 1; // only show root and first
          obj.expanded = obj.depth < 1;
          obj.parent = parent ? parent.id : null;

          for (var key in item) {
            var val = item[key];

            if (val.constructor !== Array) {
              obj[key] = val;
            } else {
              var x = this.processData(val, obj);
              if (x.length > 0) {
                obj.hasChildren = true;
                ret = ret.concat(x);
              }
            }
          }
        }

        return ret;
      }
    };
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}

.clickable {
  cursor: pointer;
}
</style>
