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
import * as Helper from './Helper';

export default {
  props: ['data', 'header'],
  mounted() {
    this.tableItems = Helper.processData(this.data, null);
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
