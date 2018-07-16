<template>
  <v-data-table 
    :items="tableItems" 
    :headers="headers"
    hide-actions
    class="elevation-1"
    :disable-initial-sort="true"
  >
      <template slot="items" slot-scope="props">
        <td 
          v-for="(header, idx) of headers" 
          v-bind:key="idx" 
          v-bind:class="{ hidden: props.item.hidden }"
          >
          <!-- Expand/Collapse icon -->
          <span v-if="idx === 0">
            <span class="block" v-bind:style="{'padding-left': (props.item.depth * 20) + 'px'}">
              <span v-if="props.item.hasChildren">
                  <v-icon class="clickable" v-if="!props.item.expanded" @click="expandChildren(props.item)">chevron_right</v-icon>
                  <v-icon class="clickable" v-if="props.item.expanded" @click="collapseChildren(props.item)">expand_more</v-icon>
              </span>
              <span v-else class="block" style="padding-left: 24px"></span>
              {{props.item[header.value]}}
            </span>
          </span>
          <!-- / Expand/Collapse icon -->
          <span v-else>
            <span v-if="header.readonly === false">
              <editable-cell 
                label="Edit"
                @onEnter="props.item[header.value] = $event"
              >
                {{props.item[header.value]}}
              </editable-cell>
            </span>
            <span v-else>
              {{props.item[header.value]}}
            </span>
          </span>
        </td>
      </template>
  </v-data-table>
</template>

<script>
import * as Helper from './Helper';
import EditableCell from './EditableCell';

export default {
  props: ['data', 'headers'],
  components: {
    EditableCell
  },
  mounted() {
    this.tableItems = Helper.processData(this.data, null);
  },
  data() {
    return {
      tableItems: [],
      calcMinWidth(item, key) {
        var textLen = String(item[key]).length;
        var offset = 10; // standard offset
        return textLen * 10 + item.depth * 10 + offset;
      },
      getItemById(id) {
        for (var item of this.tableItems) {
          if (item.id === id) {
            return item;
          }
        }

        return null;
      },
      collapseChildren(parent) {
        for (var item of this.tableItems) {
          if (item.depth > parent.depth) {
            item.hidden = true;
          }
        }

        parent.expanded = false;
      },
      expandChildren(parent) {
        parent.expanded = true;

        for (var item of this.tableItems) {
          var itemParent = this.getItemById(item.parent);
          var parentIsExpanded = itemParent ? itemParent.expanded : true;
          if (item.depth > parent.depth && parentIsExpanded) {
            item.hidden = false;
          }
        }
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
.block {
  display: inline-block;
}
</style>
